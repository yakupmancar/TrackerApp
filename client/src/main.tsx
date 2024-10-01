import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/tailwind.css";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISABLE_KEY) {
  throw new Error("Missing Publisable key!");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISABLE_KEY}>
      <App />
    </ClerkProvider>
  </StrictMode>
);
