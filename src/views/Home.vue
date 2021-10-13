<template>
  <v-card :min-height="$vuetify.breakpoint.height" :style="getBackgroundImage()">
    <v-container fluid>
      <v-row>
        <flipper-animation-generator ref="fag" :width="450" style="padding: unset"></flipper-animation-generator>
      </v-row>
      <v-row class="align-center text-center">
        <v-col cols="12" class="pt-2 pb-0" v-if="isLock">
          此結果為這個網站第 <span style="color: #ffcd76">{{ total }}</span> 次模擬

          <v-btn icon x-small style="float:right" @click="openSetting()">
            <v-icon color="#ff9f1c">
              mdi-cog
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" class="pt-2 pb-0" v-else>
          你已完成第 <span style="color: #ff9f1c">{{ total }}</span> 次測試
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
        <roll-button @click="reloadRandom" :alert="!isLock" style="border-radius:12px;"
                     :star="setting.star"></roll-button>
        <v-btn height="55px" color="#ffffff" style="border-radius:14px;" @click="shareUrl">
          <v-icon color="#ff9f1c" >
            mdi-share-variant
          </v-icon>
        </v-btn>
      </v-row>
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
                  @click="dialog = false"
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

    <share-url v-model="dialog.share"/>
  </v-card>
</template>

<script>
import flipperAnimationGenerator from '@bell-rabbit/flipper-animation-generator';
import RollButton from '../components/RollButton';
import FlipperCard from '../components/FlipperCard';
import ShareUrl from '../components/ShareUrl';

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
      total: 0
    };
  },
  methods: {
    shareUrl(){
      console.log(this.dialog.share);
      this.dialog.share = true;
    },
    agree () {
      this.dialog.alert = false;
      this.isLock = false;
    },
    openTest () {
      if (this.isLock) {
        this.dialog.alert = true;
      } else {
        this.isLock = true;
      }
    },
    reloadRandom () {
      // this.$refs.json.value ='';
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
  }
};
</script>
