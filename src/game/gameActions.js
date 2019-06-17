// Constants

export const STOP = 'STOP';
export const CREATE = 'CREATE';
export const VALIDATE = 'VALIDATE';

export const MissionStatuses = {
  ACTIVE: 'ACTIVE',
  SUCCESS: 'SUCCESS',
  STOLEN: 'STOLEN',
  CANCELLED: 'CANCELLED',
};

export const GameStatuses = {
  ONGOING: 'ONGOING',
  STOPPED: 'STOPPED',
  FINISHED: 'FINISHED',
};

// Actions

export function stopGame() {
  return { type: STOP };
}

export function createGame(listUsers) {
  return { type: CREATE, users: listUsers };
}

export function validateMission(missionId) {
  return { type: VALIDATE, id: missionId };
}
