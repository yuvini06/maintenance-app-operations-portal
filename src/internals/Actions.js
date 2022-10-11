export const FETCH_MAINTENANCE_SCHEDULE = "FETCH_MAINTENANCE_SCHEDULE";
export const RECEIVE_MAINTENANCE_SCHEDULE = "RECEIVE_MAINTENANCE_SCHEDULE";
export const UPDATE_MAINTENANCE_TASK = "UPDATE_MAINTENANCE_TASK";
export const CREATE_MAINTENANCE_TASK = "CREATE_MAINTENANCE_TASK";
export const SET_REDIRECTION_FLAG_FOR_MAINTENANCE = "SET_REDIRECTION_FLAG_FOR_MAINTENANCE";
export const REFRESH_DATA_GRID = "REFRESH_DATA_GRID";
export const SET_ERROR_STATUS = "SET_ERROR_STATUS";

export const fetchMaintenanceSchedule = (data) => ({
  type: FETCH_MAINTENANCE_SCHEDULE,
  data,
});

export const receiveMaintenanceSchedule = (data) => ({
  type: RECEIVE_MAINTENANCE_SCHEDULE,
  data,
});

export const updateMaintenanceSchedule = (data) => ({
  type: UPDATE_MAINTENANCE_TASK,
  data,
});

export const createMaintenanceSchedule = (data) => ({
  type: CREATE_MAINTENANCE_TASK,
  data,
});

export const setRedirectionFlagForMaintenance = () => ({
  type: SET_REDIRECTION_FLAG_FOR_MAINTENANCE,
});

export const refreshDataGrid = (data) => ({
  type: REFRESH_DATA_GRID,
  data,
});

export const setErrorStatus = (data) => ({
  type: SET_ERROR_STATUS,
  data,
});
