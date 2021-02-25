import React, { Component } from 'react';
import "./SelectTag.scss"


class SelectTag extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 

            <select 
                id={this.props.selectId}
                className={this.props.selectClass}
                value={this.props.selectValue}
                onChange={this.props.onChange}
            >
                {
                    this.props.optionArray.map(option => <option key={Math.random()* 100} value={option}>{option}</option>) 
                }      
            </select>
            
        );
    }
}
 
export default SelectTag;