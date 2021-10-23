<template>
  <v-snackbar
    v-model="isShow"
    :color="color[0]"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        v-if="action"
        :color="color[1]"
        text
        @click="runCallback"
      >
        {{ action }}
      </v-btn>

      <v-btn
        v-bind="attrs"
        icon
        :color="color[2]"
        @click="isShow = false"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  data () {
    return {
      isShow: false,
      text: "",
      color: ["grey darken-3", "", "red lighten-5"],
      action: "",
      callback: null
    };
  },
  methods: {
    runCallback () {
      this.isShow = false;
      this.callback();
    },
    show (text, type = "message", option) {
      this.text = text;
      this.isShow = true;
      switch (type) {
        case "message":
          this.color = ["info", "cyan lighten-1", "red lighten-5"];
          this.action = "";
          this.callback = null;
          break;
        case "error":
          this.color = ["error", "green darken-4", "red lighten-5"];
          this.text = `Error: ${this.text}`;
          this.action = option.text;
          this.callback = option.callback;
          break;
      }
    }
  }
};
</script>
