import {createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "../../utils/constants";
import {IBurger} from "../../types/types";
import {IConstructorState} from "../slices/burgers.slice";

export const fetchIngredients = createAsyncThunk<IBurger[]>('burger/getIngredients', async (_, {rejectWithValue}) => {
  try {
    const {data} = await axios.get(API_URL);
    return data.data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err);
  }
})

export const fetchIngredientsHandler = (builder: any) => {
  builder.addCase(fetchIngredients.pending, (state: IConstructorState) => {
    return {...state, isLoading: true, errorBurgers: false}
  })

  builder.addCase(fetchIngredients.fulfilled, (state: IConstructorState, action: PayloadAction<any>) => {
    return {...state, isLoading: false, burgerItems: action.payload}
  })

  builder.addCase(fetchIngredients.rejected, (state: IConstructorState) => {
    return {...state, isLoading: false, errorBurgers: true}
  })
}