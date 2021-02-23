import userEvent from '@testing-library/user-event';
import React, { Component } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

let chartData = []

class LineChartP extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: ""
        }
    }

    componentDidMount(){
        //console.log(this.props);
        let length = this.props.users.length
        //console.log(length);
        const { users } = this.props
        var matchArray = new Array(length).fill(0)

       for(var i=0; i<length; i++){
            
            let allUser = 0, activeUser = 0, inactiveUser = 0

            let chartDate = users[i].createdDate
            if(matchArray[i] === 0){
                
                for(var j=0; j<this.props.users.length; j++){
                    
                    if(chartDate === this.props.users[j].createdDate){

                        matchArray[j] = 1
                        // console.log(matchArray);
                        allUser++
                        if(this.props.users[j].status)
                            activeUser++
                        else
                            inactiveUser++
                    }

                    // console.log("in",j);

                }

                // console.log("for",i);
                chartData.push({
                    Date: chartDate,
                    Total: allUser,
                    Active: activeUser,
                    InActive: inactiveUser
                })
            }
        };

        // console.log(chartData);
        this.setState({
            data: chartData
        })

        chartData = []
    }


    render() { 
        return ( 
            
            <LineChart width={400} height={230} data={this.state.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Total" stroke="blue"/>
                <Line type="monotone" dataKey="Active" stroke="green" />
                <Line type="monotone" dataKey="InActive" stroke="red" />
            </LineChart>
            
        );
    }
}
 
export default LineChartP;