import { expect } from '@open-wc/testing';
import { createGame } from '../../src/game/gameCreator';
import { GameStatuses, MissionStatuses } from '../../src/game/gameActions';
import { arrayHasDuplicateValue } from '../testUtils';

function validateChallenges(challenges) {
  expect(arrayHasDuplicateValue(challenges, 'id')).to.be.false;
  expect(arrayHasDuplicateValue(challenges, 'description')).to.be.false;
}

function validateMissions(players) {
  const missionArrays = players.map(p => p.missions);
  missionArrays.forEach(ma => {
    expect(ma).to.have.lengthOf(1);
  });

  const missions = players.map(p => p.missions[0]);
  expect(arrayHasDuplicateValue(missions, 'id')).to.be.false;

  missions.forEach(m => {
    expect(m.status).to.be.equal(MissionStatuses.ACTIVE);
  });

  validateChallenges(missions.map(mission => mission.challenge));
}

function validatePlayers(players) {
  expect(arrayHasDuplicateValue(players, 'id')).to.be.false;
  validateMissions(players);
}

describe('gameCreator createGame', () => {
  it('should return undefined when there are no players', () => {
    const game = createGame([]);
    expect(game).to.equal(undefined);
  });

  it('should return undefined when there is no input', () => {
    const game = createGame();
    expect(game).to.equal(undefined);
  });

  it('should return an ONGOING game with an id', () => {
    const game = createGame(['Bob']);
    expect(game.status).to.equal(GameStatuses.ONGOING);
    expect(game.id).to.not.be.undefined;
  });

  it('should return a list of players with missions', () => {
    const game = createGame(['Bob', 'Gerald', 'Daisy']);
    expect(game.players).to.have.lengthOf(3);
    validatePlayers(game.players);

    // Make sure each player has a mission with a target that exists and is not him
    const playerIds = game.players.map(p => p.id);
    const playerIdAndTargetIds = game.players.map(player => ({
      id: player.id,
      targetId: player.missions[0].targetId,
      allIds: playerIds,
    }));

    playerIdAndTargetIds.forEach(idAndTargetId => {
      // There is a known target
      expect(idAndTargetId.targetId).to.not.be.undefined;
      // Mission never targets the player
      expect(idAndTargetId.id).to.not.equal(idAndTargetId.targetId);
      // Mission targets another existing player
      expect(idAndTargetId.allIds.includes(idAndTargetId.targetId)).to.be.true;
    });
  });
});
