import React, {Component} from 'react'
import "./LogIn.scss"
import InputTag from '../../ReusableComponent/InputTag'
import Button from '../../ReusableComponent/Button'
import { connect } from 'react-redux'
import {login} from '../../Redux/adminAction'
import GoogleLogin from 'react-google-login'
import { withCookies, Cookies} from 'react-cookie'
import { instanceOf } from 'prop-types';

let username
let password


class LogIn extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
 
      
    constructor(props) {
        super(props);
        console.log("const.....",props);
        this.state = { 
            inputUserName : "",
            inputPassword : "",
            errorMessage: "",
            errorMessage1: "",
            error: "",
            isLoginClick: false
         }
  
    }

    componentWillMount(){
        const {cookies} = this.props
        
        if(cookies.get("Name") === ""){
            this.props.history.push("/dashboard/dashboard-content")
        }
    }

    handleChange = (e,text) =>{

        if(text === "uname"){
            this.setState({inputUserName: e.target.value})
            username = e.target.value
            if(this.state.inputUserName !== ""){
                this.setState({errorMessage: ""})
            }
        }        
        else{
            this.setState({inputPassword: e.target.value})
            password = e.target.value

            if(this.state.inputPassword !== ""){
                this.setState({errorMessage1: ""})
            }
        }

    }

    componentDidUpdate(){
        //console.log('componentWillReceiveProps', nextProps);
        console.log("update", this.state.isLoginClick);
        if(this.state.isLoginClick){
            if(this.props.success === false){
                console.log("sssss");
                this.setState({error: "Incorrect Username and Password", isLoginClick: false})
                
            }else{
                //console.log(nextProps);
                this.setState({error: "", isLoginClick: false})
                //setcookie
                
                const {cookies} = this.props
                cookies.set("Name", this.props.name, {path: "/"})

                console.log(this.props);

                

                // redirect to the dashboard
                this.props.history.push("/dashboard/dashboard-content")


            }
        }
        
    }

    handleClick = (e) => {
        
        if(this.state.inputUserName === "" || this.state.inputPassword === ""){
            if(this.state.inputUserName === ""){
                this.setState({errorMessage: "User name can't be empty"})
            }
    
            else if(this.state.inputPassword === ""){
                this.setState({errorMessage1: "Password can't be empty"})
            }
        }else{
            this.props.login() 
        }
        
        this.setState({isLoginClick:true})
          
        e.preventDefault()
       
    }

    responseGoogle = (response) => {
        console.log(response);
        // username = response.profileObj.givenName
        
        this.setState({error: ""})
        //setcookie
        
        const {cookies} = this.props
        cookies.set("Name", this.props.name, {path: "/"})

        // redirect to the dashboard
        this.props.history.push("/dashboard/dashboard-content")
    }

    render() {
       console.log("....render"); 
        return ( 
            <div className="login-container">
                
                <div className="login-block">

                    <h1>SIGN IN</h1>
                    <div className="login-form-block">

                        <form className="login-form">

                            <div className="errorMsg">{this.state.error}</div>

                            <div className="form-item">
                            
                                <label>Username</label>
                                <br></br>
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <InputTag 
                                    inputClass="inputTag"
                                    type="text" 
                                    inputText={this.state.inputUserName}
                                    placeHolder="Username"
                                    onChange={ (e) => this.handleChange(e, "uname")}
                                />
                                <div className="errorMsg">{this.state.errorMessage}</div>
                            </div>

                            <div className="form-item">
                                <label>Password</label>
                                <br></br>
                                <i className="fa fa-key" aria-hidden="true"></i>
                                <InputTag 
                                    inputClass="inputTag"
                                    type="password" 
                                    inputText={this.state.inputPassword}
                                    placeHolder="Password"
                                    onChange={ (e) => this.handleChange(e, "pwd")}
                                />
                                <div className="errorMsg">{this.state.errorMessage1}</div> 
                            </div>

                            <div className="form-button">
                                <Button 
                                    btnClass="button"
                                    btnName="SIGN IN" 
                                    onClick={(e) => this.handleClick(e)}
                                />
                            </div>

                            <div className="form-button">

                                <GoogleLogin
                                    clientId="368640192648-k1dtcnv4he11tugkt0vhqv3lhfu2jo93.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                            
                        </form>
                    </div>
                    
                </div>

                
            </div>
            
         );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return{
        success: state.success,
        name: state.admin.name
    }
}


const mapDispatchToProps = dispatch => {
    return{
        login: () => dispatch(login(username, password)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(LogIn));