<template>
  <v-card :min-height="cardHeight" :style="getBackgroundImage()">
    <v-container fluid>
      <v-row justify="center">
        <flipper-animation-generator ref="fag"
                                     :width="fagWidth"
                                     style="padding: unset"
                                     :value="flipperJSON"
                                     @completed="saveRecord"
                                     @completed-playback="completedPlayback"
        ></flipper-animation-generator>
      </v-row>
      <v-row class="align-center text-center">
        <v-col cols="12" class="pt-2 pb-0" v-if="isLock">
          <span v-if="total > 0 &&  playback === false" v-html="$t('message.simulation_record', { total })"></span>

          <v-btn icon x-small style="float:right" @click="openSetting()">
            <v-icon color="#ff9f1c">
              mdi-cog
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" class="pt-2 pb-0" v-else-if="!isLock">
          {{ $t('blood_pressure_test.t') }}: <span style="color: #ffcd76">{{ bloodPressure.list.length }}</span> /
          {{ bloodPressure.count }}
        </v-col>
      </v-row>
      <v-row class="justify-space-around pt-2">
        <v-btn height="55px" @click="openTest" color="#ffffff" style="border-radius:14px;">
          <v-icon v-if="isLock" color="#ff9f1c">
            mdi-lock
          </v-icon>
          <v-icon v-else color="#ff9f1c">
            mdi-lock-open
          </v-icon>
        </v-btn>
        <roll-button @click="clickRoll" :alert="!isLock" style="border-radius:12px;"
                     :star="setting.star" class="mb-2" :loading="loading" :disabled="loading"></roll-button>
        <v-btn height="55px" color="#ffffff" style="border-radius:14px;" @click="shareUrl">
          <v-icon color="#ff9f1c">
            mdi-share-variant
          </v-icon>
        </v-btn>
      </v-row>
      <v-row v-if="currentId" class="ml-1">ID: {{ currentId }}</v-row>
    </v-container>

    <v-dialog
        v-model="dialog.alert"
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
                  @click="dialog.alert = false"
                  class="white--text"
                  block
              >
                {{ $t('dialog.no') }}
              </v-btn>
            </v-col>
            <v-col cols="6" class="pr-0">
              <v-btn
                  color="#2ec5b6"
                  @click="agree"
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

    <div class="text-center">
      <v-bottom-sheet inset v-model="dialog.setting" max-width="450">
        <flipper-card :title="$t('setting.t')" v-model="dialog.setting">
          <v-select
              :items="language"
              v-model="selectLanguage"
              item-text="text"
              item-value="value"
              :label="$t('language.t')"
          ></v-select>

          <a href="https://poeditor.com/join/project?hash=TdCGQW1xiz" style="color: #ff9f1c" target="_blank">Click here to improve the language resource file.</a>

          <v-checkbox
              v-model="setting.star"
              :label="$t('setting.random_record')"
              color="#ff9f1c"
              :value="1"
              hide-details
          ></v-checkbox>
          <v-checkbox
              v-model="setting.star"
              :label="$t('setting.specify_record.3_star_ball')"
              color="#ff9f1c"
              :value="3"
              hide-details
          ></v-checkbox>
          <v-checkbox
              v-model="setting.star"
              :label="$t('setting.specify_record.4_star_ball')"
              color="#ff9f1c"
              :value="4"
              hide-details
          ></v-checkbox>
          <v-checkbox
              v-model="setting.star"
              :label="$t('setting.specify_record.5_star_ball')"
              color="#ff9f1c"
              :value="5"
              hide-details
          ></v-checkbox>
        </flipper-card>
      </v-bottom-sheet>
    </div>

    <share-url v-model="dialog.share" :current-id="currentId"/>
  </v-card>
</template>

<script>
import flipperAnimationGenerator from '@bell-rabbit/flipper-animation-generator';
import RollButton from '../components/RollButton';
import FlipperCard from '../components/FlipperCard';
import ShareUrl from '../components/ShareUrl';
import API from '../plugins/api';

