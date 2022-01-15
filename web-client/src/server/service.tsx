import axios from 'axios';
import searchDto, { searchResponseDto } from '../dtos/search.dto';
import localStorageUtil from '../utils/local-storage/local-storage-util';

interface httpResponse {
	status: number;
	data?: any;
	message?: any;
}

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
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
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

	return axios(options)
		.then((response) => {
			return { status: response?.status, message: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};

// Search list of entities
export const searchDataAsync = async (data: searchDto): Promise<httpResponse> => {
	const options: any = {
		method: 'POST',
		url: `/api/search/entities`,
		header: {
			'Content-Type': 'application/json',
		},
		data,
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data as searchResponseDto };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};

export const getUserByTokenAsync = async (): Promise<httpResponse> => {
	const token = localStorageUtil.getAccessToken();
	const options: any = {
		method: 'GET',
		url: `/api/getUserByToken?token=${token}`,
	};

	return axios(options)
		.then((response) => {
			console.log(response);
			return { status: response?.status, message: response?.data };
		})
		.catch((error) => {
			console.log('error: ', error.response);
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};
