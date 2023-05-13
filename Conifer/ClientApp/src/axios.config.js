import axios from "axios";
import { getToken } from "./Auth/Auth";

let token = getToken();
const api = axios.create({
  baseURL: "https://pgtyacl1wg.execute-api.us-east-1.amazonaws.com/Prod/api",
});

const pvtapi = axios.create({
  headers: { Authoriztion: `Bearer ${token}` },
});

const pbapi = axios.create();

export default api;
export { pvtapi, pbapi };
