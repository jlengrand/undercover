import { LitElement, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from './game/gameStore';
import { createGame } from './game/gameActions';

class UnderCover extends connect(store)(LitElement) {
  static get properties() {
    return {};
  }

  constructor() {
    super();
    this.players = ['Bob', 'Gerard'];
    this.game = undefined;
  }

  stateChanged(state) {
    this.game = state.game;
  }

  startGame() {
    store.dispatch(createGame(this.players));
  }

  render() {
    return html`
      <h1>Title</h1>
      <button @click=${this.startGame}>Create Game!</button>
    `;
  }
}

customElements.define('under-cover', UnderCover);
