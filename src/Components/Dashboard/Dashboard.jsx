import React, { Component } from 'react';
import Nav from '../Nav'
import Headerbar from '../Headerbar'
import './Dashboard.scss'
import {Switch, Route, Link} from 'react-router-dom'
import routes from '../../route';
import {withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Footer from '../Footer/Footer';

export const NewHeader = (props) => {
    return(
        <div className="new-header-container">

            <div className="header-left">
                <h3>Users</h3>
            </div>

            <div className="header-right">
                <Link to='/dashboard/dashboard-content/users' style={{textDecoration: "none"}}>
                    <p className="redirect-user">Users </p>
                </Link>
                <p className="slash">{props.slash}</p>
                <p className="form-name">{props.formName}</p>
            </div>

            </div>
    )
}

class Dashboard extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = { 
            className : "left",
            rightName : "right"
        }
        
    }

    componentWillMount(){
        const {cookies} = this.props
    
        if(cookies.get("Name") === undefined){
            this.props.history.push("/")
        }
    }
    
    handleLogOut = () => {
        console.log("LogOut");
        const {cookies} = this.props
        console.log(cookies.get("Name"));

        cookies.remove("Name")

        console.log(cookies.get("Name"));
        
        // redirect to the login
        this.props.history.push("/")

    }
    
    showNav = () => {
        if(this.state.className === "left")
            this.setState({className: "left show", rightName: "right change-width"})
    }


    closeNav = () => {
        this.setState({className: "left", rightName: "right"})
    }

    render() { 
        console.log(".....header render...", window.location.pathname);
        return ( 
            <div className="admin-panel">

                {/* navigation bar */}
                <div className={this.state.className}>
                    <div className="nav-div">
                        <Nav closeNav={this.closeNav}/>
                    </div>
                </div>

                {/* header bar */}
                <div className={this.state.rightName}>
                    <div className="headerbar-div">
                        <i className="fa fa-bars toggle" aria-hidden="true" onClick={this.showNav}></i>
                        <Headerbar onClick={() => this.handleLogOut()}/>
                    </div>

                    
                    

                    <div className="dashboard-container">
                        
                        <Switch>
                            {
                                routes.map((route, index) => {
                                    return (<Route 
                                        key={index}
                                        exact={route.exact}
                                        path={route.path}
                                        component={route.component}
                                    />)
                                })
                            }
                        </Switch>
                        
                        <Footer/>
                    </div>
                    
                </div>
                
                
            </div> 

        );
    }
}
 
export default withCookies(Dashboard);