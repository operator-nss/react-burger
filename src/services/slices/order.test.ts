import orderReducer, {initialState} from "./order.slice";
import {getOrder, wsClose, wsError, wsMessage, wsOpen} from "../actions/orderActions";
import axios from "axios";

jest.mock('axios')

describe("orderReducer", () => {
  let accessToken;
  let orders: any;
  let state: any;
  beforeAll(() => {
    accessToken = "Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTBhZDE0OGE0YjYyMDAxYzg1ZjJjZCIsImlhdCI6MTY5MTQ0Mjg5NywiZXhwIjoxNjkxNDQ0MDk3fQ.9y-G4Rp46aG6Ik5c1B9NzsWFepO5EHOs6lEGmjnNTZM";
    state = {
      ingredients: [
        {
          _id: "643d69a5c3f7b9001cfa0943",
          name: "Соус фирменный Space Sauce",
          type: "sauce",
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: "https://code.s3.yandex.net/react/code/sauce-04.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
          __v: 0,
          idKey: "643d69a5c3f7b9001cfa09430"
        }
      ],
      bun: {
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
    }
    orders = {
      orders: [{
        _id: "64d1683582e277001bfa795d",
        ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa0943"],
        status: "done",
        name: "Space флюоресцентный бургер",
        createdAt: "2023-08-07T21:55:01.920Z",
        updatedAt: "2023-08-07T21:55:02.079Z",
        number: 16000,
      }],
    };
  })

  it('should return the initialState', () => {
    expect(orderReducer(undefined, {type: ""})).toEqual(initialState);
  });

  it("should get order with resolved response", async () => {
    const dispatch = jest.fn();
    const thunk = getOrder();
    await thunk(dispatch, state, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(calls).toHaveLength(2);
    expect(start[0].type).toBe('order/getOrder/pending');
    expect(end[0].type).toBe('order/getOrder/rejected');
  });

  it("should get order with rejected response", async () => {
    const getError = new Error('network error');
    axios.post = jest.fn().mockRejectedValue(getError);
    const dispatch = jest.fn();
    const thunk = getOrder();
    await thunk(dispatch, state, {});
    const {calls} = dispatch.mock;
    const [start, end] = calls;
    expect(start[0].type).toBe('order/getOrder/pending');
    expect(end[0].meta.requestStatus).toBe('rejected');
    expect(end[0].meta.rejectedWithValue).toBe(true);
  });

  it("should change status with 'getOrder.pending' action", () => {
    const state = orderReducer(initialState, getOrder.pending(''))
    expect(state.isOrderLoading).toBe(true)
    expect(state.orderError).toBe(false)
  });

  it("should take wsOpen action", () => {
    expect(orderReducer(initialState, wsOpen)).toEqual(initialState);
  });

  it("should take wsClose action", () => {
    expect(orderReducer(initialState, wsClose).orders).toBe(null);
    expect(orderReducer(initialState, wsClose).error).toBe('');
  });

  it("should take wsError action", () => {
    const res = orderReducer(initialState, wsError("Error"));
    expect(res).toEqual({...initialState, error: "Error",});
  });

  it("should take wsMessage action", () => {
    const result = orderReducer(initialState, wsMessage(orders));
    expect(result).toEqual({
      ...initialState,
      orders: orders.orders,
      total: orders.total,
      totalToday: orders.totalToday
    });
  });


});