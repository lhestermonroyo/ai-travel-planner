import { atom } from 'recoil';

const initialState: any = {
  isAuth: false,
  loggingOut: false,
  user: null,
  form: null,
};

const AUTH_STATE = atom({
  key: 'AUTH_STATE',
  default: initialState,
});

export default AUTH_STATE;
