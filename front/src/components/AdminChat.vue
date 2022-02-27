<template>
  <v-card color="var(--color-blue)">
    <v-card class="mb-5 p-0" style="border: 1px solid var(--color-deepwhite)">
      <div class="chatup">
        <div class="row justify-space-between">
          <div class="col-12 mt-5 d-flex justify-start align-center">
            <img src="../assets/images/user1.png" height="50" class="ms-3" />
            <span class="membermes mx-2">管理員您好，我想檢舉「蘋果汁廣告公司」，他們的案子惡意不結案!!</span>
          </div>
          <div class="col-12 mt-5 d-flex justify-end align-center">
            <span class="Me mx-2">
              會員您好，我們十分重視用戶的接案體驗，根據您的問題，麻煩請提供以下資訊：
              <br />
              1.案件名稱
              <br />
              2.發案方名稱
              <br />
              3.承接紀錄
              <br />
              4.對話紀錄
            </span>
            <img src="../assets/images/admin.png" height="50" class="me-3" />
          </div>
          <div class="col-12 mt-5 d-flex justify-start align-center">
            <img src="../assets/images/user1.png" height="50" class="ms-3" />
            <span class="membermes mx-2">
              1.案件名稱：DM 設計
              <br />
              2.發案方名稱：蘋果汁廣告公司
            </span>
          </div>
          <div class="col-12 mt-5 d-flex justify-start align-center">
            <img src="../assets/images/user1.png" height="50" class="ms-3" />
            <span class="membermes mx-2">等一下我截個圖，上傳中</span>
          </div>
          <div class="col-12 mt-5 d-flex justify-end align-center">
            <span class="Me-oneline mx-2">好的，我們將盡快了解此事件並做出處置，結果會再通知您。</span>
            <img src="../assets/images/admin.png" height="50" class="me-3" />
          </div>
        </div>
      </div>
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
        } catch (error) {}
        this.sending = false
        this.text = ''
      }
    }
  }
</script>
