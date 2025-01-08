import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { getProductsReducer } from './reducers/productReducer';

const reducer = combineReducers({
      getProducts: getProductsReducer,
});

const middleware = [thunk];

const store = configureStore ({                    //we can use redux instead of redux that's y it is cut
    reducer,
    devTools: composeWithDevTools(applyMiddleware(...middleware)),
});

export default store;