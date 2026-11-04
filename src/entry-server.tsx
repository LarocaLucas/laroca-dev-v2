import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { MotionConfig } from "motion/react";
import { ROTAS } from "./rotas";

export { ROTAS };

/** HTML de uma página inteira, para os buscadores e os robôs das plataformas lerem o conteúdo sem JavaScript. */
export const render = (caminho: string) => {
  const { Pagina } = ROTAS[caminho];
  return renderToString(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <Pagina />
      </MotionConfig>
    </StrictMode>,
  );
};
