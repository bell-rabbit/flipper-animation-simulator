module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:80",
        pathRewrite: { "^/api": "" },
      },
    },
  },
}
