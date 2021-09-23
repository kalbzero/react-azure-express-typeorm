import React, { useState } from 'react';
import { AccountInfo } from '@azure/msal-browser';
import { Button } from '@material-ui/core';
import AzureAuthenticationContext from './azure-authentication-context';

const ua = window.navigator.userAgent;
const msie = ua.indexOf('MSIE ');
const msie11 = ua.indexOf('Trident/');
const isIE = msie > 0 || msie11 > 0;

// Log In, Log Out button
const AzureAuthenticationButton = ({ onAuthenticated }: any) => {
  // Azure client context
  const authenticationModule: AzureAuthenticationContext =
    new AzureAuthenticationContext();

  const [authenticated, setAuthenticated] = useState<Boolean>(false);
  const [user, setUser] = useState<AccountInfo>();

  const returnedAccountInfo = (user2: AccountInfo) => {
    // set state
    setAuthenticated(!!user2?.name);
    onAuthenticated(user2);
    setUser(user2);
  };

  const logIn = (): any => {
    const typeName = 'loginPopup';
    const logInType = isIE ? 'loginRedirect' : typeName;

    // Azure Login
    authenticationModule.login(logInType, returnedAccountInfo);
  };
  const logOut = (): any => {
    if (user) {
      onAuthenticated(undefined);
      // Azure Logout
      authenticationModule.logout(user);
    }
  };

  const showLogInButton = () => (
    <Button
      color="primary"
      variant="contained"
      id="authenticationButton"
      onClick={() => logIn()}
    >
      Log in
    </Button>
  );

  const showLogOutButton = () => (
    <div id="authenticationButtonDiv">
      <div id="authentication">
        <button
          type="button"
          id="authenticationButton"
          onClick={() => logOut()}
        >
          Log out
        </button>
      </div>
    </div>
  );

  const showButton = () =>
    authenticated ? showLogOutButton() : showLogInButton();

  return (
    <div id="authentication">
      {authenticationModule.isAuthenticationConfigured ? (
        showButton()
      ) : (
        <div>Authentication Client ID is not configured.</div>
      )}
    </div>
  );
};

export default AzureAuthenticationButton;
