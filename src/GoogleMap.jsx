import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class GoogleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <GoogleMapReact
                bootstrapURLKeys={{ key:  "AIzaSyDLQtMNQt9UH1-k6ZolKvKlpsVCP227n9g"}}
                defaultCenter={{
                    lat : 59.955413,
                    lng: 30.337844
                }}
                defaultZoom={15}
            >
            {/* <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker" 
            /> */}
          </GoogleMapReact>
            // <Map google={this.props.google}>
        
            //     <Marker
            //         title={'The marker`s title will appear as a tooltip.'}
            //         name={'SURAT'}
            //         position={{lat: 21.170240, lng: 72.831062}} 
            //     />
        
            //     <InfoWindow onClose={this.onInfoWindowClose}>
            //         {/* <div>
            //         <h1>{this.state.selectedPlace.name}</h1>
            //         </div> */}
            //     </InfoWindow>
            // </Map>
        );
    }

}

export default GoogleMap
 
// export default GoogleApiWrapper({
//     apiKey: "AIzaSyDLQtMNQt9UH1-k6ZolKvKlpsVCP227n9g"
//   })(GoogleMap)