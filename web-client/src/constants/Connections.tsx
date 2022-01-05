const env = process.env.ENV || 'local';
const localhost = 'localhost';
const urls: any = {
	local: {
		baseUrl: `http://${localhost}:8088`,
		fileSystemUrl: '',
	},

	prod: {
		baseUrl: 'https://huroko', //TODO: set Huroko url
		fileSystemUrl: '',
	},
};

export const baseUrl = urls[env].baseUrl;
export const fileSystemUrl = urls[env].fileSystemUrl;
