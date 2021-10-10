<template>
  <v-app style='background-color: #ffffff'>
    <v-main>
      <v-container style="background-color: #ffffff; max-width: 400px" class="pa-0">
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
      return {};
    }
  }
};
</script>
