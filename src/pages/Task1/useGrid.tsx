import { GridColDef } from "@mui/x-data-grid";
import { Task1Rows } from "../../interfaces/Task1Rows";

export const useGrid = (): GridColDef<Task1Rows>[] => {
  return [
    { field: "cutomerId", headerName: "CutomerId", width: 90, align: "right" },
    {
      field: "reservationDate",
      headerName: "Reservation Date",
      width: 200,
    },
    {
      field: "expectedEndPeriod",
      headerName: "Expected End Period",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
    },
    {
      field: "actualDaysInRent",
      headerName: "Actual Days In Rent",
      type: "number",
      width: 150,
    },
    {
      field: "finalPrice",
      headerName: "Final Price",
      width: 150,
      align: "right",
      headerAlign: "right",
      type: "number",
      renderCell: ({ row }) => row.finalPrice.toFixed(2),
    },
  ];
};
