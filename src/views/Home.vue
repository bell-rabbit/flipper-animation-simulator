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
      <v-row v-if="isLock">
        <v-col cols="4" class="pt-2 pb-0">
            <span style="float:left" v-if="currentId">
                ID: {{ currentId }}
          </span>
        </v-col>

        <v-col cols="4" class="pt-2 pb-0 pr-0 pl-0 text-center">
          <span v-if="total > 0 &&  playback === false" v-html="$t('message.simulation_record', { total })"></span>
        </v-col>

        <v-col cols="4" class="pt-2 pb-0">
          <v-btn icon x-small style="float:right" @click="openSetting()">
            <v-icon color="#ff9f1c">
              mdi-cog
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-else-if="!isLock">
        <v-col cols="4" class="pt-2 pb-0">
            <span style="float:left" v-if="currentId">
                ID: {{ currentId }}
          </span>
        </v-col>
        <v-col cols="4" class="pt-2 pb-0 pr-0 pl-0 text-center">
          <span class="pt-2 pb-0 pr-0 pl-0 text-center">
           <span style="color: #ffcd76">{{ bloodPressure.list.length }}</span> /{{ bloodPressure.count }}
          </span>
        </v-col>
        <v-col cols="4"></v-col>
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
    </v-container>

    <warning-dialog v-model="dialog.alert" @agree="agree"/>
    <setting-card v-model="dialog.setting" :star.sync="setting.star"/>
    <share-url v-model="dialog.share" :current-id="currentId"/>
  </v-card>
</template>

<script>
import flipperAnimationGenerator from "@bell-rabbit/flipper-animation-generator";
import RollButton from "../components/RollButton";
import ShareUrl from "../components/ShareUrl";
import API from "../plugins/api";
import SettingCard from "../components/SettingCard";
import WarningDialog from "../components/WarningDialog";

export default {
  name: "Home",
  components: {
    WarningDialog,
    SettingCard,
    ShareUrl,
    RollButton,
    flipperAnimationGenerator
  },
  data () {
    return {
      flipperJSON: {},
      isLock: true,
      dialog: {
        alert: false,
        setting: false,
        share: false
      },
      setting: { star: 1 },
      total: 0,
      playback: false,
      bloodPressure: {
        count: 0,
        list: []
      },
      currentId: 0,
      loading: false,
      createMode: false
    };
  },
  methods: {
    getWidth () {
      const maxHeight = this.$vuetify.breakpoint.height - 148;

      if (maxHeight > 896) {
        return 450;
      }

      const maxWidth = maxHeight * 0.558;

      if (this.$vuetify.breakpoint.width < maxWidth) {
        return this.$vuetify.breakpoint.width;
      }

      return maxWidth > 450 ? 450 : maxWidth;
    },
    saveRecord (data) {
      this.loading = false;
      API.save(data).then((rs) => {
        if (rs.status === "success") {
          this.total = rs.id;
          this.currentId = parseInt(rs.id);
        }
      });
    },
    completedPlayback () {
      this.loading = false;
    },
    shareUrl () {
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
    defaultRoll () {
      if (this.createMode) {
        this.$gtag.event("roll", {
          method: "Google",
          event_category: "Random"
        });
        this.reloadRandom();
      } else {
        this.$gtag.event("record", {
          method: "Google",
          event_category: "Random"
        });
        this.randomRecord();
      }
    },
    clickRoll () {
      this.loading = true;
      if (!this.isLock) {
        this.$gtag.event("bloodPressure", {
          method: "Google",
          event_category: "record"
        });
        API.bloodPressureRecord().then((rs) => {
          this.playback = true;
          this.currentId = parseInt(rs.id);
          this.flipperJSON = JSON.parse(rs.data);

          const inList = this.bloodPressure.list.filter((i) => i === rs.id);

          if (inList.length < 1) {
            this.bloodPressure.list.push(rs.id);
          }
        });
        return;
      }

      if (this.setting.star === 1) {
        this.defaultRoll();
        return;
      }

      this.$gtag.event("record", {
        method: "Google",
        event_category: `star${this.setting.star}`
      });
      this.getRecord(this.setting.star);
    },
    randomRecord () {
      const number = this.getRandomInt(140000);
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
          if (rs.status === "empty") {
            return new Promise((resolve, reject) => {
              reject(new Error("empty"));
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
        "background-image": `url(${require("../assets/bottom.jpg")})`,
        "background-repeat": "no-repeat",
        "background-size": "cover",
        "background-position": "bottom"
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
    document.dispatchEvent(new Event("render-event"));

    if (this.$route.query.record) {
      this.currentId = this.$route.query.record;
      this.$gtag.event("record", {
        method: "Google",
        event_category: "url"
      });
      this.playRecord(this.$route.query.record, 1000);
    }
  }
};
</script>
