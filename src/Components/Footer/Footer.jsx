import React, { Component } from 'react';
import "./Footer.scss"
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="footer-div">
                <p>2020@ My admin</p>
            </div>
         );
    }
}
 
export default Footer;