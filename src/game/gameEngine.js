import { combineReducers, createStore } from 'redux';
import gamesReducers from './gamesReducer';
import { stopGame, createGame } from './gameActions';

const initialState = {
  user: undefined,
  game: {},
};

const app = combineReducers({
  gamesReducers,
});

const store = createStore(
  app,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // dev tools
);

console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(createGame(['Paul', 'Bob', 'Maurice']));
store.dispatch(stopGame());

unsubscribe();
