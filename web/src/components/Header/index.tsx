import React, { FC } from 'react';
import NlTabBar from '../NlTabBar/index';
import TitleContainer from '../TitleContainer/index';

type propTypes = {
  allowMenu: boolean;
  title: string;
};

const Header: FC<propTypes> = ({ allowMenu, title }) => {
  const NlTabBarProps = {
    allowMenu,
  };
  const TitleContainerProps = {
    title,
  };

  return (
    <>
      <header>
        <NlTabBar {...NlTabBarProps} />
      </header>
      <TitleContainer {...TitleContainerProps} />
    </>
  );
};

export default Header;
