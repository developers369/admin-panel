import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import InputTag from '../../../ReusableComponent/InputTag';
import SelectTag from '../../../ReusableComponent/SelectTag';
import "./UsersTable.scss";

class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        console.log(this.props.selectAll);
        return ( 

            <div className="users-table-container">
                <table className="user-table">
                    <thead className="table-header">
                        <tr className="header-row">
                            <td>
                                <div className="all-checkbox" data-tip data-for="Select All" >
                                    <InputTag
                                        inputClass="checkbox"
                                        type="checkbox"
                                        inputText={this.props.selectAll}
                                        onClick={() => this.props.onSelectAll()}
                                    />
                                </div>
                            </td>
                            <td>Actions</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Salary</td>
                            <td>Contact</td>
                            <td>Status</td>
                            

                        </tr>
                    </thead>

                    {this.props.users.length > 0 ? <tbody className="table-body">

                        {this.props.users.map(user => <tr key={user.ID}>
                            <td>
                                <div className="user-action-btn-checkbox" data-tip data-for="select" >
                                    <InputTag
                                        id={user.ID}
                                        inputClass="checkbox"
                                        type="checkbox"
                                        onClick={() => this.props.onInputClick(user.ID)}
                                    />
                                </div>
                            </td>

                            <td>
                                <div className="action-btn-container">
                                    

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

                                    <div className="user-action-btn-div" data-tip data-for="status" onClick={() => this.props.changeStatus(user.ID)}>
                                        <i className="fa fa-check" aria-hidden="true"></i>
                                        <button className="user-action-button-status"></button>
                                    </div>

                                    <ReactTooltip id="Select All" place="top" effect="solid">
                                        Select All
                                    </ReactTooltip>

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

                                    
                                </div>
                                

                            </td>
                            <td>
                                <div className="td-div">

                                    <div className="user-icon-container">
                                        <i className="fa fa-user user-icon" aria-hidden="true"></i>
                                    </div>
                                    <p>{user.fullName}</p>
                                </div>
                            </td>

                            <td>
                                <div className="td-div">

                                    <div className="email-icon-container">
                                        <i className="fa fa-envelope email-icon" aria-hidden="true"></i>
                                    </div>
                                    <p>{user.email}</p>
                                </div>
                            </td>

                            <td>{user.salary}</td>

                            <td>+91{user.contact}</td>

                            <td>
                                {user.status ? <span className="badge badge-success">Activated</span> : <span className="badge badge-danger">Deactivated</span>}
                            </td>

                        </tr>)}
                    </tbody> : <tbody className="table-body">
                            <tr>
                                <td colSpan="7" style={{textAlign: "center"}}>
                                    No Records Found
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>

                <div className="bottom-component-container">

                    <div className="bottom-components">

                        <div className="component-field">
                            <label>Rows Per Page</label>   
                            <SelectTag
                                selectClass="rows-per-page"
                                optionArray={[5, 10, 15]}
                                onChange={this.props.onChange}
                            /> 
                        </div>

                        <div className="component-field">
                            <label>Total Records: {this.props.totalRecords}</label>   
                        </div>

                        <div className="component-field">
                            <label>Current page: {this.props.currentPage}/{this.props.totalPage}</label>
                            
                        </div>

                        <div className="angle-field">

                            <div className="angle-icon" onClick={this.props.prevPage}>
                                <i className="fa fa-angle-left" aria-hidden="true"></i>  
                            </div>

                            <div className="angle-icon" onClick={this.props.nextPage}>
                                <i className="fa fa-angle-right" aria-hidden="true"></i>  
                            </div>
                        </div>

                    </div>
                    

                </div>
            </div>
        );
    }
}
 
export default UsersTable;