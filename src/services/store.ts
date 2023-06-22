import {configureStore} from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import burgers from './slices/burgers.slice'
import order from './slices/order.slice'
import burgerConstructor from './slices/constructor.slice'
import user from './slices/user.slice'
import info from './slices/info-ingredient.slice'

export const store = configureStore({
  reducer: {
    burgers,
    burgerConstructor,
    order,
    info,
    user
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()