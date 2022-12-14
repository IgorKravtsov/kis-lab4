import React, { ChangeEvent, useState } from "react";

import { Dropdown } from "components/Dropdown/Dropdown";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Box, Button, TextField } from "@mui/material";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { Snackbar, SnackbarProps } from "../../components/Snackbar/Snackbar";
import { $api } from "../../api/config";

const mocked_cars = [
  { carId: 1, mark: "BMW" },
  { carId: 2, mark: "Mersedes" },
];

const mocked_customers = [
  { customerId: 1, name: "Alex" },
  { customerId: 2, name: "Igor" },
];

const Task4: React.FC = () => {
  const [carId, setCarId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [reservationDate, setReservationDate] = useState<Date | null>(
    new Date()
  );
  const [period, setPeriod] = useState<string | null>(null);

  const [snackbarState, setSnackbarState] = useState<SnackbarProps>({
    open: false,
    message: "",
  });

  const handleUpdatePeriod = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (value === "") {
      setPeriod(value);
      return;
    }
    if (Number.isNaN(Number(value[value.length - 1]))) {
      setPeriod((p) => p?.replace(value[value.length - 1], "") ?? "");
      return;
    }
    setPeriod(e.target.value);
  };

  const handleSubmit = () => {
    if (!carId || !customerId || !reservationDate || !period) {
      setSnackbarState({
        severity: "error",
        message: "Not all fields are selected",
        open: true,
      });
    }
  };

  const test = () => {
    $api.post("/");
  };

  return (
    <>
      <Grid2 container justifyContent={"space-around"}>
        <Dropdown
          value={carId}
          rows={mocked_cars}
          onChange={(e) => setCarId(e.target.value)}
          label={"Car"}
          displayKey={"carId"}
          displayValue={"mark"}
        />
        <Dropdown
          value={customerId}
          rows={mocked_customers}
          onChange={(e) => setCustomerId(e.target.value)}
          label={"Customer"}
          displayKey={"customerId"}
          displayValue={"name"}
        />
        <DatePicker
          value={reservationDate}
          onChange={(newValue) => {
            setReservationDate(newValue);
          }}
          label={"Reservation date"}
        />
        <TextField
          value={period}
          onChange={handleUpdatePeriod}
          label={"Period in days"}
          inputMode={"numeric"}
        />
      </Grid2>
      <Box sx={{ mt: 10 }}>
        <Button fullWidth variant={"contained"} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <Snackbar {...snackbarState} open={true} />
    </>
  );
};

export default Task4;
