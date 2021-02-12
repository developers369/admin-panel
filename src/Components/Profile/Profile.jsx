import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Button from '../../ReusableComponent/Button';
import InputTag from '../../ReusableComponent/InputTag';
import './Profile.scss'
import { updateProfile } from '../../Redux/adminAction';

let fullName, email, profileImg
class Profile extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = { 
            fullName: "",
            email: "",
            userName: "",
            password: "",
            profileImg: null
        }
    }

    componentWillMount(){
        const {cookies} = this.props
        
        if(cookies.get("Name") === undefined){
            this.props.history.push("/")
        }
    }

    componentDidMount(){

        this.setState({
            userName: this.props.admin.userName,
            fullName: this.props.admin.fullName,
            email: this.props.admin.email,
            profileImg: this.props.admin.profileImg
        })
    }

    componentDidUpdate(){
        fullName = this.state.fullName
        email = this.state.email
        profileImg = this.state.profileImg
    }

    handleChange = (e, text) => {
        
        if(text === "fullName"){
            this.setState({fullName: e.target.value})
        }

        else if(text === "email"){
            this.setState({salary: e.target.value})
        }

        else if(text === "file"){
            let files = e.target.files

            let reader = new FileReader()
            reader.readAsDataURL(files[0])

            reader.onload = (e) => {

                this.setState({profileImg : e.target.result})
            }
        }

        else if(text === "contact"){
            this.setState({contact: e.target.value})
        }

    }

    handleClick = (e) => {
        e.preventDefault()
        this.props.updateProfile()
        alert("Profile Updated Successfully")
    }

    render() { 
        return ( 
            <div className="profile-div">
                <form className="profile-form">
                    <h2>Admin Profile</h2>

                    <div className="form-items">
                        <label>User Name</label> <br></br>
                        <i className="fa fa-user" aria-hidden="true"></i>
                        <InputTag
                            inputClass="inputTag"
                            type="text"
                            inputText={this.state.userName}
                            disabled={true}
                        />
                        
                    </div>


                    <div className="form-items">
                        <label>Full Name</label> <br></br>
                        <i className="fa fa-user" aria-hidden="true"></i>
                        <InputTag
                            inputClass="inputTag"
                            type="text"
                            inputText={this.state.fullName}
                            placeHolder="Enter full name"
                            onChange={(e) => this.handleChange(e, "fullName")}
                        />
                        
                    </div>
            
                    <div className="form-items">
                        
                        <label>Email</label> <br></br>
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        <InputTag
                            inputClass="inputTag"
                            type="email"
                            inputText={this.state.email}
                            placeHolder="Enter email"
                            onChange={(e) => this.handleChange(e, "email")}
                        />
                    </div>

                    <div className="form-items">
                        <label className="label-profile-img">Profile Image<sup style={{color: "red"}}>*</sup></label> <br></br>

                        {this.state.profileImg && <div className="img-preview" style={{width : "50px", height : "50px", marginBottom : "0px"}}>
                            
                            <img src={this.state.profileImg === null ? "" : this.state.profileImg} alt="Profile" style={{width : "100%", height: "auto"}}/>
                        </div>}
                        <InputTag
                            inputClass="inputTagFile"
                            type="file"
                            onChange={(e) => this.handleChange(e, "file")}
                        />
                         {/* <input id="i" type="file" onChange={this.handleFile}/> */}
                    </div>


                    <div className="profile-button-div">

                        <Button
                            btnclass="profile-action-button"
                            btnName="Update"
                            onClick={(e) => this.handleClick(e)}
                        />

                    </div>
                </form>
            </div>
        );
    }
}


const mapStateToProps = state => {
    console.log(state);
    return{
        admin: state.admin
    }
}

const mapDispatchToProps = dispatch => {
    return{
        updateProfile: () => dispatch(updateProfile(fullName, email, profileImg))
    }
}

 
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(Profile));