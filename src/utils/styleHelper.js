import Badge from "@mui/material/Badge";
import { STATUS_TYPES, SEVERITY_TYPES } from "./constants";

const BADGE_STYLE = {
  color: "white",
  fontWeight: "bold",
  fontSize: "10px",
};

export function getStatusLabel(status) {
  if (status === STATUS_TYPES.COMPLETED) {
    return (
      <Badge
        badgeContent={"COMPLETED"}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#4caf50",
            ...BADGE_STYLE,
          },
        }}
      />
    );
  }
  if (status === STATUS_TYPES.PENDING) {
    return (
      <Badge
        badgeContent={"PENDING"}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#03a9f4",
            ...BADGE_STYLE,
          },
        }}
      />
    );
  }
  if (status === STATUS_TYPES.IN_PROGRESS) {
    return (
      <Badge
        badgeContent={"IN PROGRESS"}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#ff9800",
            minWidth: "5.5rem",
            ...BADGE_STYLE,
          },
        }}
      />
    );
  }
  if (status === STATUS_TYPES.CANCELLED) {
    return (
      <Badge
        badgeContent={"CANCELLED"}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#d32f2f",
            ...BADGE_STYLE,
          },
        }}
      />
    );
  }
  return null;
}

export function getSeverityLabel(status) {
  if (status === SEVERITY_TYPES.LOW) {
    return (
      <Badge
        badgeContent={"LOW"}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#a1a1a5",
            ...BADGE_STYLE,
          },
        }}
      />
    );
  }
  if (status === SEVERITY_TYPES.MEDIUM) {
    return (
      <Badge
        badgeContent={"MEDIUM"}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#ffc107",
            ...BADGE_STYLE,
          },
        }}
      />
    );
  }
  if (status === SEVERITY_TYPES.HIGH) {
    return (
      <Badge
        badgeContent={"HIGH"}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#ef5350",
            ...BADGE_STYLE,
          },
        }}
      />
    );
  }
  return null;
}
