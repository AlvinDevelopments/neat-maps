import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import AddressList from '../../components/Address/List';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { openUploadModal, setActiveList, fetchMarkers } from '../../redux/actions';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import PlaceIcon from '@material-ui/icons/Place';

class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        let props = this.props;

        const bounds = {
            nw: {
              lat: 50.01038826014866,
              lng: -118.6525866875
            },
            se: {
              lat: 32.698335045970396,
              lng: -92.0217273125
            }
          };

          const size = {
            width: 640,
            height: 380,
          };

          const {center, zoom} = fitBounds(bounds, size);
          console.log(props.locationData)
        return (
            <div>
                <Grid container>
                    <Grid item 
                    style={{
                        height: '93vh',
                        overflow:'scroll',
                        textAlign:'left'
                    }} 
                    xs={12} md={6}>
                        <Button style={{margin: '10px 0px'}} variant='outlined' color='primary' onClick={props.openUploadModal}>
                            Upload Location CSV
                        </Button>
                        <br/>
                        <Button
                        variant={ props.locationData[0] != null && props.selectedLocationData === 0 ? 'contained' : 'text' }
                        onClick={()=>props.setActiveList(0)}
                        disabled={props.locationData[0] == null ? true : false}
                        > 1 </Button>
                        <Button
                        variant={ props.locationData[1] != null && props.selectedLocationData === 1 ? 'contained' : 'text' }
                        onClick={()=>props.setActiveList(1)}
                        disabled={props.locationData[1] == null ? true : false}
                        > 2 </Button>
                        <Button 
                        onClick={()=>props.setActiveList(2)}
                        variant={ props.locationData[2] != null && props.selectedLocationData === 2 ? 'contained' : 'text' }
                        disabled={props.locationData[2] == null ? true : false}
                        > 3 </Button>
                            <AddressList locationList={props.locationData[props.selectedLocationData]}/>
                    </Grid>
                    <Grid 
                    style={{
                        width:'100%',
                        height:'93vh'
                    }} 
                    item xs={12} md={6}
                    >
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                    defaultCenter={center}
                    defaultZoom={8}
                    center={
                        props.locationData && 
                        props.locationData[props.selectedLocationData] && 
                        props.locationData[props.selectedLocationData][0].marker &&
                        { 
                            lat: props.locationData[props.selectedLocationData][0].marker.lat, 
                            lng: props.locationData[props.selectedLocationData][0].marker.lng 
                        }
                    }
                    >
                        {
                            props.locationData && 
                            props.locationData[props.selectedLocationData] && 
                            props.locationData[props.selectedLocationData].map(location=>
                            location.marker != null && location.marker.lat &&
                            <PlaceIcon
                            style={{
                                color: props.locationCategories[props.selectedLocationData] &&
                                props.locationCategories[props.selectedLocationData].find((a)=>{return a.category === location.category}) && 
                                props.locationCategories[props.selectedLocationData].find((a)=>{return a.category === location.category}).color
                            }}
                            lat={location.marker.lat}
                            lng={location.marker.lng}
                            />)
                        }
                    </GoogleMapReact>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    locationData: state.locationData,
    locationCategories: state.locationCategories,
    selectedLocationData: state.selectedLocationData
});

const mapDispatchToProps = (dispatch) => ({
    fetchMarkers: (index) => dispatch(fetchMarkers(index)),
    openUploadModal: () => dispatch(openUploadModal()),
    setActiveList: (index) => dispatch(setActiveList(index))
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(MainPage);