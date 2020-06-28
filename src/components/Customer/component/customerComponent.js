import React, { Component } from 'react'

export default class CustomerComponent extends Component {
    render() {
        let back;
        if((this.props.index) %2 !== 0){
            back = "#f1f1f1"
        }
        else
        {
            back = "ffffff"
        }
        return (
           <tr style={{background:back}}>
               <th style={{padding:'10px'}}>{this.props.index+1}</th>
               <td style={{padding:'10px'}}>{this.props.name}</td>
               <td style={{padding:'10px'}}>{this.props.email}</td>
           </tr>
        )
    }
}
