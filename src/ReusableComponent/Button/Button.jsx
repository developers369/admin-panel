import React, { Component } from 'react';
import './Button.scss'
class Button extends Component {
    state = {  }
    render() { 
       
        return ( 
            <button id={this.props.modelBtnId} className={this.props.btnclass} type={this.props.btnType} onClick={this.props.onClick} data-toggle={this.props.dataToggle} data-target={this.props.dataTarget}>{this.props.btnName}</button>
         );
    }
}
 
export default Button;