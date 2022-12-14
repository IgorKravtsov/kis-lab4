import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface DropdownProps {
  rows: any[];
  value: any;
  onChange: (event: SelectChangeEvent<any>) => void;
  label: string;
  displayKey: any;
  displayValue: any;
}

export const Dropdown: React.FC<DropdownProps> = ({
  rows,
  label,
  displayKey,
  displayValue,
  ...props
}) => {
  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
        <Select
          {...props}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          // autoWidth
          label={label}
        >
          <MenuItem value={0}>
            <em>None</em>
          </MenuItem>
          {rows.map((c) => (
            <MenuItem value={c[displayKey]}>{c[displayValue]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
