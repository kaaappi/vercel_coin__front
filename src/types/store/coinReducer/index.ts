export enum CoinActionTypes {
  FETCH_COINS = "FETCH_COINS",
  FETCH_COINS_SUCCESS = "FETCH_COINS_SUCCESS",
  FETCH_COINS_ERROR = "FETCH_COINS_ERROR",
  SET_COIN_PAGE = "SET_COIN_PAGE",
}

interface fetchCoinsAction {
  type: CoinActionTypes.FETCH_COINS;
}

interface fetchCoinsSuccessAction {
  type: CoinActionTypes.FETCH_COINS_SUCCESS;
  payload: any[];
}

interface fetchCoinsErrorAction {
  type: CoinActionTypes.FETCH_COINS_ERROR;
  payload: string;
}

interface SetCoinPage {
  type: CoinActionTypes.SET_COIN_PAGE;
  payload: number;
}

export type CoinAction =
  | fetchCoinsAction
  | fetchCoinsSuccessAction
  | fetchCoinsErrorAction
  | SetCoinPage;
