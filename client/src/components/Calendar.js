import React, { Component } from "react";
import DateRange from "./DateRange.js"
import "react-datepicker/dist/react-datepicker.css";

class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: null
    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  render() {
    return (
     <DateRange 
        handleStartChange={this.handleStartChange}
        handleEndChange={this.handleEndChange}
     />
  )}

  handleChange = startDate => {
    this.setState({
      startDate
    });
  };

  handleStartChange = startDate => {
    this.setState({
      startDate
    });
    this.props.handleStartChange(startDate);
  };
  handleEndChange = endDate => {
    this.setState({
      endDate
    });
    this.props.handleEndChange(endDate);
  };
}

export default Calendar;