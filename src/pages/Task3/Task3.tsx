import React, {useState} from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
} from "@mui/material";
import { DatePicker } from "components/DatePicker/DatePicker";
import { api } from "api/api";
const Task3: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null)

  const handleClick = async () => {
    const data = await api.getFreeCars(date)
    console.log(data)
  }

  return (
    <>
      {/* <Button variant={"contained"}>Get info</Button>

      <Card elevation={5} sx={{ mt: 10 }}>
        <Accordion>
          <AccordionSummary>Customer info</AccordionSummary>
          <AccordionDetails>Some info waiting for API</AccordionDetails>
        </Accordion>
      </Card> */}
      <DatePicker  onChange={(newValue) => {
            setDate(newValue);
          }}  
          value={date}
          label='Date'
        />
        <Button onClick={handleClick}>Get free cars info</Button>
    </>
  );
};

export default Task3;
