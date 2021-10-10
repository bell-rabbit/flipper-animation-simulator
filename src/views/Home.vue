<template>
  <div>
    <v-container fluid>
      <v-row>
        <flipper-animation-generator ref="fag" :width="400" style="padding: unset"></flipper-animation-generator>
      </v-row>
      <v-row class="align-center text-center">
        <v-col cols="12" class="pt-2 pb-0" v-if="isLock">
          此結果為這個網站第 <span style="color: #ffcd76">{{ total }}</span> 次模擬
        </v-col>
        <v-col cols="12" class="pt-2 pb-0" v-else>
          你已完成第 <span style="color: #ffcd76">{{ total }}</span> 次測試
        </v-col>
      </v-row>
      <v-row class="justify-space-around pt-2">
        <v-btn height="64px" @click="openTest">
          <v-icon v-if="isLock">
            mdi-lock
          </v-icon>
          <v-icon v-else>
            mdi-lock-open
          </v-icon>
        </v-btn>
        <roll-button @click="reloadRandom" :alert="!isLock"></roll-button>
        <!--        :disabled="disabledRoll" :loading="disabledRoll"-->
        <!--        <roll-button @click="roll" :disabled="disabledRoll" :loading="disabledRoll"/>-->
        <v-btn height="64px">
          <v-icon>
            mdi-share-variant
          </v-icon>
        </v-btn>

      </v-row>
      <v-row class="justify-space-around pt-3">
        <v-btn>必出3星</v-btn>
        <v-btn>必出4星</v-btn>
        <v-btn>必出5星</v-btn>
      </v-row>
<!--      <v-row class="justify-center">-->
<!--        <roll-button @click="reloadRandom" ></roll-button>-->
<!--      </v-row>-->
    </v-container>

    <!--    <input />-->
    <!--    <div :style="getBackgroundImage()" class="pb-2">-->


    <!--&lt;!&ndash;      <roll-button></roll-button>&ndash;&gt;-->

    <!--&lt;!&ndash;      <v-btn @click="">test</v-btn>&ndash;&gt;-->

    <!--    </div>-->
    <v-dialog
        v-model="dialog"
        persistent
        max-width="500"
        class="subtitle-2"
    >
      <v-card>
        <v-card-title class="text-h3 red--text d-block">
          <v-icon large color="red">
            mdi-alert
          </v-icon>
          警告
        </v-card-title>
        <v-card-text class="mb-0 pb-2" style="font-size: 18px;">你將會打開血壓測試模式。</v-card-text>
        <v-card-text class="mb-0 pb-3" style="font-size: 18px;">本網頁對所有後果<span class="red--text">不會負責</span>，包括及不限於以下反應：
        </v-card-text>
        <v-card-text style="font-size: 18px;">
          <ul>
            <li>腦溢血</li>
            <li>高血壓</li>
            <li>中風</li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
          >
            返回
          </v-btn>
          <v-btn
              color="green darken-1"
              @click="agree"
              class="white--text"
          >
            已閱讀
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialog: false
    };
  },
  methods: {
    agree () {
      this.dialog = false;
      this.isLock = false;
    },
    openTest () {
      if (this.isLock) {
        this.dialog = true;
      }else{
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
    }
  }
};
</script>
