import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider, AppState } from "@auth0/auth0-react";

interface Auth0ProviderWithHistoryProps {
  children: ReactNode;
}

const Auth0ProviderWithHistory: React.FC<Auth0ProviderWithHistoryProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || "/home");
  };

  const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;

  if (!domain || !clientId) {
    console.error("Auth0 environment variables are not set");
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: "http://localhost:5173/home",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