export default {
  name: 'Home',
  components: {
    ShareUrl,
    FlipperCard,
    RollButton,
    flipperAnimationGenerator
  },
  data () {
    return {
      flipperJSON: {},
      isLock: true,
      dialog: { alert: false, setting: false, share: false },
      setting: { star: 1 },
      total: 0,
      playback: false,
      bloodPressure: { count: 0, list: [] },
      currentId: 0,
      loading: false,
      createMode: false,
      language: [
        { text: this.$tc('language.zh-tw'), value: 'zh-tw' }
      ],
      selectLanguage: { text: this.$tc('language.zh-tw'), value: 'zh-tw' }
    };
  },
  methods: {
    getWidth () {
      let maxHeight = this.$vuetify.breakpoint.height - 148;

      if (maxHeight > 896) {
        return 450;
      }

      let maxWidth = maxHeight * 0.558;

      if (this.$vuetify.breakpoint.width < maxWidth) {
        return this.$vuetify.breakpoint.width;
      }

      return maxWidth > 450 ? 450 : maxWidth;
    },
    saveRecord (data) {
      this.loading = false;
      API.save(data).then((rs) => {
        if (rs.status === 'success') {
          this.total = rs.id;
          this.currentId = parseInt(rs.id);
        }
      });
    },
    completedPlayback () {
      this.loading = false;
    },
    shareUrl () {
      console.log(this.dialog.share);
      this.dialog.share = true;
    },
    agree () {
      API.bloodPressureCount().then((rs) => {
        this.bloodPressure.count = rs.data;
      });

      this.dialog.alert = false;
      this.isLock = false;
      this.currentId = 0;
    },
    openTest () {
      if (this.isLock) {
        this.dialog.alert = true;
      } else {
        this.currentId = 0;
        this.isLock = true;
      }
    },
    clickRoll () {
      this.loading = true;
      if (this.isLock) {
        switch (this.setting.star) {
          case 1:
            if (this.createMode) {
              this.$gtag.event('roll', { method: 'Google', 'event_category': 'Random' });
              this.reloadRandom();
            } else {
              this.$gtag.event('record', { method: 'Google', 'event_category': 'Random' });
              this.randomRecord();
            }
            break;
          case 3:
            this.$gtag.event('record', { method: 'Google', 'event_category': 'star3' });
            this.getRecord(3);
            break;
          case 4:
            this.$gtag.event('record', { method: 'Google', 'event_category': 'star4' });
            this.getRecord(4);
            break;
          case 5:
            this.$gtag.event('record', { method: 'Google', 'event_category': 'star5' });
            this.getRecord(5);
            break;
        }
      } else {
        this.$gtag.event('bloodPressure', { method: 'Google', 'event_category': 'record' });
        API.bloodPressureRecord().then((rs) => {
          this.playback = true;
          this.currentId = parseInt(rs.id);
          this.flipperJSON = JSON.parse(rs.data);

          let inList = this.bloodPressure.list.filter(i => i === rs.id);

          if (inList.length < 1) {
            this.bloodPressure.list.push(rs.id);
          }
        });
      }
    },
    randomRecord () {
      let number = this.getRandomInt(140000);
      this.currentId = number;
      this.playRecord(number, 0)
          .catch(() => {
            this.randomRecord();
          });
    },
    getRandomInt (max) {
      return Math.floor(Math.random() * max);
    },
    playRecord (recordId, timeout) {
      return API.getRecord(recordId)
          .then((rs) => {
            if (rs.status === 'empty') {
              return new Promise((resolve, reject) => {
                reject();
              });
            } else {
              setTimeout(() => {
                this.playback = true;
                this.flipperJSON = JSON.parse(rs.data);
              }, timeout);
            }
          });
    },
    getRecord (star) {
      API.randomRecord(star).then((rs) => {
        this.playback = true;
        this.currentId = parseInt(rs.id);
        this.flipperJSON = JSON.parse(rs.data);
      });
    },
    reloadRandom () {
      this.currentId = 0;
      this.playback = false;
      this.flipperJSON = {};
      this.$refs.fag.reload();
    },
    getBackgroundImage () {
      return {
        'background-image': `url(${require('../assets/bottom.jpg')})`,
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-position': 'bottom'
      };
    },
    openSetting () {
      this.dialog.setting = true;
    }
  },
  computed: {
    cardHeight () {
      return this.$vuetify.breakpoint.height - 48;
    },
    fagWidth () {
      return this.getWidth();
    }
  },
  mounted () {
    if (this.$route.query.record) {
      this.currentId = this.$route.query.record;
      this.$gtag.event('record', { method: 'Google', 'event_category': 'url' });
      this.playRecord(this.$route.query.record, 1000);
    }
  }
};
</script>
