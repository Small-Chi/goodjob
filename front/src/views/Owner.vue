<template>
  <v-app id="ownerPage">
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="var(--color-blue)"
        hide-on-scroll
        prominent
        scroll-target="#scrolling-techniques-4"
        max-height="70"
        class="textWhite"
        style="border-bottom: 1px solid var(--color-white); z-index: 2"
      >
        <v-img class="logo1 me-n2 ms-8" max-width="115" src="../assets/images/logo.png"></v-img>
        <div class="Usersolgon rounded-pill ms-n5">
          <div class="ctext2 me-7 d-flex justify-end align-center" style="height: 100%">會員中心</div>
        </div>
        <v-spacer></v-spacer>
        <!-- 導覽連結 -->
        <router-link to="/">
          <div class="navA d-flex align-center"><a class="textWhite ctext2 px-5">首頁</a></div>
        </router-link>
        <router-link to="/portfoliosList">
          <div class="navA d-flex align-center"><a class="textWhite ctext2 px-5">找專業</a></div>
        </router-link>
        <router-link to="/caseList">
          <div class="navA d-flex align-center"><a class="textWhite ctext2 px-5">找案件</a></div>
        </router-link>
        <!-- 登入 -->
        <UserRegisters />
        <div class="avatars me-6" v-if="owner.isownerLogin" id="owner">
          <!-- 業主會員資料 -->
          <div class="ownerList">
            <ul>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" to="/owner/ownerself">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-account-outline</v-icon>
                  <a class="textWhite ctext2">會員資訊</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" to="/owner/cases">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-folder-outline</v-icon>
                  <a class="textWhite ctext2">會員案件</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-heart-outline</v-icon>
                  <a class="textWhite ctext2">收藏作品</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-format-list-bulleted</v-icon>
                  <a class="textWhite ctext2">
                    進
                    <span class="mx-1">行</span>
                    中
                  </a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-charity</v-icon>
                  <a class="textWhite ctext2">
                    已
                    <span class="mx-1">結</span>
                    案
                  </a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-message-outline</v-icon>
                  <a class="textWhite ctext2">
                    訊
                    <span style="margin-left: 15px; margin-right: 15px"></span>
                    息
                  </a>
                </v-btn>
              </li>
              <!-- <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-calendar-month-outline</v-icon>
                  <a class="textWhite ctext2">
                    行
                    <span class="mg">事</span>
                    曆
                  </a>
                </v-btn>
              </li> -->
            </ul>
          </div>
          <v-avatar size="40" class="me-2">
            <v-img :src="'https://source.boringavatars.com/beam/120/' + owner.account"></v-img>
          </v-avatar>
          <v-icon class="textWhite down">mdi-chevron-down</v-icon>
        </div>
        <v-btn color="rgba(0,0,0,0)" class="textWhite login ms-n6" plain v-if="user.isuserLogin && !owner.isownerLogin" @click="userlogout">
          <v-icon class="me-2">mdi-logout-variant</v-icon>
          <!-- 登出 -->
        </v-btn>
        <v-btn color="rgba(0,0,0,0)" class="textWhite login ms-n6" plain v-if="!user.isuserLogin && owner.isownerLogin" @click="ownerlogout">
          <v-icon class="me-2">mdi-logout-variant</v-icon>
          <!-- 登出 -->
        </v-btn>
      </v-app-bar>
      <v-sheet id="scrolling-techniques-4" class="overflow-y-auto" max-height="100vh">
        <v-container fluid style="background-color: var(--color-blue); padding: 0px; height: 100vh">
          <!-- 內容 -->
          <div class="sidebar">
            <v-avatar size="180" class="avatarSidebar">
              <v-img :src="'https://source.boringavatars.com/beam/120/' + owner.account"></v-img>
            </v-avatar>
          </div>
          <div class="content"></div>
          <div class="selfmeanu">
            <ul>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" to="/owner/ownerself">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-account-outline</v-icon>
                  <a class="textWhite ctext2">會員資訊</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" to="/owner/cases">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-folder-outline</v-icon>
                  <a class="textWhite ctext2">會員案件</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-heart-outline</v-icon>
                  <a class="textWhite ctext2">收藏作品</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-format-list-bulleted</v-icon>
                  <a class="textWhite ctext2">
                    進
                    <span class="mx-1">行</span>
                    中
                  </a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-charity</v-icon>
                  <a class="textWhite ctext2">
                    已
                    <span class="mx-1">結</span>
                    案
                  </a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-message-outline</v-icon>
                  <a class="textWhite ctext2">
                    訊
                    <span style="margin-left: 15px; margin-right: 15px"></span>
                    息
                  </a>
                </v-btn>
              </li>
              <!-- <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-calendar-month-outline</v-icon>
                  <a class="textWhite ctext2">
                    行
                    <span class="mg">事</span>
                    曆
                  </a>
                </v-btn>
              </li> -->
            </ul>
          </div>
        </v-container>
      </v-sheet>
    </v-card>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import UserRegisters from '../components/UserRegister.vue'
  export default {
    components: { UserRegisters },
    computed: {
      user() {
        return this.$store.getters['user/user']
      },
      owner() {
        return this.$store.getters['owner/owner']
      }
    },
    methods: {
      userlogout() {
        this.$store.dispatch('user/userlogout')
      },
      ownerlogout() {
        // 連到的是 actions 裡的 ownerlogout
        this.$store.dispatch('owner/ownerlogout')
      }
    }
  }
</script>
