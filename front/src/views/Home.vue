<template>
<v-app id="home">
  <v-app-bar
    absolute
    elevate-on-scroll
    color="var(--color-blue)"
    scroll-target="#scrolling-techniques-7"
    height="60"
    class="textWhite"
    style="border-bottom: 1px solid var(--color-white);   "
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
    <v-btn color="rgba(0,0,0,0)" width="110" class="textWhite login me-8" plain v-if="user.isuserLogin && !owner.isownerLogin" @click="userlogout">
      <v-icon class="me-2">mdi-logout-variant</v-icon>登出
    </v-btn>
    <v-btn color="rgba(0,0,0,0)" width="110" class="textWhite login me-8" plain v-if="!user.isuserLogin && owner.isownerLogin" @click="ownerlogout">
      <v-icon class="me-2">mdi-logout-variant</v-icon>登出
    </v-btn>
  </v-app-bar>
    <div class="swiper">
      <Carousels/>
      <!-- <div class="centerLogo"><v-img src="../assets/images/logo.png"></v-img></div>
      <h1 class="centerslogan textWhite">專為設計領域打造的外包網</h1> -->
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
