import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './Users.scss'
import Button from '../../ReusableComponent/Button/';
import {changeStatus, deleteUser, deleteUsers, fetchUsers} from '../../Redux/adminAction'
import {withCookies, Cookies } from 'react-cookie'
import {instanceOf} from 'prop-types'
import PaginationTable from './PaginationTable/PaginationTable';

let deleteId = ""
let changeStatusId
let deletedIdArray
class Users extends Component {
    
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }
    
    constructor(props) {
        super(props);
        this.state = { 
            deleteId: 0,
            deletedIdArray: [],
            className: "modal"
        }
        console.log(this.state.deletedIdArray);
    }

    componentWillMount(){
        
        const {cookies} = this.props
        
        if(cookies.get("Name") === undefined){
            this.props.history.push("/")
        }
    }

    async componentDidMount(){
        await this.props.fetchUsers()
    }

    

    // handleDelete = (id) => {
        
    //     let temp = this.state.deletedIdArray
    //     let index = temp.indexOf(id)
    //     temp.splice(index, 1)

    //     this.setState({deletedIdArray: temp})
        
    //     alert(id)
    //     deleteId = id
    //     this.props.deleteUser()
    //     console.log(this.state.deletedIdArray);
    // }

    handleClick = (id) =>{
        console.log(id);
        let temp = this.state.deletedIdArray
        let index = temp.indexOf(id)
        if(index === -1)
            temp.push(id)
        else
            temp.splice(index, 1)

        this.setState({deletedIdArray: temp})
    
        // alert(this.state.checkbox + " "+ id)
    }

    // handleMultipleDelete = () => {
    //     alert(this.state.deletedIdArray)
    //     deletedIdArray = this.state.deletedIdArray

    //     if(this.state.className === "modal")
    //         this.setState({className: "modal show"})
    //     else
    //         this.setState({className: "modal"})
    //     // this.props.deleteUsers()
    //     // this.setState({deletedIdArray: []})
    // }

    showPopUp = (id) => {

        if(this.state.className === "modal"){
            // console.log("show");
            this.setState({className: "modal show"})
            if(id !== -1){
                deleteId = id
                console.log("single..........", deleteId);
            }else{
                console.log("all.............", this.state.deletedIdArray);
                deletedIdArray = this.state.deletedIdArray
            }
        }
        else
            this.setState({className: "modal"})
        
    }

    handleDelete = () => {
    
        if(deleteId !== ""){
            let temp = this.state.deletedIdArray
            let index = temp.indexOf(deleteId)
            temp.splice(index, 1)

            this.setState({deletedIdArray: temp})

            this.props.deleteUser()
            deleteId = ""
            this.setState({className: "modal"})
            console.log("....single...", this.state.deletedIdArray.length);
        }else{
            console.log("......all..........", this.state.deletedIdArray.length);
            this.props.deleteUsers()
            this.setState({deletedIdArray: []})
            deletedIdArray = ""
            this.setState({className: "modal"})
        }

    }

    handleClose = () => {
        console.log(this.state.className);
        if(this.state.className === "modal show")
            this.setState({className: "modal"})
    }

    handleStatus = (id) => {
        //alert("STATUS")
        changeStatusId = id
        this.props.changeStatus()
    }

    render() { 
        console.log("render");
        // console.log(this.props.users);
        return (
            
            <React.Fragment>

                <div className="user-container">
                    <div className="users-div">
                        

                        <div className="add-btn-div">
                            <Link to="/dashboard/dashboard-content/action">
                                <Button
                                    btnclass="userAddBtn"
                                    btnName="Add New User"
                                />
                            </Link>

                            {this.state.deletedIdArray.length > 1 &&
                                <Button
                                    btnclass="userDeleteBtn"
                                    btnName="Delete Users"
                                    dataToggle="modal"
                                    dataTarget="#staticBackdrop"
                                    onClick={() => this.showPopUp(-1)}
                                />
                            }
                        </div>
            
                        {this.props.users.length > 0 ? <PaginationTable 
                                                            users={this.props.users}
                                                            onClick={(id) => this.showPopUp(id)}
                                                            onInputClick={(id) => this.handleClick(id)}
                                                            onStatus={(id) => this.handleStatus(id)}    
                                                        /> : <div className="no-user">No User Data Found</div>}

                    </div>
                </div>

                <div id="myModal" className={this.state.className}>

                    <div className="modal-content">
                        <div className="modal-header">
                            
                            <p>Delete Users</p>
                            <span className="close" onClick={this.handleClose}>&times;</span>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure You want To Delete?</p>
                        </div>
                        <div className="modal-footer">
                            <div className="footer-btn">
                                <Button
                                    btnclass="footer-yes"
                                    btnName="Yes"
                                    onClick={() => this.handleDelete()}
                                />

                                <Button
                                    btnclass="footer-no"
                                    btnName="No"
                                    onClick={() => this.handleClose()}
                                />
                            </div>
                        </div>
                    </div>

                </div>

            </React.Fragment>

            
            
            
        );
    }
}

const mapStateToProps = state => {
    console.log(state.users);
    return{
        users: state.users
    }
}

const mapDispatchToProps = dispatch => {
    return{
        deleteUser: () => dispatch(deleteUser(deleteId)),
        deleteUsers: () => dispatch(deleteUsers(deletedIdArray)),
        changeStatus: () => dispatch(changeStatus(changeStatusId)),
        fetchUsers: () => dispatch(fetchUsers())
    }
}
 
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withCookies(Users));

