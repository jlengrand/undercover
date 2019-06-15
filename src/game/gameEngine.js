import { combineReducers, createStore } from 'redux';

const STOP = 'STOP';

const ONGOING = 'ONGOING';
const STOPPED = 'STOPPED';

const initialState = {
  game: {
    status: ONGOING,
  },
};

function stop() {
  return { type: STOP };
}

function gamesReducer(state = {}, action) {
  switch (action.type) {
    case STOP:
      return Object.assign({}, state, {
        status: STOPPED,
      });
    default:
      return state;
  }
}

const app = combineReducers({
  gamesReducer,
});

const store = createStore(app, initialState);

console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(stop());

unsubscribe();
