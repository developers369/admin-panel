import React, { Component } from 'react';
import Previews from '../../Dropzone';
import Button from '../../ReusableComponent/Button';
import InputTag from '../../ReusableComponent/InputTag';
import "./AddUpdate.scss"
import { withCookies, Cookies} from 'react-cookie'
import { instanceOf } from 'prop-types';
import {connect} from 'react-redux'
import { addUser, fetchUsers, updateUser } from '../../Redux/adminAction';
import { Link } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import ReactPopup from '../../ReusableComponent/ReactPopup';
import { NewHeader } from '../Dashboard/Dashboard';


let fullName, salary, email, contact, avatar
let updateAuthorId

class AddUpdate extends Component {

    static proptyper = {
        cookies: instanceOf(Cookies).isRequired
    }
    
    constructor(props) {
        super(props);
        //console.log(props);
        this.state = { 
            fullName: "",
            salary: "",
            email: "",
            contact: "",
            avatar: null,
            profileImg: null,
            errorName: "",
            errorSalary: "",
            errorEmail: "",
            errorContact: "",
            errorAvatar: "",
            image: null,
            crop: {
                unit: "%",
                width: 30,
                aspect: 16/12
            },
            isShowPopup: false
         }
    }

    componentWillMount(){
        console.log(this.props);
        const {cookies} = this.props
        
        if(cookies.get("Name") === undefined){
            this.props.history.push("/")
        }
    }
    

    componentDidMount(){
    
        if(this.props.match.params.id){
            // console.log("id exist");
            // console.log("array",this.props.users.filter(user => user.authorId === this.props.match.params.id))
            let updateAuth = this.props.users.filter(user => user.ID === this.props.match.params.id)
            console.log(updateAuth);
            this.setState({
                // updateAuth : this.props.users.filter(user => user.authorId === this.props.match.params.id),
                fullName : updateAuth[0].fullName,
                salary : updateAuth[0].salary,
                email : updateAuth[0].email,
                contact : updateAuth[0].contact,
                avatar: updateAuth[0].avatar
            })
            
        }
    }
    
    componentDidUpdate = () => {
        fullName = this.state.fullName
        salary = this.state.salary
        email = this.state.email
        contact = this.state.contact
        //console.log(this.state.avatar);
        avatar = this.state.avatar

        
    }

    handleChange = (e, text) => {
        
        if(text === "fullName"){
            if(e.target.value !== "")
                this.setState({errorName: ""})

            this.setState({fullName: e.target.value})
        }

        else if(text === "salary"){
            if(e.target.value !== "")
                this.setState({errorSalary: ""})

            this.setState({salary: e.target.value})
        }

        else if(text === "email"){
            if(e.target.value !== "")
                this.setState({errorEmail: ""})
            this.setState({email: e.target.value})
        }

        else if(text === "contact"){
            if(e.target.value !== "")
                this.setState({errorContact: ""})
            this.setState({contact: e.target.value})
        }

    }


    handleAdd = (e) => {
       
        if(this.state.fullName === "" || this.state.salary === "" || this.state.email === "" || this.state.contact === null || this.state.avatar === null){
            if(this.state.fullName === ""){
                this.setState({errorName: "Please enter full name"})
            }

            else if(this.state.email === ""){
                this.setState({errorEmail: "Please enter email"})
            }


            else if(this.state.contact === ""){
                this.setState({errorContact: "Please enter contact"})
            }


            else if(this.state.salary === ""){
                this.setState({errorSalary: "Please enter salary"})
            }


            else if(this.state.avatar === null){
                this.setState({errorAvatar: "Please upload avatar"})
            }

        }else{

            if(this.props.match.params.id){
                updateAuthorId = this.props.match.params.id
                console.log(this.state.avatar);
                this.props.updateUser()
               
                this.props.history.push("/dashboard/dashboard-content/users");
                
            }else{
                this.props.addUser()
                this.setState( (state) => {
                    return {
                        fullName: "",
                        salary: "",
                        email: "",
                        contact: "",
                        avatar: null
                    }
                })
                
                this.setState({isShowPopup: true})
                
            }
            
        }
        e.preventDefault()
    }

