import { uuidv4 as uuid } from '../utils/uuid';

import { MissionStatuses, GameStatuses } from './gameActions';
import { getRandomChallenge } from './challenges/challengeGenerator';

function createMission() {
  return {
    id: uuid(),
    challenge: getRandomChallenge(),
    status: MissionStatuses.ACTIVE,
    targetId: undefined, // TODO
  };
}

function createUser(userName) {
  return {
    id: uuid(),
    name: userName,
    email: undefined,
  };
}

function createPlayer(user) {
  return {
    id: uuid(),
    user,
    mission: createMission(),
  };
}

export function createGame(userNames) {
  if (!userNames || userNames.length === 0) return undefined;

  const users = userNames.map(name => createUser(name));
  const players = users.map(user => createPlayer(user));
  return {
    id: uuid(),
    status: GameStatuses.ONGOING,
    players,
  };
}
