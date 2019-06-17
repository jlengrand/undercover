import { expect } from '@open-wc/testing';
import { shuffle } from '../../src/utils/arrays';
import { uuidv4 } from '../../src/utils/uuid';

describe('utilities for arrays', () => {
  it('should shuffle an existing array', () => {
    const array = [...Array(100).keys()];
    const result = shuffle(array);

    expect(array).to.not.equal(result);
  });

  it('should also shuffle an array of objects', () => {
    // Generate random array
    const array = [...Array(100).keys()];
    const objectArray = array.map(item => ({
      id: uuidv4(),
      name: 'Bob',
      value: item,
    }));
    const result = shuffle(objectArray);

    expect(array).to.not.equal(result);
  });
});
