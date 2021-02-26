import React, { Component } from 'react';
import Button from '../Button';
import './ReactPopup.scss'
import ReactModal from 'react-modal'

class ReactPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        console.log("Show ...... popup", this.props.open);
        return ( 
            <ReactModal
                isOpen={this.props.open}
                appElement={document.getElementById("root")}
                className="react-popup-modal"
                overlayClassName="react-modal-overlay"
            >
                <div className="react-model-container">

                    <div className="react-model-body">

                    
                        <div className="react-model-header">
                            <div className={this.props.iconDivClass}>
                                <i className={this.props.iconName} aria-hidden="true"></i>
                            </div>
                            
                        </div>

                        <div className="react-model-content">
                            <h3>{this.props.modelHeaderText}</h3>
                            <p>{this.props.modelText}</p>
                        </div>

                        <div className="react-model-footer">

                            <div className="react-model-buttons">
                                <Button 
                                    btnclass="react-model-btn-cancel"
                                    btnName="Cancel"
                                    onClick={this.props.onCancel}
                                />

                                <Button 
                                    modelBtnId="modelButton"
                                    btnclass={this.props.modalPositiveBtn}
                                    btnName={this.props.modelBtnName}
                                    onClick={this.props.onDelete}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </ReactModal>
        );
    }
}
 
export default ReactPopup;