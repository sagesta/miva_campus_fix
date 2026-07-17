import { STATUS, ROLES } from './constants.js';

// Allowed transitions: from -> [{ to, roles }]
const TRANSITIONS = {
  [STATUS.PENDING]: [
    { to: STATUS.ASSIGNED, roles: [ROLES.ADMIN] },
    { to: STATUS.CANCELLED, roles: [ROLES.REQUESTER, ROLES.ADMIN] },
    { to: STATUS.REJECTED, roles: [ROLES.ADMIN] },
  ],
  [STATUS.ASSIGNED]: [
    { to: STATUS.IN_PROGRESS, roles: [ROLES.OFFICER, ROLES.ADMIN] },
    { to: STATUS.ASSIGNED, roles: [ROLES.ADMIN] }, // reassignment
    { to: STATUS.REJECTED, roles: [ROLES.ADMIN] },
  ],
  [STATUS.IN_PROGRESS]: [
    { to: STATUS.COMPLETED, roles: [ROLES.OFFICER, ROLES.ADMIN] },
    { to: STATUS.REJECTED, roles: [ROLES.ADMIN] },
  ],
  [STATUS.COMPLETED]: [],
  [STATUS.CANCELLED]: [],
  [STATUS.REJECTED]: [],
};

export function canTransition(oldStatus, newStatus, role) {
  const options = TRANSITIONS[oldStatus] || [];
  return options.some((t) => t.to === newStatus && t.roles.includes(role));
}
