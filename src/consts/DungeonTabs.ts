const GlobalTabEnum = {
  PROFILE: 'profile',
  FEED: 'feed',
  MESSAGE: 'message',
  FRIENDS: 'friends',
  MUSIC: 'music',
  SETTINGS: 'settings',
} as const;

type GlobalTabValue = (typeof GlobalTabEnum)[keyof typeof GlobalTabEnum];

export { GlobalTabEnum };
export type { GlobalTabValue };
