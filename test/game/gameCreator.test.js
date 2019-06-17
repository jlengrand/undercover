import { expect } from '@open-wc/testing';
import { createGame } from '../../src/game/gameCreator';

describe('gameCreator createGame', () => {
  it('should return undefined when there are no players', () => {
    const game = createGame([]);
    expect(game).to.equal(undefined);
  });

  it('should return undefined when there is no input', () => {
    const game = createGame();
    expect(game).to.equal(undefined);
  });
});
