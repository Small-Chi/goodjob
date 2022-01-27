<template>
<v-app id="navbar">
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
    <v-img class="logo1 me-n2 ms-8"
    max-width="120"
    src="../assets/images/logo.png"
    ></v-img>
    <div
    class="solgon rounded-pill d-flex justify-end align-center ms-n10">
    <v-toolbar-title class="ctext1 me-7">接案 ､ 發包 , 巨好用</v-toolbar-title>
    </div>
    <v-spacer></v-spacer>
    <!-- 導覽連結 -->
    <div class="navA d-flex align-center"><a href="#" class="textWhite ctext1 px-5">找專業</a></div>
    <div class="navA d-flex align-center"><a href="#" class="textWhite ctext1 px-5">找案子</a></div>
    <div class="navA d-flex align-center"><a href="#" class="textWhite ctext1 px-5">知識加值庫</a></div>

    <!-- 登入 -->
    <UserRegisters/>
    <v-btn color="rgba(0,0,0,0)" v-bind="attrs" v-on="on" width="110" class="textWhite login me-8" plain v-if="user.isuserLogin">
    <v-icon class="me-2">mdi-logout-variant</v-icon>登出
  </v-btn>
  </v-app-bar>

  <v-main>
    <router-view></router-view>
  </v-main>
</v-app>
</template>

<script>
import UserRegisters from '../components/UserRegister.vue'
export default {
  components: { UserRegisters },
  // methods: {
  //   logout () {
  //     this.$store.dispatch('user/userlogout')
  //   }
  // },
  // async created () {
  //   this.$store.dispatch('user/usergetInfo')
  // }
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  }
}
</script>
