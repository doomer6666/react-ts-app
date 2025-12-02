export const TabEnum = {
  FRIENDS: 'friends',
  REQUESTS: 'requests',
  FOLLOWERS: 'followers',
} as const;

export type TabValues = (typeof TabEnum)[keyof typeof TabEnum];
