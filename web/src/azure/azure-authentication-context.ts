import {
  PublicClientApplication,
  AuthenticationResult,
  AccountInfo,
  EndSessionRequest,
  RedirectRequest,
  PopupRequest,
} from '@azure/msal-browser';

import { MSAL_CONFIG } from './azure-authentication-config';

import { setAccessToken, setTenantId } from '../util/index';

export class AzureAuthenticationContext {
  private myMSALObj: PublicClientApplication = new PublicClientApplication(
    MSAL_CONFIG,
  );

  private account?: AccountInfo;

  private loginRedirectRequest?: RedirectRequest;

  private loginRequest?: PopupRequest;

  public isAuthenticationConfigured = false;

  constructor() {
    // @ts-ignore
    this.account = null;
    this.setRequestObjects();
    if (MSAL_CONFIG?.auth?.clientId) {
      this.isAuthenticationConfigured = true;
    }
  }

  private setRequestObjects(): void {
    this.loginRequest = {
      scopes: [],
      prompt: 'select_account',
    };

    this.loginRedirectRequest = {
      ...this.loginRequest,
      redirectStartPage: window.location.href,
    };
  }

  login(signInType: string, setUser: any): void {
    if (signInType === 'loginPopup') {
      this.myMSALObj
        .loginPopup(this.loginRequest)
        .then((resp: AuthenticationResult) => {
          this.handleResponse(resp, setUser);
        })
        .catch((info: any) => {
          // eslint-disable-next-line no-console
          console.log('catch: ', info);
        })
        .finally(() => {});
    } else if (signInType === 'loginRedirect') {
      this.myMSALObj.loginRedirect(this.loginRedirectRequest);
    }
  }

  logout(account: AccountInfo): void {
    const logOutRequest: EndSessionRequest = {
      account,
    };

    this.myMSALObj.logout(logOutRequest);
  }

  handleResponse(response: AuthenticationResult, incomingFunction: any) {
    if (response !== null && response.account !== null) {
      this.account = response.account;
      setAccessToken(response.accessToken);
      setTenantId(response.tenantId);
    } else {
      this.account = this.getAccount();
    }

    if (this.account) {
      incomingFunction(this.account);
    }
  }

  private getAccount(): AccountInfo | undefined {
    const currentAccounts = this.myMSALObj.getAllAccounts();
    if (currentAccounts === null) {
      // @ts-ignore
      // eslint-disable-next-line no-console
      console.log('No accounts detected', currentAccounts);
      return undefined;
    }

    if (currentAccounts.length > 1) {
      // TBD: Add choose account code here
      // @ts-ignore
      // eslint-disable-next-line no-console
      console.log(
        'Multiple accounts detected, need to add choose account code.',
        currentAccounts,
      );
      return currentAccounts[0];
    }
    if (currentAccounts.length === 1) {
      // eslint-disable-next-line no-console
      console.log('Found account', currentAccounts[0]);
      return currentAccounts[0];
    }
    return undefined;
  }
}

export default AzureAuthenticationContext;
