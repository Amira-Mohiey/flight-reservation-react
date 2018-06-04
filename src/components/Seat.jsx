import React from "react";

export default class Seat extends React.Component {
  state = {
    seat: this.props.seat
  };

  selectSeat = () => {
    if(this.props.form){
    this.props.selectSeat(this.props.seat);}
  };
  render() {
    return (
      <li className="seat" onClick={this.selectSeat}>
        <input type="checkbox" id={this.props.seat.name} disabled={this.props.seat.reserved} />
        <label>{this.props.seat.name}</label>
      </li>
    );
  }
}
