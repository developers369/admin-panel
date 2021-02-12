import React, { Component } from 'react';
import {connect} from 'react-redux'
import './Nav.scss'
import Logo from '../../Image/logo.jpg'
import {NavLink} from 'react-router-dom'

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {  
            moreClass : "more-items"
        }
    }
    

    showOperation = () => {
       // alert('Hello')

        if(this.state.moreClass === "more-items")
            this.setState({moreClass : "more-items showMore"})
        else
            this.setState({moreClass : "more-items"})
    }   

    render() { 
        return ( 
            <div className="nav-content">
               
                {/* <div className="header">
                    
                    <h3 className="profileName">{this.props.admin.name}</h3>
                </div> */}

                <div className="header">
                    <div className="profileImg">
                        <img src={Logo} alt="Profile"></img>
                    </div>
                    <h2>My Admin</h2>
                </div>
               

                <div className="nav-items">
                    <ul>
                        <NavLink to='/dashboard/dashboard-content' activeStyle={{backgroundColor: "white"}} style={{backgroundColor: "white", textDecoration: "none", color: "black"}}>
                            <li className="items">
                                <i className="fa fa-cube icon" aria-hidden="true"></i>
                                <p>Dashboard</p>
                            </li>
                        </NavLink>

                        <NavLink to='/dashboard/dashboard-content/profile' activeStyle={{backgroundColor: "white"}} style={{backgroundColor: "white", textDecoration: "none", color: "black"}} >
                            <li className="items">
                                <i className="fa fa-user icon" aria-hidden="true"></i>
                                <p>Profile</p>
                            </li>
                        </NavLink>

                        <NavLink to='/dashboard/dashboard-content/users' activeStyle={{backgroundColor: "white"}} style={{backgroundColor: "white", textDecoration: "none", color: "black"}} >
                            <li className="items">
                                <i className="fa fa-user-circle icon" aria-hidden="true"></i>
                                <p>Users</p>
                            </li>
                        </NavLink>

                        <NavLink to='/notification' activeStyle={{backgroundColor: "white"}} style={{backgroundColor: "white", textDecoration: "none", color: "black"}} >
                            <li className="items">
                                <i className="fa fa-bell-o" aria-hidden="true"></i>
                                <p>Notification</p>
                            </li>
                        </NavLink>

                    </ul>
                </div>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return{
        admin : state.admin
    }
}

const mapDispatchToProps = dispatch => {
    return{

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav);