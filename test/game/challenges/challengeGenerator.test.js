import { expect } from '@open-wc/testing';
import { getRandomChallenge } from '../../../src/game/challenges/challengeGenerator';

describe('challengeGenerator', () => {
  it('should not return twice the same challenge', () => {
    const challenge1 = getRandomChallenge();
    const challenge2 = getRandomChallenge();

    expect(challenge1).to.not.equal(challenge2);
  });
});
