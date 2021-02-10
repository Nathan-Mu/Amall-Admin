import { BASE_URL } from '../config';
import axios from './axios-config';

export const loginRequest = (username, password) => {
	return axios({
		method: 'post',
		url: `${BASE_URL}/login`,
		data: { username, password },
	});
};
