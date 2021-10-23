<template>
  <div class="text-center">
    <v-bottom-sheet inset v-model="show" max-width="450">
      <flipper-card :title="$t('setting.t')" v-model="show">
        <v-select
            :items="language"
            v-model="selectLanguage"
            item-text="text"
            item-value="value"
            :label="$t('language.t')"
        ></v-select>

        <a href="https://poeditor.com/join/project?hash=TdCGQW1xiz" style="color: #ff9f1c" target="_blank" >{{$t('language.help_message')}}</a>

        <v-checkbox
            v-model="starSetting"
            :label="$t('setting.random_record')"
            color="#ff9f1c"
            :value="1"
            hide-details
        ></v-checkbox>
        <v-checkbox
            v-model="starSetting"
            :label="$t('setting.specify_record.3_star_ball')"
            color="#ff9f1c"
            :value="3"
            hide-details
        ></v-checkbox>
        <v-checkbox
            v-model="starSetting"
            :label="$t('setting.specify_record.4_star_ball')"
            color="#ff9f1c"
            :value="4"
            hide-details
        ></v-checkbox>
        <v-checkbox
            v-model="starSetting"
            :label="$t('setting.specify_record.5_star_ball')"
            color="#ff9f1c"
            :value="5"
            hide-details
        ></v-checkbox>
      </flipper-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import FlipperCard from "./FlipperCard";
export default {
  name: "SettingCard",
  components: { FlipperCard },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    star: {
      type: Number,
      default: 1
    }
  },
  computed: {
    show: {
      get () {
        return this.value;
      },
      set (value) {
        this.$emit("input", value);
      }
    },
    starSetting: {
      get () {
        return this.star;
      },
      set (value) {
        this.$emit("update:star", value);
      }
    }
  },
  data () {
    return {
      language: [
        { text: this.$tc("language.zh-tw"), value: "zh-tw" },
        { text: this.$tc("language.zh-hk"), value: "zh-hk" },
        { text: this.$tc("language.en"), value: "en" },
        { text: this.$tc("language.ko"), value: "ko" }
      ],
      selectLanguage: this.$i18n.locale
    };
  },
  watch: {
    selectLanguage (newValue) {
      this.$root.$i18n.locale = newValue;
      this.$root.updateMeta();
    }
  }
};
</script>
