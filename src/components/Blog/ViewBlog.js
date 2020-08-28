import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';


const styles = theme => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    }
  });
  

class ViewBlog extends Component {
    constructor(){
        super();
        this.state = {
            blog:[],
            blogpost:true,
            isLoading:false
        }
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        });

        fetch('https://apis.edgiav.com/api/blog', {
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
                blog:response.data,
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
      fetch('https://apis.edgiav.com/api/blog/'+id, {
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
        alert("Post Deleted Successfully")
        window.location.reload(false);
      })
      .catch(err => {
       
        alert("Something went wrong")
      })
    }


    render() {
        const {classes} = this.props;

        const blog = this.state.blog.map((list, index)=>{
            return (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  {
                    this.state.blogpost 
                     ?
                  
                  <Card className={classes.card}>
                  <CardHeader
                      title={list.title+"..."}
                      subheader={list.category}
                    />
                    <CardMedia
                      className={classes.cardMedia}
                      image={list.imagelink}
                      title={list.title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                      {list.title}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button href={"/blog/" + list._id} size="small" variant="contained" color="primary">
                        View
                      </Button>
                     
                      <Button  size="small" color="secondary" variant="contained" onClick={() =>{if(window.confirm('Delete the item?')) {this.handleDelete(list._id)};}}>
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                  :
                  null
                  }
                </Grid>
            )
        })

        return (
            <div>
                <div>
                    <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
                    
                        <Typography style={{color:'white'}}>
                            View Blog
                        </Typography>

                    </div>

                    <div>
                    <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {
                          this.state.isLoading ? 'Loading please wait...' : blog
                        }
                        
                   
                    </Grid>
                </Container>
                    </div>
                </div>
            </div>
        )
    }
}


export default  withStyles(styles, {withThemes: true})(ViewBlog);