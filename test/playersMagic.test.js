import { expect } from '@open-wc/testing';
import {
  sortScoresAndkills,
  getScoreFromMissions,
  getTargetsFromSuccessfulMissions,
} from '../src/game/playersMagic';

describe('sortScoresAndkills', () => {
  const finishedGame = {
    id: 'd9de47a8-158f-455e-8f02-21ac5dd5e0c3',
    players: [
      {
        id: 'pascalsId',
        user: { name: 'Pascal' },
        missions: [
          {
            id: '865faaf3-eaae-41d0-96d3-7440f1cc604e',
            status: 'STOLEN',
            challenge: undefined,
            targetId: '8717b0d5-8a1b-436a-947b-5efe94603e67',
          },
        ],
      },
      {
        id: 'GéraldsId',
        user: {
          name: 'Gérald',
        },

        missions: [
          {
            challenge: undefined,
            id: '3d656862-8bce-41ec-ad74-2b637c12ff26',
            status: 'SUCCESS',
            targetId: 'c594036a-511e-4977-97c2-f4e13952bbb7',
            targetName: 'Bob',
          },
          {
            challenge: undefined,
            id: 'b1c2a17f-3834-45ea-b3dd-30633c62b197',
            status: 'SUCCESS',
            targetId: '7d91288e-4808-48b6-b1ec-49ef3addb24f',
            targetName: 'Pascal',
          },
          {
            id: '865faaf3-eaae-41d0-96d3-7440f1cc604e',
            status: 'ACTIVE',
            challenge: undefined,
            targetId: '8717b0d5-8a1b-436a-947b-5efe94603e67',
          },
        ],
      },
      {
        id: 'BobsId',
        user: {
          name: 'Bob',
        },
        missions: [
          {
            challenge: undefined,
            id: 'b1c2a17f-3834-45ea-b3dd-30633c62b197',
            status: 'STOLEN',
            targetId: '7d91288e-4808-48b6-b1ec-49ef3addb24f',
          },
        ],
      },
    ],
    status: 'FINISHED',
  };

  it('should return a list of players sorted by score', () => {
    const result = sortScoresAndkills(finishedGame.players);

    expect(result).to.have.lengthOf(finishedGame.players.length);
    expect(result[0].id).to.equal('GéraldsId');
    expect(result[0].user.name).to.equal('Gérald');
    expect(result[0].score).to.equal(2);
    expect(result[0].kills).to.deep.equal(['Bob', 'Pascal']);

    expect(result[1].score).to.equal(0);
    expect(result[2].score).to.equal(0);
    expect(result[1].kills).to.deep.equal([]);
    expect(result[2].kills).to.deep.equal([]);
  });
});

describe('getScoreFromMissions', () => {
  it('should return the number of successful missions', () => {
    const zeroMissions = [
      {
        challenge: undefined,
        id: 'b1c2a17f-3834-45ea-b3dd-30633c62b197',
        status: 'STOLEN',
        targetId: '7d91288e-4808-48b6-b1ec-49ef3addb24f',
      },
    ];

    expect(getScoreFromMissions(zeroMissions)).to.equal(0);

    const twoMissions = [
      {
        challenge: undefined,
        id: '3d656862-8bce-41ec-ad74-2b637c12ff26',
        status: 'SUCCESS',
        targetId: 'c594036a-511e-4977-97c2-f4e13952bbb7',
        targetName: 'Bob',
      },
      {
        challenge: undefined,
        id: 'b1c2a17f-3834-45ea-b3dd-30633c62b197',
        status: 'SUCCESS',
        targetId: '7d91288e-4808-48b6-b1ec-49ef3addb24f',
        targetName: 'Pascal',
      },
      {
        id: '865faaf3-eaae-41d0-96d3-7440f1cc604e',
        status: 'ACTIVE',
        challenge: undefined,
        targetId: '8717b0d5-8a1b-436a-947b-5efe94603e67',
      },
    ];

    expect(getScoreFromMissions(twoMissions)).to.equal(2);
  });
});

describe('getTargetsFromSuccessfulMissions', () => {
  it('should return the targets for successful missions', () => {
    const zeroMissions = [
      {
        challenge: undefined,
        id: 'b1c2a17f-3834-45ea-b3dd-30633c62b197',
        status: 'STOLEN',
        targetId: '7d91288e-4808-48b6-b1ec-49ef3addb24f',
      },
    ];

    expect(getTargetsFromSuccessfulMissions(zeroMissions)).to.deep.equal([]);

    const twoMissions = [
      {
        challenge: undefined,
        id: '3d656862-8bce-41ec-ad74-2b637c12ff26',
        status: 'SUCCESS',
        targetId: 'c594036a-511e-4977-97c2-f4e13952bbb7',
        targetName: 'Gérald',
      },
      {
        challenge: undefined,
        id: 'b1c2a17f-3834-45ea-b3dd-30633c62b197',
        status: 'SUCCESS',
        targetId: '7d91288e-4808-48b6-b1ec-49ef3addb24f',
        targetName: 'Bob',
      },
      {
        id: '865faaf3-eaae-41d0-96d3-7440f1cc604e',
        status: 'ACTIVE',
        challenge: undefined,
        targetId: '8717b0d5-8a1b-436a-947b-5efe94603e67',
      },
    ];

    expect(getTargetsFromSuccessfulMissions(twoMissions)).to.deep.equal(['Gérald', 'Bob']);
  });
});
