<template>
  <v-card color="var(--color-blue)">
    <v-card class="mb-5 p-0" style="border: 1px solid var(--color-deepwhite)">
      <div class="chatup"></div>
    </v-card>
    <v-card color="var(--color-white)" class="d-flex justify-space-between align-end mt-n10">
      <v-textarea name="input-7-1" v-model="text" class="ms-10 me-3 chatin" @click:append-outer="sendMessage" @keydown.enter="sendMessage"></v-textarea>
      <v-btn icon width="50" height="50" class="mesbtn" @click="sendMessage"><v-icon size="30" color="var(--color-blue)">mdi-send</v-icon></v-btn>
    </v-card>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        text: '',
        sending: false,
        messages: [],
        timer: 0,
        fetchingOld: false,
        fetchOldest: false
      }
    },
    props: {
      Umember: {
        type: Object,
        default() {
          return {
            username: '',
            account: '',
            _id: ''
          }
        }
      },
      Omember: {
        type: Object,
        default() {
          return {
            ownername: '',
            account: '',
            _id: ''
          }
        }
      }
    },
    methods: {
      async sendMessage() {
        if (this.sending || this.text.length === 0 || this.Umember._id.length === 0) return
        this.sending = true
        try {
          const { data } = await this.api.post(
            `/chats/Umembers/${this.Umember._id}/messages`,
            { text: this.text },
            {
              headers: {
                authorization: 'Bearer ' + this.user.token
              }
            }
          )
          this.messages.push(data.result)
        } catch (error) {
          console.log(error)
        }
        this.sending = false
        this.text = ''
      }
    }
  }
</script>
