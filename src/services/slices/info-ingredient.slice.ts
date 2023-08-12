import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IBurger} from "../../types/types";

export interface IConstructorState {
  chosenIngredient: IBurger | null
}

export const initialState:IConstructorState = {
  chosenIngredient: null
}

export const infoIngredientSlice = createSlice({
  name: 'info-ingredient',
  initialState,
  reducers: {
    setChosenIngredient: (state, action: PayloadAction<IBurger | null>) => {
      state.chosenIngredient = action.payload
    },
  },
})

export const {setChosenIngredient} = infoIngredientSlice.actions

export default infoIngredientSlice.reducer
