import React, { Component } from "react";
import DateRange from "./DateRange.js"
import "react-datepicker/dist/react-datepicker.css";

class Calendar extends Component {
  state = {
    startDate: new Date(),
  };

  render() {
    return (
     <DateRange />
  )}

  handleChange = startDate => {
    this.setState({
      startDate
    });
  };
}

export default Calendar;