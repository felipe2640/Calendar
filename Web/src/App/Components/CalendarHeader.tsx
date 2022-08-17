import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { formatMonth, addMonths } from "../Helpers/dateFunctions";
import { UserMenu } from "./UserMenu";
import React from "react";

interface ICalendarHeaderProps {
  month: string;
}

export const CalendarHeader = React.memo(function (
  props: ICalendarHeaderProps
) {
  const { month } = props;

  return (
    <Box display="Flex" alignItems="center" padding="8px 16px">
      <Box flex="1">
        <IconButton
          aria-label="Mês anterior"
          component={Link}
          to={"/calendar/" + addMonths(month as string, -1)}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          aria-label="Proximo mês"
          component={Link}
          to={"/calendar/" + addMonths(month as string, 1)}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Box flex="1" component="h3">
        {formatMonth(month as string)}
      </Box>
      <UserMenu />
    </Box>
  );
});
