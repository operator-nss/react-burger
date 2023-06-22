export interface IBurger {
  calories: number
  carbohydrates: number
  fat: number
  image: string
  image_large: string
  image_mobile: string
  type: string
  _id: string
  name: string
  price: number
  proteins: number
  __v: number
}

export interface IConstructorDnDBurger {
  burger: IBurger
  index: number
  itemIndex: number
}

export type InputType = "email" | "password" | "text" | undefined;

export interface ISendEmailReset {
  message: string,
  success: boolean
}

export interface IResetData {
  password: string,
  token: string
}

export interface IRegisterBody {
  email: string,
  password: string
  name: string
}

export interface IRegisterResponse {
  success: boolean
  user: {
    email: string
    name: string
  }
  accessToken: string
  refreshToken: string
}

export interface ILoginBody {
  email: string
  password: string
}

export interface ILoginResponse {
  success: boolean
  accessToken: string
  refreshToken: string
  user: {
    email: string
    name: string
  }
}

export interface IUpdateTokenBody {
  token: string
}

export interface ILogoutResponse {
  token: string
}

export interface IUpdateTokenResponse {
  success: boolean
  accessToken: string
  refreshToken: string
}

export interface IGetUserResponse {
  success: boolean
  user: {
    email: string
    name: string
  }
}

export interface IError {
  response: {
    data: {
      success: string
      message: string
    }
  }
}