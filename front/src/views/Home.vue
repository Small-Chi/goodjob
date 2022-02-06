<template>
<v-app id="home">
  <v-app-bar
    absolute
    elevate-on-scroll
    color="var(--color-blue)"
    scroll-target="#scrolling-techniques-7"
    height="60"
    class="textWhite"
    style="border-bottom: 1px solid var(--color-white);z-index:2;"
    >
    <!-- logo -->
    <v-img class="logo1 me-n2 ms-8" max-width="115" src="../assets/images/logo.png"></v-img>
    <div
    class="solgon rounded-pill d-flex justify-end align-center ms-n5">
    <v-toolbar-title class="ctext1 me-7">接案 ､ 發包 , 超好用</v-toolbar-title>
    </div>
    <v-spacer></v-spacer>
    <!-- 導覽連結 -->
    <router-link to="/portfoliosList">
    <div class="navA d-flex align-center"><a class="textWhite ctext1 px-5">找專業</a></div>
    </router-link>
    <router-link to="/caseList">
    <div class="navA d-flex align-center"><a class="textWhite ctext1 px-5">找案件</a></div>
    </router-link>
    <router-link to="/">
    <div class="navA d-flex align-center"><a class="textWhite ctext1 px-5">知識加值庫</a></div>
    </router-link>

    <!-- 登入 -->
    <UserRegisters/>
    <div class="avatars me-6" v-if="user.isuserLogin">
      <v-avatar size="40" class="me-2">
        <v-img :src='"https://source.boringavatars.com/beam/120/" + user.account'></v-img>
      </v-avatar>
      <v-icon class="textWhite down">mdi-chevron-down</v-icon>
    </div>
     <div class="avatars me-6" v-if="owner.isownerLogin">
      <v-avatar size="40" class="me-2">
        <v-img :src='"https://source.boringavatars.com/beam/120/" + owner.account'></v-img>
      </v-avatar>
      <v-icon class="textWhite down">mdi-chevron-down</v-icon>
    </div>
    <v-btn color="rgba(0,0,0,0)" width="110" class="textWhite login me-8" plain v-if="user.isuserLogin && !owner.isownerLogin" @click="userlogout">
      <v-icon class="me-2">mdi-logout-variant</v-icon>登出
    </v-btn>
    <v-btn color="rgba(0,0,0,0)" width="110" class="textWhite login me-8" plain v-if="!user.isuserLogin && owner.isownerLogin" @click="ownerlogout">
      <v-icon class="me-2">mdi-logout-variant</v-icon>登出
    </v-btn>
  </v-app-bar>
    <div class="swiper">
      <div class="dark"></div>
      <Carousels/>
      <div class="center">
        <div class="centerLogo"><v-img src="../assets/images/logo.png"></v-img></div>
        <h1 class="centerslogan textWhite" v-animate-css="'tada'">專為<span style="color:var(--color-lightY)">設計領域</span>打造的外包網</h1>
        <v-row class="goodcard">
          <v-col class="gCard">
            <div class="circle">
              <v-icon class="homeIcon" size="90">mdi-target-account</v-icon>
            </div>
            <span class="gText">精準獵才</span>
            <p>簡易操作的分類方式，促使需求一目了然，幫助您更快找到適合的人選及案件。</p>
          </v-col>
          <v-col class="gCard mx-16">
            <div class="circle">
              <v-icon class="homeIcon" size="80">mdi-trending-up</v-icon>
            </div>
            <span class="gText">超高效率</span>
            <p>即時線上溝通系統，不用再等天荒地老只求一解，時間就是金錢，幫助您省時多賺。</p>
          </v-col>
          <v-col class="gCard">
            <div class="circle">
              <v-icon class="homeIcon" size="70">mdi-account-group</v-icon>
            </div>
            <span class="gText">第三方支付保障</span>
            <p>不用擔心花時間的心血拿不到報酬，goodjob提供第三方支付保障，讓您安心接案。</p>
          </v-col>
        </v-row>
      </div>
    </div>
  <v-main>
    <router-view></router-view>
  </v-main>
</v-app>
</template>

<script>
import UserRegisters from '../components/UserRegister.vue'
import Carousels from '../components/Carousel.vue'
export default {
  components: { UserRegisters, Carousels },
  computed: {
    user () {
      return this.$store.getters['user/user']
    },
    owner () {
      return this.$store.getters['owner/owner']
    }
  },
  methods: {
    userlogout () {
      this.$store.dispatch('user/userlogout')
    },
    ownerlogout () {
      // 連到的是 actions 裡的 ownerlogout
      this.$store.dispatch('owner/ownerlogout')
    }
  }
}
</script>
