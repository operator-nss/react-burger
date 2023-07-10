import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {GET_INGREDIENTS} from "../../utils/constants";
import {IBurger} from "../../types/types";
import {IConstructorState} from "../slices/burgers.slice";

export const fetchIngredients = createAsyncThunk<IBurger[]>('burger/getIngredients', async (_, {rejectWithValue}) => {
  try {
    const {data} = await axios.get(GET_INGREDIENTS);
    return data.data
  } catch (err) {
    console.log(err)
    return rejectWithValue(err);
  }
})

export const fetchIngredientsHandler = (builder: ActionReducerMapBuilder<IConstructorState>) => {
  builder.addCase(fetchIngredients.pending, (state: IConstructorState) => {
    return {...state, isLoading: true, errorBurgers: false}
  })

  builder.addCase(fetchIngredients.fulfilled, (state: IConstructorState, action: PayloadAction<IBurger[]>) => {
    return {...state, isLoading: false, burgerItems: action.payload}
  })

  builder.addCase(fetchIngredients.rejected, (state: IConstructorState) => {
    return {...state, isLoading: false, errorBurgers: true}
  })
}