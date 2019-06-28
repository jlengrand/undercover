import { STOP, GameStatuses, CREATE, VALIDATE } from './gameActions';
import { createGame, validateMission } from './gameEngine';

export default function gamesReducer(state = {}, action) {
  switch (action.type) {
    case STOP:
      return Object.assign({}, state, {
        status: GameStatuses.STOPPED,
      });
    case CREATE:
      return createGame(action.users);
    case VALIDATE:
      return validateMission(state, action.missionId);
    default:
      return state;
  }
}
