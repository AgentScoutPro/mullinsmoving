import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "./hubs.css";
import "./map-theme.css";
import { HubPage, isHubPath } from "./pages/HubPage";
import { SiteLayout } from "./pages/SiteLayout";
import { HomePage } from "./pages/HomePage";

const path = window.location.pathname.replace(/\/$/, "") || "/";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <SiteLayout>
      {isHubPath(path) ? <HubPage path={path} /> : <HomePage />}
    </SiteLayout>
  </StrictMode>,
);
