import React, { Component } from 'react';
import './InputTag.scss'

class InputTag extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputText : ""
        };
    }

    
    render() {
        return (
            <input
                id={this.props.id} 
                className={this.props.inputClass} 
                type={this.props.type} 
                value={this.props.inputText} 
                placeholder={this.props.placeHolder} 
                onChange={this.props.onChange} 
                disabled={this.props.disabled} 
                onClick={this.props.onClick}
                name={this.props.name}
            />
           
        );
    }
}

export default InputTag;