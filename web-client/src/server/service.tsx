import axios from 'axios';
import LocalStorageUtil from '../utils/local-storage-util';

interface httpResponse {
	status: number;
	data?: any;
	message?: any;
}

const storage = new LocalStorageUtil();
export const validateUserTokenAsync = async (token: string | null): Promise<httpResponse> => {
	const options: any = {
		method: 'GET',
		url: `/api/validateToken?token=${token}`,
	};

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
export const singUpAsync = async (data: any | null): Promise<httpResponse> => {
	const options: any = {
		method: 'POST',
		url: `/api/auth/signup`,
		header: {
			'Content-Type': 'application/json',
		},
		data,
	};
	console.log(options);

	return axios(options)
		.then((response) => {
			return { status: response?.status, message: response?.data };
		})
		.catch((error) => {
			return { status: error?.response?.status, message: error?.response?.data };
		});
};
