import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import rootReducer from './reducers';

export const store = createStore(rootReducer);

// export default () => {
//     // let store = createStore(persistedReducer, applyMiddleware(thunk));
//     let store = createStore(reducer);
//     // let persistor = persistStore(store);
//     // return { store, persistor };
//     return { store };
// }