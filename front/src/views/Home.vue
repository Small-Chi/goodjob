<template>
  <v-app id="home">
    <v-card class="overflow-hidden">
      <v-app-bar
        absolute
        color="rgba(0,0,0,0)"
        hide-on-scroll
        prominent
        scroll-target="#scrolling-techniques-4"
        max-height="70"
        class="textWhite"
        style="z-index: 5"
      >
        <v-img class="logo1 me-n2 ms-8" max-width="115" src="../assets/images/logo.png"></v-img>
        <div class="solgon rounded-pill ms-n5">
          <div class="ctext1 me-7 d-flex justify-end align-center" style="height: 100%">接案 ､ 發包 , 超好用</div>
        </div>
        <v-spacer></v-spacer>
        <!-- 導覽連結 -->
        <router-link to="/portfoliosList">
          <div class="navA d-flex align-center"><a class="textWhite ctext1 px-5">找專業</a></div>
        </router-link>
        <router-link to="/caseList">
          <div class="navA d-flex align-center"><a class="textWhite ctext1 px-5">找案件</a></div>
        </router-link>
        <!-- 登入 -->
        <UserRegisters />
        <div class="avatars me-6" v-if="user.isuserLogin && !user.isAdmin" id="user">
          <!-- 會員資料 -->
          <div class="userList">
            <ul>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" :to="`/user/${user._id}/userself/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-account-outline</v-icon>
                  <a class="textWhite ctext1">會員資訊</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" :to="`/user/${user._id}/portfolios/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-folder-outline</v-icon>
                  <a class="textWhite ctext1">會員作品</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" :to="`/user/${user._id}/userfavorite/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-heart-outline</v-icon>
                  <a class="textWhite ctext1">收藏案件</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" :to="`/user/${user._id}/userwantdo/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-file-move-outline</v-icon>
                  <a class="textWhite ctext1">
                    已
                    <span class="mx-1">投</span>
                    稿
                  </a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" :to="`/user/${user._id}/userdeal/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-charity</v-icon>
                  <a class="textWhite ctext1">進行結案</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" :to="`/user/${user._id}/userchats/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-message-outline</v-icon>
                  <a class="textWhite ctext1">
                    訊
                    <span class="ms-8"></span>
                    息
                  </a>
                </v-btn>
              </li>
              <!-- <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-calendar-month-outline</v-icon>
                  <a class="textWhite ctext1">
                    行
                    <span class="mg">事</span>
                    曆
                  </a>
                </v-btn>
              </li> -->
            </ul>
          </div>
          <v-avatar size="40" class="me-2">
            <v-img :src="'https://source.boringavatars.com/beam/120/' + user.account"></v-img>
          </v-avatar>
          <v-icon class="textWhite down">mdi-chevron-down</v-icon>
        </div>
        <div class="avatars me-6" v-if="owner.isownerLogin" id="owner">
          <!-- 業主會員資料 -->
          <div class="ownerList">
            <ul>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" :to="`/owner/${owner._id}/ownerself/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-account-outline</v-icon>
                  <a class="textWhite ctext1">業主資訊</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" :to="`/owner/${owner._id}/cases/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-folder-outline</v-icon>
                  <a class="textWhite ctext1">業主案件</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" :to="`/owner/${owner._id}/ownerfavorite/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-heart-outline</v-icon>
                  <a class="textWhite ctext1">收藏作品</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" :to="`/owner/${owner._id}/ownercheck/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-file-download-outline</v-icon>
                  <a class="textWhite ctext1">查看投稿</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" :to="`/owner/${owner._id}/ownerdeal/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-charity</v-icon>
                  <a class="textWhite ctext1">
                    已
                    <span class="mx-1">結</span>
                    案
                  </a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" :to="`/owner/${owner._id}/ownerchats/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-message-outline</v-icon>
                  <a class="textWhite ctext1">
                    訊
                    <span class="ms-8"></span>
                    息
                  </a>
                </v-btn>
              </li>
              <!-- <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-calendar-month-outline</v-icon>
                  <a class="textWhite ctext1">
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
        <div class="avatars me-6" v-if="user.isAdmin" id="owner">
          <!-- 管理員資料 -->
          <div class="adminList">
            <ul>
              <li>
                <v-btn depressed color="var(--color-white)" class="memBtn" :to="`/admin/adminUser`">
                  <v-icon class="memIcon me-3" color="var(--color-blue)">mdi-account-outline</v-icon>
                  <a class="ctext1 adlisttext">會員管理</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-white)" class="memBtn" :to="`/admin/adminOwner`">
                  <v-icon class="memIcon me-3" color="var(--color-blue)">mdi-account-tie-outline</v-icon>
                  <a class="ctext1 adlisttext">業主管理</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-white)" class="memBtn" :to="`/admin/adminWork`">
                  <v-icon class="memIcon me-3" color="var(--color-blue)">mdi-application-cog-outline Michael Irigoyen @mririgo</v-icon>
                  <a class="ctext1 adlisttext">網頁維護</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-white)" class="memBtn" :to="`/admin/adminChats`">
                  <v-icon class="memIcon me-3" color="var(--color-blue)">mdi-message-outline</v-icon>
                  <a class="ctext1 adlisttext">
                    訊
                    <span class="ms-8"></span>
                    息
                  </a>
                </v-btn>
              </li>
              <!-- <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-calendar-month-outline</v-icon>
                  <a class="textWhite ctext1">
                    行
                    <span class="mg">事</span>
                    曆
                  </a>
                </v-btn>
              </li> -->
            </ul>
          </div>
          <v-avatar size="40" class="me-2">
            <v-img :src="'https://source.boringavatars.com/beam/120/' + user.account + `17`"></v-img>
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
        <v-container fluid style="background-color: var(--color-blue); padding: 0px">
          <section class="swiper">
            <div class="dark"></div>
            <Carousels />
            <div class="center">
              <div class="centerLogo" v-animate-css="'fadeInUp'">
                <v-img src="../assets/images/logo.png"></v-img>
              </div>
              <h1 class="centerslogan textWhite" v-animate-css="'fadeInUp'">
                專為
                <span style="color: var(--color-lightY); margin-left: auto">設計領域</span>
                打造的外包網
                <br />
              </h1>
              <h1 class="centerslogan3 textWhite" v-animate-css="'fadeInUp'">
                立即體驗
                <br />
              </h1>
              <v-row class="goBtnDiv">
                <div class="col-6" style="padding: 0">
                  <v-btn class="goBtnl" height="210" width="210" to="/portfoliosList">
                    <span style="font-weight: 700">找專業</span>
                    <p class="mt-1 gotextY">| 設計師作品區 |</p>
                  </v-btn>
                </div>
                <div class="col-6" style="padding: 0">
                  <v-btn class="goBtnr" height="210" width="210" to="/caseList">
                    <span style="font-weight: 700">找案件</span>
                    <p class="mt-1 gotextB">| 業主發案區 |</p>
                  </v-btn>
                </div>
              </v-row>
              <v-row class="goodcard">
                <v-col class="gCard">
                  <div class="circle">
                    <v-icon class="homeIcon" size="70">mdi-target-account</v-icon>
                  </div>
                  <span class="gText">精準獵才</span>
                  <p>簡易操作的分類方式，促使需求一目了然，幫助您更快找到適合的人選及案件。</p>
                </v-col>
                <v-col class="gCard">
                  <div class="circle">
                    <v-icon class="homeIcon" size="60">mdi-trending-up</v-icon>
                  </div>
                  <span class="gText">超高效率</span>
                  <p>即時線上溝通系統，不用再等天荒地老只求一解，時間就是金錢，幫助您省時多賺。</p>
                </v-col>
                <v-col class="gCard">
                  <div class="circle">
                    <v-icon class="homeIcon" size="55">mdi-account-group</v-icon>
                  </div>
                  <span class="gText">第三方支付保障</span>
                  <p>不用擔心花時間的心血拿不到報酬，goodjob提供第三方支付保障，讓您安心接案。</p>
                </v-col>
              </v-row>
            </div>
          </section>

          <div id="section2"></div>
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
  import Carousels from '../components/Carousel.vue'
  export default {
    components: { UserRegisters, Carousels },
    data() {
      return {
        userId: '',
        ownerId: ''
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
