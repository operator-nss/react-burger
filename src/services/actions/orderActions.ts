import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {ORDER_URL} from "../../utils/constants";
import {IConstructorIngredient} from "../slices/constructor.slice";
import {RootState} from "../store";
import {IConstructorState} from "../slices/order.slice";

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
    const {data} = await axios.post(ORDER_URL, sendData);
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