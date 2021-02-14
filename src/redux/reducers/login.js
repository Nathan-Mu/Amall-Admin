import { SAVE_USER_INFO, DELETE_USER_INFO } from '../action_types';

let user = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: {};
let token = localStorage.getItem('token');
let isLogin = user && token;

const initState = { user, token, isLogin };

// eslint-disable-next-line import/no-anonymous-default-export
export default (prevState = initState, action) => {
	const { type, data } = action;
	switch (type) {
		case SAVE_USER_INFO:
			return { user: data.user, token: data.token, isLogin: true };
		case DELETE_USER_INFO:
			return { user: {}, token: '', isLogin: false };
		default:
			return prevState;
	}
};
