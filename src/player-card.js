import { LitElement, html, css } from 'lit-element';
import { MissionStatuses } from './game/gameActions';
import '@vaadin/vaadin-button';

import './mission-card';

class PlayerCard extends LitElement {
  static get properties() {
    return {
      player: {
        type: Object,
        hasChanged() {
          return true;
        },
      },
      areMissionsVisible: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.areMissionsVisible = false;
  }

  toggleMissionsVisible() {
    this.areMissionsVisible = !this.areMissionsVisible;
  }

  render() {
    return html`
      <h3>
        ${this.player.user.name}
        <span
          >${this.player.missions.reduce(
            (total, item) => total + (item.status === MissionStatuses.SUCCESS ? 1 : 0),
            0,
          )}
          Points</span
        >
      </h3>
      <h4>${this.player.id}</h4>
      <div class="missions">
        ${this.areMissionsVisible
          ? html`
              <vaadin-button @click=${this.toggleMissionsVisible}>Hide missions!</vaadin-button>
              ${this.player.missions.map(
                mission =>
                  html`
                    <mission-card
                      .challenge=${mission.challenge}
                      .id=${mission.id}
                      .targetId=${mission.targetId}
                      .status=${mission.status}
                    ></mission-card>
                  `,
              )}
            `
          : html`
              <vaadin-button @click=${this.toggleMissionsVisible}>Show missions!</vaadin-button>
            `}
      </div>
    `;
  }

  static get styles() {
    return [css``];
  }
}

customElements.define('player-card', PlayerCard);
