<template>
  <!-- 找專業的頁面 -->
  <div id="favorite">
    <div class="content">
      <template>
        <div style="width: 100%">
          <v-select :items="slots" label="案件類別" class="mb-5"></v-select>
          <v-simple-table :items="cases">
            <template>
              <thead>
                <tr>
                  <th class="text-center">發案者</th>
                  <th class="text-center">案件</th>
                  <th class="text-center">預算</th>
                  <th class="text-center">結案日期</th>
                  <th class="text-center">成交量/評價</th>
                  <th class="text-center">移除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in cases" :key="index">
                  <td>{{ cases }}</td>
                  <td>{{ item.casename }}</td>
                  <td>{{ item.casename }}</td>
                  <td>{{ item.casename }}</td>
                  <td>{{ item.casename }}</td>
                  <td>123</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cases: [],
        search: null,
        slots: [
          '海報/DM',
          '書籍/手冊',
          '創作',
          'CIS/VIS/ICON',
          '攝影',
          '產品/包裝',
          '插畫/漫畫',
          '簡報',
          '織品服裝設計',
          '版型設計',
          '切版製作',
          'EDM設計',
          'Banner',
          '維護/經營',
          '行銷/SEO',
          '程式設計/架設',
          '商品上架',
          'UI/UX設計',
          '室內空間設計',
          '櫥窗陳列展示',
          '房屋/建築設計',
          '展場/舞台設計',
          '店面/商業空間設計',
          '景觀園藝設計',
          '產品設計',
          '水電及其他工程繪圖',
          '3D繪圖/渲染',
          '紙藝',
          '皮件',
          '木質',
          '棉/麻',
          '花草植栽',
          '羊毛',
          '陶瓷',
          '編織'
        ]
      }
    },
    async created() {
      try {
        const { data } = await this.api.get('/users/me/favorite', {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.cases = data.result
        console.log(data.result)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: '取得收藏失敗'
        })
      }
    }
  }
</script>
