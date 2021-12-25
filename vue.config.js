const path = require("path");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:80",
        pathRewrite: { "^/api": "" }
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: "zh-tw",
      fallbackLocale: "zh-tw",
      localeDir: "lang",
      enableInSFC: false,
      enableBridge: false
    }
  },
  configureWebpack (config) {
    if (process.env.NODE_ENV === "production") {
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, "dist"),
          routes: ["/ko", "/en", "/zh-tw", "/zh-hk", "/ja"],
          renderer: new Renderer({
            renderAfterDocumentEvent: "render-event"
          }),
          postProcess (renderedRoute) {
            renderedRoute.html = renderedRoute.html.replace(/<style data-vue-meta="vuetify"[\w\W]*<\/style>/gmi, "");
            renderedRoute.html = renderedRoute.html.replace(/<div data-app="true"[\w\W]*<\/div>/gmi, "<div id=\"app\"></div>");
            return renderedRoute;
          }
        })
      );
    }
  }
};
