import { atom } from 'recoil';

const initialState: any = {
  form: {
    destination: null,
    travelDates: {
      start: '',
      end: '',
    },
    travelType: null,
    budgetType: null,
    notes: '',
  },
  tripItem: null,
  tripList: [],
};

const TRIP_STATE = atom({
  key: 'TRIP_STATE',
  default: initialState,
});

export default TRIP_STATE;
