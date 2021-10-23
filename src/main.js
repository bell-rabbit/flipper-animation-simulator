import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";

import VueClipboard from "vue-clipboard2";

import VueGtag from "vue-gtag";
VueClipboard.config.autoSetContainer = true;

Vue.use(VueClipboard);
Vue.use(VueGtag,
  {
    config: { id: process.env.VUE_APP_GOOGLE_ANALYTICS },
    pageTrackerScreenviewEnabled: true
  },
  router);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  i18n,
  render: (h) => h(App)
}).$mount("#app");
