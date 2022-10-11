import axios from "axios";
import {
  receiveMaintenanceSchedule,
  refreshDataGrid,
  setErrorStatus,
} from "../internals/Actions";
import { HTTP_METHODS } from "../utils/constants";

const fetchMaintenanceSchedule = (userType) => async (dispatch) => {
  const config = {
    url: `/api/maintenance-work/schedule`,
    params: { userType },
    method: HTTP_METHODS.GET,
  };

  try {
    const response = await axios(config);
    return dispatch(receiveMaintenanceSchedule(response.data));
  } catch (e) {
    console.log("HERE")
    return dispatch(setErrorStatus(true));
  }
};

const updateMaintenanceTask = (data) => async (dispatch) => {
  console.log(data);
  const config = {
    url: `/api/maintenance-work/update/tasks`,
    data,
    method: HTTP_METHODS.PATCH,
    params: {
      id: data.taskId,
    },
  };

  try {
    await axios(config);
    return dispatch(refreshDataGrid(true));
  } catch (e) {
    return dispatch(setErrorStatus(true));
  }
};

const createMaintenanceTask = (data) => async (dispatch) => {
  const config = {
    url: `/api/maintenance-work/create`,
    data,
    method: HTTP_METHODS.POST,
  };

  try {
    await axios(config);
    return dispatch(refreshDataGrid(true));
  } catch (e) {
    return dispatch(setErrorStatus(true));
  }
};

export {
  fetchMaintenanceSchedule,
  updateMaintenanceTask,
  createMaintenanceTask,
};
