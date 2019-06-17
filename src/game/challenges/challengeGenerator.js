import challenges from './challenges';
import { shuffle } from '../../utils/arrays';

const shuffledChallenges = shuffle(challenges);

export function getRandomChallenge() {
  // TODO : Improve. This implementation really sucks. Also will not work when we start using firebase
  return shuffledChallenges.pop();
}
