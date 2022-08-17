import { useCallback, useEffect, useMemo, useReducer } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

import {
  getEventEndpoint,
  IEvent,
  ICalendar,
  getCalendarEndpoint,
} from "../Helpers/backend";

import { CalendarsView } from "./CalendarsView";
import { CalendarHeader } from "./CalendarHeader";
import { Calendar, ICalendarCell, IEventWithCalendar } from "./Calendar";
import EventFormDialog from "./EventFormDialog";
import { getToday } from "../Helpers/dateFunctions";
import { reducer } from "./calendarScreenReducer";
import React from "react";

function useCalendarScreenState(month: string) {
  const [state, dispatch] = useReducer(reducer, {
    calendars: [],
    calendarsSelected: [],
    events: [],
    editingEvent: null,
  });
  const { events, calendars, calendarsSelected, editingEvent } = state;

  const weeks = useMemo(() => {
    return generateCalendar(
      month + "-01",
      events,
      calendars,
      calendarsSelected
    );
  }, [month, events, calendars, calendarsSelected]);
  const firstDate = weeks[0][0].date;
  const lastDate = weeks[weeks.length - 1][6].date;

  useEffect(() => {
    Promise.all([
      getCalendarEndpoint(),
      getEventEndpoint(firstDate, lastDate),
    ]).then(([calendars, events]) => {
      dispatch({ type: "load", payload: { events, calendars } });
    });
  }, [firstDate, lastDate]);

  function refreshEvents() {
    getEventEndpoint(firstDate, lastDate).then(() => {
      dispatch({ type: "load", payload: { events } });
    });
  }

  return {
    weeks,
    calendars,
    dispatch,
    refreshEvents,
    calendarsSelected,
    editingEvent,
  };
}

function CalendarScreen() {
  const { month } = useParams<{ month: string }>();

  const {
    weeks,
    calendars,
    dispatch,
    refreshEvents,
    calendarsSelected,
    editingEvent,
  } = useCalendarScreenState(month as string);

  const closeDialog = useCallback(() => {
    dispatch({ type: "closeDialog" });
  }, []);

  return (
    <Box display="flex" height="100%" alignItems="stretch">
      <Box
        borderRight="1px solid rgb(224,224,224)"
        width="16em"
        padding="8px 16px"
      >
        <h2>Agenda React</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: "new", payload: getToday() })}
        >
          Novo evento
        </Button>
        <CalendarsView
          calendars={calendars}
          dispatch={dispatch}
          calendarSelected={calendarsSelected}
        />
      </Box>
      <Box flex="1" display="flex" flexDirection="column">
        <CalendarHeader month={month as string} />
        <Calendar weeks={weeks} dispatch={dispatch} />

        <EventFormDialog
          event={editingEvent}
          onSave={() => {
            refreshEvents();
            closeDialog();
          }}
          calendars={calendars}
          onCancel={closeDialog}
        />
      </Box>
    </Box>
  );
}

function generateCalendar(
  date: string,
  allEvents: IEvent[],
  calendars: ICalendar[],
  calendarSelected: boolean[]
): ICalendarCell[][] {
  const weeks: ICalendarCell[][] = [];
  const jsDate = new Date(date + "T10:00:00");
  const currentMonth = jsDate.getMonth();

  const currentDay = new Date(jsDate.valueOf());
  currentDay.setDate(1);
  const dayOfWeek = currentDay.getDay();
  currentDay.setDate(1 - dayOfWeek);

  do {
    const week: ICalendarCell[] = [];
    for (let i = 0; i < 7; i++) {
      const monthStr = (currentDay.getMonth() + 1).toString().padStart(2, "0");
      const dayStr = currentDay.getDate().toString().padStart(2, "0");
      const isoDate = `${currentDay.getFullYear()}-${monthStr}-${dayStr}`;

      const events: IEventWithCalendar[] = [];
      for (const event of allEvents) {
        if (event.date === isoDate) {
          const calIndex = calendars.findIndex(
            (cal) => cal.id === event.calendarId
          );
          if (calendarSelected[calIndex]) {
            events.push({ ...event, calendar: calendars[calIndex] });
          }
        }
      }
      week.push({
        dayOfMonth: dayStr,
        date: isoDate,
        events,
      });
      currentDay.setDate(currentDay.getDate() + 1);
    }
    weeks.push(week);
  } while (currentDay.getMonth() === currentMonth);

  return weeks;
}

export default CalendarScreen;
