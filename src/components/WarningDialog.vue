<template>
  <v-dialog
      v-model="show"
      persistent
      max-width="500"
      class="subtitle-2"
  >
    <v-card>
      <v-card-text align="center" class="mb-0 pb-2 pt-12 pl-4 pr-4" style="font-size: 18px;">
        {{ $t('warning_message.you_will_open_the_blood_pressure_test_mode') }}
      </v-card-text>
      <v-card-text align="center" class="mb-0 pb-3 pl-4 pr-4" style="font-size: 18px;"
                   v-html="$t('warning_message.this_website_will_not_be_responsible_for_all_consequences')">
      </v-card-text>
      <v-card-text align="center" class="pl-4 pr-4" style="font-size: 18px;">
        <br/>
        {{ $t('warning_message.example') }}
      </v-card-text>
      <v-card-text class="pb-0 pl-4 pr-4">
        <v-divider/>
      </v-card-text>
      <v-card-actions>
        <v-row class="pa-0 ma-0">
          <v-col cols="6" class="pl-0">
            <v-btn
                color="#ea3653"
                @click="show = false"
                class="white--text"
                block
            >
              {{ $t('dialog.no') }}
            </v-btn>
          </v-col>
          <v-col cols="6" class="pr-0">
            <v-btn
                color="#2ec5b6"
                @click="$emit('agree')"
                class="white--text"
                block
            >
              {{ $t('dialog.yes') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'WarningDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
};
</script>
