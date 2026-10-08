import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import App from "./App";
import "./index.css";

const raiz = document.getElementById("root")!;
const app = (
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>
);

// No build, o HTML já vem pronto (scripts/prerender.mjs); em desenvolvimento a raiz está vazia.
if (raiz.querySelector("main")) hydrateRoot(raiz, app);
else createRoot(raiz).render(app);
