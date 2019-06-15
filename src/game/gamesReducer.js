import { STOP, GameStatuses } from './gameConstants';

export default function gamesReducer(state = {}, action) {
  switch (action.type) {
    case STOP:
      return Object.assign({}, state, {
        status: GameStatuses.STOPPED,
      });
    default:
      return state;
  }
}
