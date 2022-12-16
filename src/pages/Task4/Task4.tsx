import React, { ChangeEvent, useState } from "react";
import useSWR from "swr";


import Grid2 from "@mui/material/Unstable_Grid2";
import { Box, Button, TextField } from "@mui/material";

import { Dropdown } from "components/Dropdown/Dropdown";
import { DatePicker } from "components/DatePicker/DatePicker";
import { Snackbar, SnackbarProps } from "components/Snackbar/Snackbar";
import { api } from "api/api";

const mocked_cars = [
  { carId: 1, mark: "BMW" },
  { carId: 2, mark: "Mersedes" },
];

const mocked_customers = [
  { customerId: 1, name: "Alex" },
  { customerId: 2, name: "Igor" },
];

const Task4: React.FC = () => {
  const {data: cars} = useSWR('car/all')
  const {data: customers} = useSWR('customer/all')

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

  console.log('cars', cars)
  console.log('customers', customers)

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

  const handleSubmit = async () => {
    if (!carId || !customerId || !reservationDate || !period) {
      setSnackbarState({
        severity: "error",
        message: "Not all fields are selected",
        open: true,
      });
      return;
    }
    try {
      const data = await api.reserveCar({carId, customerId, periodInDays: Number(period ?? 0), reservationDate})
      setSnackbarState({ severity: "success",
      message: "Reservation OK",
      open: true,})
    } catch (error) {
      setSnackbarState({ severity: "error",
      message: "Something went wrong",
      open: true,})
    }
    // console.log(data)
    // if(data?.newReservations) {
    //   setSnackbarState({ severity: "success",
    //   message: "Reservation OK",
    //   open: true,})
    // } else {
    //   setSnackbarState({ severity: "error",
    //   message: "Something went wrong",
    //   open: true,})
    // }
  };

  return (
    <>
      <Grid2 container justifyContent={"space-around"}>
        <Dropdown
          value={carId}
          rows={cars ?? []}
          onChange={(e) => setCarId(e.target.value)}
          label={"Car"}
          displayKey={"carid"}
          displayValue={"mark"}
        />
        <Dropdown
          value={customerId}
          rows={customers ?? []}
          onChange={(e) => setCustomerId(e.target.value)}
          label={"Customer"}
          displayKey={"customerid"}
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
