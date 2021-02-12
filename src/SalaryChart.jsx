import React, { Component } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import {connect} from 'react-redux'

let userNames, salaryArray

class SalaryChart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:[]
         }
    }

    componentDidMount(){

        if(this.props.users.length > 0){
            let data = []
            userNames = this.props.users.map(user => user.fullName)
            salaryArray = this.props.users.map(user => user.salary)

            for(var i=0; i<userNames.length; i++){
                data.push({
                    userName : userNames[i],
                    salary: salaryArray[i]
                })
            }
            console.log(data)
            this.setState({data: data})
        }
    }

    render() { 
        console.log(userNames);
        return ( 
             
            <BarChart width={600} height={300} data={this.state.data} >
                <CartesianGrid />
                <XAxis dataKey={"userName"}/>
                <YAxis />
                <Tooltip/>
                <Bar dataKey={"salary"} fill="rgb(219, 157, 113)"/>

            </BarChart>
            
         );
    }
}

const mapStateToProps = state =>{
    return{
        users: state.users
    }
}

export default connect(mapStateToProps)(SalaryChart);