import { LitElement, css, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { validateMission, MissionStatuses } from './game/gameActions';
import '@vaadin/vaadin-button';

import { store } from './game/gameStore';

class MissionCard extends connect(store)(LitElement) {
  static get properties() {
    return {
      mission: { type: Object },
    };
  }

  validateThisMission() {
    store.dispatch(validateMission(this.mission.id));
  }

  render() {
    return html`
      <div><span>Description:</span> ${this.mission.challenge.description}</div>
      <div><span>Status</span> ${this.mission.status}</div>

      ${this.mission.status === MissionStatuses.ACTIVE
        ? html`
            <vaadin-button @click=${this.validateThisMission}>Validate mission!</vaadin-button>
          `
        : html``}
    `;
  }

  static get styles() {
    return [css``];
  }
}

customElements.define('mission-card', MissionCard);
