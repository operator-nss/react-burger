import {fetchIngredients} from "../actions/burgerActions";
import {IBurger} from "../../types/types";
import axios from "axios";
import {initialState} from "./burgers.slice";
import burgerReducer from './burgers.slice'

const arr:IBurger[] = [{
  _id: "643d69a5c3f7b9001cfa093d",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0
}]

describe("burgers", () => {

  it("should fetch ingredients", async () => {
    const dispatch = jest.fn();
    const thunk = fetchIngredients();
    await thunk(dispatch, () => {
    }, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe('burger/getIngredients/pending');
    expect(end[0].type).toBe('burger/getIngredients/fulfilled');
  });

  it("should change status with 'burger.pending' action", () => {
    const state = burgerReducer(initialState, fetchIngredients.pending(""))
    expect(state.isLoading).toBeTruthy()
    expect(state.errorBurgers).toBeFalsy()
  });

  it("should change status with 'burger.fulfilled' action", () => {
    const state = burgerReducer(initialState, fetchIngredients.fulfilled(arr, ''))
    expect(state.isLoading).toBeFalsy()
    expect(state.burgerItems).toBe(arr)
  });

  it("should change status with 'burger.rejected' action", async () => {
    const getError = new Error('network error');
    axios.post = jest.fn().mockRejectedValue(getError);
    const dispatch = jest.fn();
    const thunk = fetchIngredients();
    await thunk(dispatch, () => {}, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(start[0].type).toBe('burger/getIngredients/pending');
    expect(end[0].meta.requestStatus).toBe('fulfilled');
  });
})