import { LitElement, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from './game/gameStore';
import { createGame } from './game/gameActions';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';

class UnderCover extends connect(store)(LitElement) {
  static get properties() {
    return {
      players: { type: Array },
    };
  }

  constructor() {
    super();
    this.players = ['Bob'];
    this.game = undefined;
  }

  stateChanged(state) {
    this.game = state.game;
  }

  startGame() {
    store.dispatch(createGame(this.players));
  }

  addFriend() {
    const newFriend = this.shadowRoot.querySelector('#friend-text-field').value;
    this.players = [...this.players, newFriend];
    this.shadowRoot.querySelector('#friend-text-field').value = '';
  }

  render() {
    return html`
      <div class="newGame">
        <div class="intro">
          <h1>UnderCover</h1>
          <p>Get a challenge, kill your friends, win the game . . . during dinner!</p>
        </div>
        <div class="addFriends">
          <vaadin-text-field
            id="friend-text-field"
            aria-placeholder="player name"
            aria-label="Player Name"
          ></vaadin-text-field>
          <vaadin-button @click=${this.addFriend}>+</vaadin-button>
        </div>
        <div class="friendsList">
          <ul>
            ${this.players.map(
              player =>
                html`
                  <li>${player}</li>
                `,
            )}
          </ul>
          <vaadin-button @click=${this.startGame}>Create Game!</vaadin-button>
        </div>
      </div>
    `;
  }
}

customElements.define('under-cover', UnderCover);
