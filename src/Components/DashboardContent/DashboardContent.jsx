import React, { Component } from 'react';
import './DashboardContent.scss'
import {connect} from 'react-redux'
import SalaryChart from '../../SalaryChart';

class DashboardContent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="dashboard-content-div">
                
                <div className="dashboard-cards">
                    <div className="total-users">
                        <div className="progress blue"> <span className="progress-left"> <span className="progress-bar"></span> </span> <span className="progress-right"> <span className="progress-bar"></span> </span>
                            <div className="progress-value">{this.props.users.length}</div>
                        </div>
                        <p>Total Users</p>
                    </div>

                    <div className="total-salary">
                        <div className="progress blue"> <span className="progress-left"> <span className="progress-bar"></span> </span> <span className="progress-right"> <span className="progress-bar"></span> </span>
                            <div className="progress-value">
                                {this.props.users.length > 0 ? "$"+this.props.users.reduce(function(acc, user) { return acc + parseInt(user.salary)},0) : 0}
                                
                            </div>
                        </div>
                        <p>Total Salary</p>
                    </div>
                </div>

                <div className="column-chart">
                    <SalaryChart></SalaryChart>
                </div>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return{
        users: state.users
    }
}

export default connect(mapStateToProps)(DashboardContent);