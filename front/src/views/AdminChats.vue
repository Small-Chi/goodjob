<template>
  <div id="adminChats">
    <div class="content">
      <div class="ChatBtn me-n16 mt-2">
        <v-btn class="mb-2 pe-7" rounded color="var(--color-blue)" style="color: var(--color-deepwhite)" :to="`/admin/adminChats`">
          <v-icon class="me-1">mdi-account-outline</v-icon>
          會員
        </v-btn>
        <v-btn rounded class="pe-7" color="var(--color-blue)" style="color: var(--color-deepwhite)" :to="`/admin/adminChatsO`">
          <v-icon class="me-1">mdi-account-tie-outline</v-icon>
          業主
        </v-btn>
      </div>
      <div class="chatlist">
        <v-card rounded class="mx-auto" max-width="300" tile>
          <v-list rounded color="var(--color-deepwhite)" class="list">
            <v-subheader style="font-weight: 700">會員列表</v-subheader>
            <v-list-item-group v-model="selected" color="var(--color-chatdeepblue)">
              <v-list-item v-for="user in getuser" :key="user.username" class="mb-3">
                <v-avatar size="40" class="me-5">
                  <v-img :src="'https://source.boringavatars.com/beam/120/' + user.account"></v-img>
                </v-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="user.username" style="font-weight: 700"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
      <div class="main">
        <AdminChat />
      </div>
    </div>
  </div>
</template>

<script>
  import AdminChat from '../components/AdminChat.vue'
  export default {
    components: { AdminChat },
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
    }
  }
</script>
