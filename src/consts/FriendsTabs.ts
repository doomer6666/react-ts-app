const TabEnum = {
  FRIENDS: 'friends',
  REQUESTS: 'requests',
  FOLLOWERS: 'followers',
} as const;

type TabValues = (typeof TabEnum)[keyof typeof TabEnum];

export { TabEnum };
export type { TabValues };
