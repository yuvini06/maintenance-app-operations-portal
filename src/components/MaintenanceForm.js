import React from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { SEVERITY_TYPES } from "../utils/constants";
import Button from "@mui/material/Button";

/**
 * Submission form to schedule a new maintenance task
 *
 * @author: Yuvini Sumanasekera
 */
class MaintenanceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: "",
      endTime: "",
      risk: " ",
      assignee: " ",
      changeSet: " ",
      comments: " ",
    };
  }

  getRiskLevels = () => {
    return Object.values(SEVERITY_TYPES).map((type, index) => (
      <MenuItem key={index} value={type} sx={{ fontSize: "13px" }}>
        {type}
      </MenuItem>
    ));
  };

  handleRiskSelection = (event) => {
    this.setState({ risk: event.target.value });
  };

  onEndTimestampChange = (event) => {
    this.setState({ endTime: event.target.value });
  };

  onStartTimestampChange = (event) => {
    this.setState({ startTime: event.target.value });
  };

  handleCommentsInput = (event) => {
    this.setState({ comments: event.target.value });
  };

  handleUserAssignment = (event) => {
    this.setState({ assignee: event.target.value });
  };

  handleChangeSetInput = (event) => {
    this.setState({ changeSet: event.target.value });
  };

  createNewMaintenanceTask = () => {
    const params = { ...this.state };
    params.startTime = new Date(params.startTime).valueOf();
    params.endTime = new Date(params.endTime).valueOf();
    this.props.createNewMaintenanceTask(params);
  };

  isSubmissionDisabled = () => {
    const { startTime, endTime, risk, changeSet, assignee } = { ...this.state };
    return (
      !startTime.trim() ||
      !endTime.trim() ||
      !risk.trim() ||
      !changeSet.trim() ||
      !assignee.trim()
    );
  };

  render() {
    return (
      <>
        <Stack
          component="form"
          sx={{
            "& .MuiTextField-root": { margin: "1.5rem 0.5rem", width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="startTime"
              label="Planned Start Time"
              type="datetime-local"
              onChange={this.onStartTimestampChange}
              disablePast={true}
              inputProps={{
                min: new Date().toISOString().slice(0, 16),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              id="endTime"
              label="Planned End Time"
              type="datetime-local"
              onChange={this.onEndTimestampChange}
              inputProps={{
                min: new Date().toISOString().slice(0, 16),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Assigned To"
              defaultValue={this.state.assignee}
              onChange={this.handleUserAssignment}
              helperText="Primary contact for this task"
            />
            <TextField
              required
              id="risk"
              select
              label="Risk"
              defaultValue={this.state.risk}
              value={this.state.risk}
              helperText="Risk assessment to identify potential impact of the change(s)"
              onChange={this.handleRiskSelection}
            >
              {this.getRiskLevels()}
            </TextField>
            <TextField
              required
              id="changeSet"
              label="Change Set"
              onChange={this.handleChangeSetInput}
              defaultValue={this.state.changeSet}
              helperText="Summary of the tasks"
            />
            <TextField
              id="comments"
              label="Comments"
              defaultValue={this.state.comments}
              onChange={this.handleCommentsInput}
              helperText="Additional Comments"
            />
          </div>
        </Stack>
        <Button
          variant="contained"
          size="small"
          color="primary"
          disabled={this.isSubmissionDisabled()}
          sx={{
            height: "27px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
          }}
          onClick={() => this.createNewMaintenanceTask()}
        >
          Save
        </Button>
      </>
    );
  }
}

MaintenanceForm.propTypes = {
  createNewMaintenanceTask: PropTypes.func,
};

export default MaintenanceForm;
