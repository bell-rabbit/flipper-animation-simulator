<template>
  <v-card tile max-width="450">
    <v-card-text class="pt-6 pb-1">
      <v-card>
        <v-card-text align="center" class="pb-1 text-h6 dialog-title">{{ title }}</v-card-text>
        <v-card-text class="pt-0">
          <slot/>
        </v-card-text>
      </v-card>
    </v-card-text>

    <v-card-actions align="center" class="pl-6 pr-6">
      <v-btn
          color="#2ec5b6"
          @click="$emit('input', false)"
          class="white--text"
          block
      >
        {{ $t('dialog.yes') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "FlipperCard",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.dialog-title:after {
  content: "";
  display: block;
  margin: 0 auto;
  width: 50%;
  padding-top: 5px;
  border-bottom: 1px dotted #cecece;
}
</style>
