import type { ReactNode } from 'react';
import type INavigationBar from './INavigationBar';

export default interface IMainLayout extends INavigationBar {
  pageName: string;
  children: ReactNode;
}
