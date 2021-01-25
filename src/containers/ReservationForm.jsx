import React from "react";
import Seat from "../components/Seat";
import Users from "../components/users";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  reserveService,
  seatService
} from "../services/flightService";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from '@material-ui/icons/List';
import Back from '@material-ui/icons/ArrowBack';
class ReservationForm extends React.Component {
  state = {
    seats: null,
    rows: [],
    open: false,
    selectedSeat: { name: "" },
    name: null,
    email: null,
    number: null,
    form: true,
    msg: null,
    snackOpen:false,
    saving:false

  };


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };


  
getSeats=()=>{
  seatService().then(data => {
    this.setState({ seats: data.seats }, () => {
      var rows = [];
      var seatsPerRow = 6;
      var rowsNumber = this.state.seats.length / seatsPerRow;

      for (let i = 0; i < rowsNumber; i++) {
        let row = this.state.seats.slice(
          i * seatsPerRow,
          i * seatsPerRow + seatsPerRow
        );
        rows.push({ row });
      }
      this.setState({ rows });

    });
  });
}

  componentDidMount() {
   this.getSeats()
  }
  handleSwitch = () => {
    this.setState({ form: !this.state.form });
  };
  componentWillReceiveProps(nextProps) {
    console.log("helo")
    this.setState({ seats: nextProps.seats });
  }
   TransitionUp=(props)=> {
    return <Slide {...props} direction="up" />;
  }
  renderSnackBar=()=>{
    return (     <Snackbar
      open={this.state.snackOpen}
      onClose={this.handleSnackClose}
      TransitionComponent={this.state.Transition}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{this.state.msg}</span>}
    />)
  }
  reserve = () => {
    this.setState({saving:true})
    var user = {
      "name": this.state.name,
      "email": this.state.email,
      "number": this.state.number
    };
    reserveService(this.state.selectedSeat, user)
      .then(response => {
        console.log(response);
        if(response.ok){
          this.getSeats()
          this.setState({ msg:"seat reserved successfully , the ticket id is "+response.ticketId ,snackOpen:true,open:false});
        }
        if(response.error){
          this.setState({ msg:response.error ,snackOpen:true,saving:false });
        }
        
      })
      .catch(() => {
        console.log("error");
        this.setState({ msg: "something went wrong" });
      });
  };
  selectSeat = selectedSeat => {
    this.setState({ open: true, selectedSeat });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };

  renderDialog = () => {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please fill the following info to complete seat " +
            this.state.selectedSeat.name +
            " reservation"}
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              id="name"
              label="Name"
              value={this.state.name}
              onChange={this.handleChange("name")}
              margin="normal"
            />
            <br />
            <TextField
              id="number"
              label="Number"
              value={this.state.age}
              onChange={this.handleChange("number")}
              type="number"
              margin="normal"
            />
            <br />
            <TextField
              id="email"
              label="E-mail"
              value={this.state.age}
              onChange={this.handleChange("email")}
              type="email"
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            cancel
          </Button>
          <Button
            onClick={this.reserve}
            color="primary"
            autoFocus
            disabled={
              !(this.state.name && this.state.email && this.state.number)
            }
          >
           {this.state.saving&&<CircularProgress size={20}  /> } 
           save
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  renderSeats = () => {
    return (
      <ol className="cabin fuselage">
        {this.state.rows.map((row, index) => {
          return (
            <li key={index} className="row row">
              <ol className="seats" type="A">
                {row.row.map((seat, i) => {
                  return (
                    <Seat
                      key={i}
                      seat={seat}
                      selectSeat={this.selectSeat}
                      form={this.state.form}
                    />
                  );
                })}
              </ol>
            </li>
          );
        })}
      </ol>
    );
  };
  renderAppBar = () => {
    var title = this.state.form ? "Reservation List" : "back";
    return (
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={this.handleSwitch}>
         { this.state.form ? <List/> : <Back/>  }    
            {title}
          </Button>
        </Toolbar>
      </AppBar>
    );
  };
  renderReservatioForm = () => {
    return (
      <div>
      { this.state.seats&& <div className={"container"}>
          <h1 style={{ textAlign: "center" }}>Please select a seat</h1>
          <div className="exit exit--front fuselage" />
          {this.renderSeats()}
          <div className="exit exit--back fuselage" />
          {this.renderDialog()}
        </div>}
      </div>
    );
  };
  renderList = () => {
    return (
      <div className={"container"}>
        <h1 style={{ textAlign: "center" }}>Reserved Seat</h1>
        <div className="exit exit--front fuselage" />
        {this.renderSeats()}
        <div className="exit exit--back fuselage" />
        <h1 style={{ textAlign: "center" }}>Reservations Details</h1>
        <Users />
      </div>
    );
  };
  render() {
    return (
      <div>
        {  this.renderAppBar()}
        {this.state.form &&   this.renderReservatioForm()}
        {this.renderSnackBar()}
        {!this.state.form &&  this.renderList()}
       
      </div>
    );
  }
}
export default ReservationForm;
