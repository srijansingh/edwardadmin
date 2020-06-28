import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



const styles = (theme) => ({
  root: {
    flexGrow: 1,
    position:'fixed',
    width:'100%',
    padding:'0rem'
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
});

class Appbar extends Component{
    constructor(){
        super();
        this.state = {
            anchorEl:null
        }
    }

    handleClick = (event) => {
        this.setState({
            anchorEl:event.currentTarget
        });
      };
    
    handleClose = () => {
        this.setState({
            anchorEl:null
        });
      };

    render(){
        const {classes} = this.props
        return (
            <div className={classes.root}>
              <AppBar position="static" style={{padding:'0rem'}}>
                <Toolbar>
                  <Typography button variant="h6" className={classes.title}>
                   Admin Dashboard
                  </Typography>
                  <Button aria-controls="simple-menu" aria-haspopup="true" color="inherit" onClick={this.handleClick}>
                      <IconButton  className={classes.menuButton} color="inherit" aria-label="menu">
                        <AccountCircleIcon />
                      </IconButton>
                      <Typography>

                            My Profile
                        </Typography>
                     
                      
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                    >
                        
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                        <MenuItem onClick={this.props.logout}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
              </AppBar>
            </div>
          );
    }

  
}

export default withStyles(styles, { withTheme: true })(Appbar);