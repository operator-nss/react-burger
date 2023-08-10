import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
  fetchRefreshHandler,
  getUserHandler,
  loginHandler, logoutHandler, patchUserHandler,
  registerHandler,
  resetPasswordHandler,
  sendEmailResetHandler
} from "../actions/userActions";

export interface IUserState {
  isLoading: boolean
  name: string
  login: string
  password: string
  email: string
  ResetEmailSent: boolean
  successReset: boolean | null
  successSave: boolean | null
  errorMessage: string
  accessToken:string
  refreshToken: string
  checkAuth: boolean
  userLogin: boolean
  user: {
    email: string
    name: string
  }
}

export const initialState: IUserState = {
  isLoading: false,
  name: '',
  login: '',
  password: '',
  ResetEmailSent: false,
  email: '',
  successReset: null,
  successSave: null,
  errorMessage: '',
  accessToken: '',
  refreshToken: '',
  checkAuth: false,
  userLogin: false,
  user: {
    email: '',
    name: ''
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearSuccess: (state) => {
      state.successReset = null
    },
    clearErrorMessage: (state) => {
      state.errorMessage = ''
    },
    clearSuccessMessage: (state) => {
      state.successSave = null
    },
    setCheckAuth: (state, action: PayloadAction<boolean>) => {
      state.checkAuth = action.payload
    },
    clearUserLogin: (state) => {
      state.userLogin = false
    },
  },
  extraReducers: builder => {
    sendEmailResetHandler(builder)
    resetPasswordHandler(builder)
    loginHandler(builder)
    getUserHandler(builder)
    registerHandler(builder)
    patchUserHandler(builder)
    fetchRefreshHandler(builder)
    logoutHandler(builder)
  }
})

export const {clearSuccess,setCheckAuth,clearUserLogin, clearErrorMessage, clearSuccessMessage} = userSlice.actions

export default userSlice.reducer
