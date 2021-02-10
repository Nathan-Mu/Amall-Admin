import { DELETE_USER_INFO, SAVE_USER_INFO } from '../action_types';

export const saveUserInfo = data => {
	localStorage.setItem('user', JSON.stringify(data.user));
	localStorage.setItem('token', JSON.stringify(data.token));
	return { type: SAVE_USER_INFO, data };
};

export const deleteUserInfo = data => {
	localStorage.setItem('user', '');
	localStorage.setItem('token', '');
	return { type: DELETE_USER_INFO, data };
};
