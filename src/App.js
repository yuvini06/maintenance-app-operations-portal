import React from "react";
import axios from "axios";
import HttpStatus from 'http-status-codes';
import { Provider } from "react-redux";
import { stringify } from 'qs';
import store from "./internals/Store";
import MaintenanceScheduleOverview from "./views/MaintenanceScheduleOverview";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.initAxiosInterceptor();
  }

  initAxiosInterceptor = () => {
    axios.defaults.paramsSerializer = (params) => stringify(params);
    axios.defaults.validateStatus = (status) => ((status >= HttpStatus.OK && status < HttpStatus.MULTIPLE_CHOICES) 
    || status === HttpStatus.TEMPORARY_REDIRECT);
  };

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <MaintenanceScheduleOverview/> 
        </div>
      </Provider>
    );
  }
}

export default App;
