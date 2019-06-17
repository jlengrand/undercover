import { expect } from '@open-wc/testing';
import { createGame, validateMission } from '../../src/game/gameEngine';
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

describe('gameEngine validateMission', () => {
  const theStartingState = {
    id: 'd9de47a8-158f-455e-8f02-21ac5dd5e0c3',
    players: [
      {
        id: '8717b0d5-8a1b-436a-947b-5efe94603e67',
        user: undefined,

        missions: [
          {
            challenge: undefined,
            id: '3d656862-8bce-41ec-ad74-2b637c12ff26',
            status: 'ACTIVE',
            targetId: 'c594036a-511e-4977-97c2-f4e13952bbb7',
          },
        ],
      },
      {
        id: 'c594036a-511e-4977-97c2-f4e13952bbb7',
        user: undefined,
        missions: [
          {
            challenge: undefined,
            id: 'b1c2a17f-3834-45ea-b3dd-30633c62b197',
            status: 'ACTIVE',
            targetId: '7d91288e-4808-48b6-b1ec-49ef3addb24f',
          },
        ],
      },
      {
        id: '7d91288e-4808-48b6-b1ec-49ef3addb24f',
        user: undefined,
        missions: [
          {
            id: '865faaf3-eaae-41d0-96d3-7440f1cc604e',
            status: 'ACTIVE',
            challenge: undefined,
            targetId: '8717b0d5-8a1b-436a-947b-5efe94603e67',
          },
        ],
      },
    ],
    status: 'ONGOING',
  };

  // it('validateMission should return the same state if there is no missionId', () => {
  //   expect(validateMission(theStartingState)).to.deep.equal(theStartingState);
  // });

  // it('validateMission should return the same state if no matching mission was found', () => {
  //   expect(validateMission(theStartingState, 'unknown-id')).to.deep.equal(theStartingState);
  // });

  it('should validate a mission for a valid mission id', () => {
    const validatedMissionId = '3d656862-8bce-41ec-ad74-2b637c12ff26';

    const theExpectedEndState = {
      id: 'd9de47a8-158f-455e-8f02-21ac5dd5e0c3',
      players: [
        {
          id: '8717b0d5-8a1b-436a-947b-5efe94603e67',
          user: undefined,

          missions: [
            {
              challenge: undefined,
              id: '3d656862-8bce-41ec-ad74-2b637c12ff26',
              status: 'SUCCESS',
              targetId: 'c594036a-511e-4977-97c2-f4e13952bbb7',
            },
            {
              challenge: undefined,
              id: 'b1c2a17f-3834-45ea-b3dd-30633c62b197',
              status: 'ACTIVE',
              targetId: '7d91288e-4808-48b6-b1ec-49ef3addb24f',
            },
          ],
        },
        {
          id: 'c594036a-511e-4977-97c2-f4e13952bbb7',
          user: undefined,
          missions: [
            {
              challenge: undefined,
              id: 'b1c2a17f-3834-45ea-b3dd-30633c62b197',
              status: 'STOLEN',
              targetId: '7d91288e-4808-48b6-b1ec-49ef3addb24f',
            },
          ],
        },
        {
          id: '7d91288e-4808-48b6-b1ec-49ef3addb24f',
          user: undefined,
          missions: [
            {
              id: '865faaf3-eaae-41d0-96d3-7440f1cc604e',
              status: 'ACTIVE',
              challenge: undefined,
              targetId: '8717b0d5-8a1b-436a-947b-5efe94603e67',
            },
          ],
        },
      ],
      status: 'ONGOING',
    };

    expect(validateMission(theStartingState, validatedMissionId)).to.deep.equal(
      theExpectedEndState,
    );
  });
});
