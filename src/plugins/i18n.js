import Vue from "vue";
import VueI18n from "vue-i18n";

// import zhHK from './lang/zh-hk.json';
// import en from './lang/en.json';
import zhTW from "../lang/zh-tw.json";

Vue.use(VueI18n);
// import ja from './lang/ja.json';
// import ko from './lang/ko.json';

const messages = {
  "zh-tw": zhTW
};

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "zh-tw",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "zh-tw",
  messages
});
