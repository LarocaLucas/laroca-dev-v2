import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { MotionConfig } from "motion/react";
import App from "./App";

/** HTML da página inteira, para os buscadores lerem o conteúdo sem depender de JavaScript. */
export const render = () =>
  renderToString(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </StrictMode>,
  );
