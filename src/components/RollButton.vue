<template>
  <v-btn depressed height="55px" width="178px" @click="clickButton" :loading="loading" :style="getBackgroundImage()">
    <template v-slot:loader>
        <span class="custom-loader">
          <v-icon light>mdi-cached</v-icon>
        </span>
    </template>
  </v-btn>
</template>

<script>
export default {
  name: 'RollButton',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    alert: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getBackgroundImage () {
      let url = this.alert ? require('../assets/alertRoll.png') : require('../assets/roll.png');

      return {
        'background-image': `url(${url})`,
        'background-size': 'contain'
      };
    },
    clickButton () {
      this.$emit('click');
    }
  }
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
