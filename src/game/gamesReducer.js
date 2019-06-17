import { STOP, GameStatuses, CREATE } from './gameActions';
import { createGame } from './gameCreator';

export default function gamesReducer(state = {}, action) {
  switch (action.type) {
    case STOP:
      return Object.assign({}, state, {
        status: GameStatuses.STOPPED,
      });
    case CREATE:
      return createGame(action.users);
    default:
      return state;
  }
}
