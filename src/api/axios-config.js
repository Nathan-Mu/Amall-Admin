import { message } from 'antd';
import axios from 'axios';
import qs from 'querystring';

const instance = axios.create({});

// Add a request interceptor
instance.interceptors.request.use(
	config => {
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
		message.error(error.message);
		return new Promise(() => {});
	}
);

export default instance;
