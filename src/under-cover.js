import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from './game/gameStore';
import { createGame } from './game/gameActions';

import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';

class UnderCover extends connect(store)(LitElement) {
  static get properties() {
    return {
      players: { type: Array },
      isFriendTextFieldEmpty: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.players = [];
    this.isFriendTextFieldEmpty = true;
    this.game = undefined;
  }

  stateChanged(state) {
    this.game = state.game;
  }

  startGame() {
    store.dispatch(createGame(this.players));
    console.log('Game created!');
  }

  addFriend() {
    const newFriend = this.shadowRoot.querySelector('#friend-text-field').value;
    this.players = [...this.players, newFriend];
    this.shadowRoot.querySelector('#friend-text-field').value = '';
  }

  friendTextFieldUpdate() {
    const friendField = this.shadowRoot.querySelector('#friend-text-field');
    this.isFriendTextFieldEmpty = friendField.value.length === 0;
    console.log(this.isFriendTextFieldEmpty);
  }

  render() {
    return html`
      <header class="app-header">
        <img src="src/assets/logo.svg" class="app-logo" alt="logo" />
        <h1 class="app-title">UnderCover</h1>
      </header>
      <main>
        <div class="newGame">
          <div class="intro">
            <h1>UnderCover</h1>
            <p>Get a challenge, kill your friends, win the game . . . during dinner!</p>
          </div>
          <div class="addFriends">
            <h2>Add players</h2>
            <vaadin-text-field
              @keyup=${this.friendTextFieldUpdate}
              id="friend-text-field"
              aria-placeholder="player name"
              aria-label="Player Name"
            ></vaadin-text-field>

            <vaadin-button @click=${this.addFriend} ?disabled=${this.isFriendTextFieldEmpty}
              >+</vaadin-button
            >
          </div>
          <div class="friendsList">
            <h2>Current players</h2>
            ${this.players.length === 0
              ? html`
                  <p>No players added yet!</p>
                  <vaadin-button @click=${this.startGame} disabled>Create Game!</vaadin-button>
                `
              : html`
                  <ul>
                    ${this.players.map(
                      player =>
                        html`
                          <li>${player}</li>
                        `,
                    )}
                  </ul>
                  <vaadin-button @click=${this.startGame}>Create Game!</vaadin-button>
                `}
          </div>
        </div>
      </main>
      <footer>
        <span>Copyright 2019 - Axel Catoire and Julien Lengrand-Lambert - All rights reserved</span>
      </footer>
    `;
  }

  static get styles() {
    return [
      css`
        html {
          font-size: 100%;
        }

        :host {
          text-align: center;
          font-family: 'Josefin Sans', sans-serif;
          font-display: swap;
          display: grid;
          grid-template-columns: 100vw;
          grid-template-rows: 10vh 80vh 10vh;
          /* min-height: 100vh; */
        }

        .app-logo {
          display: inline-block;
          vertical-align: middle;
          float: left;
          max-height: 100%;
          margin-right: 10px;
          margin-left: 5px;
          padding: 2px;
        }

        .app-title {
          vertical-align: middle;
          font-size: 1.3rem;
          height: 100%;
          margin: 0;
        }

        header {
          background-color: #1d3557;
          color: #f1faee;
        }

        header h1 {
          display: flex;
          align-items: center;
        }

        main {
          background-color: #f1faee;
          overflow: auto;
        }

        footer {
          background-color: #1d3557;
          color: #f1faee;
          display: flex;
        }

        footer span {
          margin: auto;
          font-size: 0.7rem;
        }
      `,
    ];
  }
}

customElements.define('under-cover', UnderCover);
