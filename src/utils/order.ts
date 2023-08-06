import {IBurger} from "../types/types";

export const reduceIngredients = (burgers: IBurger[], ingredients: string[]) => {
  let sum = 0;
  ingredients.forEach(item => {
    const findItem = burgers?.find(burger => burger?._id === item)
    if(item === findItem?._id) {
      sum += findItem?.price
      if(findItem?.type === 'bun') {
        sum += findItem?.price
      }
    }
  })
  return sum
 }