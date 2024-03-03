import { LikeAction, LikedCoinsActionTypes } from "../types/likedCoins";

const initialState: any[] = [];

export const likedCoinReducer = (
  state = initialState,
  action: LikeAction,
): any[] => {
  switch (action.type) {
    case LikedCoinsActionTypes.ADD:
      return [...state, action.payload];

    case LikedCoinsActionTypes.REMOVE: {
      return state.filter((coin) => coin !== action.payload);
    }

    case LikedCoinsActionTypes.WRITE: {
      return [...action.payload];
    }
    default:
      return state;
  }
};
