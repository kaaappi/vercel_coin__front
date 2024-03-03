import { StoreAction, StoreCoinActionTypes } from "../types/storeCoin";

const initialState: any[] = [];
export const storeCoinReducer = (
  state = initialState,
  action: StoreAction,
): any[] => {
  switch (action.type) {
    case StoreCoinActionTypes.WRITE_IN_DB:
      return action.payload;

    default:
      return state;
  }
};
