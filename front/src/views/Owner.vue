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
          <div class="ctext1 me-7 d-flex justify-end align-center" style="height: 100%">會員中心</div>
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
        <v-btn color="rgba(0,0,0,0)" class="textWhite login ms-n6 d-none d-md-flex" plain v-if="user.isuserLogin && !owner.isownerLogin" @click="userlogout">
          <v-icon class="me-2">mdi-logout-variant</v-icon>
          <!-- 登出 -->
        </v-btn>
        <v-btn color="rgba(0,0,0,0)" class="textWhite login ms-n6 d-none d-md-flex" plain v-if="!user.isuserLogin && owner.isownerLogin" @click="ownerlogout">
          <v-icon class="me-2">mdi-logout-variant</v-icon>
          <!-- 登出 -->
        </v-btn>
      </v-app-bar>
      <v-sheet id="scrolling-techniques-4" class="overflow-y-auto" max-height="100vh">
        <v-container fluid style="background-color: var(--color-blue); padding: 0px; height: 100vh">
          <!-- 內容 -->
          <div class="sidebar">
            <v-avatar size="180" class="avatarSidebar">
              <v-img :src="'https://source.boringavatars.com/beam/120/' + ownerinfo.account"></v-img>
            </v-avatar>
          </div>
          <div class="content"></div>
          <div class="selfmeanu">
            <ul>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" :to="`/owner/${$route.params.id}/ownerself/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-account-outline</v-icon>
                  <a class="textWhite ctext2">業主資訊</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" :to="`/owner/${$route.params.id}/cases/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-folder-outline</v-icon>
                  <a class="textWhite ctext2">業主案件</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" v-if="nome" :to="`/owner/${owner._id}/ownerfavorite/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-heart-outline</v-icon>
                  <a class="textWhite ctext2">收藏作品</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" v-if="nome" :to="`/owner/${owner._id}/ownercheck/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-file-download-outline</v-icon>
                  <a class="textWhite ctext2">查看投稿</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed color="var(--color-blue)" class="memBtn" v-if="nome" :to="`/owner/${owner._id}/ownerdeal/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-charity</v-icon>
                  <a class="textWhite ctext2">進行結案</a>
                </v-btn>
              </li>
              <li>
                <v-btn depressed exact color="var(--color-blue)" class="memBtn" v-if="nome" :to="`/owner/${owner._id}/ownerchats/`">
                  <v-icon class="memIcon me-3" color="var(--color-white)">mdi-message-outline</v-icon>
                  <a class="textWhite ctext2">
                    訊
                    <span class="ms-8"></span>
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
          <div class="selfmeanu2" v-if="me">
            <div class="name">
              <span class="nameh2 textlightY">{{ ownerinfo.ownername }}</span>
            </div>
            <div class="meanu">
              <div class="row mt-1">
                <div class="col-8 fw-700">
                  <v-icon class="itemIcon" color="var(--color-lightY)">mdi-charity</v-icon>
                  成交案量
                </div>
                <div class="col-4 num">100</div>
              </div>
              <div class="row mt-1">
                <div class="col-8 fw-700">
                  <v-icon class="itemIcon" color="var(--color-lightY)">mdi-thumb-up</v-icon>
                  好
                  <span class="ms-8"></span>
                  評
                </div>
                <div class="col-4 num">100</div>
              </div>
              <div class="row mt-1">
                <div class="col-8 fw-700">
                  <v-icon class="itemIcon" color="var(--color-lightY)">mdi-thumb-down</v-icon>
                  差
                  <span class="ms-8"></span>
                  評
                </div>
                <div class="col-4 num">100</div>
              </div>
              <div class="row mt-5 pricetitle">
                <div class="col-12" style="font-size: 20px">作品價格參考</div>
              </div>
              <div class="priceMenu">
                <div class="row mt-1" v-for="(price, index) in ownerinfo.prices" :key="'A' + index">
                  <div class="col-5 pe-0">{{ price.item }}</div>
                  <div class="col-7 num">{{ price.price }}</div>
                </div>
              </div>
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
  export default {
    components: { UserRegisters },
    data() {
      return {
        ownerId: '',
        me: false,
        ownerinfo: {
          ownername: '',
          account: '',
          password: '',
          email: '',
          state: '',
          workingday: '',
          position: '',
          technology: [],
          about: '',
          prices: [{ item: '' }, { price: '' }]
        }
      }
    },
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
    },
    async created() {
      this.nome = this.owner._id === this.$route.params.id
      this.me = this.owner._id !== this.$route.params.id
      try {
        const { data } = await this.api.get('owners/' + this.$route.params.id, {
          headers: {
            authorization: 'Bearer ' + this.owner.token
          }
        })
        this.ownerinfo = data.result
        this.ownerinfo.password = ''
        console.log(data.result)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: '資料取得失敗'
        })
      }
    }
  }
</script>
