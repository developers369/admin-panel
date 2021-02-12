import React, { Component } from 'react';
import {MDBDataTable} from 'mdbreact'
import './PaginationTable.scss'
import InputTag from '../../../ReusableComponent/InputTag';

import { Link } from 'react-router-dom';


let rowsValue = []

class PaginationTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: []
        }
    }

    componentDidMount(){
        this.readData(this.props.users)
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps)
            this.readData(nextProps.users)
    }
    
    readData(users){
        console.log("Mount-------");
        console.log(this.props.users);
        if(users.length > 0){

            users.map(user => {
                
                rowsValue.push({
                    btnAction: <div className="action-btn-container">
                        <div className="user-action-btn-checkbox">
                            <InputTag
                                inputClass="checkbox"
                                type="checkbox"
                                inputText={this.props.checkboxValue}
                                onChange={() => this.props.onChange(user.ID)}
                            />
                        </div>

                        <Link to={'/dashboard/dashboard-content/action/'+user.ID}>
                            <div className="user-action-btn-div" onClick={this.handleClick}>
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                <button className="user-action-button-edit"></button>
                            </div>
                        </Link>

                        <div className="user-action-btn-div" onClick={() => this.props.onClick(user.ID)}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                            <button className="user-action-button-delete"></button>
                        </div>
                    </div>,
                    fullName : user.fullName,
                    email: user.email,
                    salary: user.salary,
                    contact: user.contact,
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
                        label: "Contact",
                        field: "contact",
                        sort: "asc",
                        width: 150
                    }

                ],
                rows: rowsValue
            }})
            console.log(",....",rowsValue);
        }

        rowsValue=[]
        
    }

    


    render() { 
        console.log("render child");
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