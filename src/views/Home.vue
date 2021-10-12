<template>
  <div>
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
        <v-btn height="55px" color="#ffffff" style="border-radius:14px;">
          <v-icon color="#ff9f1c">
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
        <v-card tile max-width="450">
          <v-card-text class="pt-6 pb-1">
            <v-card>
              <v-card-text align="center" class="pb-1 text-h6 page-title">設定</v-card-text>
              <v-card-text class="pt-0">
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
              </v-card-text>
            </v-card>
          </v-card-text>

          <v-card-actions align="center" class="pl-6 pr-6">
            <v-btn
                color="#2ec5b6"
                @click="dialog.setting = false"
                class="white--text"
                block
            >
              是
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<script>
import flipperAnimationGenerator from '@bell-rabbit/flipper-animation-generator';
import RollButton from '../components/RollButton';

export default {
  name: 'Home',
  components: {
    RollButton,
    flipperAnimationGenerator
  },
  data () {
    return {
      flipperJSON: {},
      isLock: true,
      dialog: { alert: false, setting: false },
      setting: { star: 1 }
    };
  },
  methods: {
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
        'height': '400px'
      };
    },
    openSetting () {
      this.dialog.setting = true;
    }
  }
};
</script>

<style>
.page-title:after {
  content: "";
  display: block;
  margin: 0 auto;
  width: 50%;
  padding-top: 5px;
  border-bottom: 1px dotted #cecece;
}
</style>
