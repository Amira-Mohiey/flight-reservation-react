import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  userService
} from "../services/flightService";
export default class Users extends React.Component {
 state ={
users:null
 }
  componentDidMount() {
    userService().then(data => {
      this.setState({ users: data }, () => {
   

      })
    })
  }
  render() {
   
    return (
      <Paper >
        {this.state.users && <Table >
          <TableHead>
            <TableRow>
              <TableCell>User name</TableCell>
              <TableCell >phone number</TableCell>
              <TableCell >email</TableCell>
              <TableCell >seat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map(user => {
              return (
                <TableRow key={user._id}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>

                  <TableCell >{user.number}</TableCell>
                  <TableCell >{user.email}</TableCell>
                  <TableCell >{user.seat.name}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>}
      </Paper>
    );
  }
}
