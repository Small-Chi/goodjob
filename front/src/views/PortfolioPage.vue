<template>
  <!-- 指定的作品頁面 -->
  <div id="protfolioPage">
    <div class="content">
      <div class="d-flex">
        <span class="username">{{ pname }}</span>
      </div>
      <div class="d-flex">
        <div class="tag">{{ category.big }}</div>
        <div class="tag">{{ category.small }}</div>
      </div>
      <div class="main d-flex">
        <div>
          <div class="mt-2 mb-6 d-flex">
            <div class="ms-3 me-12 textleft"><span class="main-title" style="font-weight: bold">- 使用技術</span></div>
            <div class="textright row mb-5 pb-5" style="border-bottom: 1px solid rgba(205, 198, 188, 0.3)">
              <span class="fw-300 col-3" v-for="(item, index) in technology" :key="'A' + index">{{ item }}</span>
            </div>
          </div>
          <div class="mt-2 mb-6 d-flex">
            <div class="ms-3 me-12 textleft"><span class="main-title" style="font-weight: bold">- 作品尺寸</span></div>
            <div class="textright">
              <span class="fw-300">{{ size }} {{ sunit }}</span>
            </div>
          </div>
          <div class="mt-2 mb-6 d-flex">
            <div class="ms-3 me-12 textleft"><span class="main-title" style="font-weight: bold">- 製作天數</span></div>
            <div class="textright">
              <span class="fw-300">{{ workingday + ` 天` }}</span>
            </div>
          </div>
          <div class="mt-2 mb-6 d-flex">
            <div class="ms-3 me-12 textleft"><span class="main-title" style="font-weight: bold">- 預估價格</span></div>
            <div class="textright">
              <span class="fw-300">{{ price + ` 元` }}</span>
            </div>
          </div>
          <div class="mt-2 mb-6 d-flex">
            <div class="ms-3 me-12 textleft"><span class="main-title" style="font-weight: bold">- 作品說明</span></div>
            <div class="textright fw-300">
              {{ description }}
            </div>
          </div>
        </div>
        <div class="leftcol me-10">
          <div class="textleft my-3"><span class="main-title" style="font-weight: bold">- 作品風格</span></div>
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
        pname: '',
        size: '',
        sunit: '',
        technology: [],
        workingday: '',
        price: '',
        image: '',
        category: '',
        description: '',
        sell: false
      }
    },
    async created() {
      try {
        const { data } = await this.api.get('/portfolios/' + this.$route.params.id)
        this.pname = data.result.pname
        this.size = data.result.size
        this.sunit = data.result.sunit
        this.technology = data.result.technology
        this.workingday = data.result.workingday
        this.price = data.result.price
        this.image = data.result.image
        this.category = data.result.category
        this.description = data.result.description
        this.sell = data.result.sell
        document.title = `${this.pname} | 作品`
        console.log(data)
      } catch (error) {
        this.$router.push('/')
      }
    }
  }
</script>
