import { STOP } from './gameConstants';

export function stopGame() {
  return { type: STOP };
}
