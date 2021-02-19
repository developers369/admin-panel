import React, { Component } from 'react';
import {MDBDataTable} from 'mdbreact'
import './PaginationTable.scss'
import InputTag from '../../../ReusableComponent/InputTag';

import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';


let rowsValue = []

class PaginationTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: []
        }
    }

    componentDidMount(){
        console.log("mount",this.props.users);
        this.readData(this.props.users)
    }

    componentWillReceiveProps(nextProps){
        //console.log("next",this.nextProps.users);
        if(this.props !== nextProps)
            this.readData(nextProps.users)
    }
    
    readData(users){
        //console.log("Mount-------");
        //console.log(this.props.users);
        if(users.length > 0){
    
            users.map(user => {
                console.log(user.ID);
                rowsValue.push({
                    btnAction: <div className="action-btn-container">
                        <div className="user-action-btn-checkbox" data-tip data-for="select" >
                            <InputTag
                                inputClass="checkbox"
                                type="checkbox"
                                inputText={this.props.checkboxValue}
                                onClick={() => this.props.onInputClick(user.ID)}
                            />
                        </div>

                        <Link to={'/dashboard/dashboard-content/action/'+user.ID}>
                            <div className="user-action-btn-div"  data-tip data-for="edit" onClick={this.handleClick}>
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                <button className="user-action-button-edit"></button>
                            </div>
                        </Link>

                        <div className="user-action-btn-div"  data-tip data-for="delete" onClick={() => this.props.onClick(user.ID)}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                            <button className="user-action-button-delete"></button>
                            
                        </div>

                        <div className="user-action-btn-checkbox" data-tip data-for="status">
                            <InputTag
                                inputClass="checkbox"
                                type="checkbox"
                                inputText={this.props.checkboxValue}
                                onClick={() => this.props.onStatus(user.ID)}
                            />
                            
                        </div>


                        <ReactTooltip id="select" place="top" effect="solid">
                            Select
                        </ReactTooltip>

                        <ReactTooltip id="status" place="top" effect="solid">
                            Active/Deactive
                        </ReactTooltip>

                        <ReactTooltip id="edit" place="top" effect="solid">
                            Edit
                        </ReactTooltip>
                        
                        <ReactTooltip id="delete" place="top" effect="solid">
                            Delete
                        </ReactTooltip>

                        
                    </div>,
                    fullName : user.fullName,
                    email: user.email,
                    salary: user.salary,
                    contact: user.contact,
                    avatar: <img src={user.avatar} style={{height:"50px", width: "50px"}} alt="Avatar" />,
                    status: user.status ? <span className="badge badge-success">ACTIVE</span> : <span className="badge badge-danger">DEACTIVE</span>
                })
            })
                
            this.setState({data : {
                columns: [
                    {
                        label: "",
                        field: "btnAction",
                        sort: "asc",
                        width: 150
                    },
                    {
                        label: "Avatar",
                        field: "avatar",
                        sort: "asc",
                        width: 150
                    },
                    {
                        label: "Name",
                        field: "fullName",
                        sort: "asc",
                        width: 150
                    },
                    {
                        label: "Email",
                        field: "email",
                        sort: "asc",
                        width: 150
                    },
                    {
                        label: "Salary",
                        field: "salary",
                        sort: "asc",
                        width: 150
                    },
                    {
                        label: "Status",
                        field: "status",
                        sort: "asc",
                        width: 150
                    },
                    {
                        label: "Contact",
                        field: "contact",
                        sort: "asc",
                        width: 150
                    }

                ],
                rows: rowsValue
            }})
            // console.log(",....",rowsValue);
        }

        rowsValue=[]
        
    }

    


    render() { 
        console.log("render child", this.props.users);
        return ( 
            <React.Fragment>

           
                <MDBDataTable
                    striped
                    bordered
                    small
                    data={this.state.data}
                />

            </React.Fragment>
         );
    }
}



export default PaginationTable;