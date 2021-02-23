import React, { Component } from 'react';
import {withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {connect} from 'react-redux'
import Button from '../../ReusableComponent/Button';
import { swing } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import './Headerbar.scss';

const styles = {
    swing: {
        animation: 'x 1s',
        animationName: Radium.keyframes(swing, 'swing')
    }
}

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

    componentDidMount(){
        // document.onclick = function(e){
        //    //alert(e.target.id);
        //     var headerbar = document.getElementById("headerbar")
        //     if(e.target.id !== 'headerbar'){
        //       //element clicked wasn't the div; hide the div
        //       document.getElementById("log-out").style.display = 'none';
        //     }else{
        //         document.getElementById("log-out").style.display = 'flex';
        //         document.getElementById("log-out").style.flexDirection = 'column';
        //         document.getElementById("log-out").style.alignItems = 'center';
        //     }
        // };
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
                        <img id="headerbar" src={this.props.profileImg} alt="Profile"></img>
                    </div>
                </div>


                <StyleRoot>
    
    
                    <div id="log-out" className={this.state.showLogOut} style={styles.swing}>

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

                </StyleRoot>

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