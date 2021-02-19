import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel'
import Item from './Item';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];

class ImageCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
 
    
      render () {
        console.log(this.props.users);
        return (
            <Carousel breakPoints={breakPoints}>

                {
                    this.props.users.map(user => <Item key={user.ID}><img key={user.ID} src={user.avatar} alt="profile pic" /></Item>)
                }

            </Carousel>
        )
      }
}


 
export default ImageCarousel;