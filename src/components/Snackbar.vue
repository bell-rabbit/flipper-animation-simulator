<template>
  <v-snackbar
      v-model="show"
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
          @click="show = false"
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
  name: 'Snackbar',
  data () {
    return {
      show: false,
      text: '',
      color: ['grey darken-3', '', 'red lighten-5'],
      action: '',
      callback: null
    };
  },
  methods: {
    runCallback () {
      this.show = false;
      this.callback();
    },
    Show (text, type = 'message', option) {
      this.text = text;
      this.show = true;
      switch (type) {
        case 'message':
          this.color = ['info', 'cyan lighten-1', 'red lighten-5'];
          this.action = '';
          this.callback = undefined;
          break;
        case 'error':
          this.color = ['error', 'green darken-4', 'red lighten-5'];
          this.text = `Error: ${  this.text}`;
          if (option) {
            this.action = option.text ? option.text : undefined;
            this.callback = option.callback ? option.callback : undefined;
          }
          break;
      }
    }
  }
};
</script>
