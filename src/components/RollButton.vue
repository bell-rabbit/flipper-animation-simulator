<template>
  <v-btn depressed height="55px" width="178px" @click="clickButton" :loading="loading" :class="getBackgroundImage()">
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
      const lang = this.$i18n.locale;

      if (this.alert) {
        return `${lang}-alert`;
      }

      if (this.star === 1) {
        return `${lang}-random`;
      }

      return `${lang}-star-${this.star}`;
    },
    clickButton () {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin bg {
  background-image: url("../assets/split.png");
}

$zh-tw-y: -5.78px;
$en-y: -67.2px;
$ko-y: -128.4px;
$zh-hk-y: -190.6px;
$ja-y: -252.8px;

$alert-x: -5.78px;
$random-x: -189.56px;
$star-5-x: -373.34px;
$star-4-x: -557.12px;
$star-3-x: -740.9px;

$lang-list: ($zh-tw-y, $en-y, $ko-y, $zh-hk-y, $ja-y);
$lang-name: ('zh-tw', 'en', 'ko', 'zh-hk', 'ja');

@for $i from 1 to length($lang-list) +1 {
  .#{nth($lang-name, $i)}-alert {
    background-position: $alert-x nth($lang-list, $i);
    @include bg;
  }

  .#{nth($lang-name, $i)}-random {
    background-position: $random-x nth($lang-list, $i);
    @include bg;
  }

  .#{nth($lang-name, $i)}-star-5 {
    background-position: $star-5-x nth($lang-list, $i);
    @include bg;
  }

  .#{nth($lang-name, $i)}-star-4 {
    background-position: $star-4-x nth($lang-list, $i);
    @include bg;
  }

  .#{nth($lang-name, $i)}-star-3 {
    background-position: $star-3-x nth($lang-list, $i);
    @include bg;
  }
}

</style>
