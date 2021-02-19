import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Button from '../../ReusableComponent/Button';
import InputTag from '../../ReusableComponent/InputTag';
import './Profile.scss'
import { fetchUsers, updateProfile } from '../../Redux/adminAction';
import Previews from '../../Dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';


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
            profileImg: null,
            image: null,
            crop: {
                aspect: 16/9
            },
        }
    }

    componentWillMount(){
        const {cookies} = this.props
        
        if(cookies.get("Name") === undefined){
            this.props.history.push("/")
        }
    }

    async componentDidMount(){
        await this.props.fetchUsers()
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

    handleFile = (filePreview) => {
        console.log("show popup......",filePreview);
        this.setState({profileImg: filePreview})
        document.getElementById("popUpModal").style.display="block"
    }

    onLoad = (image) => {
        this.setState({image: image})
    }

    handleCrop = (crop) => {
        this.setState({crop : crop})
    }


    makeCrop = () => {
        //alert("hello")
        const canvas = document.createElement('canvas');
        const scaleX = this.state.image.naturalWidth /  this.state.image.width;
        const scaleY =  this.state.image.naturalHeight /  this.state.image.height;
        canvas.width =  this.state.crop.width;
        canvas.height =  this.state.crop.height;
        const ctx = canvas.getContext('2d');
       
        
        ctx.drawImage(
            this.state.image,
            this.state.crop.x * scaleX,
            this.state.crop.y * scaleY,
            this.state.crop.width * scaleX,
            this.state.crop.height * scaleY,
            0,
            0,
            this.state.crop.width,
            this.state.crop.height,
        );

        // this.setState({cropImage: canvas.toDataURL("image/jpeg")})

        if(this.state.crop.x === 0){
            this.setState({profileImg: this.state.profileImg})
        }else{
            this.setState({profileImg: canvas.toDataURL("image/jpeg")})
        }
       // console.log("handle", canvas.toDataURL("image/jpeg"));
        document.getElementById("popUpModal").style.display="none"
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
                        {/* <label className="label-profile-img">Profile Image<sup style={{color: "red"}}>*</sup></label> <br></br>

                        {this.state.profileImg && <div className="img-preview" style={{width : "50px", height : "50px", marginBottom : "0px"}}>
                            
                            <img src={this.state.profileImg === null ? "" : this.state.profileImg} alt="Profile" style={{width : "100%", height: "auto"}}/>
                        </div>}
                        <InputTag
                            inputClass="inputTagFile"
                            type="file"
                            onChange={(e) => this.handleChange(e, "file")}
                        /> */}
                        <Previews 
                            passFile={this.handleFile} 
                            cropImage={this.state.profileImg}
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

              
                <div id="popUpModal" className="modal">

                    <div className="modal-content">
                        <div className="modal-header">
                            
                            <p>Crop Image</p>
                            <span className="close" onClick={() => document.getElementById("popUpModal").style.display="none"}>&times;</span>
                        </div>
                        <div className="modal-body">
                            <ReactCrop src={this.state.profileImg} onImageLoaded={this.onLoad} crop={this.state.crop} onChange={this.handleCrop} />
                        </div>
                        <div className="modal-footer">
                            <div className="footer-btn">
                                <Button
                                    btnclass="footer-crop"
                                    btnName="Crop Image"
                                    onClick={this.makeCrop}
                                />

                                <Button
                                    btnclass="footer-cancel"
                                    btnName="Cancel"
                                    onClick={() => document.getElementById("popUpModal").style.display="none"}
                                />
                            </div>
                        </div>
                    </div>

                </div>
               
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
        updateProfile: () => dispatch(updateProfile(fullName, email, profileImg)),
        fetchUsers: () => dispatch(fetchUsers())
    }
}

 
export default connect(mapStateToProps, mapDispatchToProps)(withCookies(Profile));