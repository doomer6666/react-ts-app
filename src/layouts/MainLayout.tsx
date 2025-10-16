import type { FC } from 'react';
import NavigationBar from '../components/NavigationBar';
import type IMainLayout from '../types/IMainLayout';

const MainLayout: FC<IMainLayout> = ({
  activeItem,
  setActiveItem,
  pageName,
  children,
}) => {
  return (
    <div className={`container ${pageName}`}>
      <NavigationBar activeItem={activeItem} setActiveItem={setActiveItem} />
      {children}
    </div>
  );
};

export default MainLayout;
