import { LitElement, css, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { validateMission, MissionStatuses } from './game/gameActions';
import '@vaadin/vaadin-button';

import { store } from './game/gameStore';

class MissionCard extends connect(store)(LitElement) {
  static get properties() {
    return {
      challenge: { type: Object },
      status: { type: String },
      targetId: { type: String },
      targetName: { type: String },
      id: { type: String },
    };
  }

  validateThisMission() {
    store.dispatch(validateMission(this.id));
  }

  render() {
    return html`
      <div><span>Description:</span> ${this.challenge.description}</div>
      <div><span>Status</span> ${this.status}</div>
      <div><span>Target</span> ${this.targetName}</div>

      ${this.status === MissionStatuses.ACTIVE
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
