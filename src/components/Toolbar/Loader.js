import React, {Component} from "react";
import Paper from '@material-ui/core/Paper';
import {withStyles } from "@material-ui/core/styles";

import "./loader.css";


const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },
      }
  });
  

class Loader extends Component {
    render(){
        const {classes} =this.props;
        return (
            <div>
                <Paper elevation={3}>
                <div className="product-image">
                  
                </div>
                <div className="product-box">
                  <div className="product-details">
                      <span className="title"></span>
                      <span className="price" ></span>
                      <span className="price" ></span>
                    
                  </div>
                  <div className="action-box">
                        <div className="buttons"></div>
                        <div className="buttons"></div>
                  </div>
                </div>
            </Paper>
           
            </div>
        )
        }
    }
    

export default withStyles(styles, {withThemes: true})(Loader);