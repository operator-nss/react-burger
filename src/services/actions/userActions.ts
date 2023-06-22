import {createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {getCookie, removeCookie, setCookie} from "typescript-cookie";
import {
  INFO_USER_URL,
  LOGIN_URL, LOGOUT_URL,
  REGISTER_URL,
  RESET_PASSWORD_SEND_EMAIL_URL,
  RESET_PASSWORD_URL, UPDATE_TOKEN_URL
} from "../../utils/constants";
import {
  IError,
  IGetUserResponse,
  ILoginBody,
  ILoginResponse, ILogoutResponse,
  IRegisterBody, IRegisterResponse,
  IResetData,
  ISendEmailReset, IUpdateTokenBody, IUpdateTokenResponse
} from "../../types/types";
import {IUserState, setCheckAuth} from "../slices/user.slice";
import {axiosWithTokens} from "../../utils/axios.interceptors";

export const sendEmailReset = createAsyncThunk<ISendEmailReset, string>('user/sendEmailReset', async (email, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(RESET_PASSWORD_SEND_EMAIL_URL, {email});
    return data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err);
  }
})

export const sendEmailResetHandler = (builder: any) => {
  builder.addCase(sendEmailReset.pending, (state: IUserState) => {
    return {...state, isLoading: true, ResetEmailSent: false}
  })

  builder.addCase(sendEmailReset.fulfilled, (state: IUserState) => {
    return {...state, isLoading: false, ResetEmailSent: true}
  })

  builder.addCase(sendEmailReset.rejected, (state: IUserState) => {
    return {...state, isLoading: false, ResetEmailSent: false}
  })
}

export const resetPassword = createAsyncThunk<ISendEmailReset, IResetData>('user/resetPassword', async ({
                                                                                                          password,
                                                                                                          token
                                                                                                        }, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(RESET_PASSWORD_URL, {password, token});
    return data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err);
  }
})

export const resetPasswordHandler = (builder: any) => {
  builder.addCase(resetPassword.pending, (state: IUserState) => {
    return {...state, isLoading: true, successReset: null}
  })

  builder.addCase(resetPassword.fulfilled, (state: IUserState) => {
    return {...state, isLoading: false, successReset: true}
  })

  builder.addCase(resetPassword.rejected, (state: IUserState) => {
    return {...state, isLoading: false, successReset: null}
  })
}

export const login = createAsyncThunk<ILoginResponse, ILoginBody>('user/login', async ({
                                                                                         email,
                                                                                         password
                                                                                       }, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(LOGIN_URL, {email, password});
    return data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err);
  }
})

export const loginHandler = (builder: any) => {
  builder.addCase(login.pending, (state: IUserState) => {
    return {...state, isLoading: true, userLogin: false, errorMessage: ''}
  })

  builder.addCase(login.fulfilled, (state: IUserState, action: PayloadAction<ILoginResponse>) => {
    return {
      ...state,
      isLoading: false,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
      user: {
        email: action.payload.user.email,
        name: action.payload.user.name
      },
      userLogin: true
    }
  })

  builder.addCase(login.rejected, (state: IUserState, action: PayloadAction<IError>) => {
    return {...state, isLoading: false, userLogin: false, errorMessage: action.payload.response.data.message}
  })
}

export const register = createAsyncThunk<IRegisterResponse, IRegisterBody>('user/register', async ({
                                                                                                     email,
                                                                                                     password,
                                                                                                     name
                                                                                                   }, {rejectWithValue}) => {
  try {
    const {data} = await axios.post(REGISTER_URL, {email, password, name});
    return data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err);
  }
})

export const registerHandler = (builder: any) => {
  builder.addCase(register.pending, (state: IUserState) => {
    return {...state, isLoading: true, errorMessage: ''}
  })

  builder.addCase(register.fulfilled, (state: IUserState, action: PayloadAction<ILoginResponse>) => {
    return {
      ...state,
      isLoading: false,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
      user: {
        email: action.payload.user.email,
        name: action.payload.user.name
      }
    }
  })

  builder.addCase(register.rejected, (state: IUserState, action: PayloadAction<IError>) => {
    return {...state, isLoading: false, errorMessage: action.payload.response.data.message}
  })
}