    handleFile = (filePreview) => {
        this.setState({errorAvatar: ""})
        console.log("show popup......",filePreview);
        this.setState({profileImg: filePreview})
        document.getElementById("popUpModal").style.display="block"
        this.setState({crop: ""})
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
            console.log("withoutCrop...",this.state.profileImg);
            this.setState({avatar: this.state.profileImg})
        }else{
            this.setState({avatar: canvas.toDataURL("image/jpeg")})
            this.setState({crop: ""})
        }
        document.getElementById("popUpModal").style.display="none"
        
    }

    handleCancel = () => {
        //alert("Hello")
        document.getElementById("popUpModal").style.display="none"
        this.setState({avatar: this.state.profileImg})
        // this.setState({avatar: this.state.profileImg})
    }

    handleReset = (e) => {
        e.preventDefault()

        this.setState({
            fullName: "",
            errorName: "",
            email: "",
            errorEmail: "",
            salary: "",
            errorSalary: "",
            contact: "",
            errorContact: "",
            avatar: null,
            errorAvatar: ""
        })
    }

    handleReactModalCancel = () => {
        this.props.history.push("/dashboard/dashboard-content/users")
    }

    handleAddMore = () => {
        this.setState({isShowPopup: false})
    }


    render() { 
        return ( 
            <>
                <NewHeader slash="/ " formName={ this.props.match.params.id ? "Edit User Detail" : "Add New User" }/>
                <div className="add-form-container">
                    <div className="add-form-div">

                        <p className="first">{ this.props.match.params.id ? "EDIT USER" : "ADD USER"}</p>

                        <p className="second">PERSON INFO</p>               

                        <form className="add-form">

                            <div className="display-flex">
                                <div className="form-items">

                                    <div className="form-item">
                                        <label>Full Name<sup>*</sup></label>
                                        <InputTag
                                            inputClass="inputTag"
                                            type="text"
                                            inputText={this.state.fullName}
                                            placeHolder="Full name"
                                            onChange={(e) => this.handleChange(e, "fullName")}
                                            onKeyUp={this.handleKeyUp}
                                        />
                                        <div className="error-div">{this.state.errorName}</div>
                                    </div>

                                    <div className="form-item">
                                        <label>Email<sup>*</sup></label>
                                        <InputTag
                                            inputClass="inputTag"
                                            type="email"
                                            inputText={this.state.email}
                                            placeHolder="Email"
                                            onChange={(e) => this.handleChange(e, "email")}
                                        />
                                        <div className="error-div">{this.state.errorEmail}</div>
                                    </div>

                                    <div className="form-item">
                                        <label>Contact<sup>*</sup></label>
                                        <InputTag
                                            inputClass="inputTag"
                                            type="tel"
                                            inputText={this.state.contact}
                                            placeHolder="Contact"
                                            onChange={(e) => this.handleChange(e, "contact")}
                                        />
                                        <div className="error-div">{this.state.errorContact}</div>
                                    </div>
                                    
                                </div>

                                <div className="form-items">
                                    
                                    <div className="form-item">
                                        <label>Salary<sup>*</sup></label>
                                        <InputTag
                                            inputClass="inputTag"
                                            type="text"
                                            inputText={this.state.salary}
                                            placeHolder="Salary"
                                            onChange={(e) => this.handleChange(e, "salary")}
                                        />
                                        <div className="error-div">{this.state.errorSalary}</div>
                                    </div>


                                    <div className="form-item">
                                        <label>Profile Pic<sup>*</sup></label>
                                        <Previews 
                                            passFile={this.handleFile} 
                                            cropImage={this.state.avatar}
                                        />
                                        <div className="error-div">{this.state.errorAvatar}</div>
                                    </div>
                        

                                </div>
                            </div>

                            <div className="add-form-btn-div">

                                <div className="form-item">

                                    <Button
                                        btnclass="form-add-btn"
                                        btnName={this.props.match.params.id? "Save": "Add"}
                                        onClick={(e) => this.handleAdd(e)}
                                    />

                                    <Button
                                        btnclass="form-reset-btn"
                                        btnName="Reset"
                                        onClick={(e) => this.handleReset(e)}
                                    />

                                    <Link to="/dashboard/dashboard-content/users">
                                        <Button
                                            btnclass="form-cancel-btn"
                                            btnName="Cancel"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>

                    <ReactPopup 
                        open={this.state.isShowPopup}
                        iconDivClass="success-add-div"
                        iconName="fa fa-check fa-3x"
                        modelHeaderText="Success!"
                        modelText="Customer Added Successfully!"
                        modelBtnName="Add More"
                        modalPositiveBtn="react-model-btn-add"
                        onDelete={this.handleAddMore}
                        onCancel={this.handleReactModalCancel}
                    />
                    
                    <div id="popUpModal" className="modalCrop">

                        <div className="modal-content">
                            <div className="modal-header">
                                
                                <p>Crop Image</p>
                                <span className="close" onClick={this.handleCancel}>&times;</span>

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
                                        onClick={this.handleCancel}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
 
const mapStateToProps = state => {
    localStorage.setItem("users", JSON.stringify(state.users))
    return{
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addUser: () => dispatch(addUser(fullName, salary, email, contact, avatar)),
        updateUser: () => dispatch(updateUser(updateAuthorId, fullName, salary, email, contact, avatar)),
        // fetchUsers: () => dispatch(fetchUsers(fetchUsers))
    }
}


export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(withCookies(AddUpdate));