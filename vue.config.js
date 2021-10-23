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
  }
};
