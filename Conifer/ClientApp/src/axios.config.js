import axios from "axios";

const api = axios.create({
	baseURL: "https://pgtyacl1wg.execute-api.us-east-1.amazonaws.com/Prod/api",
});

export default api;
