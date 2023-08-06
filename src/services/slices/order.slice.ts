import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getOrderHandler, wsClose, wsError, wsMessage, wsOpen} from "../actions/orderActions"

export interface IOrders {
  orders: IOrder[]
  success: boolean
  total: number
  totalToday: number
}

export interface IOrder {
  createdAt: string
  updatedAt: string
  ingredients: string[]
  name: string
  number: number
  status: string
  _id: string
}

export interface IConstructorState {
  totalPrice: number
  isOrder: boolean
  orderCount: number | null
  orderError: boolean
  isOrderLoading: boolean
  total: number | null
  totalToday: number | null
  orders: IOrder[] | null
  selectedOrder: null | IOrder,
  error: string
}

const initialState:IConstructorState = {
  totalPrice: 0,
  isOrder: false,
  orderCount: null,
  orderError: false,
  isOrderLoading: false,
  total: null,
  totalToday: null,
  orders: null,
  selectedOrder: null,
  error: ""
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
    setOrders: (state, action: PayloadAction<IOrders>) => {
      state.total = action.payload.total
      state.totalToday = action.payload.totalToday
      state.orders = action.payload.orders
    },
    setChosenOrder: (state, action: PayloadAction<IOrder | null>) => {
      state.selectedOrder = action.payload
    },
    connect: (state) => {
      return state
    },
  },
  extraReducers: builder => {
    getOrderHandler(builder)
    builder
      .addCase(wsOpen, (state) => state)
      .addCase(wsClose, (state) => {
        state.orders = null;
        state.error = "";
      })
      .addCase(wsError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(wsMessage, (state, action) => {
        state.orders = action.payload?.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
   }

})

export const {setTotalPrice, setOrder, setOrders, setChosenOrder} = orderSlice.actions

export default orderSlice.reducer
