import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUploadRounded";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import firebase from "../../config/firebase";
import "./CreateGallery.css"

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
  

class CreateGallery extends Component {
    constructor(){
        super();
        this.state = {
            thumblink:null,
            imagelink: null,
            category:null,  
            title:null,
            isLoading:false,
            selected:false
        }
    }

    fileChangeHandler = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            thumblink: URL.createObjectURL(event.target.files[0]),
            selected : true
        })
    }


    firebaseupload=async()=>{
        this.setState({isLoading : true})
        const response = await fetch(this.state.thumblink)
        const blob = await response.blob()
        var ref = firebase.storage().ref().child('thumbnail/' + this.state.thumblink)
        return ref.put(blob)
        .then(()=>{
            ref.getDownloadURL().then((url)=>{
                console.log(url)
                this.setState({
                    imagelink : url
                })
                fetch('https://apis.edgiav.com/api/gallery', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.state)
                }).then(result => {
                    result.json().then(response => {
                        
                        this.setState({
                            isLoading: false
                        })
                        alert('Post Added Successfully')
                        window.location.reload(false);
                       
                    })
                }).catch(err => {
                    alert("Something went wrong")
                    this.setState({
                        loading: false,
                        error: err
                    });
                });  
            })
        })
    }


    render() {
        return (
            <div>
                <div>
                    <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
                    
                        <Typography style={{color:'white'}}>
                            Create Gallery
                        </Typography>

                    </div>

                    <div className="container">
                        <div className="table-container">
                            <table>
                                  <tr>
                                      <td>Enter Title</td>
                                      <td><input type="text" onChange={(event)=>{this.setState({title:event.target.value})}}/></td>
                                  </tr>

                                  <tr>
                                      <td>Enter Category</td>
                                      <td><input type="text" onChange={(event)=>{this.setState({category:event.target.value})}}/></td>
                                  </tr>

                                  
                                  <tr>
                                      <td></td>
                                      <td >
                                          {
                                              this.state.isLoading ?
                                              <Button style={{background:'white', color:'blue'}} startIcon={<CircularProgress/>} color="primary" >Uploading...</Button>
                                              :
                                              <Button style={{background:'blue', color:'white'}} startIcon={<CloudUploadIcon />} color="primary" onClick={this.firebaseupload}>Upload Now</Button>
                                          }
                                      </td>
                                  </tr>
                            </table>
                        </div>
                        <div className="image-box">
                            <div className="box">
                            <input type="file" style={{display:'none'}} onChange={this.fileChangeHandler} ref={chooseFile => this.chooseFile = chooseFile} accept="image/*"/>
                                {
                                    this.state.selected ?
                                    <img src={this.state.thumblink} style={{maxHeight:'400px',maxWidth:'500px', borderRadius:'10px', margin:'1rem 0'}} />
                                    :
                                   
                                    <Button variant="outlined" color="primary" style={{height:'200px', border:'2px dotted blue'}} startIcon={<PhotoLibraryIcon/>} size="large" onClick={() => this.chooseFile.click()}>
                                         <span>Choose Image</span>
                                    </Button>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default  withStyles(styles, {withThemes: true})(CreateGallery)

{/* <input type="file" style={{display:'none'}} onChange={this.fileChangeHandler} ref={chooseFile => this.chooseFile = chooseFile} accept="image/*"/>

{
    this.state.thumbSelected ?
    <img src={this.state.thumblink} style={{maxHeight:'400px', width:'100%', border:'1px solid #ccc', borderRadius:'10px', margin:'1rem 0'}} />
    :
<Button variant="outlined" color="primary" style={{height:'100px'}} size="large" onClick={() => this.chooseFile.click()} startIcon={<CloudUploadIcon />}>
    Upload Thumbnail Image
</Button>
 } */}