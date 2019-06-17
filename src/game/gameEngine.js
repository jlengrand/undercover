import { uuidv4 as uuid } from '../utils/uuid';

import { MissionStatuses, GameStatuses } from './gameActions';
import { getRandomChallenge } from './challenges/challengeGenerator';

function createMission() {
  return {
    id: uuid(),
    challenge: getRandomChallenge(),
    status: MissionStatuses.ACTIVE,
    targetId: undefined,
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
    missions: [createMission()],
  };
}

export function createGame(userNames) {
  if (!userNames || userNames.length === 0) return undefined;

  const users = userNames.map(name => createUser(name));

  const players = users.map(user => createPlayer(user));

  // TODO : Improve so we don't need mutability
  const targetIds = players.map(p => p.id);
  targetIds.push(targetIds.shift());

  for (let i = 0; i < players.length; i += 1) {
    players[i].missions[0].targetId = targetIds[i];
  }

  return {
    id: uuid(),
    status: GameStatuses.ONGOING,
    players,
  };
}

export function validateMission(state, missionId) {
  // if mission doesn't exist, return same state
  // if mission exists, extracts target
  // set target mission to stolen
  // set user mission to completed
  // copy target's mission to user

  // Maybe finish?

  const newState = Object.assign({}, state);

  console.log(missionId);

  return newState;
}
