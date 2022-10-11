import * as moment from "moment";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import PropTypes from "prop-types";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { STATUS_TYPES } from "../utils/constants";
import { getStatusLabel, getSeverityLabel } from "../utils/styleHelper";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#adb5bd",
    color: "#313437",
    fontWeight: "bold",
    minWidth: "8rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const getColumns = () => [
  "Task ID",
  "Planned Start Time",
  "Planned End Time",
  "Actual Start Time",
  "Actual End Time",
  "Status",
  "Risk",
  "Assigned To",
  "Change Set",
  "Comment(s)",
  "Action",
];

const renderCell = (value) => (
  <StyledTableCell align="center">{value}</StyledTableCell>
);

const getFormattedTimestamp = (unixTimestamp) =>
  moment.unix(unixTimestamp / 1000).format("MMMM DD, YYYY hh:mm A");

const generateData = (row, props) => {
  const cells = [];
  for (const [key, value] of Object.entries(row)) {
    if (key === "risk") {
      cells.push(renderCell(getSeverityLabel(value)));
    } else if (key === "status") {
      cells.push(renderCell(getStatusLabel(value)));
    } else if (key === "planned_start_time" || key === "planned_end_time") {
      cells.push(renderCell(getFormattedTimestamp(value)));
    } else if (key === "actual_start_time" || key === "actual_end_time") {
      if (row.status === STATUS_TYPES.PENDING) {
        cells.push(renderCell("—"));
      } else if (
        row.status === STATUS_TYPES.IN_PROGRESS &&
        key === "actual_end_time"
      ) {
        cells.push(renderCell(" —"));
      } else {
        cells.push(renderCell(getFormattedTimestamp(value)));
      }
    } else if (key == "action") {
      cells.push(
        <Button
          disabled={!value}
          variant="contained"
          size="small"
          sx={{ marginTop: "1rem" }}
          onClick={() =>
            props.toggleUpdateModal(true, {
              taskId: row.task_id,
              assignee: row.assignee,
              status: row.status,
              actualStartTime: row.actual_start_time,
              actualEndTime: row.actual_end_time,
            })
          }
        >
          Update
        </Button>
      );
    } else {
      cells.push(renderCell(value));
    }
  }
  return cells;
};

/**
 * Data table to display maintenance tasks
 *
 * @author: Yuvini Sumanasekera
 */
const DataTable = (props) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          {getColumns().map((column) => (
            <StyledTableCell key={column} align="center">
              {column}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {props.tableData &&
          props.tableData.map((row, index) => (
            <StyledTableRow key={index}>
              {generateData(row, props)}
            </StyledTableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
);

DataTable.propTypes = {
  updateMaintenanceTask: PropTypes.func,
  tableData: PropTypes.array,
};

export default DataTable;
