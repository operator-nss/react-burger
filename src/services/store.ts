import {configureStore} from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import burgers from './slices/burgers.slice'
import order from './slices/order.slice'
import burgerConstructor from './slices/constructor.slice'
import user from './slices/user.slice'
import info from './slices/info-ingredient.slice'
import {socketMiddleware, TWSActionTypes} from "./middleware/socket-middleware";
import { connect as OrdersWsConnect,
  disconnect as OrdersWsDisconnect,
  wsOpen as OrdersWsOpen,
  wsClose as OrdersWsClose,
  wsMessage as OrdersWsMessage,
  wsError as OrdersWsError,} from "./actions/orderActions";

const wsOrdersActions: TWSActionTypes = {
  wsConnect: OrdersWsConnect,
  wsDisconnect: OrdersWsDisconnect,
  onClose: OrdersWsClose,
  onOpen: OrdersWsOpen,
  onError: OrdersWsError,
  onMessage: OrdersWsMessage,
};

const ordersMiddleware = socketMiddleware(wsOrdersActions);

export const store = configureStore({
  reducer: {
    burgers,
    burgerConstructor,
    order,
    info,
    user
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(ordersMiddleware)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()