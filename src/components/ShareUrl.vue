<template>
  <div class="text-center">
    <v-bottom-sheet inset v-model="dialog" max-width="450">
      <flipper-card title="分享" v-model="dialog">
        <v-container fluid class="pa-0">
          <v-row class="pa-3">
              <v-text-field
                  class="mt-2"
                  label="Share url"
                  filled
                  dense
                  hide-details
                  single-line
                  :value="shareUrl"
                  disabled
              ></v-text-field>
          </v-row>
          <v-row class="justify-end pb-3">
              <v-btn class="mr-3 orange--text lighten-2" color="#FFFFFF" icon @click="copyUrl()"><v-icon>mdi-content-copy</v-icon></v-btn>
              <v-btn class="mr-3 orange--text lighten-2" color="#FFFFFF" icon @click="share" v-if="canShare"><v-icon>mdi-share-variant</v-icon></v-btn>
          </v-row>
        </v-container>
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
    currentId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dialog: this.value,
      shareUrl: '',
      canShare: false
    };
  },
  methods: {
    copyUrl () {
      let tempInput = document.createElement('input');
      tempInput.value = this.shareUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);

      this.$root.$snackbar.Show('複製完成');
    },
    share () {
      navigator.share({
        text: this.currentId === 0 ? '來模擬一下跳台動畫吧!!' : '分享了一次跳台動畫記錄給你!',
        title: '彈珠跳台動畫模擬器',
        url: this.shareUrl
      });
    }
  },
  mounted () {
    if (navigator.canShare) {
      this.canShare = true;
    }
  },
  watch: {
    dialog (newValue) {
      this.$emit('input', newValue);
    },
    value (newValue) {
      if (this.currentId) {
        this.shareUrl = `${window.location.origin}?record=${this.currentId}`;
      } else {
        this.shareUrl = `${window.location.origin}`;
      }
      this.dialog = newValue;
    }
  }
};
</script>

