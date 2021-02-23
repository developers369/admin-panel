import React, { Component } from 'react';
import './DashboardContent.scss'
import {connect} from 'react-redux'
import SalaryChart from '../../SalaryChart';
import ImageCarousel from '../../ReusableComponent/ImageCarousel/ImageCarousel';
import ReactTooltip from 'react-tooltip';
import InputTag from '../../ReusableComponent/InputTag';
import LineChartP from '../../LineChartP';
import PieRechart from '../../PieRechart';
import GoogleMap from '../../GoogleMap';
import { fetchUsers } from '../../Redux/adminAction';



class DashboardContent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            allUser: 0,
            activeUser: 0,
            inactiveUser: 0
        }
    }


    componentDidMount(){
        // console.log("mount");
        // console.log("data", this.props.users);
        var allUser = this.props.users.length
        var activeUser=0, inactiveUser=0
        this.props.users.forEach(user => {
            if(user.status)
                activeUser++
            else
                inactiveUser++
        })

        // console.log(activeUser);
        // console.log(inactiveUser);

        this.setState({
            allUser,
            activeUser,
            inactiveUser
        })
    }

    showFilter = () => {
        document.getElementById("filter-modal").style.display="block";
    }

    closeFilter = () => {
        document.getElementById("filter-modal").style.display="none";
    }

    handleFilter = (text) => {
        document.getElementById("filter-modal").style.display="none";
        document.getElementById("filter-div").style.display="block";

        // get today date
        var today = new Date(),
        date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

        var allUser=0, activeUser=0, inactiveUser=0

        if(text === "today"){
            
            // console.log("today");
            this.props.users.forEach(user => {
                // console.log(user.createdDate, date);
                if(user.createdDate === date){
                    // console.log("und");
                    allUser++
                    if(user.status)
                        activeUser++
                    else
                        inactiveUser++

                }
            });
        }

        else if(text === "yesterday"){

            // console.log("Yesterday");
            this.props.users.forEach(user => {

                // console.log(typeof(user.createdDate));
                // get the created day
                var todayDate = date.split("/")

                var day = todayDate[todayDate.length-1]

                var userDate  = user.createdDate.split("/")

                var userDay = userDate[userDate.length-1]

                // console.log(day);
                // console.log(parseInt(userDay) + 1);
                if(day === (parseInt(userDay) + 1).toString()){
                    // console.log("under");
                    allUser++
                    if(user.status)
                        activeUser++
                    else
                        inactiveUser++

                }
            });
        }

        else if(text === "last7"){
            // console.log("last7");
            this.props.users.forEach(user => {

                console.log(typeof(user.createdDate));
                // get the created day
                var todayDate = date.split("/")

                var day = todayDate[todayDate.length-1]

                var userDate  = user.createdDate.split("/")

                var userDay = userDate[userDate.length-1]

                // console.log(day);
                // console.log(parseInt(userDay) + 1);
                if(day === (parseInt(userDay) + 7).toString()){
                    // console.log("under");
                    allUser++
                    if(user.status)
                        activeUser++
                    else
                        inactiveUser++

                }
            });
        }

        this.setState({
            allUser,
            activeUser,
            inactiveUser
        })

    }

    removeFilter = () => {

        document.getElementById("filter-div").style.display="none";
        document.getElementById("today").checked = false
        document.getElementById("yesterday").checked = false
        document.getElementById("last7").checked = false

        var allUser = this.props.users.length
        var activeUser=0, inactiveUser=0
        this.props.users.forEach(user => {
            if(user.status)
                activeUser++
            else
                inactiveUser++
        })

        // console.log(activeUser);
        // console.log(inactiveUser);

        this.setState({
            allUser,
            activeUser,
            inactiveUser
        })
    }

    render() { 
        return ( 
            <div className="dashboard-content-div">
                
                <div className="user-statistics">
                    <div className="user-statistics-header">
                        <i className="fa fa-bar-chart" aria-hidden="true"></i>
                        <p>User Statistics</p>


                        <i className="fa fa-calendar calender" aria-hidden="true" data-tip data-for="calender" onClick={this.showFilter}></i>
                        
                        <div id="filter-div" onClick={this.removeFilter}>
                            <i className="fa fa-filter" aria-hidden="true" data-tip data-for="filter"></i>
                            <i className="fa fa-times filter-close" aria-hidden="true"></i>
                        </div>

                        <ReactTooltip id="calender" place="bottom" effect="solid">
                            Edit
                        </ReactTooltip>

                        <ReactTooltip id="filter" place="top" effect="solid">
                            Remove Filter
                        </ReactTooltip>
                    </div>

                    <div className="card-container">
                        <div className="padding">
                            <div className="card">

                                <div className="card-body">
                                    <h5 className="card-title">All Users</h5>

                                    <div className="pulsating-circle">
                                        <div className="card-icon-all">
                                            <i className="fa fa-users card-icon" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <p className="card-value">{this.state.allUser}</p>
                                </div>

                            </div>
                        </div>

                        <div className="padding">
                            <div className="card">

                                <div className="card-body">
                                    <h5 className="card-title">Active Users</h5>
                                    
                                    <div className="pulsating-circle">
                                        <div className="card-icon-active">
                                            <i className="fa fa-check card-icon" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <p className="card-value">{this.state.activeUser}</p>
                                </div>

                            </div>
                        </div>

                        <div className="padding">
                            <div className="card">

                                <div className="card-body">
                                    <h5 className="card-title">Inactive Users</h5>
                                    
                                    <div className="pulsating-circle">
                                        <div className="card-icon-inactive">
                                            <i className="fa fa-eye-slash card-icon" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <p className="card-value">{this.state.inactiveUser}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="user-statistics second-header">
                    <div className="user-statistics-header">
                        <i className="fa fa-bar-chart" aria-hidden="true"></i>
                        <p>Charts</p>

                        <ReactTooltip id="filter" place="top" effect="solid">
                            Remove Filter
                        </ReactTooltip>
                    </div>

                    <div className="linechart-margin">

                    
                        <div className="linechart-div">
                            <p>Review Of User statistics based on date</p>
                            {this.props.users.length > 0 ? <LineChartP users={this.props.users} /> : <p>No User Found</p>}
                        </div>
                    
                        <div className="piechart-div">
                            <p>Active/InActive users</p>
                            { this.props.users.length > 0 ? <PieRechart users={this.props.users} /> : <p>No User Found</p>}
                        </div>
                    
                    </div>

                    <div className="map-div">
                        <div className="google-map-container">
                            <GoogleMap  />
                        </div>

                        <div className="salary-chart">
                            <p>Review Of User statistics based on Salary</p>
                            { this.props.users.length > 0 ? <SalaryChart users={this.props.users}/> : <p>No User Found</p>}
                        </div>
                    </div>
                </div>
                
                <div id="filter-modal" className="card filter-card">

                    <div className="card-body">

                        <div className="filter-header">
                            <h5 className="card-title">FILTERS</h5>

                            <span className="close" onClick={this.closeFilter}>&times;</span>
                        </div>
                        <div className="filter-card-content">

                            <p>Filter Types</p>

                            <div className="radio-div">
                                
                                <InputTag
                                    id="today"
                                    inputClass="radio"
                                    type="radio"
                                    name="filter"
                                    onClick={() => this.handleFilter("today")}
                                />
                                <label>Today</label>
                            </div>

                            <div className="radio-div">
                                <InputTag
                                    id="yesterday"
                                    inputClass="radio"
                                    type="radio"
                                    name="filter"
                                    onClick={() => this.handleFilter("yesterday")}
                                />
                                <label>Yesterday</label>
                            </div>

                            <div className="radio-div">
                                <InputTag
                                    id="last7"
                                    inputClass="radio"
                                    type="radio"
                                    name="filter"
                                    onClick={() => this.handleFilter("last7")}
                                />
                                <label>Last 7 days</label>
                            </div>
                            

                        </div>
                    </div>

                </div>



                {/* <div className="dashboard-cards">
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

                <div className="image-carousel">
                   <ImageCarousel users={this.props.users}/>
                </div> */}
            </div>
         );
    }
}

const mapStateToProps = state => {
    console.log("get");
    return{
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return{
        // fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContent);