import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IBurger} from "../../types/types";

interface ISort {
  dragIndex: number
  hoverIndex: number

}

export interface IConstructorIngredient extends IBurger {
  idKey: string
}

export interface IConstructorState {
  bun: IBurger | null
  ingredients: IConstructorIngredient[] | []
  isLoading: boolean
}

const initialState:IConstructorState = {
  bun: null,
  ingredients: [],
  isLoading: false
}

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setMainBun: (state, action: PayloadAction<IBurger>) => {
      state.bun = action.payload;
    },
    setFilling: (state, action: PayloadAction<IConstructorIngredient>) => {
      state.ingredients = [...state.ingredients, action.payload];
    },
    deleteFilling: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(ingredient => ingredient.idKey !== action.payload);
    },
    sortFilling: (state, action: PayloadAction<ISort>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const ingredientsArr = [...state.ingredients]
      const dragElement = ingredientsArr[dragIndex]
      const hoverElement = ingredientsArr[hoverIndex]
      ingredientsArr[hoverIndex] = dragElement
      ingredientsArr[dragIndex] = hoverElement
      state.ingredients = ingredientsArr
    },
  },
})

export const {setMainBun, setFilling, deleteFilling, sortFilling} = constructorSlice.actions

export default constructorSlice.reducer
