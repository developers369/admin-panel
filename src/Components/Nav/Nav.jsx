import React, { Component } from 'react';
import {connect} from 'react-redux'
import './Nav.scss'
import Logo from '../../Image/logo.jpg'
import {Link, NavLink} from 'react-router-dom'

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
                
                <Link to="/dashboard/dashboard-content" style={{textDecoration:"none"}}>
                    <div className="header">
                        <div className="profileImg">
                            <img src={Logo} alt="Profile"></img>
                        </div>
                        <h2 className="logo-name">My Admin</h2>
                    </div>
                </Link>

                <div className="nav-close" onClick={this.props.closeNav}>
                    <span>&times;</span>
                </div>
                

                <div className="nav-items">
                    <ul>
                        <NavLink exact to='/dashboard/dashboard-content' activeStyle={{color: "white"}} style={{textDecoration: "none", color: "black"}}>
                            <li className="navbar-item">
                                <i className="fa fa-cube icon" aria-hidden="true"></i>
                                <p className="nav-p">Dashboard</p>
                            </li>
                        </NavLink>

                        <NavLink to='/dashboard/dashboard-content/profile' activeStyle={{color: "white"}} style={{textDecoration: "none", color: "black"}} >
                            <li className="navbar-item">
                                <i className="fa fa-user icon" aria-hidden="true"></i>
                                <p className="nav-p">Profile</p>
                            </li>
                        </NavLink>

                        <NavLink exact to='/dashboard/dashboard-content/users' activeStyle={{color: "white"}} style={{textDecoration: "none", color: "black"}} >
                            <li className="navbar-item">
                                <i className="fa fa-user-circle icon" aria-hidden="true"></i>
                                <p className="nav-p">Users</p>
                            </li>
                        </NavLink>

                        {/* <NavLink to='/notification' activeStyle={{backgroundColor: "white"}} style={{backgroundColor: "white", textDecoration: "none", color: "black"}} >
                            <li className="items">
                                <i className="fa fa-bell-o" aria-hidden="true"></i>
                                <p>Notification</p>
                            </li>
                        </NavLink> */}

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