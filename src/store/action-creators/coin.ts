import { CoinState } from "../../types/coin";
import { ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { LikedCoinsActionTypes } from "../../types/likedCoins";
import { StoreCoinActionTypes } from "../../types/storeCoin";
import { CoinAction, CoinActionTypes } from "../../types/store/coinReducer";

export const fetchCoins = (limit = 10, page = 1) => {
  return async (dispatch: ThunkDispatch<CoinState, undefined, CoinAction>) => {
    try {
      dispatch({ type: CoinActionTypes.FETCH_COINS });
      const response = await axios.get(
        `http://localhost:4000/getCoinsList/${limit}/${page}`
        // `https://coingecko-back.onrender.com/${limit}/${page}`
        // `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=${page}&sparkline=false&locale=en`
      );
      console.log(response);
      dispatch({
        type: CoinActionTypes.FETCH_COINS_SUCCESS,
        payload: response.data,
      });
    } catch (e: any) {
      alert(e.response.data.error + "\nTry again in 5 minutes");
      dispatch({
        type: CoinActionTypes.FETCH_COINS_ERROR,
        payload: "error in fetching coins",
      });
    }
  };
};

export function setPage(page: number): CoinAction {
  return { type: CoinActionTypes.SET_COIN_PAGE, payload: page };
}

export const addCoin = (id: string) => {
  return { type: LikedCoinsActionTypes.ADD, payload: id };
};

export const removeCoin = (id: string) => {
  return { type: LikedCoinsActionTypes.REMOVE, payload: id };
};

export const write = (savedCoins: any[]) => {
  return { type: LikedCoinsActionTypes.WRITE, payload: savedCoins };
};

export const storeCoins = (storeCoins: any[]) => {
  return { type: StoreCoinActionTypes.WRITE_IN_DB, payload: storeCoins };
};
