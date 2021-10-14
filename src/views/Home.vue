<template>
  <v-card :min-height="$vuetify.breakpoint.height - 48" :style="getBackgroundImage()">
    <v-container fluid>
      <v-row justify="center">
        <flipper-animation-generator ref="fag"
                                     :width="getWidth()"
                                     style="padding: unset"
                                     :value="flipperJSON"
                                     @completed="saveRecord"
        ></flipper-animation-generator>
      </v-row>
      <v-row class="align-center text-center">
        <v-col cols="12" class="pt-2 pb-0" v-if="isLock">
          <span v-if="total > 0 &&  playback === false">此結果為這個網站第 <span style="color: #ffcd76">
            {{ total }}
          </span> 次模擬</span>

          <v-btn icon x-small style="float:right" @click="openSetting()">
            <v-icon color="#ff9f1c">
              mdi-cog
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" class="pt-2 pb-0" v-else-if="!isLock">
          血壓測試: <span style="color: #ffcd76">{{ bloodPressure.list.length }}</span> / {{ bloodPressure.count }}
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
                     :star="setting.star" class="mb-2"></roll-button>
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
        <v-card-text align="center" class="mb-0 pb-2 pt-12 pl-4 pr-4" style="font-size: 18px;">你將會打開血壓測試模式。
        </v-card-text>
        <v-card-text align="center" class="mb-0 pb-3 pl-4 pr-4" style="font-size: 18px;">本網頁對所有後果<span
            class="red--text">不會負責</span>，包括及不限於以下反應：
        </v-card-text>
        <v-card-text align="center" class="pl-4 pr-4" style="font-size: 18px;">
          <br/>
          腦溢血，高血壓，中風...
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
                否
              </v-btn>
            </v-col>
            <v-col cols="6" class="pr-0">
              <v-btn
                  color="#2ec5b6"
                  @click="agree"
                  class="white--text"
                  block
              >
                是
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="text-center">
      <v-bottom-sheet inset v-model="dialog.setting" max-width="450">
        <flipper-card title="設定" v-model="dialog.setting">
          <v-checkbox
              v-model="setting.star"
              label="隨機"
              color="#ff9f1c"
              :value="1"
              hide-details
          ></v-checkbox>
          <v-checkbox
              v-model="setting.star"
              label="必定3星"
              color="#ff9f1c"
              :value="3"
              hide-details
          ></v-checkbox>
          <v-checkbox
              v-model="setting.star"
              label="必定4星"
              color="#ff9f1c"
              :value="4"
              hide-details
          ></v-checkbox>
          <v-checkbox
              v-model="setting.star"
              label="必定5星"
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
      currentId: 0
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
      API.save(data).then((rs) => {
        if (rs.status === 'success') {
          this.total = rs.id;
          this.currentId = parseInt(rs.id);
        }
      });
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
      if (this.isLock) {
        switch (this.setting.star) {
          case 1:
            this.$gtag.event('roll', { method: 'Google', 'event_category': 'Random' });
            this.reloadRandom();
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
    getRecord (star) {
      API.randomRecord(star).then((rs) => {
        this.playback = true;
        this.currentId = rs.id;
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
  mounted () {
    if (this.$route.query.record) {
      this.$gtag.event('record', { method: 'Google', 'event_category': 'url' });
      API.getRecord(this.$route.query.record)
          .then((rs) => {
            setTimeout(() => {
              this.playback = true;
              this.currentId = this.$route.query.record;
              this.flipperJSON = JSON.parse(rs.data);
            }, 1000);
          });
    }

    this.$gtag.pageview(this.$route);
  }
};
</script>
