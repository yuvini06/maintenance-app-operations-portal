import {
  FETCH_MAINTENANCE_SCHEDULE,
  UPDATE_MAINTENANCE_TASK,
  CREATE_MAINTENANCE_TASK,
  RECEIVE_MAINTENANCE_SCHEDULE,
  SET_REDIRECTION_FLAG_FOR_MAINTENANCE,
  REFRESH_DATA_GRID,
  SET_ERROR_STATUS,
} from "./Actions";

export default function RootReducer(state = {}, { type, data }) {
  switch (type) {
    case FETCH_MAINTENANCE_SCHEDULE:
    case UPDATE_MAINTENANCE_TASK:
    case CREATE_MAINTENANCE_TASK:
      return { ...state, isError: false };
    case RECEIVE_MAINTENANCE_SCHEDULE:
      return { ...state, maintenanceData: data, refreshGrid: false };
    case SET_REDIRECTION_FLAG_FOR_MAINTENANCE:
      return { ...state, maintenanceInProgress: data };
    case REFRESH_DATA_GRID:
      return { ...state, refreshGrid: data };
    case SET_ERROR_STATUS:
      return { ...state, isError: data };
    default:
      return state;
  }
}
