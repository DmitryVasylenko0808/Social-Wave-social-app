import { useAuth } from "./modules/auth/hooks/useAuth.ts";
import { useTheme } from "./modules/settings/hooks/useTheme.ts";
import { useEffect } from "react";
import Navigation from "./navigation.tsx";
import AlertsContainer from "./modules/common/components/alerts.container.component.tsx";

import "./i18n/i18n.js";

function App() {
  const { isAuthenticated, setAuthData } = useAuth();
  const { isDarkTheme, setDarkTheme } = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      setAuthData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isDarkTheme) {
      setDarkTheme();
    }
  }, []);

  return (
    <>
      <Navigation />
      <AlertsContainer />
    </>
  );
}

export default App;
