// Enum-like constants (SQLite stores these as plain strings).

export const ROLES = {
  REQUESTER: 'REQUESTER',
  OFFICER: 'OFFICER',
  ADMIN: 'ADMIN',
};

export const STATUS = {
  PENDING: 'PENDING',
  ASSIGNED: 'ASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  REJECTED: 'REJECTED',
};

export const PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
};

export const USER_TYPE = {
  STUDENT: 'STUDENT',
  STAFF: 'STAFF',
};

export const STATUS_VALUES = Object.values(STATUS);
export const PRIORITY_VALUES = Object.values(PRIORITY);
export const USER_TYPE_VALUES = Object.values(USER_TYPE);