export const getUser = createAsyncThunk<IGetUserResponse>('user/getUser', async (_, {rejectWithValue, dispatch}) => {
  try {
    const cookie = getCookie('accessToken')
    if (cookie) {
      const {data} = await axiosWithTokens.get(INFO_USER_URL);
      return data
    } else {
      dispatch(setCheckAuth(true))
    }
  } catch (err) {
    console.log(err)
    return rejectWithValue(err);
  }
})

export const getUserHandler = (builder: any) => {
  builder.addCase(getUser.pending, (state: IUserState) => {
    return {...state, isLoading: true, errorMessage: ''}
  })

  builder.addCase(getUser.fulfilled, (state: IUserState, action: PayloadAction<IGetUserResponse>) => {
    if (action.payload?.success) {
      return {
        ...state,
        isLoading: false,
        checkAuth: true,
        user: {
          email: action.payload.user.email,
          name: action.payload.user.name
        }
      }
    }
  })

  builder.addCase(getUser.rejected, (state: IUserState, action: PayloadAction<IError>) => {
    removeCookie('accessToken')
    removeCookie('refreshToken')
    return {
      ...state,
      isLoading: false,
      checkAuth: true,
      accessToken: '',
      refreshToken: '',
      user: {
        email: '',
        name: ''
      },
      errorMessage: action.payload.response.data.message
    }
  })
}


export const patchUser = createAsyncThunk<IGetUserResponse, IRegisterBody>('user/patchUser', async ({
                                                                                                      email, password,
                                                                                                      name
                                                                                                    }, {rejectWithValue}) => {
  try {
    const {data} = await axiosWithTokens.patch(INFO_USER_URL, {email, password, name});
    return data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err);
  }
})

export const patchUserHandler = (builder: any) => {
  builder.addCase(patchUser.pending, (state: IUserState) => {
    return {...state, isLoading: true, errorMessage: '', successSave: null}
  })

  builder.addCase(patchUser.fulfilled, (state: IUserState, action: PayloadAction<IGetUserResponse>) => {
    return {
      ...state,
      isLoading: false,
      successSave: true,
      user: {
        email: action.payload.user.email,
        name: action.payload.user.name
      }
    }
  })

  builder.addCase(patchUser.rejected, (state: IUserState, action: PayloadAction<IError>) => {
    return {...state, isLoading: false, errorMessage: action.payload.response.data.message}
  })
}


export const fetchRefresh = createAsyncThunk<IUpdateTokenResponse, IUpdateTokenBody>('user/fetchRefresh', async (refreshToken, {rejectWithValue}) => {
  try {
    const {data} = await axiosWithTokens.post(UPDATE_TOKEN_URL, refreshToken);
    return data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err);
  }
})

export const fetchRefreshHandler = (builder: any) => {
  builder.addCase(fetchRefresh.pending, (state: IUserState) => {
    return {...state, isLoading: true, errorMessage: ''}
  })

  builder.addCase(fetchRefresh.fulfilled, (state: IUserState, action: PayloadAction<IUpdateTokenResponse>) => {
    setCookie("accessToken", action.payload.accessToken)
    setCookie("refreshToken", action.payload.refreshToken)
    return {
      ...state,
      isLoading: false,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
    }
  })

  builder.addCase(fetchRefresh.rejected, (state: IUserState, action: PayloadAction<IError>) => {
    return {...state, isLoading: false, errorMessage: action.payload.response.data.message}
  })
}

export const logout = createAsyncThunk<ILogoutResponse>('user/logout', async (_, {rejectWithValue}) => {
  try {
    const refreshToken = getCookie("refreshToken")
    const {data} = await axiosWithTokens.post(LOGOUT_URL, {"token": refreshToken});
    return data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err);
  }
})

export const logoutHandler = (builder: any) => {
  builder.addCase(logout.pending, (state: IUserState) => {
    return {...state, isLoading: true, errorMessage: ''}
  })

  builder.addCase(logout.fulfilled, (state: IUserState) => {
    removeCookie('accessToken')
    removeCookie('refreshToken')
    return {
      ...state,
      isLoading: false,
      accessToken: '',
      refreshToken: '',
      user: {
        email: '',
        name: ''
      }
    }
  })

  builder.addCase(logout.rejected, (state: IUserState, action: PayloadAction<IError>) => {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.payload.response.data.message,
      accessToken: '',
      refreshToken: '',
      user: {
        email: '',
        name: ''
      }
    }
  })
}


