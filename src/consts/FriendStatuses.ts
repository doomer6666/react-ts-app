export const Statuses = {
  UNKNOWN: 'unknown',
  SENT: 'sent',
  RECEIVED: 'received',
  SUBSCRIBER: 'subscriber',
  FRIEND: 'friend',
} as const;

export type StatusValues = (typeof Statuses)[keyof typeof Statuses];
