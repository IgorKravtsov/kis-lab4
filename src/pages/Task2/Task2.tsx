import React from "react";
import useSWR from "swr";

import { Button, Grid } from "@mui/material";
import { Task1Rows } from "interfaces/Task1Rows";
import { api } from "api/api";

const Task2: React.FC = () => {
  const { data, isLoading } = useSWR<Task1Rows[]>("/order/all");

  const handleClick = async (id: number) => {
    api.cancelReservation(id)
  }

  return (
    <>
    {data?.map(r => (
    <Grid container>
      <h1>{r.orderid}</h1>
      <Button onClick={() => handleClick(r.orderid)} variant={"contained"}>Cancel reservation</Button>
    </Grid>))}
    </>
  );
};

export default Task2;
