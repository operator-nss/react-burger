import axios from "axios";
import {getCookie, setCookie} from "typescript-cookie";
import {INFO_USER_URL, UPDATE_TOKEN_URL} from "./constants";
import {logout} from "../services/actions/userActions";

export const axiosWithTokens = axios.create({
  baseURL: INFO_USER_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
const requestHandler = (request: any) => {
  const accessToken = getCookie("accessToken")
  if (accessToken) {
    request.headers['authorization'] = accessToken;
  }
  return request;
}
axiosWithTokens.interceptors.request.use(request => requestHandler(request));

axiosWithTokens.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response.data.message === 'jwt expired') {
      try {
        const originalRequest = error.config
        const refreshToken = getCookie('refreshToken')
        if (refreshToken && error.config && !error.config._isRetry) {
          originalRequest._isRetry = true
          const {data} = await axiosWithTokens.post(UPDATE_TOKEN_URL, {"token":refreshToken});
          setCookie("accessToken", data.accessToken)
          setCookie("refreshToken", data.refreshToken)
          return axiosWithTokens.request(originalRequest)
        }
      } catch (e) {
        console.log(e)
        logout()
      }
    }
    return Response;
  }
);

// axiosWithTokens.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     console.log("error", error)
//     if (error.response.data.message === 'jwt expired') {
//       try {
//         console.log('expired')
//         const refreshToken = getCookie('refreshToken')
//         if(refreshToken) {
//           await fetchRefresh({"token":refreshToken})
//           return axiosWithTokens.request(error.config)
//         }
//       } catch (e) {
//         if (e === 'jwt expired') logout()
//       }
//     }
//     throw error
//   }
// )