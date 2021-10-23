<template>
  <v-btn depressed height="55px" width="178px" @click="clickButton" :loading="loading" :style="getBackgroundImage()">
    <template v-slot:loader>
      <v-progress-circular
        indeterminate
        color="#ea3653"
      ></v-progress-circular>
    </template>
  </v-btn>
</template>

<script>
export default {
  name: "RollButton",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    alert: {
      type: Boolean,
      default: false
    },
    star: {
      type: Number,
      default: 0
    }
  },
  methods: {
    getBackgroundImage () {
      let url = this.alert ? require("../assets/alertRoll.png") : require("../assets/roll.png");

      if (!this.alert) {
        if (this.star !== 1) {
          url = require(`../assets/roll_${this.star}.png`);
        }
      }

      return {
        "background-image": `url(${url})`,
        "background-size": "contain"
      };
    },
    clickButton () {
      this.$emit("click");
    }
  }
};
</script>
