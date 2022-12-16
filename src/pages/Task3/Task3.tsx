import React, { useState } from "react";
import { Button, Card, Grid } from "@mui/material";
import { DatePicker } from "components/DatePicker/DatePicker";
import { api } from "api/api";
import { DataGrid } from "@mui/x-data-grid";
import { useColumns } from "./useColumns";
const Task3: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [freeCars, setFreeCars] = useState([]);
  const columns = useColumns();

  const handleClick = async () => {
    const data = await api.getFreeCars(date);
    setFreeCars(data);
  };

  return (
    <>
      <DatePicker
        onChange={(newValue) => {
          setDate(newValue);
        }}
        value={date}
        label="Date"
      />
      <Grid sx={{ mt: 2 }}>
        <Button variant={"contained"} onClick={handleClick}>
          Get free cars info
        </Button>
      </Grid>
      <Card sx={{ mt: 6 }}>
        <DataGrid columns={columns} rows={freeCars} />
      </Card>
    </>
  );
};

export default Task3;
