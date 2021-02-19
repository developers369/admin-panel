import React, { Component } from 'react';
import Button from '../../ReusableComponent/Button/Button';
import InputTag from '../../ReusableComponent/InputTag';
import "./AddUpdateUser.scss"
import { withCookies, Cookies} from 'react-cookie'
import { instanceOf } from 'prop-types';
import {connect} from 'react-redux'
import { addUser, fetchUsers, updateUser } from '../../Redux/adminAction';
import { Link } from 'react-router-dom';
import Previews from '../../Dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

let fullName, salary, email, contact, avatar
let updateAuthorId

class AddUpdateUser extends Component {
    
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
            image: null,
            crop: {
                aspect: 16/9
            }
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
            this.setState({fullName: e.target.value})
        }

        else if(text === "salary"){
            this.setState({salary: e.target.value})
        }

        else if(text === "email"){
            this.setState({email: e.target.value})
        }

        else if(text === "contact"){
            this.setState({contact: e.target.value})
        }

    }

    handleClick = (e) => {
       
        if(this.state.fullName === "" || this.state.salary === "" || this.state.email === "" || this.state.contact === null || this.state.avatar === null){
            if(this.state.fullName === ""){
                alert("Please enter fullName")
            }

            else if(this.state.salary === ""){
                alert("Please enter salary")
            }

            else if(this.state.email === ""){
                alert("Please enter email")
            }

            else if(this.state.contact === null){
                alert("Please enter contact")
            }


            else if(this.state.avatar === null){
                alert("Please upload user avatar")
            }
        }else{

            if(this.props.match.params.id){
                updateAuthorId = this.props.match.params.id
                console.log(this.state.avatar);
                this.props.updateUser()
                
                alert("Updated Successfully")
                
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
                
                alert("User Added Successfully")
                
                this.props.history.push("/dashboard/dashboard-content/users")
            }
            
        }
        e.preventDefault()
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
        // this.setState({avatar: this.state.profileImg})
    }


    render() { 
        //console.log(this.state.avatar);
        return ( 
            <>
            <div className="form-div">
                <form className="add-author-form">
                    <h2>{ this.props.match.params.id ? "Update User" : "Add User"}</h2>

                    <div className="form-items">
                        <label>Name</label> <br></br>
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
                        <label>Salary</label> <br></br>
                        <i className="fa fa-usd" aria-hidden="true"></i>
                        <InputTag
                            inputClass="inputTag"
                            type="number"
                            inputText={this.state.salary}
                            placeHolder="Enter Salary"
                            onChange={(e) => this.handleChange(e, "salary")}
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
                        <label>Contact no : </label> <br></br>
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        <InputTag
                            inputClass="inputTag"
                            type="tel"
                            inputText={this.state.contact}
                            placeHolder="Enter Contact no"
                            onChange={(e) => this.handleChange(e, "contact")}
                        />
                    </div>

                    <div className="form-items">
                        <Previews 
                            passFile={this.handleFile} 
                            cropImage={this.state.avatar}
                        />
                    </div>

                    <div className="button-div">

                        <Button
                            btnclass="action-button"
                            btnName={this.props.match.params.id? "Update": "Save"}
                            onClick={(e) => this.handleClick(e)}
                        />

                        <Link to="/dashboard/dashboard-content/users">
                            <Button
                                btnclass="action-button cancel"
                                btnName="Cancel"
                            />
                        </Link>
                       
                        
                    </div>
                </form>

                
                    
            </div>


            
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
        fetchUsers: () => dispatch(fetchUsers(fetchUsers))
    }
}


export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(withCookies(AddUpdateUser));
