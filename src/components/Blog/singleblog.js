import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import CardMedia from '@material-ui/core/CardMedia';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const  styles = theme => ({
  root: {
    maxWidth:'800px',
    width:'90%'
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },

  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class SingleBlog extends Component{
    constructor(props){
        super(props);
        this.state={
            
            title:null,
            content:null,
            imagelink:null,
            category:null,
            loading:false

        }
    }

    componentDidMount(){
        fetch('https://apis.edgiav.com/api/blog/'+this.props.match.params._id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(result => {
            result.json().then(response => {
                console.log(response.data.imagelink)
                this.setState({
                    imagelink:response.data.imagelink,
                    category:response.data.category,
                    title:response.data.title,
                    content:response.data.content,
                    loading: false
                })
               
                
            })
        }).catch(err => {
           alert("Something went wrong")
            this.setState({
                loading: false,
                error: err
            });
        })
    }

    render(){

        const {classes} = this.props;

        return (
          <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <Card className={classes.root}>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.state.title}
                    </Typography>
                </CardContent>
              <CardContent>
                <Typography>
                   {ReactHtmlParser(this.state.content)}
                </Typography>
              </CardContent>
              
            </Card>
            </div>
          );
    }
} 

export default withStyles(styles, { withTheme: true })(SingleBlog);
  