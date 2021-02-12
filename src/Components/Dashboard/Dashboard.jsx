import React, { Component } from 'react';
import Nav from '../Nav'
import Headerbar from '../Headerbar'
import './Dashboard.scss'
import {Switch, Route} from 'react-router-dom'
import routes from '../../route';
import {withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class Dashboard extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {  }
        
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
    
    render() { 
        return ( 
            <div className="admin-panel">

                {/* navigation bar */}
                <div className="left">
                    <div className="nav-div">
                    <Nav />
                    </div>
                </div>

                {/* header bar */}
                <div className="right">
                    <div className="headerbar-div">
                        <Headerbar onClick={() => this.handleLogOut()}/>
                    </div>

                    <div className="container">
                        
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

                    </div>
                </div>

            </div> 

        );
    }
}
 
export default withCookies(Dashboard);