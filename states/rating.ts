import { atom } from 'recoil';

const initialState: any = {
  ratingItem: null,
  ratingList: [],
};

const RATING_STATE = atom({
  key: 'RATING_STATE',
  default: initialState,
});

export default RATING_STATE;
