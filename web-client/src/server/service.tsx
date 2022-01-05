import axios from 'axios';
import { baseUrl } from '../constants/Connections';

interface httpResponse {
	status: number;
	data?: any;
	message?: any;
}

export const validateUserTokenAsync = async (token: string | null): Promise<httpResponse> => {
	const options: any = {
		method: 'GET',
		url: `${baseUrl}/api/validateToken?token=${token}`,
	};
	console.log(options);

	return axios(options)
		.then((response) => {
			console.log(response);
			return { status: response?.status, message: response?.data };
		})
		.catch((error) => {
			console.log('error: ', error.response);
			return { status: error?.response?.status, message: error?.response?.data };
		});
};
