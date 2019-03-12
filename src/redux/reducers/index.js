import { combineReducers } from 'redux';

const uploadModal = (state = {isOpen: false}, action) => {
    switch(action.type) {
        case 'OPEN_UPLOAD_MODAL':
            return {
                ...state,
                isOpen: true,
            };
        case 'CLOSE_UPLOAD_MODAL':
            return {
                ...state,
                isOpen: false
            }
        default:
            return state;
    }
}

const locationData = (state = [], action) => {
    switch(action.type) {
        case 'ADD_LOCATION_DATA':
            return [action.locationData, state[0], state[1]];
        default:
            return state;
    }
}

const selectedLocationData = (state = 0, action) => {
    switch(action.type) {
        case 'SET_ACTIVE_INDEX':
            console.log('set active index');
            console.log(action.index);
            return action.index;
        default:
            return state;
    }
}

export default combineReducers({
    selectedLocationData,
    uploadModal,
    locationData
});