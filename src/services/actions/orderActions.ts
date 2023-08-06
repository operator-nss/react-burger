import {ActionReducerMapBuilder, createAction, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {getCookie} from "typescript-cookie";
import {ORDER_URL} from "../../utils/constants";
import {IConstructorIngredient} from "../slices/constructor.slice";
import {RootState} from "../store";
import {IConstructorState, IOrders} from "../slices/order.slice";

export const getOrder = createAsyncThunk<{ state: RootState }>('order/getOrder', async (_, {
  rejectWithValue,
  getState
}) => {
  try {
    const state = getState() as RootState
    const {ingredients, bun} = state.burgerConstructor;
    const sendData = {
      "ingredients": [bun?._id]
    }
    if (ingredients) {
      const ingredientsIds = ingredients?.map((ingredient: IConstructorIngredient) => ingredient._id);
      sendData.ingredients.push(...ingredientsIds)
    }
    const {data} = await axios.post(ORDER_URL, sendData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie('accessToken'),
      }
    });
    return data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err);
  }
})

export const getOrderHandler = (builder: ActionReducerMapBuilder<IConstructorState>) => {
  builder.addCase(getOrder.pending, (state: IConstructorState) => {
    return {...state, isOrderLoading: true, orderError: false}
  })

  builder.addCase(getOrder.fulfilled, (state: IConstructorState, action: PayloadAction<any>) => {
    return {...state, isOrderLoading: false, orderCount: action.payload.order.number}
  })

  builder.addCase(getOrder.rejected, (state: IConstructorState) => {
    return {...state, isOrderLoading: false, orderError: true}
  })
}

export const connect = createAction<string, "ORDERS_CONNECT">("ORDERS_CONNECT");
export const disconnect = createAction("ORDERS_DISCONNECT");
export const wsOpen = createAction("ORDERS_WS_OPEN");
export const wsClose = createAction("ORDERS_WS_CLOSE");
export const wsMessage = createAction<IOrders, "ORDERS_WS_MESSAGE">(
  "ORDERS_WS_MESSAGE"
);
export const wsError = createAction<string, "ORDERS_WS_ERROR">(
  "ORDERS_WS_ERROR"
);