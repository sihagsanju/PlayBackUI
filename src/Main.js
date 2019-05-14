import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';

const styles = {
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
};

class Main extends React.Component{
   constructor(props){
     super(props)
   }
   render(){
    const { classes } = this.props;
     return(
      <AppBar position="static" color="default">
      <Toolbar>
      <Avatar className={classes.purpleAvatar}>OP</Avatar>
        <Typography variant="h6" color="inherit">
          Question Authoring Tool
        </Typography>
      </Toolbar>
    </AppBar>
     )
   }
 }
 export default withStyles(styles)(Main);