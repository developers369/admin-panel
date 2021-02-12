import React, { Component } from 'react';
import {connect} from 'react-redux'
// import ReactApexChart from 'react-apexcharts'

class ColumnChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
            series: [{
              data: this.props.users.map(user => user.salary)
            }],

            options: {
              chart: {
                height: 350,
                type: 'bar',
                events: {
                    click: function(chart, w, e) {
                        console.log(chart, w, e)
                    }
                }
            },

            colors: ["white"],

            plotOptions: {
                bar: {
                    borderRadius: 6,
                    columnWidth: '45%',
                    distributed: true,
                }
            },

            dataLabels: {
                enabled: false
            },

            legend: {
                show: false
            },
              
            xaxis: {
                categories: this.props.users.map(user => user.fullName),

                labels: {
                    style: {
                        colors: ["white"],
                        fontSize: '12px'
                    }
                }
            }
        }
          
          
        };
    }
    render() { 
        return (  
           <div className="show-chart">
                {/* <ReactApexChart options={this.state.options} series={this.state.series}/> */}
           </div> 
        );
    }
}

const mapStateToprops = state => {
    return{
        users: state.users
    }
}
export default connect(mapStateToprops)(ColumnChart);