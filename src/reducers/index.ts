import { combineReducers } from "redux";
import { coinReducer } from "./coinReducer";
import { likedCoinReducer } from "./likedCoinReducer";
import { storeCoinReducer } from "./storeCoinReducer";

export const rootReducer = combineReducers({
  coin: coinReducer,
  likedCoins: likedCoinReducer,
  storeCoins: storeCoinReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
