import { combineReducers, createStore } from 'redux';
import gamesReducers from './gamesReducer';
import { stopGame } from './gameActions';

const initialState = {
  user: undefined,
  game: {},
};

const app = combineReducers({
  gamesReducers,
});

const store = createStore(app, initialState);

console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(stopGame());

unsubscribe();
