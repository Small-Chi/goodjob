<template>
  <!-- 指定的作品頁面 -->
  <div id="protfolioPage">
    <div class="content row">
      <div class="d-flex">
        <span class="username">{{ pname }}</span>
      </div>
      <div class="d-flex">
        <div class="tag">{{ category.big }}</div>
        <div class="tag">{{ category.small }}</div>
      </div>
      <div class="main">
        <div class="d-flex justify-space-between">
          <div class="col-6">
            <v-img :src="image" style="border-radius: 10px; background-color: var(--color-white)"></v-img>
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-3 ms-3 me-3"><span class="main-title" style="font-weight: bold">- 使用技術</span></div>
              <div class="col-8">
                <span class="fw-300">{{ technology }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-3 ms-3 me-3"><span class="main-title" style="font-weight: bold">- 作品尺寸</span></div>
              <div class="col-8">
                <span class="fw-300">{{ size }} {{ sunit }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-3 ms-3 me-3"><span class="main-title" style="font-weight: bold">- 製作天數</span></div>
              <div class="col-8">
                <span class="fw-300">{{ workingday }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-3 ms-3 me-3"><span class="main-title" style="font-weight: bold">- 預估價格</span></div>
              <div class="col-8">
                <span class="fw-300">{{ price + `元` }}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-3 ms-3 me-3"><span class="main-title" style="font-weight: bold">- 作品說明</span></div>
              <div class="col-8">
                <span class="fw-300">{{ description }}</span>
              </div>
            </div>
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
        pname: '',
        size: '',
        sunit: '',
        technology: '',
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
        document.title = `${this.name} | 作品`
        console.log(data)
      } catch (error) {
        this.$router.push('/')
      }
    }
  }
</script>
