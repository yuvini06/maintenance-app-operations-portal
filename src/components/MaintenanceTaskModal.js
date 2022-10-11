import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Card, CardBody } from "reactstrap";
import { STATUS_TYPES, ACTION_TYPES } from "../utils/constants";
import Button from "@mui/material/Button";

/**
 * Modal to start, complete or cancel a scheduled maintenance task
 *
 * @author: Yuvini Sumanasekera
 */
class MaintenanceTaskModal extends React.Component {
  render() {
    return (
      <>
        <Card style={{ border: "none" }}>
          <h3 style={{ paddingTop: "0.8rem", paddingBottom: "1rem" }}>
            Update Maintenance Task
          </h3>
          <CardBody style={{ paddingTop: "0px" }}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div style={{ display: "flex" }}>
                <TextField
                  id="taskId"
                  label="Task ID"
                  value={this.props.taskId}
                  variant="filled"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id="assignee"
                  label="Assigned To"
                  value={this.props.assignee}
                  variant="filled"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
            </Box>
            {this.props.status === STATUS_TYPES.PENDING ? (
              <Button
                variant="contained"
                size="small"
                color="primary"
                sx={{
                  height: "27px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 auto",
                  marginTop: "1.5rem",
                }}
                onClick={() =>
                  this.props.updateMaintenanceTask(
                    this.props.taskId,
                    ACTION_TYPES.START
                  )
                }
              >
                Start
              </Button>
            ) : (
              <div style={{ display: "flex", marginTop: "1.5rem" }}>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  sx={{
                    height: "27px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                  }}
                  onClick={() =>
                    this.props.updateMaintenanceTask(
                      this.props.taskId,
                      ACTION_TYPES.COMPLETE
                    )
                  }
                >
                  Complete
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  sx={{
                    height: "27px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                  }}
                  onClick={() =>
                    this.props.updateMaintenanceTask(
                      this.props.taskId,
                      ACTION_TYPES.CANCEL
                    )
                  }
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </>
    );
  }
}

MaintenanceTaskModal.propTypes = {
  assignee: PropTypes.string,
  taskId: PropTypes.number,
  status: PropTypes.string,
  updateMaintenanceTask: PropTypes.func,
};

export default MaintenanceTaskModal;
