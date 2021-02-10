import { message } from 'antd';
import axios from 'axios';
import qs from 'querystring';
import { BASE_URL } from '../config';
import store from '../redux/store';
import { deleteUserInfo } from '../redux/actions/login';

const instance = axios.create({
	baseURL: BASE_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
	config => {
		// add token to headers
		const { token } = store.getState().userInfo;
		if (token) {
			config.headers.Authorization = `atguigu_${token}`;
		}
		// stringfy data if it's a post request
		const { method, data } = config;
		if (method.toLowerCase() === 'post' && data instanceof Object) {
			config.data = qs.stringify(data);
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

// Add a response interceptor
instance.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		if (error.response.status === 401) {
			// if user's token is expired, show error and redirect to login page
			message.error('Identity verification failed, please log in again', 1);
			store.dispatch(deleteUserInfo);
		} else {
			// else show error message and break the promise chain
			message.error(error.message);
			return new Promise(() => {});
		}
	}
);

export default instance;
