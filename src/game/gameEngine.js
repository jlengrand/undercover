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
  if (!userNames || userNames.length < 2) return undefined;

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
  // TODO: How do I make this immutable? This is the ugliest code I've written in a while

  // TODO: Check if game is finished!?

  const newState = Object.assign({}, state);

  let playerId;
  state.players.forEach(player => {
    if (player.missions.some(m => m.id === missionId)) {
      playerId = player.id;
    }
  });

  if (!playerId) return state; // No mission match

  const missions = state.players.map(p => p.missions);
  const flattenedMissions = missions.reduce(
    (total, currentValue) => total.concat(currentValue),
    [],
  );
  const { targetId } = flattenedMissions.filter(m => m.id === missionId)[0];
  // const { loserMissions } = newState.players.find(p => p.id === targetId)[0];

  // Steals and extracts missions
  let stolenMission;
  for (let i = 0; i < newState.players.length; i += 1) {
    if (newState.players[i].id === targetId) {
      for (let j = 0; j < newState.players[i].missions.length; j += 1) {
        if (newState.players[i].missions[j].status === MissionStatuses.ACTIVE) {
          stolenMission = Object.assign({}, newState.players[i].missions[j]);
          newState.players[i].missions[j].status = MissionStatuses.STOLEN;
        }
      }
    }
  }

  // Set mission as won and add mission
  for (let i = 0; i < newState.players.length; i += 1) {
    if (newState.players[i].id === playerId) {
      for (let j = 0; j < newState.players[i].missions.length; j += 1) {
        if (newState.players[i].missions[j].status === MissionStatuses.ACTIVE) {
          newState.players[i].missions[j].status = MissionStatuses.SUCCESS;
        }
      }
      newState.players[i].missions.push(stolenMission);
    }
  }

  // Check if game is finished.
  const finalMissions = state.players.map(p => p.missions);
  const flattenedFinalMissions = finalMissions.reduce(
    (total, currentValue) => total.concat(currentValue),
    [],
  );

  const numberActiveMissions = flattenedFinalMissions.filter(
    m => m.status === MissionStatuses.ACTIVE,
  ).length;

  if (numberActiveMissions === 1) {
    newState.status = GameStatuses.FINISHED;
  }

  return newState;
}
