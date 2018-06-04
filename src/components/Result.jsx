import React from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default class Result extends React.Component {
  
  

  render() {
    return (
      
            <div >
              <Paper elevation={4} className="result">
                <Typography variant="headline" component="h3">
                {this.props.msg}
                </Typography>
              </Paper>
            </div>
    );
  }
}
