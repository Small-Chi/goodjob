<template>
  <!-- 找專業的頁面 -->
  <div id="Chats">
    <div class="content">
      <div class="chatlist">
        <v-card rounded class="mx-auto" max-width="300" tile>
          <v-list rounded color="var(--color-deepblue)" class="list">
            <v-subheader>用戶{{ ` — ` + user.username }}</v-subheader>
            <v-list-item-group v-model="selected" color="var(--color-lightY)">
              <v-list-item v-for="owner in owners" :key="owner.ownername" class="mb-3">
                <v-avatar size="40" class="me-5">
                  <v-img :src="'https://source.boringavatars.com/beam/120/' + owner.account"></v-img>
                </v-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="owner.ownername"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </div>
      <div class="main">
        <h1 class="text" v-if="selected === undefined">請選擇訊息對象</h1>
        <Chat v-else :member="owner[selected]" :key="selected" />
      </div>
    </div>
  </div>
</template>

<script>
  import Chat from '../components/Chat.vue'
  export default {
    components: { Chat },
    data() {
      return {
        selected: undefined,
        owners: [],
        me: false
      }
    },
    async created() {
      this.me = this.user._id === this.$route.params.id
      if (!this.me) return
      try {
        const { data } = await this.api.get('/owners/visitor')
        this.owners = data.result
        console.log(data.result)
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
