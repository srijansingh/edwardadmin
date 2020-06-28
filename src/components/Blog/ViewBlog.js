import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";



const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        }
    }});
  

class ViewBlog extends Component {
    render() {
        return (
            <div>
                <div>
                    <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
                    
                        <Typography style={{color:'white'}}>
                            View Blog
                        </Typography>

                    </div>

                    <div>
                        
                    </div>
                </div>
            </div>
        )
    }
}


export default  withStyles(styles, {withThemes: true})(ViewBlog)