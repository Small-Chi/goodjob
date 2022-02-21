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
                  <th class="text-center">發案者</th>
                  <th class="text-center">案件名稱</th>
                  <th class="text-center">類別</th>
                  <th class="text-center">預算</th>
                  <th class="text-center">結案日期</th>
                  <th class="text-center">成交量/評價</th>
                  <th class="text-center">訊息/狀態/移除</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in work" :key="index">
                  <td class="text-center">
                    <router-link :to="`/owner/${item.owner._id}/ownerself/`">
                      <v-avatar size="40" class="me-2 avatarBtn">
                        <v-img :src="'https://source.boringavatars.com/beam/120/' + item.owner.account"></v-img>
                      </v-avatar>
                      <span style="color: var(--color-lightY)">{{ item.owner.ownername }}</span>
                    </router-link>
                  </td>
                  <td class="text-center">
                    <router-link :to="`/owner/${item.owner._id}/casePage/` + item._id">{{ item.casename }}</router-link>
                  </td>
                  <td class="text-center">{{ item.category.small }}</td>
                  <td class="text-center">{{ item.price }}</td>
                  <td class="text-center">{{ new Date(item.endingday).toLocaleDateString().replace(/\//g, '／') }}</td>
                  <td class="text-center">
                    <v-icon class="ms- me-1" color="var(--color-white)">mdi-charity</v-icon>
                    <span style="color: var(--color-lightY)">156</span>
                    <v-icon class="ms-4 me-1" color="var(--color-white)">mdi-thumb-up</v-icon>
                    <span style="color: var(--color-lightY)">156</span>
                    <v-icon class="ms-4 me-1" color="var(--color-white)">mdi-thumb-down</v-icon>
                    <span style="color: var(--color-lightY)">156</span>
                  </td>
                  <td class="text-center">
                    <router-link :to="`/user/${user._id}/userchats/`">
                      <v-icon color="var(--color-white)" class="me-1 favIcon">mdi-message-outline</v-icon>
                    </router-link>
                    <v-icon color="var(--color-white)" class="favIconD ms-5" @click="NoworkCase(index)">mdi-delete</v-icon>
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
        cases: [],
        search: null,
        work: [],
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
      async NoworkCase(index) {
        if (this.user.isuserLogin) {
          try {
            await this.api.patch(
              'cases/Nprogress/' + this.cases[index]._id,
              { progress: 0 },
              {
                headers: {
                  authorization: 'Bearer ' + this.user.token
                }
              }
            )
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '刪除項目'
            })
            this.getNew()
          } catch (error) {
            console.log(error)
            this.$swal({
              icon: 'error',
              title: '失敗',
              text: '刪除失敗'
            })
          }
        }
      },
      async endCase(index) {
        if (this.user.isuserLogin) {
          try {
            await this.api.patch(
              'cases/Eprogress/' + this.cases[index]._id,
              { progress: 2 },
              {
                headers: {
                  authorization: 'Bearer ' + this.user.token
                }
              }
            )
            this.$swal({
              icon: 'success',
              title: '成功',
              text: '結案'
            })
            this.getNew()
          } catch (error) {
            console.log(error)
            this.$swal({
              icon: 'error',
              title: '失敗',
              text: '加入結案清單失敗'
            })
          }
        }
      },
      async getNew() {
        try {
          const { data } = await this.api.get('/users/me/favorite', {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.cases = data.result
          this.work = this.cases.filter(c => {
            return c.progress === 2
          })
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: '失敗',
            text: '取得收藏失敗'
          })
        }
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
        this.work = this.cases.filter(c => {
          return c.progress === 2
        })
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
