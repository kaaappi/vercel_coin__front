import { CoinState } from "../types/coin";
import { CoinAction, CoinActionTypes } from "../types/store/coinReducer";

const initialState: CoinState = {
  coins: [],
  error: null,
  loading: false,
  limit: 10,
  page: 1,
};

export const coinReducer = (
  state = initialState,
  action: CoinAction
): CoinState => {
  switch (action.type) {
    case CoinActionTypes.FETCH_COINS:
      return {
        ...initialState,
        page: state.page,
        limit: state.limit,
      };

    case CoinActionTypes.FETCH_COINS_SUCCESS:
      return {
        ...initialState,
        page: state.page,
        limit: state.limit,
        coins: action.payload,
      };
    case CoinActionTypes.FETCH_COINS_ERROR:
      return {
        ...initialState,
        page: state.page,
        limit: state.limit,
        error: action.payload,
      };
    case CoinActionTypes.SET_COIN_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    default:
      return state;
  }
};
