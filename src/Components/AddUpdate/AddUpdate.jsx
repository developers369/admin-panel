import React, { Component } from 'react';
import Previews from '../../Dropzone';
import Button from '../../ReusableComponent/Button';
import InputTag from '../../ReusableComponent/InputTag';
import "./AddUpdate.scss"

class AddUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 

            <div className="add-form-container">
                <div className="add-form-div">

                    <p className="first">ADD USER</p>

                    <p className="second">PERSON INFO</p>               

                    <form className="add-form">

                        <div className="form-items">

                            <div className="form-item">
                                <label>Full Name<sup>*</sup></label>
                                <InputTag
                                    inputClass="inputTag"
                                    type="text"
                                    inputText={this.state.fullName}
                                    placeHolder="Full name"
                                    onChange={(e) => this.handleChange(e, "fullName")}
                                />
                            </div>

                            <div className="form-item">
                                <label>Email</label>
                                <InputTag
                                    inputClass="inputTag"
                                    type="email"
                                    inputText={this.state.email}
                                    placeHolder="Email"
                                    onChange={(e) => this.handleChange(e, "email")}
                                />
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
                            </div>
                            
                            <div className="form-item">

                                <Button
                                    btnclass="form-add-btn"
                                    btnName="Add"
                                    onClick={() => this.handleAdd}
                                />

                                <Button
                                    btnclass="form-reset-btn"
                                    btnName="Reset"
                                    onClick={() => this.handleReset}
                                />

                                <Button
                                    btnclass="form-cancel-btn"
                                    btnName="Cancel"
                                    onClick={() => this.handleCancel}
                                />
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
                            </div>

                            <div className="form-items">

                                <div className="form-item">
                                    <label>Profile Pic<sup>*</sup></label>
                                    <Previews 
                                        passFile={this.handleFile} 
                                        cropImage={this.state.avatar}
                                    />
                                </div>
                    </div>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default AddUpdate;