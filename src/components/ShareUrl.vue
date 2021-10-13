<template>
  <div class="text-center">
    <v-bottom-sheet inset v-model="dialog" max-width="450">
      <flipper-card title="分享" v-model="dialog">
        <v-text-field
            class="mt-2"
            label="Share url"
            filled
            dense
            hide-details
            single-line
            :value="shareUrl"
            append-icon="mdi-content-copy"
        ></v-text-field>
      </flipper-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import FlipperCard from './FlipperCard';

export default {
  name: 'ShareUrl',
  components: { FlipperCard },
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      dialog: this.value,
      shareUrl : "http://192.168.100.147:8080/"
    };
  },
  watch: {
    dialog (newValue) {
      this.$emit('input', newValue);
    },
    value (newValue) {
      this.dialog = newValue;
    }
  },
};
</script>

