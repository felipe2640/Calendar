import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

import { IEvent, ICalendar } from "./backend";
import React from "react";
import { ICalendarScreenAction } from "./calendarScreenReducer";

const DAYS_OF_WEEK = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

const StyledTable = styled(Table)(({ theme }) => ({
  minHeight: "100%",
  borderTop: "1px solid rgb(224,224,224)",
  tableLayout: "fixed",
  "& td ~ td, & th ~ th": {
    borderLeft: "1px solid rgb(224,224,224)",
  },
  "& td": {
    verticalAlign: "top",
    overflow: "hidden",
    padding: "8px 4px",
  },
}));

const StyledDiv = styled(Box)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: "4px",
}));
const StyledDiv2 = styled(Box)(({ theme }) => ({
  displar: "inline-block",
  color: "white",
  padding: "2px",
  borderRadius: "4px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  whiteSpace: "nowrap",
  margin: "4px 0",
}));

interface ICalendarProps {
  weeks: ICalendarCell[][];
  dispatch: React.Dispatch<ICalendarScreenAction>;
}

export const Calendar = React.memo(function (props: ICalendarProps) {
  const { weeks } = props;

  function handleClick(evt: React.MouseEvent, date: string) {
    if (evt.target === evt.currentTarget) {
      props.dispatch({ type: "new", payload: date });
    }
  }
  return (
    <TableContainer style={{ flex: 1 }}>
      <StyledTable>
        <TableHead>
          <TableRow>
            {DAYS_OF_WEEK.map((day) => (
              <TableCell align="center" key={day}>
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {weeks.map((week, i) => (
            <TableRow key={i}>
              {week.map((cell) => (
                <TableCell
                  align="center"
                  key={cell.date}
                  onClick={(me) => handleClick(me, cell.date)}
                >
                  <StyledDiv>{cell.dayOfMonth}</StyledDiv>

                  {cell.events.map((event) => {
                    const color = event.calendar.color;
                    return (
                      <StyledButton
                        key={event.id}
                        onClick={() =>
                          props.dispatch({ type: "edit", payload: event })
                        }
                      >
                        {event.time && (
                          <>
                            {" "}
                            <WatchLaterIcon
                              style={{ color }}
                              fontSize="inherit"
                            />
                            <Box component="span" margin="0 4px">
                              {event.time}{" "}
                            </Box>
                          </>
                        )}
                        {event.time ? (
                          <span>{event.desc}</span>
                        ) : (
                          <StyledDiv2 style={{ background: color }}>
                            {event.desc}
                          </StyledDiv2>
                        )}
                      </StyledButton>
                    );
                  })}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
});

export type IEventWithCalendar = IEvent & { calendar: ICalendar };

export interface ICalendarCell {
  date: string;
  dayOfMonth: string;
  events: IEventWithCalendar[];
}
