<template>
  <div id="ownerself">
    <div class="content row">
      <div class="col d-flex">
        <span class="ownername">{{ ownerinfo.ownername }}</span>
        <v-btn icon class="messageIcon" plain :to="`/owner/${owner._id}/ownerchats/`">
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
                          <v-text-field label="名稱" hint="中文字長度為 1 到 4 個字" :rules="inputRules1" v-model="form.ownername"></v-text-field>
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
                          <v-text-field label="發案狀況" hint="ex：全職" v-model="form.state"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field label="工作時段" hint="ex：週一 ~ 週五 8:00am ~ 18:00pm" v-model="form.workingday"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-select
                            :items="['教育', '科技', '廣告媒體', '設計', '餐旅', '新創', '寵物', '食品', '建築', '政府單位', '傳產', '攤販', '其他']"
                            label="行業類別"
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
                            label="需求工具"
                            multiple
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-expansion-panels>
                            <v-expansion-panel>
                              <v-expansion-panel-header>
                                <template v-slot:default="{ open }">
                                  <v-row no-gutters>
                                    <v-col cols="3">產品預算單</v-col>
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
                                    <v-btn fab text v-if="index !== 0" @click="remove(index)"><v-icon>mdi-delete</v-icon></v-btn>
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
          <div class="col-2"><span class="main-title" style="font-weight: bold">- 行業類別</span></div>
          <div class="col-10">
            <span class="fw-300">{{ ownerinfo.position }}</span>
          </div>
        </div>
        <div class="row my-5">
          <div class="col-2"><span class="main-title" style="font-weight: bold">- 發案狀況</span></div>
          <div class="col-10">
            <span class="fw-300">{{ ownerinfo.state }}</span>
          </div>
        </div>
        <div class="row my-5 py-5" style="border-top: 1px solid rgba(205, 198, 188, 0.3); border-bottom: 1px solid rgba(205, 198, 188, 0.3)">
          <div class="col-2"><span class="main-title" style="font-weight: bold">- 需求工具</span></div>
          <div class="col-10">
            <span class="row">
              <span class="col-3 fw-300" v-for="(item, index) in ownerinfo.technology" :key="'A' + index">{{ item }}</span>
            </span>
          </div>
        </div>
        <div class="row my-5">
          <div class="col-2"><span class="main-title" style="font-weight: bold">- 工作時段</span></div>
          <div class="col-10">
            <span class="fw-300">{{ ownerinfo.workingday }}</span>
          </div>
        </div>
        <div class="row my-5">
          <div class="col-2"><span class="main-title" style="font-weight: bold">- 案件預算</span></div>
          <div class="col-10">
            <div class="row my-2">
              <div class="pricesdiv col-3 mb-5" v-for="(price, index) in ownerinfo.prices" :key="'A' + index">
                <span class="fw-300">{{ price.item }}</span>
                <span class="fw-300">{{ price.price }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row my-5">
          <div class="col-2"><span class="main-title" style="font-weight: bold">- 公司介紹</span></div>
          <div class="col-10">
            <span class="fw-300">{{ ownerinfo.about }}</span>
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
          ownername: '',
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
        ownerinfo: {
          ownername: '',
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
          ownername: this.ownerinfo.ownername,
          account: this.ownerinfo.account,
          password: this.ownerinfo.password,
          email: this.ownerinfo.email,
          state: this.ownerinfo.state,
          workingday: this.ownerinfo.workingday,
          position: this.ownerinfo.position,
          technology: this.ownerinfo.technology,
          about: this.ownerinfo.about,
          prices: this.ownerinfo.prices
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
          await this.api.patch('/owners/info', this.form, {
            headers: {
              authorization: 'Bearer ' + this.owner.token
            }
          })
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '修改完成'
          })
          this.getOwner()
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: error.response.data.message
          })
        }
        this.dialog = false
      },
      async getOwner() {
        try {
          const { data } = await this.api.get('owners/me', {
            headers: {
              authorization: 'Bearer ' + this.owner.token
            }
          })
          this.ownerinfo = data.result
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: '失敗',
            text: '資料取得失敗'
          })
        }
      }
    },
    // 一進來抓資料
    async created() {
      console.log(this.owner._id)
      this.me = this.owner._id === this.$route.params.id

      try {
        if (this.me) {
          const { data } = await this.api.get('owners/me', {
            headers: {
              authorization: 'Bearer ' + this.owner.token
            }
          })
          this.ownerinfo = data.result
          this.ownerinfo.password = ''
        } else {
          // 用 route.params.id 抓別人資料
          const { data } = await this.api.get('owners/' + this.$route.params.id, {
            headers: {
              authorization: 'Bearer ' + this.owner.token
            }
          })
          this.ownerinfo = data.result
          this.ownerinfo.password = ''
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
