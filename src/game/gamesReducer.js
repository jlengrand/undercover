// const uuid = require('uuid/v1');
// const fs = require('fs');

import { STOP, GameStatuses, CREATE, MissionStatuses } from './gameActions';
import { shuffle } from '../utils/arrayUtils';

import challenges from './challenges/challenges';

const shuffledChallenges = shuffle(challenges);

function uuid() {
  // TODO: Implement
  return 'w;egj;lgjw;lrgj;lrgjke;wlrgj';
}

function getRandomChallenge() {
  // TODO : Improve. This implementation really sucks
  return shuffledChallenges.pop();
}

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

function createGame(userNames) {
  console.log(userNames);
  const users = userNames.map(name => createUser(name));
  const players = users.map(user => createPlayer(user));
  return {
    id: uuid(),
    status: GameStatuses.ONGOING,
    players,
  };
}

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
