<template>
  <!-- 指定的作品頁面 -->
  <div id="casePage">
    <div class="content">
      <div class="d-flex">
        <span class="username">{{ casename }}</span>
      </div>
      <div class="d-flex">
        <div class="tag">{{ category.big }}</div>
        <div class="tag">{{ category.small }}</div>
      </div>
      <v-btn class="cardBtn" min-width="80" min-height="40" style="padding: 0" color="var(--color-red)">
        <v-icon size="22" color="white" class="justify-content-center; Btn1Icon">mdi-heart</v-icon>
        <div class="heartNum">收藏</div>
      </v-btn>
      <div class="main d-flex">
        <div>
          <div class="mt-2 mb-6 d-flex">
            <div class="ms-3 me-12 textleft"><span class="main-title" style="font-weight: bold">- 需求技術</span></div>
            <div class="textright row mb-5 pb-5" style="border-bottom: 1px solid rgba(205, 198, 188, 0.3)">
              <span class="fw-300 col-3" v-for="(item, index) in technology" :key="'A' + index">{{ item }}</span>
            </div>
          </div>
          <div class="mt-2 mb-6 d-flex">
            <div class="ms-3 me-12 textleft"><span class="main-title" style="font-weight: bold">- 產品尺寸</span></div>
            <div class="textright">
              <span class="fw-300">{{ size }} {{ sunit }}</span>
            </div>
          </div>
          <div class="mt-2 mb-6 d-flex">
            <div class="ms-3 me-12 textleft"><span class="main-title" style="font-weight: bold">- 需求數量</span></div>
            <div class="textright">
              <span class="fw-300">{{ quantity }} {{ qunit }}</span>
            </div>
          </div>
          <div class="mt-2 mb-6 d-flex">
            <div class="ms-3 me-12 textleft"><span class="main-title" style="font-weight: bold">- 結案日期</span></div>
            <div class="textright">
              <span class="fw-300">{{ new Date(endingday).toLocaleDateString().replace(/\//g, '／') }}</span>
            </div>
          </div>
          <div class="mt-2 mb-6 d-flex">
            <div class="ms-3 me-12 textleft"><span class="main-title" style="font-weight: bold">- 撥款日期</span></div>
            <div class="textright">
              <span class="fw-300">{{ new Date(takeday).toLocaleDateString().replace(/\//g, '／') }}</span>
            </div>
          </div>
          <div class="mt-2 mb-6 d-flex">
            <div class="ms-3 me-12 textleft"><span class="main-title" style="font-weight: bold">- 結案報酬</span></div>
            <div class="textright">
              <span class="fw-300">{{ price + ` 元` }}</span>
            </div>
          </div>
          <div class="mt-2 mb-6 d-flex">
            <div class="ms-3 me-12 textleft"><span class="main-title" style="font-weight: bold">- 產品說明</span></div>
            <div class="textright">
              <span class="fw-300">{{ description }}</span>
            </div>
          </div>
        </div>
        <div class="leftcol me-10">
          <div class="textleft my-3"><span class="main-title" style="font-weight: bold">- 參考風格</span></div>
          <v-img :src="image" style="border-radius: 10px; background-color: var(--color-white)"></v-img>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        casename: '',
        size: '',
        sunit: '',
        quantity: '',
        qunit: '',
        technology: [],
        endingday: '',
        takeday: '',
        price: '',
        image: '',
        sell: false,
        category: { big: '', small: '' },
        description: '',
        ownerId: null
      }
    },
    async created() {
      try {
        const { data } = await this.api.get('/cases/' + this.$route.params.id)
        this.casename = data.result.casename
        this.size = data.result.size
        this.quantity = data.result.quantity
        this.qunit = data.result.qunit
        this.technology = data.result.technology
        this.endingday = data.result.endingday
        this.takeday = data.result.takeday
        this.price = data.result.price
        this.image = data.result.image
        this.sell = data.result.sell
        this.category = data.result.category
        this.description = data.result.description
        this.ownerId = data.result.owner
        document.title = `${this.casename} | 作品`
        console.log(data)
      } catch (error) {
        this.$router.push('/')
      }
    }
  }
</script>
