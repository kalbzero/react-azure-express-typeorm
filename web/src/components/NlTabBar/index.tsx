import { Icon, IconButton } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';

import NlTabBarLogo from '../../assets/logo.png';
import { logout } from '../../util/index';
import Sidebar from '../Sidebar';
import './styles.css';

type propTypes = {
  allowMenu: boolean;
};

const NlTabBar: FC<propTypes> = ({ allowMenu }) => {
  const history = useHistory();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const HandleLogout = () => {
    logout();
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <div className="nl-tab-container">
        <div className="flex ml-2 items-center">
          {allowMenu && (
            <IconButton onClick={() => setIsSidebarOpen(value => !value)}>
              <div className="text-white flex items-center justify-center">
                <Icon color="inherit">menu</Icon>
              </div>
            </IconButton>
          )}
          <img src={NlTabBarLogo} alt="NlTabBarLogo" />
        </div>
        {allowMenu === true && (
          <>
            <div className="user-tools-container">
              <button
                type="button"
                className="profile-modal"
                onClick={HandleLogout}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>

      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default NlTabBar;
