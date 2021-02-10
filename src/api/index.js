import axios from './axios-config';

export const loginRequest = (username, password) => {
	return axios({
		method: 'post',
		url: '/login',
		data: { username, password },
	});
};

export const categoryRequest = () => {
	return axios({
		method: 'get',
		url: '/manage/category/list',
	});
};
