import React from 'react';
import { Grid, Button } from '@material-ui/core';
import AddressList from '../../components/Address/List';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { openUploadModal, setActiveList } from '../../redux/actions';
import GoogleMapReact from 'google-map-react';

const MainPage = (props) => {
    return (
        <div>
            <Grid container>
                <Grid item style={{textAlign:'left'}} xs={6}>
                    <Button variant='outlined' color='primary' onClick={props.openUploadModal}>
                        Upload CSV
                    </Button>
                    <br/>
                    <Button
                    onClick={()=>props.setActiveList(0)}
                    disabled={props.locationData[0] == null ? true : false}
                    > 1 </Button>
                    <Button
                    onClick={()=>props.setActiveList(1)}
                    disabled={props.locationData[1] == null ? true : false}
                    > 2 </Button>
                    <Button 
                    onClick={()=>props.setActiveList(2)}
                    disabled={props.locationData[2] == null ? true : false}
                    > 3 </Button>
                    <br/>
                    <AddressList locationList={props.locationData[props.selectedLocationData]}/>
                </Grid>
                <Grid style={{
                    width:'100%',
                    height:'100vh'
                }} 
                item xs={6}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={{
                    lat: 59.95,
                    lng: 30.33
                  }}
                defaultZoom={11}
                >
                </GoogleMapReact>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    locationData: state.locationData,
    selectedLocationData: state.selectedLocationData
});

const mapDispatchToProps = (dispatch) => ({
    openUploadModal: () => dispatch(openUploadModal()),
    setActiveList: (index) => dispatch(setActiveList(index))
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(MainPage);