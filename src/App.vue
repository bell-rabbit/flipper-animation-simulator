<template>
  <v-app :style='getBackgroundImage()'>
    <github-corner v-if="$vuetify.breakpoint.width > 650"/>
    <v-main>
      <v-container style="background-color: #ffffff; max-width: 450px" class="pa-0">
        <v-app-bar flat dense
                   :src="require('./assets/top.jpg')"
        >
          <v-toolbar-title class="white--text">{{ $t("app.nav") }}</v-toolbar-title>
        </v-app-bar>
        <router-view/>
      </v-container>
    </v-main>

    <snackbar ref="snackbar"></snackbar>
  </v-app>
</template>

<script>
import GithubCorner from "./components/GithubCorner";
import Snackbar from "./components/Snackbar";

export default {
  name: "App",
  components: {
    Snackbar,
    GithubCorner
  },
  data () {
    return {
      langMap: {
        tw: "zh-tw",
        hk: "zh-hk",
        "zh-hk": "zh-hk",
        ja: "en",
        "jp-kp": "en",
        ko: "ko",
        "ko-kr": "ko",
        "zh-tw": "zh-tw",
        "zh-ch": "zh-tw"
      }
    };
  },
  methods: {
    getBackgroundImage () {
      return {
        "background-image": `url(${require("./assets/bg.jpg")})`,
        "background-size": "40px"
      };
    },
    switchLang (lang) {
      this.$i18n.locale = this.langMap[lang.toLowerCase()] || "en";
      this.updateMeta();
    },
    setLangUrl (lang) {
      const langParam = this.langMap[lang.toLowerCase()];
      if (langParam !== "zh-tw") {
        this.$router.push({
          name: "Home",
          params: { lang: langParam },
          query: { record: this.$route.query.record }
        });
      }
    },
    updateMeta () {
      const title = this.$t("app.title");
      const description = this.$t("app.description");

      this.$meta().addApp("custom").set({
        title,
        meta: [
          { property: "og:title", itemProp: "name", content: title },
          { property: "og:site_name", itemProp: "author", content: title },
          { name: "description", property: "og:description", itemProp: "description", content: description },
          { name: "twitter:description", content: description },
          { name: "twitter:title", content: title }]
      });
    }
  },
  created () {
    const paramLang = this.$route.params.lang;
    if (paramLang) {
      this.switchLang(paramLang);
    } else {
      this.switchLang(navigator.language);
      this.setLangUrl(navigator.language);
    }
  },
  mounted () {
    this.$root.$snackbar = this.$refs.snackbar;
    this.$root.updateMeta = this.updateMeta;
  }
};
</script>
