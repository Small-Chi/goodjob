<template>
  <div id="userself">
    <div class="content row">
      <div class="col d-flex">
        <span class="username">{{ userinfo.username }}</span>
        <v-btn icon class="messageIcon" plain>
          <v-icon size="40">mdi-message-outline</v-icon>
        </v-btn>
        <div class="score">
          <div class="scoreitems">
            <div class="scoreitem">
              <span class="num">1000</span>
              <span class="numtitle">
                <v-icon color="var(--color-lightY)">mdi-charity</v-icon>
                成交案量
              </span>
            </div>
          </div>
          <div class="scoreitems">
            <div class="scoreitem">
              <span class="num">1000</span>
              <span class="numtitle">
                <v-icon color="var(--color-lightY)">mdi-thumb-up</v-icon>
                好評
              </span>
            </div>
          </div>
          <div class="scoreitems">
            <div class="scoreitem">
              <span class="num">1000</span>
              <span class="numtitle">
                <v-icon color="var(--color-lightY)">mdi-thumb-down</v-icon>
                差評
              </span>
            </div>
          </div>
        </div>
        <!-- 編輯紐 -->
        <v-btn icon class="editBtn" style="padding: 0; background-color: var(--color-deepblue)" @click="updateInfo()">
          <v-icon size="30" color="var(--color-white)" class="justify-content-center; editIcon">mdi-pencil-outline</v-icon>
        </v-btn>
        <!-- 表單 -->
        <v-row justify="center">
          <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <v-card>
              <v-toolbar color="var(--color-blue)" style="color: var(--color-white)">
                <v-btn icon color="var(--color-white)" @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>加入 goodjob !</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn class="savebtn" color="var(--color-white)" :ripple="false">Join Us</v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-list class="list">
                <v-form>
                  <v-card-title>
                    <span class="text-h5 mx-auto">編輯個人資訊</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field label="名稱" hint="中文字長度為 1 到 4 個字" :rules="inputRules1" v-model="form.username"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field label="帳號" hint="長度為 4 到 20 個字" :rules="inputRules2" v-model="form.account" disabled></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field label="密碼" type="password" hint="長度為 4 到 20 個字" :rules="inputRules3" v-model="form.password"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field label="信箱" hint="長度為 4 到 20 個字" :rules="inputRules4" v-model="form.email"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field label="接案狀況" hint="ex：全職" v-model="form.state"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field label="工作時段" hint="ex：週一 ~ 週五 8:00am ~ 18:00pm" v-model="form.workingday"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="['平面設計師', '網頁設計師', '攝影師', '室內設計師', '插畫家', '創作者', '藝術家', '其他']"
                            label="職業類別"
                            v-model="form.position"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-autocomplete
                            v-model="form.technology"
                            :items="[
                              'Illustrator',
                              'Photoshop',
                              'Indesign',
                              'PowerPoint',
                              'Word',
                              'Figma',
                              'JS',
                              'CSS',
                              'JQ',
                              'HTML',
                              'SCSS',
                              'Vue',
                              'Node',
                              'Premiere',
                              'After Effects',
                              'Lightroom',
                              'Final Cut ProX',
                              'Sketch Up',
                              'AutoCAD',
                              'Rhino',
                              'V-ray',
                              '3D MAX',
                              'Revit',
                              'Lumion',
                              '其他'
                            ]"
                            label="擅長工具"
                            multiple
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-expansion-panels>
                            <v-expansion-panel>
                              <v-expansion-panel-header>
                                <template v-slot:default="{ open }">
                                  <v-row no-gutters>
                                    <v-col cols="3">產品報價單</v-col>
                                    <v-col cols="8">
                                      <v-fade-transition leave-absolute>
                                        <span v-if="open" key="0"></span>
                                        <span v-else key="1"></span>
                                      </v-fade-transition>
                                    </v-col>
                                  </v-row>
                                </template>
                              </v-expansion-panel-header>
                              <v-expansion-panel-content id="addprice">
                                <v-row v-for="(prices, index) in form.prices" :key="'A' + index">
                                  <v-col cols="6">
                                    <v-text-field placeholder="產品類別 ex.海報類" v-model="prices.item"></v-text-field>
                                  </v-col>
                                  <v-col cols="6" class="d-flex align-center">
                                    <v-text-field prefix="$" v-model="prices.price"></v-text-field>
                                    <v-btn fab text v-if="index !== 0" @click="remove(index)"><v-icon>mdi-delete-forever</v-icon></v-btn>
                                    <v-btn fab text v-else @click="additem"><v-icon>mdi-plus</v-icon></v-btn>
                                  </v-col>
                                </v-row>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </v-col>
                        <v-col cols="12">
                          <div>
                            <v-textarea name="input-7-1" filled label="個人介紹" auto-grow v-model="form.about"></v-textarea>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">關閉</v-btn>
                    <v-btn color="blue darken-1" text @click="editsave()">儲存</v-btn>
                  </v-card-actions>
                </v-form>
              </v-list>
            </v-card>
          </v-dialog>
        </v-row>
      </div>

      <!-- 顯示呈現不要動! -->
      <div class="main">
        <div class="row my-5">
          <div class="col-2"><span class="main-title" style="font-weight: bold">- 職業類別</span></div>
          <div class="col-10">
            <span class="fw-300">{{ userinfo.position }}</span>
          </div>
        </div>
        <div class="row my-5">
          <div class="col-2"><span class="main-title" style="font-weight: bold">- 接案狀況</span></div>
          <div class="col-10">
            <span class="fw-300">{{ userinfo.state }}</span>
          </div>
        </div>
        <div class="row my-5 py-5" style="border-top: 1px solid rgba(205, 198, 188, 0.3); border-bottom: 1px solid rgba(205, 198, 188, 0.3)">
          <div class="col-2"><span class="main-title" style="font-weight: bold">- 擅長工具</span></div>
          <div class="col-10">
            <span class="row">
              <span class="col-3 fw-300" v-for="(item, index) in userinfo.technology" :key="'A' + index">{{ item }}</span>
            </span>
          </div>
        </div>
        <div class="row my-5">
          <div class="col-2"><span class="main-title" style="font-weight: bold">- 工作時段</span></div>
          <div class="col-10">
            <span class="fw-300">{{ userinfo.workingday }}</span>
          </div>
        </div>
        <div class="row my-5">
          <div class="col-2"><span class="main-title" style="font-weight: bold">- 案件價格</span></div>
          <div class="col-10">
            <div class="row my-2">
              <div class="pricesdiv col-3 mb-5" v-for="(price, index) in userinfo.prices" :key="'A' + index">
                <span class="fw-300">{{ price.item }}</span>
                <span class="fw-300">{{ price.price }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row my-5">
          <div class="col-2"><span class="main-title" style="font-weight: bold">- 個人介紹</span></div>
          <div class="col-10">
            <span class="fw-300">{{ userinfo.about }}</span>
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
        dialog: false,
        me: false,
        form: {
          username: '',
          account: '',
          password: '',
          email: '',
          state: '',
          workingday: '',
          position: '',
          technology: [],
          about: '',
          prices: [{ item: '' }, { price: '' }]
        },
        userinfo: {
          username: '',
          account: '',
          password: '',
          email: '',
          state: '',
          workingday: '',
          position: '',
          technology: [],
          about: '',
          prices: [{ item: '' }, { price: '' }]
        },
        inputRules1: [value => !!value || '必填', value => (value && value.length <= 10) || '最多 10 個字'],
        inputRules2: [value => !!value || '必填', value => (value && value.length >= 4) || '最少 4 個字'],
        inputRules3: [value => !!value || '必填', value => (value && value.length >= 4) || '最少 4 個字'],
        inputRules4: [value => !!value || '必填', value => (value && value.length >= 4) || '最少 4 個字'],
        newitem: ''
      }
    },
    computed: {},
    methods: {
      // 更新會員資料
      async updateInfo() {
        this.form = {
          username: this.userinfo.username,
          account: this.userinfo.account,
          password: this.userinfo.password,
          email: this.userinfo.email,
          state: this.userinfo.state,
          workingday: this.userinfo.workingday,
          position: this.userinfo.position,
          technology: this.userinfo.technology,
          about: this.userinfo.about,
          prices: this.userinfo.prices
        }
        this.dialog = true
      },
      additem() {
        this.form.prices.push({ item: '' })
      },
      remove(index) {
        this.form.prices.splice(index, 1)
      },
      async editsave() {
        try {
          await this.api.patch('/users/info', this.form, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '修改完成'
          })
          this.getUser()
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: error.response.data.message
          })
        }
        this.dialog = false
      },
      // 完成一個事件時後面要加上 this.getUser() 才會馬上渲染更新畫面
      async getUser() {
        try {
          const { data } = await this.api.get('users/me', {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.userinfo = data.result
          console.log(data.result)
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '資料取得失敗'
          })
        }
      }
    },
    async created() {
      // v-if = me 顯示按鈕
      this.me = this.user._id === this.$route.params.id
      try {
        if (this.me) {
          const { data } = await this.api.get('users/me', {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.userinfo = data.result
          this.userinfo.password = ''
          console.log(data.result)
        } else {
          // 用 route.params.id 抓別人資料
          const { data } = await this.api.get('users/' + this.$route.params.id, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.userinfo = data.result
          // this.$emit('showText', data)
          this.userinfo.password = ''
          console.log(data.result)
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: '資料取得失敗'
        })
      }
    }
  }
</script>
