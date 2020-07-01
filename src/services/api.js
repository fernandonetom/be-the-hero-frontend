import axios from "axios";

const api = axios.create({
	baseURL:
		process.env.REACT_APP_ENV === "DEV"
			? process.env.REACT_APP_URL_LOCAL
			: process.env.REACT_APP_BASE_URL,
});
export default api;
