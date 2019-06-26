import { MissionStatuses } from './gameActions';

export function getScoreFromMissions(missions) {
  return missions.reduce(
    (total, mission) => total + (mission.status === MissionStatuses.SUCCESS ? 1 : 0),
    0,
  );
}

export function getTargetsFromSuccessfulMissions(missions) {
  return missions
    .filter(mission => mission.status === MissionStatuses.SUCCESS)
    .map(mission => mission.targetName);
}

export function sortScoresAndkills(playersArray) {
  const sortedPlayers = [...playersArray];
  sortedPlayers.sort((p1, p2) =>
    getScoreFromMissions(p1.missions) > getScoreFromMissions(p2.missions) ? -1 : 1,
  );

  return sortedPlayers.map(p => ({
    user: p.user,
    id: p.id,
    score: getScoreFromMissions(p.missions),
    kills: getTargetsFromSuccessfulMissions(p.missions),
  }));
}
