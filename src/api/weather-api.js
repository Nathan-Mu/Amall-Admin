import { message } from 'antd';
import axios from 'axios';
import { WEATHER_API_KEY, WEATHER_CITY } from '../Config';

axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		message.error('Weather request failed', 1);
	}
);

export const weatherRequest = () => {
	return axios({
		timeout: 2000,
		method: 'get',
		url: `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY}&appid=${WEATHER_API_KEY}`,
	});
};
