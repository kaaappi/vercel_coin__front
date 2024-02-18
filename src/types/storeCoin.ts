export interface StoreCoinsState {
  storedCoins: any[];
}

export enum StoreCoinActionTypes {
  WRITE_IN_DB = "WRITE_IN_DB",
}

interface WriteCoinAction {
  type: StoreCoinActionTypes.WRITE_IN_DB;
  payload: any[];
}

export type StoreAction = WriteCoinAction;
