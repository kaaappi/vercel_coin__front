export enum LikedCoinsActionTypes {
  ADD = "ADD",
  REMOVE = "REMOVE ",
  WRITE = "WRITE",
}

interface AddCoinAction {
  type: LikedCoinsActionTypes.ADD;
  payload: {
    id: string;
  };
}

interface RemoveCoinAction {
  type: LikedCoinsActionTypes.REMOVE;
  payload: {
    id: string;
  };
}

interface WriteCoinAction {
  type: LikedCoinsActionTypes.WRITE;
  payload: [];
}

export type LikeAction = AddCoinAction | RemoveCoinAction | WriteCoinAction;
