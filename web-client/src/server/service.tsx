import axios from 'axios';
import searchDto, { searchResponseDto } from '../dtos/search.dto';
import { UserPasswordDto } from '../dtos/user';
import { LocalStorageItem } from '../utils/local-storage/local-storage-item.enum';
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
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
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
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			console.log('error: ', error.response);
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};

export const patchUser = async (user: any | null): Promise<httpResponse> => {
	console.log(Object.keys(user));

	const token = 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN);
	const options: any = {
		method: 'PUT',
		url: `/api/users/${user?.id}`,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
		},
		data: user,
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
export const changePasswordAsync = async (userPassword: UserPasswordDto): Promise<httpResponse> => {
	const options: any = {
		method: 'PUT',
		url: `/api/users/changePassword`,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
		},
		data: userPassword,
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

export const getAllLodgesAsync = async (): Promise<httpResponse> => {
	const options: any = {
		method: 'GET',
		url: `/api/lodge`,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};
export const getAllFreePeriodsAsync = async (): Promise<httpResponse> => {
	const options: any = {
		method: 'GET',
		url: `/api/freePeriod`,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};
export const getAllReservations = async (): Promise<httpResponse> => {
	const options: any = {
		method: 'GET',
		url: `/api/reservation/all`,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};
export const getAllReservationsForUser = async (userId: number): Promise<httpResponse> => {
	const options: any = {
		method: 'GET',
		url: `/api/reservation/forUser/${userId}`,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};
export const getAllHistoryReservationsForUser = async (userId: number): Promise<httpResponse> => {
	const options: any = {
		method: 'GET',
		url: `/api/reservation/historyForUser/${userId}`,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};
export const getQuickActionsAsync = async (reservationId: number): Promise<httpResponse> => {
	const options: any = {
		method: 'GET',
		url: `/api/reservation/openReservations/${reservationId}`,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};
export const getPossibleLodges = async (data: any): Promise<httpResponse> => {
	const options: any = {
		method: 'POST',
		url: `/api/lodge/possibleReservations`,
		data: data,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};
export const makeRevisionAsync = async (data: any): Promise<httpResponse> => {
	const options: any = {
		method: 'POST',
		url: `/api/reservation/createRevision`,
		data: data,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};

export const makeComplaintAsync = async (data: any): Promise<httpResponse> => {
	const options: any = {
		method: 'POST',
		url: `/api/reservation/createComplaint`,
		data: data,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};

export const getComplaintsFromUserAsync = async (userId: any): Promise<httpResponse> => {
	const options: any = {
		method: 'GET',
		url: `/api/reservation/complaints/${userId}`,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
			Authorization: 'Bearer ' + localStorage.getItem(LocalStorageItem.ACCESS_TOKEN),
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};
