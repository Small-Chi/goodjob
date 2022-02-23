<template>
  <!-- 找專業的頁面 -->
  <v-app id="portfoliosList">
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
          <div class="ctext1 me-7 d-flex justify-end align-center" style="height: 100%">找專業</div>
        </div>
        <v-spacer></v-spacer>
        <!-- 導覽連結 -->
        <router-link to="/">
          <div class="navA d-flex align-center"><a class="textWhite ctext1 px-5">首頁</a></div>
        </router-link>
        <router-link to="/portfoliosList">
          <div class="navA d-flex align-center"><a class="textWhite ctext1 px-5">找專業</a></div>
        </router-link>
        <router-link to="/caseList">
          <div class="navA d-flex align-center"><a class="textWhite ctext1 px-5">找案件</a></div>
        </router-link>
        <!-- 登入 -->
        <UserRegisters />
        <div class="avatars me-6" v-if="user.isuserLogin" id="user">
          <!-- 會員資料 -->
          <div class="userList">
            <ul>
              <li>
                <v-btn depressed exact color="var(--color-blue)" class="memBtn" :to="`/user/${user._id}/userself/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-account-outline</v-icon>
                  <a class="textWhite ctext1">會員資訊</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed exact color="var(--color-blue)" class="memBtn" :to="`/user/${user._id}/portfolios/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-folder-outline</v-icon>
                  <a class="textWhite ctext1">會員作品</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed exact color="var(--color-blue)" class="memBtn" :to="`/user/${user._id}/userfavorite/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-heart-outline</v-icon>
                  <a class="textWhite ctext1">收藏案件</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed exact color="var(--color-blue)" class="memBtn" :to="`/user/${user._id}/userwantdo/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-file-move-outline</v-icon>
                  <a class="textWhite ctext1">
                    已
                    <span class="mx-1">投</span>
                    稿
                  </a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed exact color="var(--color-blue)" class="memBtn" :to="`/user/${user._id}/userdeal/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-charity</v-icon>
                  <a class="textWhite ctext1">進行結案</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed exact color="var(--color-blue)" class="memBtn" :to="`/user/${user._id}/userchats/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-message-outline</v-icon>
                  <a class="textWhite ctext1">
                    訊
                    <span class="ms-8"></span>
                    息
                  </a>
                </v-btn>
              </li>
              <!-- <li>
                <v-btn depressed exact color="var(--color-blue)" class="memBtn">
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
          <v-avatar size="40" class="me-2 avatarBtn">
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
          <div class="psidebar">
            <div class="search">
              <template>
                <v-text-field @keydown.enter="additem"></v-text-field>
                <v-btn icon class="searchIcon"><v-icon size="30" color="var(--color-white)">mdi-magnify</v-icon></v-btn>
              </template>
              <v-btn rounded width="100%" class="Listbtn mt-5" @click="filter = ''">全部作品</v-btn>
              <v-btn rounded width="100%" class="Listbtn" @click="filter = '平面設計'">平面設計</v-btn>
              <v-btn rounded width="100%" class="Listbtn" @click="filter = '網頁設計'">網頁設計</v-btn>
              <v-btn rounded width="100%" class="Listbtn" @click="filter = '室內設計'">室內設計</v-btn>
              <v-btn rounded width="100%" class="Listbtn" @click="filter = '手作設計'">手作設計</v-btn>
            </div>
          </div>
          <div class="content"></div>
          <div class="main">
            <div v-for="portfolio in filterItems" :key="portfolio._id">
              <PListSwiper v-if="portfolio.portfolios.length > 0" :portfolio="portfolio" />
            </div>
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
  import PListSwiper from '../components/PListSwiper.vue'
  export default {
    components: { UserRegisters, PListSwiper },
    data() {
      return {
        portfolios: [],
        filter: ''
      }
    },
    async created() {
      try {
        const { data } = await this.api.get('/users/visitor')
        this.portfolios = data.result
        console.log(data.result)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '商品取得失敗'
        })
      }
    },
    computed: {
      user() {
        return this.$store.getters['user/user']
      },
      owner() {
        return this.$store.getters['owner/owner']
      },
      filterItems() {
        return JSON.parse(JSON.stringify(this.portfolios)).map(item => {
          item.portfolios = item.portfolios.filter(p => {
            if (this.filter === '') return true
            return p.category.big === this.filter
          })
          return item
        })
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
