import { GridColDef } from "@mui/x-data-grid";

export const useColumns = (): GridColDef[] => {
  return [
    {
      field: "carId",
      headerName: "Car ID",
    },
    {
      field: "mark",
      headerName: "MARK",
    },
    {
      field: "model",
      headerName: "MODEL",
    },
    {
      field: "price",
      headerName: "PRICE",
    },
  ];
};
