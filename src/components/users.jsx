import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

export default class Users extends React.Component {
  render() {
  var   seats = [
      {
        name: "1C",
        user: { name: "amira", number: "112222", email: "amira@yahoo.com" }
      },
      {
        name: "2B",
        user: { name: "mohamed", number: "156222", email: "mohamed@yahoo.com" }
      }
    ];
    return (
      <Paper >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>User name</TableCell>
              <TableCell >phone number</TableCell>
              <TableCell >email</TableCell>
              <TableCell >seat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {seats.map(seat => {
              return (
                <TableRow key={seat.name}>
                  <TableCell component="th" scope="row">
                    {seat.user.name}
                  </TableCell>
                
                  <TableCell >{seat.user.number}</TableCell>
                  <TableCell >{seat.user.email}</TableCell>
                  <TableCell >{seat.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
