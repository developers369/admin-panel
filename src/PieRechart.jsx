import React, { Component } from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

let chartData = []
class PieRechart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: ""
         }
    }
    COLORS = ["orange", "green"];


    componentWillMount(){

        //let allUser = this.props.users.length
        // console.log(this.props.users);
        let activeUser = 0, inactiveUser = 0

        this.props.users.forEach(user => {
            if(user.status)
                activeUser++
            else    
                inactiveUser++
        })

        chartData.push({
            "Name": "Active",
            "Value": activeUser
        })

        chartData.push({
            "Name": "InActive",
            "Value": inactiveUser
        })

        // console.log(chartData);
        this.setState({data: chartData})

        chartData=[]
    }

    render() { 
        return ( 
            
            <PieChart width={360} height={230}>
                <Pie data={this.state.data} color="#000000" dataKey="Value" nameKey="Name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" >
                    {
                        this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        );
    }
}
 
export default PieRechart;