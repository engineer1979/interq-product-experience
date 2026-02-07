import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/team-images.css";

import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
        <App />
    </HelmetProvider>
);

// Ensure light mode is enforced
document.documentElement.classList.add('light');
document.documentElement.classList.remove('dark');

// GA4 initialization using env var
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
if (GA_ID) {
  const scriptTag = document.createElement('script');
  scriptTag.async = true;
  scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(scriptTag);

  const inline = document.createElement('script');
  inline.text = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`;
  document.head.appendChild(inline);
}
