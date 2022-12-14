import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import {
  LocalizationProvider,
  DatePicker as MUIDatePicker,
} from "@mui/x-date-pickers";

interface DatePickerProps {
  value: Date | null;
  onChange: (newValue: Date | null) => void;
  label: string;
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MUIDatePicker
        {...props}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
