<template>
  <!-- 找專業的頁面 -->
  <div id="adminuser">
    <div class="content">
      <template>
        <div style="width: 100%">
          <v-text-field label="搜尋人名" hide-details="auto" class="mb-10"></v-text-field>
          <v-simple-table>
            <template>
              <thead>
                <tr>
                  <th class="text-center">會員</th>
                  <th class="text-center">名稱</th>
                  <th class="text-center">帳號</th>
                  <th class="text-center">成交量/評價</th>
                  <th class="text-center">訊息</th>
                  <th class="text-center">權限</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in getuser" :key="index">
                  <td class="text-center">
                    <router-link :to="`/user/${item._id}/userself/`">
                      <v-avatar size="40" class="me-2 avatarBtn">
                        <v-img :src="'https://source.boringavatars.com/beam/120/' + item.account"></v-img>
                      </v-avatar>
                    </router-link>
                  </td>
                  <td class="text-center">{{ item.username }}</td>
                  <td class="text-center">{{ item.account }}</td>
                  <td class="text-center">{{ item.assess }}{{ item.good }}{{ item.bad }}</td>
                  <td class="text-center">
                    <router-link :to="`/user/${item._id}/userchats/`">
                      <v-icon color="var(--color-blue)" class="me-1 favIcon">mdi-message-outline</v-icon>
                    </router-link>
                  </td>
                  <td class="text-center">
                    <v-icon color="var(--color-blue)" class="favIcon">mdi-charity</v-icon>
                    <v-icon color="var(--color-blue)" class="favIconD ms-5">mdi-delete</v-icon>
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
        getuser: []
      }
    },
    async created() {
      try {
        const { data } = await this.api.get('/users/admin', {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.getuser = data.result
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: '取得訊息失敗'
        })
      }
    }
  }
</script>
