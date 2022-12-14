import React from "react";
import { Backdrop, BackdropProps, CircularProgress } from "@mui/material";

export type LoadingIndicatorProps = { open?: boolean } & BackdropProps;

export const Loader: React.FC<LoadingIndicatorProps> = ({
  open = true,
  ...props
}) => {
  return (
    <Backdrop
      open={open}
      sx={{
        color: (theme) => theme.palette.secondary.main,
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
      {...props}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};
