export const GlobalTabEnum = {
  PROFILE: 'profile',
  FEED: 'feed',
  MESSAGE: 'message',
  FRIENDS: 'friends',
  MUSIC: 'music',
  SETTINGS: 'settings',
} as const;

export type GlobalTabValue = (typeof GlobalTabEnum)[keyof typeof GlobalTabEnum];
