<template>
  <v-card color="var(--color-blue)">
    <v-card class="mb-5 p-0" color="var(--color-blue)" style="border: 1px solid rgba(145, 167, 226, 0.5)">
      <div class="chatup">
        <div class="row justify-space-between">
          <div class="col-12 mt-5 d-flex justify-start align-center">
            <img src="../assets/images/owner1.png" height="50" class="ms-3" />
            <span class="Umembermes mx-2">
              米米您好，我是「育達股份有限公司」，我們有一個書籍排版的案子，看過您的作品後覺得您的風格是我們所想要的，不知道是否能與您合作呢?
            </span>
          </div>
          <div class="col-12 mt-5 d-flex justify-end align-center">
            <span class="Me-oneline mx-2">您好，請問貴司是什麼樣的行業性質呢?</span>
            <img src="../assets/images/user1.png" height="50" class="me-3" />
          </div>
          <div class="col-12 mt-5 d-flex justify-start align-center">
            <img src="../assets/images/owner1.png" height="50" class="ms-3" />
            <span class="Umembermes mx-2">
              我們是教育出版業，本次的案件風格想要活潑的設計風格，
              <br />
              這是我們的案件連結：http://localhost:8080/#/owner/62079e4e2c4d38014aa25124/casePage/621849fcc2c2a2920679e231
              <br />
              請您過目。
            </span>
          </div>
          <div class="col-12 mt-5 d-flex justify-end align-center">
            <span class="Me-oneline mx-2">好的，我願意接這個案件，那我就按投稿囉，再請您查看並按同意，我們就可以正式開始合作</span>
            <img src="../assets/images/user1.png" height="50" class="me-3" />
          </div>
          <div class="col-12 mt-5 d-flex justify-start align-center">
            <img src="../assets/images/owner1.png" height="50" class="ms-3" />
            <span class="Umembermes mx-2">按同意囉~那麼檔案上傳中請稍後，看過內容後有什麼問題歡迎隨時發問，謝謝</span>
          </div>
        </div>
      </div>
    </v-card>
    <v-card color="var(--color-blue)" class="d-flex justify-space-between align-end mt-n10" style="border: 1px solid rgba(145, 167, 226, 0.5)">
      <v-textarea name="input-7-1" v-model="text" class="ms-10 me-3 chatin" @click:append-outer="sendMessage" @keydown.enter="sendMessage"></v-textarea>
      <v-btn icon width="50" height="50" class="mesbtn" @click="sendMessage"><v-icon size="30" color="var(--color-chatblue)">mdi-send</v-icon></v-btn>
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
