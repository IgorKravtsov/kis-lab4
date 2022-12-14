import React from "react";
import useSWR from "swr";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { Task1Rows } from "interfaces/Task1Rows";

import { useGrid } from "./useGrid";
import { Loader } from "../../components/Loader/Loader";
import { $api } from "../../api/config";

const mocked_rows: Task1Rows[] = [
  {
    // id: 1,
    cutomerId: 1,
    actualDaysInRent: 32,
    expectedEndPeriod: new Date().toDateString(),
    reservationDate: new Date().toDateString(),
    status: "Not returned",
    finalPrice: 2000,
  },
];

const Task1: React.FC = () => {
  const columns = useGrid();
  const { data, isLoading } = useSWR<Task1Rows[]>("/order/all");

  // if (isLoading) {
  //   return <Loader />;
  // }
  console.log("===data===", data);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data?.map((row) => ({ id: row.cutomerId, ...row })) ?? []}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default Task1;
