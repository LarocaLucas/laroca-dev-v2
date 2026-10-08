// Worker do laroca.dev: manda www para o domínio principal e serve os arquivos de dist/.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.laroca.dev") {
      url.hostname = "laroca.dev";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
