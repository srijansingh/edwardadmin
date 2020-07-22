import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import "./ViewGallery.css";

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
  

class ViewGallery extends Component {
    constructor(){
        super();
        this.state = {
            isLoading : false,
            category:[]
        }
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        });

        fetch('https://api.edgiav.com/api/gallery', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer '+this.props.token
            }
        })
        .then(res => {
            if(res.status !==200){
                throw new Error('Failed to fetch the product')
            }
            return res.json()
        }).then(response => {
            console.log(response.data)
            this.setState({
                category:response.data,
                isLoading:false
            }) 
        })
        .catch(err => {
            this.setState({
              isLoading:false
            })
        })
                
    }

    handleDelete = (id) => {
        fetch('https://api.edgiav.com/api/gallery/'+id, {
              method: "DELETE",
              headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  Authorization: 'Bearer '+this.props.token
              }
          })
        .then(response => {
          this.setState({
            blogpost:false
          })
          alert("Deleted Successfully");
          window.location.reload(false);
        })
        .catch(err => {
         
          alert("Something went wrong")
        })
      }
  

    render() {
        const category = this.state.category.map((list, index) => {
            return (
                <div key={index} onDoubleClick={() =>{if(window.confirm('Delete the item?')) {this.handleDelete(list._id)};}} className="gallery-card">
                    <div className="gallery-image">
                        <img src={list.imagelink} alt={list.title+" edgav"}/>
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div>
                    <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
                    
                        <Typography style={{color:'white'}}>
                            View Gallery
                        </Typography>

                    </div>

                    <div style={{padding:'1rem'}}>
                       <div className="gallery-container">
                       {
                          this.state.isLoading ? 'Loading please wait...' : category
                        }
                       </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default  withStyles(styles, {withThemes: true})(ViewGallery)