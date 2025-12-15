import type { KeyedMutator } from 'swr';

export default interface IChatItem {
  id: number;
  name: string;
  preview: string;
  chatTime: string;
  chatBadge?: number;
  mutate: KeyedMutator<IChatItem[]>;
}
