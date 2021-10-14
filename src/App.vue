<template>
  <v-app :style='getBackgroundImage()'>
    <github-corner v-if="$vuetify.breakpoint.width > 650"/>
    <v-main>
      <v-container style="background-color: #ffffff; max-width: 450px" class="pa-0">
        <v-app-bar flat dense
                   :src="require('./assets/top.jpg')"
        >
          <v-toolbar-title class="white--text">彈珠跳台動畫模擬器</v-toolbar-title>
        </v-app-bar>
        <router-view/>
      </v-container>
    </v-main>

    <snackbar ref="snackbar"></snackbar>
  </v-app>
</template>

<script>
import GithubCorner from './components/GithubCorner';
import Snackbar from './components/Snackbar';
export default {
  name: 'App',
  components: { Snackbar, GithubCorner },
  methods: {
    getBackgroundImage () {
      return {
        'background-image': `url(${require('./assets/bg.jpg')})`,
        'background-size': '40px'
      };
    }
  },
  mounted () {
    this.$root.$snackbar = this.$refs.snackbar;
  },
};
</script>
