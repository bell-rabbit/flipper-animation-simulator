<template>
  <v-app :style='getBackgroundImage()'>
    <v-main>
      <v-container style="background-color: #ffffff; max-width: 450px" class="pa-0">
        <v-app-bar flat dense
                   :src="require('./assets/top.jpg')"
        >
          <v-toolbar-title class="white--text">Collapsing Bar</v-toolbar-title>
        </v-app-bar>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  methods: {
    getBackgroundImage () {
      return {
        'background-image': `url(${require('./assets/bg.jpg')})`,
        'background-size': '40px'
      };
    }
  }
};
</script>
