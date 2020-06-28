import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import CustomerComponent from "./component/customerComponent";


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
  

class  Customer extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
            customer:[]
           
        }
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        })


        fetch('https://server.mysastaprice.com/api/customer', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer '+ this.props.token
            }
        })
        .then(res => {
            if(res.status !== 200){
                throw new Error('Failed to fetch category')
            }
            return res.json();
        })
        .then(response => {
                console.log(response)
                this.setState({
                    customer : response.post,
                    isLoading:false
                })
        })
        .catch(err => {
            console.log(err);
            this.setState({
                isLoading:false
            })
            alert(err)
        })

    }



       
    render(){

        // const {classes} = this.props;
        
        const customers = this.state.customer.map((list, index) => {
            return <CustomerComponent key={index} index={index} name={list.name} email={list.email} />
        })

        return (
            <div>
            <div style={{background:'rgb(50, 70, 246)', padding:'0.8rem'}}>
               
                <Typography style={{color:'white'}}>
                  Customer
               </Typography>

              
               
                
            </div>
            <div style={{
                height:'80vh',
                overflowY:'scroll',
                overflowX:'hidden',
                display:'flex',
                flexDirection:'row',
                flexWrap:'wrap',
                padding:'0.5rem'
                }}>
                <div style={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                   <table style={{ width:'700px'}}>
                       <tr style={{ background:'#e6e6e6'}}>
                       <th style={{padding:'10px'}}>S No.</th>
                           <th style={{padding:'10px'}}>Name</th>
                           <th style={{padding:'10px'}}>Email</th>
                       </tr>
                       {customers}
                   </table>
                </div>

                
            </div>
            </div>
        ) 
    }
        
   
}

export default withStyles(styles, {withThemes: true})(Customer);