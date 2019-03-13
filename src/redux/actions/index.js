import Axios from 'axios';
import qs from 'qs';

export const openUploadModal = () => {
    return ({
        type: 'OPEN_UPLOAD_MODAL'
    });
};

export const closeUploadModal = () => {
    return ({
        type: 'CLOSE_UPLOAD_MODAL'
    });
};

export const signIn = (email, password) => {
    return (dispatch) => {

        Axios({
            method: 'POST',
            url: 'http://neat-mvp-api.herokuapp.com/v1/auth',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: qs.stringify({
                email,
                password
            })
        })
        .then(response=>{
            console.log(response);
            dispatch({
                type: 'SIGN_IN',
                account: response
            })
        })
        .catch((err)=> {
            console.log(err.response);
            dispatch(setGlobalError('Invalid credentials, please try again!'))
        });

    }
}

export const signOut = () => {
    return ({
        type: 'SIGN_OUT'
    })
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


export const addNewLocation = (locationData) => {
    return async (dispatch) => {
    
        let calls = await locationData.map((location)=>{
            return Axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${[location.address,location.city,location.state].join(', ').replace(/ /g, '+')}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
        });

        Promise.all(calls)
        .then( async (values)=>{

            let i = -1;

            locationData = await locationData.map(location=>{
                i = i + 1;
                return {
                    ...location,
                    marker: values[i] && 
                    values[i].data && 
                    values[i].data.results[0] &&
                    values[i].data.results[0].geometry &&
                    values[i].data.results[0].geometry.location
                }
                
            });

            let catColors = [];
            let cat = new Set(locationData.map((l=>{return l.category})));
            cat.forEach(c=>{
                catColors.push({
                    category: c,
                    color: getRandomColor()
                });
            });

            dispatch(setActiveList(0));

            dispatch({
                type: 'ADD_LOCATION_DATA',
                locationData
            });

            dispatch({
                type: 'ADD_CATEGORY',
                categories: catColors
            });

        });
    }
}

export const setActiveList = (index) => {
    return async (dispatch, getState) => {

        dispatch({
            type: 'SET_ACTIVE_INDEX',
            index
        });

        dispatch(fetchMarkers(index));

    }
}

export const fetchMarkers = (index) => {
    return async (dispatch, getState) => {

    }
}


export const setGlobalError = (message) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'SET_GLOBAL_ERROR',
            message
        });
        console.log('settimeout')
        setTimeout(() => {
            dispatch({
                type: 'SET_GLOBAL_ERROR',
                message: ''
            });
        }, 3000);

    }
}