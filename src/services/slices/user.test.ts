import axios from "axios";
import {
  fetchRefresh,
  getUser,
  login,
  logout,
  patchUser,
  register,
  resetPassword,
  sendEmailReset
} from "../actions/userActions";
import {initialState} from "./user.slice";
import {getOrder} from "../actions/orderActions";
import userReducer from './user.slice'
import {types} from "sass";
import Error = types.Error;
import {IGetUserResponse, ILoginResponse, IRegisterResponse, IUpdateTokenResponse} from "../../types/types";


jest.mock('axios')
// axios.post = jest.fn().mockRejectedValue(getError);

describe("userReducer", () => {
  let email: string;
  let name: string;
  let accessToken: string;
  let refreshToken: string;
  let password: string;
  let token: string;
  let loginResponse: ILoginResponse;
  let registerResponse: IRegisterResponse;
  let getUserResponse: IGetUserResponse;
  let fetchRefreshResponse: IUpdateTokenResponse;
  beforeAll(() => {
    email = 'test@test.ru';
    name = 'name';
    accessToken = 'accessToken';
    refreshToken = 'refreshToken';
    password = 'password';
    token = 'token';
    loginResponse = {
      success: true,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      user: {
        email: email,
        name: 'name'
      }
    };
    registerResponse = {
      success: true,
      user: {
        email,
        name
      },
      accessToken,
      refreshToken
    };
    getUserResponse = {
      success: true,
      user: {
        email,
        name
      }
    };
    fetchRefreshResponse = {
      success: true,
      accessToken,
      refreshToken
    }
  })

  it("should send email reset", async () => {
    const dispatch = jest.fn();
    const thunk = sendEmailReset(email);
    await thunk(dispatch, () => {
    }, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe('user/sendEmailReset/pending');
    expect(end[0].type).toBe('user/sendEmailReset/rejected');
  });

  it("should change status with 'sendEmailReset.pending' action", () => {
    const state = userReducer(initialState, sendEmailReset.pending('', ''))
    expect(state.isLoading).toBeTruthy()
    expect(state.ResetEmailSent).toBeFalsy()
  });

  it("should change status with 'sendEmailReset.fulfilled' action", () => {
    const state = userReducer(initialState, sendEmailReset.fulfilled({
      message: 'Reset email sent',
      success: true
    }, '', ''))
    expect(state.isLoading).toBeFalsy()
    expect(state.ResetEmailSent).toBeTruthy()
  });

  it("should change status with 'sendEmailReset.rejected' action", async () => {
    const getError = new Error('network error');
    axios.post = jest.fn().mockRejectedValue(getError);
    const dispatch = jest.fn();
    const thunk = sendEmailReset(email);
    await thunk(dispatch, () => {}, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(start[0].type).toBe('user/sendEmailReset/pending');
    expect(end[0].meta.requestStatus).toBe('rejected');
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  });

  //resetPassword
  it("should send reset password", async () => {
    const dispatch = jest.fn();
    const thunk = resetPassword({password, token});
    await thunk(dispatch, () => {
    }, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe('user/resetPassword/pending');
    expect(end[0].type).toBe('user/resetPassword/rejected');
  });

  it("should change status with 'resetPassword.pending' action", () => {
    const state = userReducer(initialState, resetPassword.pending('', {password,token}))
    expect(state.isLoading).toBeTruthy()
    expect(state.successReset).toBe(null)
  });

  it("should change status with 'resetPassword.fulfilled' action", () => {
    const state = userReducer(initialState, resetPassword.fulfilled({message: 'success',success: true}, '', {password,token}))
    expect(state.isLoading).toBeFalsy()
    expect(state.successReset).toBeTruthy()
  });

  it("should change status with 'resetPassword.rejected' action", async () => {
    const getError = new Error('network error');
    axios.post = jest.fn().mockRejectedValue(getError);
    const dispatch = jest.fn();
    const thunk = resetPassword({token,password});
    await thunk(dispatch, () => {}, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(start[0].type).toBe('user/resetPassword/pending');
    expect(end[0].meta.requestStatus).toBe('rejected');
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  });

  //login
  it("should send login action", async () => {
    const dispatch = jest.fn();
    const thunk = login({password, email});
    await thunk(dispatch, () => {
    }, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe('user/login/pending');
    expect(end[0].type).toBe('user/login/rejected');
  });

  it("should change status with 'login.pending' action", () => {
    const state = userReducer(initialState, login.pending('', {email,password}))
    expect(state.isLoading).toBeTruthy()
    expect(state.userLogin).toBeFalsy()
    expect(state.errorMessage).toBe('')
  });

  it("should change status with 'login.fulfilled' action", () => {
    const state = userReducer(initialState, login.fulfilled(loginResponse, '', {password,email}))
    expect(state.isLoading).toBeFalsy()
    expect(state.accessToken).toBe(loginResponse.accessToken)
    expect(state.refreshToken).toBe(loginResponse.refreshToken)
    expect(state.user.name).toBe(loginResponse.user.name)
    expect(state.user.email).toBe(loginResponse.user.email)
    expect(state.userLogin).toBeTruthy()
  });

  it("should change status with 'login.rejected' action", async () => {
    const getError = new Error('network error');
    axios.post = jest.fn().mockRejectedValue(getError);
    const dispatch = jest.fn();
    const thunk = login({email,password});
    await thunk(dispatch, () => {}, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(start[0].type).toBe('user/login/pending');
    expect(end[0].meta.requestStatus).toBe('rejected');
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  });

  //register
  it("should send register action", async () => {
    const dispatch = jest.fn();
    const thunk = register({password, email, name});
    await thunk(dispatch, () => {
    }, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe('user/register/pending');
    expect(end[0].type).toBe('user/register/rejected');
  });

  it("should change status with 'register.pending' action", () => {
    const state = userReducer(initialState, register.pending('', {email,password, name}))
    expect(state.isLoading).toBeTruthy()
    expect(state.errorMessage).toBe('')
  });

  it("should change status with 'register.fulfilled' action", () => {
    const state = userReducer(initialState, register.fulfilled(registerResponse, '', {password,email, name}))
    expect(state.isLoading).toBeFalsy()
    expect(state.accessToken).toBe(registerResponse.accessToken)
    expect(state.refreshToken).toBe(registerResponse.refreshToken)
    expect(state.user.name).toBe(registerResponse.user.name)
    expect(state.user.email).toBe(registerResponse.user.email)
  });

  it("should change status with 'register.rejected' action", async () => {
    const getError = new Error('network error');
    axios.post = jest.fn().mockRejectedValue(getError);
    const dispatch = jest.fn();
    const thunk = register({email,password, name});
    await thunk(dispatch, () => {}, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(start[0].type).toBe('user/register/pending');
    expect(end[0].meta.requestStatus).toBe('rejected');
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  });

  //getUser
  it("should getUser action", async () => {
    const dispatch = jest.fn();
    const thunk = getUser();
    await thunk(dispatch, () => {
    }, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(calls).toHaveLength(3);
    expect(start[0].type).toBe('user/getUser/pending');
    expect(end[0].type).toBe('user/setCheckAuth');
  });

  it("should change status with 'getUser.pending' action", () => {
    const state = userReducer(initialState, getUser.pending(''))
    expect(state.isLoading).toBeTruthy()
    expect(state.errorMessage).toBe('')
  });

  it("should change status with 'getUser.fulfilled' action", () => {
    const state = userReducer(initialState, getUser.fulfilled(getUserResponse, ''))
    expect(state.isLoading).toBeFalsy()
    expect(state.checkAuth).toBeTruthy()
    expect(state.user.name).toBe(registerResponse.user.name)
    expect(state.user.email).toBe(registerResponse.user.email)
  });

  //patchUser
  it("should send patch User action", async () => {
    const dispatch = jest.fn();
    const thunk = patchUser({password, email, name});
    await thunk(dispatch, () => {
    }, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe('user/patchUser/pending');
    expect(end[0].type).toBe('user/patchUser/rejected');
  });

  it("should change status with 'patchUser.pending' action", () => {
    const state = userReducer(initialState, patchUser.pending('', {email,password, name}))
    expect(state.isLoading).toBeTruthy()
    expect(state.errorMessage).toBe('')
    expect(state.successSave).toBe(null)
  });

  it("should change status with 'patchUser.fulfilled' action", () => {
    const state = userReducer(initialState, patchUser.fulfilled(registerResponse, '', {password,email, name}))
    expect(state.isLoading).toBeFalsy()
    expect(state.successSave).toBeTruthy()
    expect(state.user.name).toBe(registerResponse.user.name)
    expect(state.user.email).toBe(registerResponse.user.email)
  });

  it("should change status with 'patchUser.rejected' action", async () => {
    const getError = new Error('network error');
    axios.post = jest.fn().mockRejectedValue(getError);
    const dispatch = jest.fn();
    const thunk = patchUser({email,password, name});
    await thunk(dispatch, () => {}, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(start[0].type).toBe('user/patchUser/pending');
    expect(end[0].meta.requestStatus).toBe('rejected');
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  });

  //fetchRefresh
  it("should send fetch refresh action", async () => {
    const dispatch = jest.fn();
    const thunk = fetchRefresh({token});
    await thunk(dispatch, () => {
    }, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe('user/fetchRefresh/pending');
    expect(end[0].type).toBe('user/fetchRefresh/rejected');
  });

  it("should change status with 'fetchRefresh.pending' action", () => {
    const state = userReducer(initialState, fetchRefresh.pending('', {token}))
    expect(state.isLoading).toBeTruthy()
    expect(state.errorMessage).toBe('')
  });

  it("should change status with 'fetchRefresh.fulfilled' action", () => {
    const state = userReducer(initialState, fetchRefresh.fulfilled(fetchRefreshResponse,'', {token}))
    expect(state.isLoading).toBeFalsy()
    expect(state.accessToken).toBe(fetchRefreshResponse.accessToken)
    expect(state.refreshToken).toBe(fetchRefreshResponse.refreshToken)
  });

  it("should change status with 'fetchRefresh.rejected' action", async () => {
    const getError = new Error('network error');
    axios.post = jest.fn().mockRejectedValue(getError);
    const dispatch = jest.fn();
    const thunk = fetchRefresh({token});
    await thunk(dispatch, () => {}, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(start[0].type).toBe('user/fetchRefresh/pending');
    expect(end[0].meta.requestStatus).toBe('rejected');
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  });

  //logout
  it("should send logout action", async () => {
    const dispatch = jest.fn();
    const thunk = logout();
    await thunk(dispatch, () => {
    }, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe('user/logout/pending');
    expect(end[0].type).toBe('user/logout/rejected');
  });

  it("should change status with 'logout.pending' action", () => {
    const state = userReducer(initialState, logout.pending(''))
    expect(state.isLoading).toBeTruthy()
    expect(state.errorMessage).toBe('')
  });

  it("should change status with 'logout.fulfilled' action", () => {
    const state = userReducer(initialState, logout.fulfilled({token}, ''))
    expect(state.isLoading).toBeFalsy()
    expect(state.accessToken).toBe('')
    expect(state.refreshToken).toBe('')
    expect(state.user.name).toBe('')
    expect(state.user.email).toBe('')
  });

  it("should change status with 'logout.rejected' action", async () => {
    const getError = new Error('network error');
    axios.post = jest.fn().mockRejectedValue(getError);
    const dispatch = jest.fn();
    const thunk = logout();
    await thunk(dispatch, () => {}, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(start[0].type).toBe('user/logout/pending');
    expect(end[0].meta.requestStatus).toBe('rejected');
    expect(end[0].meta.rejectedWithValue).toBeTruthy();
  });
});