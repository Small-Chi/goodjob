<template>
  <div id="userself">
    <div class="content row">
      <div class="col d-flex">
        <span class="username">{{ users.username }}</span>
        <div class="score">
          <div class="scoreitems">
            <div class="scoreitem">
              <span class="num">1000</span>
              <span class="numtitle">
                <v-icon color="var(--color-white)">mdi-charity</v-icon>
                成交案量
              </span>
            </div>
          </div>
          <div class="scoreitems">
            <div class="scoreitem">
              <span class="num">1000</span>
              <span class="numtitle">
                <v-icon color="var(--color-white)">mdi-thumb-up</v-icon>
                好評
              </span>
            </div>
          </div>
          <div class="scoreitems">
            <div class="scoreitem">
              <span class="num">1000</span>
              <span class="numtitle">
                <v-icon color="var(--color-white)">mdi-thumb-down</v-icon>
                差評
              </span>
            </div>
          </div>
        </div>
        <!-- 編輯紐 -->
        <v-btn icon class="editBtn" style="padding: 0; background-color: var(--color-deepblue)" @click="editPortfolio(index)">
          <v-icon size="40" color="white" class="justify-content-center; editIcon">mdi-pencil-outline</v-icon>
        </v-btn>
      </div>
      <div class="main">
        <div class="row my-5">
          <div class="col-2"><span class="main-title">- 職業</span></div>
          <div class="col-10">
            <span>{{ users.position }}</span>
          </div>
        </div>
        <div class="row my-5">
          <div class="col-2"><span class="main-title">- 接案狀況</span></div>
          <div class="col-10">
            <span>{{ users.state }}</span>
          </div>
        </div>
        <div class="row my-5 py-5" style="border-top: 1px solid rgba(205, 198, 188, 0.3); border-bottom: 1px solid rgba(205, 198, 188, 0.3)">
          <div class="col-2"><span class="main-title">- 擅長工具</span></div>
          <div class="col-10">
            <span class="row">
              <span class="col-3" v-for="(item, index) in users.technology" :key="'A' + index">{{ item }}</span>
            </span>
          </div>
        </div>
        <div class="row my-5">
          <div class="col-2"><span class="main-title">- 工作時段</span></div>
          <div class="col-10">
            <span>{{ users.workingday }}</span>
          </div>
        </div>
        <div class="row my-5">
          <div class="col-2"><span class="main-title">- 案件價格</span></div>
          <div class="col-10">
            <div class="row my-2">
              <div class="pricesdiv col-3 mb-5" v-for="(price, index) in users.prices" :key="'A' + index">
                <span>{{ price.item }}</span>
                <span>{{ price.price }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row my-5">
          <div class="col-2"><span class="main-title">- 個人介紹</span></div>
          <div class="col-10">
            <span>{{ users.about }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        users: {
          username: '',
          account: '',
          password: '',
          email: '',
          state: '',
          workingday: '',
          position: '',
          technology: '',
          about: '',
          prices: [{ item: '' }, { price: '' }]
        }
      }
    },
    // 抓資料
    async created() {
      try {
        const { data } = await this.api.get('users/me', {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.users = data.result
        console.log(this.users)
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
