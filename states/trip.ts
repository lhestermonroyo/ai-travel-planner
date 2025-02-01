import { atom } from 'recoil';

const initialState: any = {
  tripForm: {
    destination: '',
    travelDates: {
      start: '',
      end: '',
    },
    travelType: null,
    budgetType: null,
  },
  trips: [],
};

const TRIP_STATE = atom({
  key: 'TRIP_STATE',
  default: initialState,
});

export default TRIP_STATE;
