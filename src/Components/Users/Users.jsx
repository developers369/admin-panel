import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './Users.scss'
import Button from '../../ReusableComponent/Button/';
import {changeStatus, deleteUser, deleteUsers, fetchUsers} from '../../Redux/adminAction'
import {withCookies, Cookies } from 'react-cookie'
import {instanceOf} from 'prop-types'
import PaginationTable from './PaginationTable/PaginationTable';
import UsersTable from './UsersTable';
import Filter from './Filter';
import ReactPopup from '../../ReusableComponent/ReactPopup';
import { NewHeader } from '../Dashboard/Dashboard';

let deleteId = ""
let changeStatusId
let deletedIdArray
let isChangedRows = false
let isClickedPrev = false
let index

class Users extends Component {
    
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }
    
    constructor(props) {
        super(props);
        this.state = { 
            deleteId: 0,
            deletedIdArray: [],
            className: "modal",
            allUser: "",
            activeUser: "",
            inactiuveUser: "",

            // filter data
            sort: "",
            filter: "",
            usersData: [],

            // footer of pagination table
            rowsPerPage: 5,
            currentPage: 0,
            totalPage: 0,

            // loader
            isLoader: false,
            isShowPopup: false,
            selectAll: false,
            modelText: "",
            modelBtnName: ""
    
        }

        console.log(this.state.deletedIdArray);
    }

    componentWillMount(){
        
        const {cookies} = this.props
        
        if(cookies.get("Name") === undefined){
            this.props.history.push("/")
        }
    }

    componentDidMount(){
        // console.log("mount");
        let allUser = this.calculateUserCardValues()

        

        this.filterUserData(allUser)

  
    }
    
    componentDidUpdate(){
       // console.log(this.state.selectAll);
        if(isChangedRows){
            isChangedRows = false
            console.log("DidUpdate..........");
            let allUser = this.calculateUserCardValues()

            console.log(allUser);
            if(allUser > 0){
                this.setState({currentPage: 1})
            }else{
                this.setState({currentPage: 0})
            }

            this.filterUserData(allUser)
        }

        if(isClickedPrev){
            isClickedPrev = false
            let rows = []

            let index = this.state.rowsPerPage*this.state.currentPage
            for(var i=(index-this.state.rowsPerPage); i<index; i++){

                if(i < this.props.users.length)
                    rows.push(this.props.users[i])
            }

            this.setState({
                usersData: rows
            })
        }
        
    }

    calculateUserCardValues = () => {
        var allUser = this.props.users.length
        var activeUser=0, inactiveUser=0
        this.props.users.forEach(user => {
            if(user.status)
                activeUser++
            else
                inactiveUser++
        })

        // console.log(activeUser);
        // console.log(inactiveUser);

        this.setState({
            allUser,
            activeUser,
            inactiveUser
        })

        if(allUser > 0){
            this.setState({currentPage: 1})
        }else{
            this.setState({currentPage: 0})
        }

        return allUser
    }


    filterUserData(allUser){
        // calculate total page
        let totalPage = Math.ceil(allUser/this.state.rowsPerPage)

        this.setState({totalPage})

        // now store records according to rows per page
        let rows = []

        for(var i=0; i<this.state.rowsPerPage; i++){

            if(i < this.props.users.length)
                rows.push(this.props.users[i])
        }

        console.log("new array---------", rows);

        // now set filter array to the userData
        this.setState({usersData: rows})

        if(this.state.usersData.length > 0){
            this.setState({currentPage: 1})
        }

        return false
    }


    handleClick = (id) => {

        //this.setState({multiSelectCount: this.state.multiSelectCount + 1})
       // alert(id);
        let temp = this.state.deletedIdArray
        let index = temp.indexOf(id)
        if(index === -1)
            temp.push(id)
        else
            temp.splice(index, 1)

        this.setState({deletedIdArray: temp})
    
        // alert(this.state.checkbox + " "+ id)
    }

    showPopUp = (id, modelType) => {
        console.log(modelType);
        if(modelType === "delete"){
            this.setState({isShowPopup: true, modelText: "You will not be able to recover this!", modelBtnName: "Yes, delete it!"})
            if(id !== -1){
                deleteId = id
                console.log("single..........", deleteId);
            }else{
                console.log("all.............", this.state.deletedIdArray);
                deletedIdArray = this.state.deletedIdArray
            }
        }

        
        else if(modelType === "status"){

            changeStatusId = id
            this.setState({modelBtnName: "Yes, changed it!"})
             
            this.state.usersData.map((user, ind) => {
                if(user.ID === id){
                    index = ind
                }
            })

            if(this.state.usersData[index].status)
                this.setState({isShowPopup: true, modelText: "User status will be changed to Deactivated"})
            else
                this.setState({isShowPopup: true, modelText: "User status will be changed to Activated"})

        }
        
      
        
    }

    handleDelete = () => {
        
        if(document.getElementById("modelButton").innerHTML === "Yes, delete it!"){
            console.log(deleteId);
            if(deleteId !== ""){
                let temp = this.state.deletedIdArray
                let index = temp.indexOf(deleteId)
                temp.splice(index, 1)

                this.setState({deletedIdArray: temp})

                this.props.deleteUser()
                deleteId = ""
                this.setState({isShowPopup: false})
                isChangedRows = true
                console.log("....single...", this.state.deletedIdArray.length);
            }else{
                console.log("......all..........", this.state.deletedIdArray.length);
                this.props.deleteUsers()
                this.setState({deletedIdArray: []})
                deletedIdArray = ""
                isChangedRows = true
                this.setState({isShowPopup: false})
                //this.setState({className: "modal"})
            }
        }else{
           
            this.props.changeStatus()
            isChangedRows = true
            this.setState({isShowPopup: false})
        }

    }

    handleCancel = () => {
        this.setState({isShowPopup: false})
    }

    handleStatus = (id) => {
        //alert("STATUS")
        
    }

    // filter part =-------
    handleSort = (e) => {
        // alert(e.target.value)
        this.setState({sort: e.target.value})
    }

    handleFilter = (e) => {
        // alert(e.target.value)
        this.setState({filter: e.target.value})
    }

    handleApply = () => {
        if(this.state.sort !== "--SELECT--"){

            var today = new Date(),
            date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

            let temp = this.state.usersData
            console.log("HELOOOOOO");
            if(this.state.filter === "Today"){

                temp = temp.filter(user => user.createdDate === date)
                console.log(temp);
            }

            else if(this.state.filter === "Yesterday"){

                // get the created day
                var todayDate = date.split("/")

                var day = todayDate[todayDate.length-1]

                // console.log("hhhhhhh//////", temp[0].createdDate.split("/")[2]);
           
                temp = temp.filter(user => parseInt(user.createdDate.split("/")[0]) === parseInt(day-1))
                console.log(temp);
                
            }
            
            // sort by name
            if(this.state.sort === "Name"){

                temp.sort((a,b) => {
                    if(a.fullName.toLowerCase() < b.fullName.toLowerCase()) { return -1; }
                    if(a.fullName.toLowerCase() > b.fullName.toLowerCase()) { return 1; }
                    return 0;
                }) 
                console.log(temp)


            }

            // sort by email
            else if(this.state.sort === "Email"){

                temp.sort((a,b) => {
                    if(a.email.toLowerCase() < b.email.toLowerCase()) { return -1; }
                    if(a.email.toLowerCase() > b.email.toLowerCase()) { return 1; }
                    return 0;
                }) 
                console.log(temp)

            }

            // sort by contact
            else if(this.state.sort === "Contact"){

                temp.sort((a,b) => {
                    if(a.contact.toLowerCase() < b.contact.toLowerCase()) { return -1; }
                    if(a.contact.toLowerCase() > b.contact.toLowerCase()) { return 1; }
                    return 0;
                }) 

                console.log(temp)

            }


            // set sorted array
            this.setState({usersData: temp})
        }
    }

    handleClear = () => {
       // alert("Clear")
        this.setState({
            sort: "--SELECT--", 
            filter: "--SELECT--",
            usersData: this.props.users
        })

    }

    // footer of pagination table
    handleRows = (e) => {
        // alert(e.target.value)

        this.setState({rowsPerPage: e.target.value, isLoader: true})
        isChangedRows = true
        this.setState({isLoader: false})
        this.filterUserData(this.props.users.length)
        
    }   

    handleNextPage = () => {
        //alert("next")
        // console.log(this.state.currentPage);
        if(this.state.currentPage < this.state.totalPage){
            let rows = []

            let index = this.state.rowsPerPage*this.state.currentPage
            for(var i=index; i<(index + this.state.rowsPerPage); i++){

                if(i < this.props.users.length)
                    rows.push(this.props.users[i])
            }

            this.setState({
                currentPage: this.state.currentPage + 1,
                usersData: rows
            })
        }
    }

    handlePrevPage = () => {
        //alert("prev")
        
        if(this.state.currentPage > 1){
            isClickedPrev = true
            this.setState({currentPage: this.state.currentPage - 1 })
        }
            
    
    }

    deSelectAll = () => {
        

        // console.log(document.getElementById("select-input").checked);
        this.state.deletedIdArray.forEach(value => {
            document.getElementById(value).checked = false
        })

        // empty deletedIdarray
        this.setState({deletedIdArray: []})
        this.setState({multiSelectCount: 0})
        this.setState({selectAll: false})
        
        
    }

    handleSelectAll = () => {

        let deletedIdArray = []
        if(!this.state.selectAll){

            this.state.usersData.forEach(user => {
                document.getElementById(user.ID).checked = true
                deletedIdArray.push(user.ID)
                
            })
            this.setState({selectAll: true, deletedIdArray})
        }else{
            this.state.usersData.forEach(user => {
                document.getElementById(user.ID).checked = false
            })
            this.setState({selectAll: false, deletedIdArray: []})
        }
    }

    render() { 
        console.log("mount", this.state.usersData);
        console.log("mount1", this.props.users);
        console.log("render");
        // console.log(this.props.users);
        return (
            
            <React.Fragment>

                <NewHeader />
                <div className="users-div">
                    
                    <div className="user-card-header">

                        <div className="card-container-header">
                            <p>Users</p>
                            <Link to="/dashboard/dashboard-content/action">
                                <Button
                                        btnclass="userAddBtn"
                                        btnName="Add User"
                                />
                            </Link>
                        </div>

                        <div className="user-card-container">
                            <div className="card">

                                <div className="card-body">
                                    <h5 className="card-title">All Users</h5>

                                    <div className="circle">
                                        <div className="card-icon-all">
                                            <i className="fa fa-users card-icon" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <p className="card-value">{this.state.allUser}</p>
                                </div>

                            </div>

                            <div className="card">

                                <div className="card-body">
                                    <h5 className="card-title">Active Users</h5>
                                    
                                    <div className="circle">
                                        <div className="card-icon-active">
                                            <i className="fa fa-check card-icon" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <p className="card-value">{this.state.activeUser}</p>
                                </div>

                            </div>

                            <div className="card">

                                <div className="card-body">
                                    <h5 className="card-title">Inactive Users</h5>
                                    
                                    <div className="circle">
                                        <div className="card-icon-inactive">
                                            <i className="fa fa-eye-slash card-icon" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <p className="card-value">{this.state.inactiveUser}</p>
                                </div>

                            </div>
                        </div>

                        <Filter 
                            sort={this.state.sort}
                            filter={this.state.filter}
                            handleSort={(e) => this.handleSort(e)}
                            handleFilter={(e) => this.handleFilter(e)}
                            handleApply={this.handleApply}
                            handleClear={this.handleClear}
                        />
                    </div>
                
                    {this.state.deletedIdArray.length > 1 && (
                        
                        <div className="multi-select-div">

                            <p><i className="fa fa-minus-square minus" aria-hidden="true" onClick={this.deSelectAll}></i>{this.state.deletedIdArray.length} row(s) selected.</p>

                            <Button 
                                btnclass="multi-delete-btn"
                                btnName="Delete"
                                onClick={() => this.showPopUp(-1)}
                            />
                        </div>

                    ) }

                    <UsersTable 
                        users={this.state.usersData}
                        totalRecords={this.props.users.length} 
                        rowsPerPage={this.state.rowsPerPage}
                        currentPage={this.state.currentPage}
                        totalPage={this.state.totalPage}
                        selectAll={this.state.selectAll}
                        onChange={(e) => this.handleRows(e)}
                        nextPage={this.handleNextPage}
                        prevPage={this.handlePrevPage}
                        onInputClick={(id) => this.handleClick(id)}
                        onClick={(id) => this.showPopUp(id, "delete")}
                        onSelectAll={this.handleSelectAll}
                        changeStatus={(id) => this.showPopUp(id, "status")}
                    />

                </div>
                
                <ReactPopup 
                    open={this.state.isShowPopup}
                    iconDivClass="warning-delete-div"
                    iconName="fa fa-exclamation fa-3x"
                    modelHeaderText="Are You Sure!"
                    modelText={this.state.modelText}
                    modelBtnName={this.state.modelBtnName}
                    modalPositiveBtn="react-model-btn-delete"
                    onDelete={this.handleDelete}
                    onCancel={this.handleCancel}
                />

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
        // fetchUsers: () => dispatch(fetchUsers())
    }
}
 
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withCookies(Users));

