import { Configuration, LogLevel } from '@azure/msal-browser';

const AzureActiveDirectoryAppClientId: any =
  process.env.REACT_APP_AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID;

export const MSAL_CONFIG: Configuration = {
  auth: {
    clientId: AzureActiveDirectoryAppClientId,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            break;
          case LogLevel.Info:
            break;
          case LogLevel.Verbose:
            break;
          case LogLevel.Warning:
            break;
          default:
            break;
        }
      },
    },
  },
};
