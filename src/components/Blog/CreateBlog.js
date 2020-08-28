import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUploadRounded";
import { Editor } from '@tinymce/tinymce-react';

import "./CreateBlog.css";

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
  

class CreateBlog extends Component {
    state = {
            thumblink:null,
            imagelink: null,
            category:null,  
            title:null,
            content:null,
            isLoading:false,
            selected:false
        }
        handleEditorChange = (content, editor) => {
            this.setState({
                content : content
            })
          }

    handleContent =() =>{
        this.setState({isLoading : true})
        fetch('https://apis.edgiav.com/api/blog', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state)
            }).then(result => {
                result.json().then(response => {
                    console.log(response)
                    this.setState({
                        isLoading: false
                    })
                    alert('Post Added Successfully')
                    window.location.reload(false);
                    
                })
            }).catch(err => {
                alert("Something went wrong")
                this.setState({
                    isLoading: false,
                });
            });  
         }

    render() {
        return (
            <div>
                <div>
                    <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
                    
                        <Typography style={{color:'white'}}>
                            Create Blog
                        </Typography>

                    </div>

                    <div>
                        <div className="blog-container">
                            <div className="blog-table-container">
                                <table>
                                    <tr>
                                        <td style={{width:'150px'}}>Enter Title</td>
                                        <td><input type="text" onChange={(event)=>{this.setState({title:event.target.value})}}/></td>
                                    </tr>

                                    <tr>
                                        <td style={{width:'150px'}}>Enter Category</td>
                                        <td><input type="text" onChange={(event)=>{this.setState({category:event.target.value})}}/></td>
                                    </tr>

                                    <tr>
                                        <td style={{width:'150px'}}>Thumbnail Link</td>
                                        <td><input type="link" onChange={(event)=>{this.setState({imagelink:event.target.value})}}/></td>
                                    </tr>
                                    
                                    <tr>
                                        <td style={{width:'150px'}}>Content</td>
                                        <td>
                                        <Editor
                                            initialValue="<p>This is content area.</p>"
                                            apiKey="1hqpmn9thspuot5ho3g7bruc34rlizbcc5fl3rmb5bcgm8x4"
                                            init={{
                                            height: 500,
                                            menubar:true,
                                            plugins: [
                                                'advlist autolink lists link emoticons  image  charmap print preview anchor hr',
                                                'searchreplace visualblocks code  fullscreen fullpage',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar:
                                                'preview |fullscreen fullpage| undo redo |formatselect |  fontselect |  fontsizeselect| link image media|sizeselect | bold italic |emoticons backcolor forecolor|hr  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | visualblocks | help'
                                            }}
                                            onEditorChange={this.handleEditorChange}
                                        />
                                        </td>
                                    </tr>
                              
                                    <tr>
                                        <td></td>
                                        <td >
                                            {
                                                this.state.isLoading ?
                                                <Button style={{background:'white', color:'blue'}} startIcon={<CircularProgress/>} color="primary" >Uploading...</Button>
                                                :
                                                <Button style={{background:'blue', color:'white'}} startIcon={<CloudUploadIcon />} color="primary" onClick={this.handleContent}>Upload Now</Button>
                                            }
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default  withStyles(styles, {withThemes: true})(CreateBlog)