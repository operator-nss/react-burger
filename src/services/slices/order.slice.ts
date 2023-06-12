import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getOrderHandler} from "../actions/orderActions";

export interface IConstructorState {
  totalPrice: number
  isOrder: boolean
  orderCount: number | null
  orderError: boolean
  isOrderLoading: boolean
}

const initialState:IConstructorState = {
  totalPrice: 0,
  isOrder: false,
  orderCount: null,
  orderError: false,
  isOrderLoading: false
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload
    },
    setOrder: (state, action: PayloadAction<boolean>) => {
      state.isOrder = action.payload
    },
  },
  extraReducers: builder => {
    getOrderHandler(builder)
  }
})

export const {setTotalPrice, setOrder} = orderSlice.actions

export default orderSlice.reducer
