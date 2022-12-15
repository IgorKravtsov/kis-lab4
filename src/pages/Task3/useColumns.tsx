import { GridColDef } from "@mui/x-data-grid";

export const useColumns = (): GridColDef[] => {
  return [
    {
      field: "carid",
      headerName: "Car ID",
    },
    {
      field: "mark",
      headerName: "MARK",
    },
  ];
};
