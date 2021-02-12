import React, { Component } from 'react';
import Button from '../../ReusableComponent/Button/Button';
import InputTag from '../../ReusableComponent/InputTag';
import "./AddUpdateUser.scss"
import { withCookies, Cookies} from 'react-cookie'
import { instanceOf } from 'prop-types';
import {connect} from 'react-redux'
import { addUser, updateUser } from '../../Redux/adminAction';
import { Link } from 'react-router-dom';

let fullName, salary, email, contact
let updateAuthorId

class AddUpdateUser extends Component {
    
    static proptyper = {
        cookies: instanceOf(Cookies).isRequired
    }
    
    constructor(props) {
        super(props);
        console.log(props);
        this.state = { 
            fullName: "",
            salary: "",
            email: "",
            contact: ""
         }
    }

    componentWillMount(){
        
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
                contact : updateAuth[0].contact
            })
            
        }
    }
    
    componentDidUpdate = () => {
        fullName = this.state.fullName
        salary = this.state.salary
        email = this.state.email
        contact = this.state.contact
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
       
        if(this.state.fullName === "" || this.state.salary === "" || this.state.email === "" || this.state.contact === null){
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
        }else{

            if(this.props.match.params.id){
                updateAuthorId = this.props.match.params.id
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
                        contact: ""
                    }
                })
                
                alert("User Added Successfully")
                
                this.props.history.push("/dashboard/dashboard-content/users")
            }
            
        }
        e.preventDefault()
    }

    render() { 
        console.log(this.props.match);
        return ( 

            <div className="form-div">
                <form className="add-author-form">
                    <h2>{ this.props.match.params.id ? "Update Author" : "Add Author"}</h2>

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
         );
    }
}

const mapStateToProps = state => {
    return{
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return{
        addUser: () => dispatch(addUser(fullName, salary, email, contact)),
        updateUser: () => dispatch(updateUser(updateAuthorId, fullName, salary, email, contact))
    }
}


export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(withCookies(AddUpdateUser));
