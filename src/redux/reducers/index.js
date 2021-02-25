import { combineReducers } from 'redux';
import loginReducer from './login';
import productReducer from './product';
import categoriesReducer from './categories';

export default combineReducers({
	userInfo: loginReducer,
	categories: categoriesReducer,
	stagedProduct: productReducer,
});
