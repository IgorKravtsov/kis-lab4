import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
} from "@mui/material";
const Task3: React.FC = () => {
  return (
    <>
      <Button variant={"contained"}>Get info</Button>

      <Card elevation={5} sx={{ mt: 10 }}>
        <Accordion>
          <AccordionSummary>Customer info</AccordionSummary>
          <AccordionDetails>Some info waiting for API</AccordionDetails>
        </Accordion>
      </Card>
    </>
  );
};

export default Task3;
