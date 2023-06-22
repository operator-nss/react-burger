import axios from "axios";
import {getCookie} from "typescript-cookie";
import {INFO_USER_URL} from "./constants";
import {fetchRefresh} from "../services/actions/userActions";

export const axiosWithTokens = axios.create({
  baseURL: INFO_USER_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
const requestHandler = (request: any) => {
  const accessToken = getCookie("accessToken")
  if(accessToken) {
    request.headers['authorization'] = accessToken;
  } else {
    const refreshToken = getCookie("refreshToken")
    if(refreshToken) fetchRefresh({token: refreshToken})
  }
  return request;
}
axiosWithTokens.interceptors.request.use(request => requestHandler(request));