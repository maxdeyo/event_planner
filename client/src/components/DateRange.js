import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Grid, Header } from 'semantic-ui-react'

import "react-datepicker/dist/react-datepicker.css";

function DateRange() {
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  return (
    <>
     <Grid columns='equal'>
         <Grid.Column>
      <Header as='h3'>Start Date</Header>
     <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        showTimeSelect
        selectsStart
        startDate={startDate}
        maxDate={endDate}
        endDate={endDate}
        dateFormat="Pp"
      />
      </Grid.Column>
      <Grid.Column>
        <Header as='h3'>End Date</Header>
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        showTimeSelect
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="Pp"
      />
      </Grid.Column>
         </Grid>
    </>
  );
}

export default DateRange;