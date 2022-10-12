import axios from "axios";
import {
  fetchMaintenanceScheduleForUser,
  receiveMaintenanceSchedule,
  createNewMaintenanceTask,
  updateSelectedMaintenanceTask,
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
    dispatch(fetchMaintenanceScheduleForUser());
    const response = await axios(config);
    return dispatch(receiveMaintenanceSchedule(response.data));
  } catch (e) {
    return dispatch(setErrorStatus(true));
  }
};

const updateMaintenanceTask = (data) => async (dispatch) => {
  const config = {
    url: `/api/maintenance-work/update/tasks`,
    data,
    method: HTTP_METHODS.PATCH,
    params: {
      id: data.taskId,
    },
  };

  try {
    dispatch(updateSelectedMaintenanceTask());
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
    dispatch(createNewMaintenanceTask());
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
