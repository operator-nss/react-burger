import {IBurger} from "../../types/types";
import {deleteFilling, IConstructorState, initialState, setFilling, setMainBun} from "./constructor.slice";
import burgerConstructor from './constructor.slice'

const burger:IBurger = {
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
}

describe("burgerConstructor", () => {

  it("should set Main Bun ", async () => {
    const state = burgerConstructor(initialState, setMainBun(burger))
    expect(state.bun).toBe(burger);
  });

  it("should set filling", async () => {
    const state = burgerConstructor(initialState, setFilling({...burger, idKey: 'sdf'}))
    expect(state.ingredients).toEqual([{...burger, idKey: 'sdf'}]);
  });

  it("should delete filling", async () => {
    const newState:IConstructorState = {
      bun: null,
      ingredients: [{
        ...burger,
        idKey: 'some-key'
      }],
      isLoading: false
    }
    const state = burgerConstructor(newState, deleteFilling('some-key'))
    expect(state.ingredients).toEqual([]);
  });
})