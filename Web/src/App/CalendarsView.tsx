import React from "react";

import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { ICalendar } from "./backend";
import { ICalendarScreenAction } from "./calendarScreenReducer";

interface ICalendarViewProps {
  calendars: ICalendar[];
  dispatch: React.Dispatch<ICalendarScreenAction>;
  calendarSelected: boolean[];
}

export const CalendarsView = React.memo(function (props: ICalendarViewProps) {
  const { calendars, calendarSelected } = props;
  return (
    <Box marginTop="64px">
      <h3>Agendas</h3>

      {calendars.map((calendar, i) => (
        <div key={i}>
          <FormControlLabel
            control={
              <Checkbox
                style={{ color: calendar.color }}
                checked={calendarSelected[i]}
                onChange={() =>
                  props.dispatch({ type: "toggleCalendar", payload: i })
                }
              />
            }
            key={calendar.id}
            label={calendar.name}
          />
        </div>
      ))}
    </Box>
  );
});
