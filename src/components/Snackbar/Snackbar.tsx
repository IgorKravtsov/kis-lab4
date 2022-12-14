import React, { useState } from "react";

import MUISnackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

export interface SnackbarProps {
  message: string;
  open: boolean;
  severity?: AlertColor;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  severity,
  open,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <MUISnackbar
      TransitionComponent={Slide}
      open={isOpen}
      // autoHideDuration={6000}
      // onClose={handleClose}
    >
      <Alert
        // onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </MUISnackbar>
  );
};
