import { configureStore, createSlice } from 'redux-starter-kit';
import { isMainThread } from 'worker_threads';

const ONGOING = 'ONGOING';
const STOPPED = 'STOPPED';

const initialState = {
  game: {
    status: ONGOING,
  },
};

const gamesSlice = createSlice({
  initialState: {
    status: ONGOING,
  },
  reducers: {
    stop: (state, action) => {
      state.status = STOPPED;
    },
  },
});

const { gamesActions, gamesReducer } = gamesSlice;

// Setting up the store (just like the model in Elm)
const store = configureStore({
  // all possible actions on the state
  reducer: {
    game: gamesReducer,
  },
  preloadedState: initialState, // default initial state
});

console.log(store);
store.dispatch(gamesActions.stop());
console.log(store);
