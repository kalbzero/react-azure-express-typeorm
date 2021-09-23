import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AccountInfo } from '@azure/msal-browser';
import AzureAuthenticationButton from '../../azure/azure-authentication-component';
import NlTabBar from '../../components/NlTabBar';
import NlOrangeLogo from '../../assets/logo.png';
import { setUsername, setName } from '../../util/index';

const Login: FC = () => {
  const history = useHistory();
  const NlTabBarProps = {
    allowMenu: false,
  };

  // current authenticated user
  const [currentUser, setCurrentUser] = useState<AccountInfo>();

  // authentication callback
  const onAuthenticated = async (userAccountInfo: AccountInfo) => {
    setCurrentUser(userAccountInfo);
  };

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setName(currentUser.name || '');
      history.push('/home');
    }
  }, [currentUser]);

  return (
    <>
      <div>
        <header>
          <NlTabBar {...NlTabBarProps} />
        </header>
        <div className="flex flex-col justify-center items-center pt-20 gap-y-5">
          <div className="flex flex-row">
            <img
              src={NlOrangeLogo}
              alt="NlLogoLaranja"
              className="self-end"
              style={{ height: 41, width: 83, marginBottom: 3 }}
            />
            <h2 className="mt-7 ml-0.5 text-sm text-gray-500">CLASSROOM</h2>
          </div>
          <h3>Entre com suas credencias Microsoft</h3>
          <AzureAuthenticationButton onAuthenticated={onAuthenticated} />
        </div>
      </div>
    </>
  );
};

export default Login;
