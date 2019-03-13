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

const locationData = (state = [[],[],[]], action) => {
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
            return action.index;
        default:
            return state;
    }
}

const locationCategories = (state = [[],[],[]], action) => {
    switch(action.type) {
        case 'ADD_CATEGORY':
            return [action.categories, state[0], state[1]];
        default:
            return state;
    }
}

const userAccount = (state = null, action) => {
    switch(action.type) {
        case 'SIGN_OUT':
            return null;
        case 'SIGN_IN':
            return action.account;
        default:
            return state;
    }
}

const globalError = (state = {errorMessage: ''}, action) => {
    switch(action.type) {
        case 'SET_GLOBAL_ERROR':
            return {
                errorMessage: action.message
            }
        default:
            return state;
    }
}

export default combineReducers({
    locationCategories,
    globalError,
    userAccount,
    selectedLocationData,
    uploadModal,
    locationData
});
