import React, { Component } from 'react';
import {withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {connect} from 'react-redux'
import Button from '../../ReusableComponent/Button';

import './Headerbar.scss';


class Headerbar extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props) {
        super(props);
        this.state = { 
            searchText: "",
            showLogOut: "log-out",
           
        }
       
        // console.log(this.props);
    }

    handleChange = (e) =>{
        this.setState({searchText: e.target.value})
    }

    showLogOut = () => {
        if(this.state.showLogOut === "log-out"){
            this.setState({showLogOut: "log-out showDiv"})
        }else{
            this.setState({showLogOut: "log-out"})
        }
    }

    

    render() { 
        return ( 
            <React.Fragment>

                <div className="headerbar">
                    <div className="headerbar-img" onClick={() => this.showLogOut()}>
                        <img src={this.props.profileImg} alt="Profile"></img>
                    </div>
                </div>


                <div className={this.state.showLogOut}>

                    <div className="uname-pic">

                        {this.props.userName[0].toUpperCase()}

                    </div>
                    <h5>{this.props.userName}</h5>

                    <Button
                        btnClass="btn-log-out"
                        btnName="Log Out"
                        onClick={this.props.onClick}
                    />

                </div>
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => {
    return{
      profileImg : state.admin.profileImg,
      userName : state.admin.userName
  
    }
  }

export default connect(mapStateToProps, null)(withCookies(Headerbar));