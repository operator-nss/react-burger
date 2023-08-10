import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchIngredientsHandler} from "../actions/burgerActions";
import {IBurger} from "../../types/types";

export interface IConstructorState {
  burgerItems: IBurger[] | []
  isLoading: boolean
  openModal: boolean
  errorBurgers: boolean
}

export const initialState: IConstructorState = {
  burgerItems: [],
  isLoading: false,
  openModal: false,
  errorBurgers: false
}

export const burgersSlice = createSlice({
  name: 'burgers',
  initialState,
  reducers: {
    setModal: (state, action:PayloadAction<boolean>) => {
      state.openModal = action.payload
    },
  },
  extraReducers: builder => {
    fetchIngredientsHandler(builder)
  }
})

export const {setModal} = burgersSlice.actions

export default burgersSlice.reducer
