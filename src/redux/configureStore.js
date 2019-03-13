import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel1,
    whitelist: [
        'locationData',
        'selectedLocationData',
        'locationCategories',
        'userAccount'
    ]
  }

let persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);
    return { store, persistor };
}