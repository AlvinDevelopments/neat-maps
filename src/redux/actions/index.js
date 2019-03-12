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

export const addNewLocation = (locationData) => {
    console.log('add new test')
    console.log(locationData);
    return ({
        type: 'ADD_LOCATION_DATA',
        locationData
    });
}

export const setActiveList = (index) => {
    return ({
        type: 'SET_ACTIVE_INDEX',
        index
    })
}
