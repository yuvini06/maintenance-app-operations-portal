import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as moment from "moment";
import Button from "@mui/material/Button";
import { Modal, ModalBody } from "mdbreact";
import { Card, CardBody } from "reactstrap";
import Alert from "@mui/material/Alert";
import { ACTION_TYPES, STATUS_TYPES, USER_TYPE } from "../utils/constants";
import DataTable from "../components/DataTable";
import MaintenanceTaskModal from "../components/MaintenanceTaskModal";
import MaintenanceForm from "../components/MaintenanceForm";
import {
  fetchMaintenanceSchedule,
  createMaintenanceTask,
  updateMaintenanceTask,
} from "../externals/Api";

/**
 * View maintenance schedule - ADMIN MODE
 *
 * @author: Yuvini Sumanasekera
 */
class MaintenanceScheduleOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateModal: false,
      showInsertModal: false,
      selectedTask: {},
    };
  }

  componentDidMount() {
    this.props.fetchMaintenanceSchedule(USER_TYPE.ADMIN);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.refreshGrid !== this.props.refreshGrid &&
      this.props.refreshGrid
    ) {
      this.props.fetchMaintenanceSchedule(USER_TYPE.ADMIN);
    }
  }

  toggleUpdateModal = (showUpdateModal, selectedTask) => {
    this.setState({ showUpdateModal, selectedTask });
  };

  toggleInsertModal = (showInsertModal) => {
    this.setState({ showInsertModal });
  };

  createNewMaintenanceTask = (data) => {
    this.setState({ showInsertModal: false }, () => {
      this.props.createMaintenanceTask(data);
    });
  };

  updateMaintenanceTask = (taskId, action) => {
    const params = { taskId, action };
    if (action === ACTION_TYPES.START) {
      params.actualStartTime = moment().valueOf();
      params.actualEndTime = this.state.selectedTask.actualEndTime;
      params.newState = STATUS_TYPES.IN_PROGRESS;
    } else {
      params.actualStartTime = this.state.selectedTask.actualStartTime;
      params.actualEndTime = moment().valueOf();
      params.newState =
        action === ACTION_TYPES.CANCEL
          ? STATUS_TYPES.CANCELLED
          : STATUS_TYPES.COMPLETED;
    }
    this.setState({ showUpdateModal: false, selectedTask: {} }, () => {
      this.props.updateMaintenanceTask(params);
    });
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.showInsertModal}
          toggle={() => this.toggleInsertModal(false)}
          id={"insert_new_maintenance_task_popup"}
          size="lg"
          centered
        >
          <ModalBody>
            <Card style={{ border: "none" }}>
              <h3 style={{ paddingTop: "0.8rem" }}>Add New Maintenance Task</h3>
              <CardBody style={{ paddingTop: "1rem" }}>
                <MaintenanceForm
                  createNewMaintenanceTask={this.createNewMaintenanceTask}
                />
              </CardBody>
            </Card>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.showUpdateModal}
          toggle={() => this.toggleUpdateModal(false, {})}
          id={"update_maintenance_task_popup"}
          size="md"
          centered
        >
          <ModalBody>
            <MaintenanceTaskModal
              updateMaintenanceTask={this.updateMaintenanceTask}
              assignee={this.state.selectedTask.assignee}
              taskId={this.state.selectedTask.taskId}
              status={this.state.selectedTask.status}
            />
          </ModalBody>
        </Modal>
        {this.props.isError && (
          <Alert variant="filled" severity="error">
            An unexpected error occurred. Pleae try again.
          </Alert>
        )}
        <header className="page-header">
          <h1>Maintenance Task Overview</h1>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            sx={{
              height: "27px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
              border: "none",
              position: "fixed",
              right: "36px",
              top: this.props.isError ? "90px" : "36px",
            }}
            onClick={() => this.toggleInsertModal(true)}
          >
            Add New Maintenance Window
          </Button>
        </header>
        <DataTable
          className="container"
          tableData={this.props.maintenanceData}
          toggleUpdateModal={this.toggleUpdateModal}
        />
      </>
    );
  }
}

MaintenanceScheduleOverview.propTypes = {
  refreshGrid: PropTypes.bool,
  isError: PropTypes.bool,
  fetchMaintenanceSchedule: PropTypes.func,
  createMaintenanceTask: PropTypes.func,
  updateMaintenanceTask: PropTypes.func,
  maintenanceData: PropTypes.array,
};

const mapStateToProps = (state) => ({
  refreshGrid: state.refreshGrid,
  maintenanceData: state.maintenanceData,
  isError: state.isError,
});

export default connect(mapStateToProps, {
  fetchMaintenanceSchedule,
  createMaintenanceTask,
  updateMaintenanceTask,
})(MaintenanceScheduleOverview);
