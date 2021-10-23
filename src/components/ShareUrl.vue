<template>
  <div class="text-center">
    <v-bottom-sheet inset v-model="dialog" max-width="450">
      <flipper-card :title="$t('share_url.share')" v-model="dialog">
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
              ref="textField"
            ></v-text-field>
          </v-row>
          <v-row class="justify-end pb-3">
            <button type="button"
                    class="mr-3"
                    v-clipboard:copy="shareUrl"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">
              <v-icon class="orange--text">mdi-content-copy</v-icon>
            </button>

            <v-btn class="mr-3 orange--text lighten-2" color="#FFFFFF" icon @click="share" v-if="canShare">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </flipper-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import FlipperCard from "./FlipperCard";

export default {
  name: "ShareUrl",
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
      shareUrl: "",
      canShare: false
    };
  },
  methods: {
    onCopy () {
      this.$root.$snackbar.show(this.$tc("share_url.copy.success"));
    },
    onError () {
      this.$root.$snackbar.show(this.$tc("share_url.copy.error"), this.$tc("share_url.error"));
    },
    share () {
      navigator.share({
        text: this.currentId === 0 ? this.$tc("share_url.lets_simulate_the_jumping_animation") : this.$tc("share_url.share_a_record_to_you"),
        title: this.$tc("app.nav"),
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
      this.$emit("input", newValue);
    },
    value (newValue) {
      const lang = this.$i18n.locale === "zh-tw" ? "" : this.$i18n.locale + "/";

      if (this.currentId) {
        this.shareUrl = `${window.location.origin}/${lang}?record=${this.currentId}`;
      } else {
        this.shareUrl = `${window.location.origin}/${lang}`;
      }
      this.dialog = newValue;
    }
  }
};
</script>
