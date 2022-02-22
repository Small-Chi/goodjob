<template>
  <!-- 找專業的頁面 -->
  <div id="favorite">
    <div class="content">
      <template>
        <div style="width: 100%">
          <v-select :items="slots" label="搜尋類別" class="mb-5"></v-select>
          <v-simple-table>
            <template>
              <thead>
                <tr>
                  <th class="text-center">設計師</th>
                  <th class="text-center">作品名稱</th>
                  <th class="text-center">類別</th>
                  <th class="text-center">製作天數</th>
                  <th class="text-center">報價</th>
                  <th class="text-center">作品風格</th>
                  <th class="text-center">訊息/移除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in portfolios" :key="index">
                  <td class="text-center">
                    <router-link :to="`/user/${item.user._id}/userself/`">
                      <v-avatar size="40" class="me-2 avatarBtn">
                        <v-img :src="'https://source.boringavatars.com/beam/120/' + item.user.account"></v-img>
                      </v-avatar>
                      <span style="color: var(--color-lightY)">{{ item.user.username }}</span>
                    </router-link>
                  </td>
                  <td class="text-center">
                    <router-link :to="`/user/${item.user._id}/portfolioPage/` + item._id">{{ item.pname }}</router-link>
                  </td>
                  <td class="text-center">{{ item.category.small }}</td>
                  <td class="text-center">{{ item.workingday }}</td>
                  <td class="text-center">{{ item.price }}</td>
                  <td class="text-center" style="padding: 10px">
                    <router-link :to="`/user/${item.user._id}/portfolioPage/` + item._id">
                      <v-img :src="item.image" style="width: 250px" class="mx-auto"></v-img>
                    </router-link>
                  </td>
                  <!-- <td class="text-center">
                    <v-icon class="ms- me-1" color="var(--color-white)">mdi-charity</v-icon>
                    <span style="color: var(--color-lightY)">156</span>
                    <v-icon class="ms-4 me-1" color="var(--color-white)">mdi-thumb-up</v-icon>
                    <span style="color: var(--color-lightY)">156</span>
                    <v-icon class="ms-4 me-1" color="var(--color-white)">mdi-thumb-down</v-icon>
                    <span style="color: var(--color-lightY)">156</span>
                  </td> -->
                  <td class="text-center">
                    <router-link :to="`/owner/${owner._id}/ownerchats/`">
                      <v-icon color="var(--color-white)" class="me-2 favIcon">mdi-message-outline</v-icon>
                    </router-link>
                    <v-icon color="var(--color-white)" class="favIconD" @click="deletefav(index)">mdi-delete</v-icon>
                  </td>
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
        portfolios: [],
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
    methods: {
      async deletefav(index) {
        try {
          await this.api.patch(
            '/owners/me/favorite',
            { portfolio: this.portfolios[index]._id },
            {
              headers: {
                authorization: 'Bearer ' + this.owner.token
              }
            }
          )
          this.portfolios.splice(index, 1)
          this.$store.commit('owner/updateFavorite', this.owner.favorite - 1)
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '修改收藏成功'
          })
        } catch (error) {
          console.log(error)
          this.$swal({
            icon: 'error',
            title: '失敗',
            text: '修改收藏失敗'
          })
        }
      }
    },
    // computed: {
    //   filterItems() {
    //     return this.portfolios.filter(item => {
    //       if (this.filter === '') return true
    //       return item.category.small === this.filter
    //     })
    //   }
    // },
    async created() {
      try {
        const { data } = await this.api.get('/owners/me/favorite', {
          headers: {
            authorization: 'Bearer ' + this.owner.token
          }
        })
        this.portfolios = data.result
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
