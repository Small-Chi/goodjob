<template>
  <div class="ms-6">
    <v-dialog
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="rgba(0,0,0,0)"
          v-bind="attrs"
          v-on="on"
          width="110"
          class="textWhite login me-8"
          plain
        ><v-icon class="me-2">mdi-login-variant</v-icon>登入</v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card color="var(--color-white)">
          <v-card-text>
            <div class="text-h2 pa-12">
              <v-row justify="space-around">
                <v-dialog
                  v-model="dialog2"
                  persistent
                  max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      class="textWhite btn1 rounded-pill"
                      style="font-size: 21px;"
                      width="150"
                      height="150"
                      plain
                    >
                      接案
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5 py-5">接案會員 , 請登入</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" class="px-16">
                            <v-text-field
                              label="Account"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" class="px-16">
                            <v-text-field
                              label="Password"
                              type="password"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog2 = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog2 = false"
                      >
                        Login
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog
                  v-model="dialog3"
                  persistent
                  max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      class="textWhite btn1 rounded-pill"
                      style="font-size: 21px;"
                      width="150"
                      height="150"
                      plain
                    >
                      發案
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5 py-5">發案會員 , 請登入</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" class="px-16">
                            <v-text-field
                              label="Account"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" class="px-16">
                            <v-text-field
                              label="Password"
                              type="password"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog3 = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog3 = false"
                      >
                        Login
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </div>
          </v-card-text>
          <div class="d-flex justify-center">
            <!-- 接案方註冊單 -->
                <v-dialog
                  v-model="dialog4"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="var(--color-white)"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      class="btn2 textBlue rounded-0"
                      plain
                      max-height="20"
                    >
                      成為接案者
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar
                      color="var(--color-blue)"
                      style="color: var(--color-white);"
                    >
                      <v-btn
                        icon
                        color="var(--color-white)"
                        @click="dialog4 = false"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>加入 goodjob !</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn class="savebtn"
                          color="var(--color-white)"
                          :ripple="false"
                        >
                          Join Us
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>
                    <v-list class="list">
                    <v-card-title>
                      <span class="text-h5">請填寫詳細資料 , 成為接案者</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                label="Name"
                                required
                                hint="名稱"
                                :rules='inputRules'
                                v-model="form.name"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                label="Account"
                                hint="帳號長度為 4 到 20 個字"
                                required
                                :rules='inputRules'
                                v-model="form.account"
                              ></v-text-field>
                            </v-col>
                              <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                label="Password"
                                type="password"
                                required
                                hint="密碼長度為 4 到 20 個字"
                                :rules='inputRules'
                                v-model="form.password"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                label="Email"
                                hint="信箱長度為 4 到 20 個字"
                                required
                                :rules='inputRules'
                                v-model="form.email"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                label="State"
                                hint="接案狀況 ex：全職"
                                required
                                :rules='inputRules'
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                label="Workingday"
                                hint="工作時段 ex：週一 ~ 週五 8:00am ~ 18:00pm"
                                required
                                :rules='inputRules'
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-select
                                :items="['平面設計師', '攝影師', '室內設計師', '插畫家', '創作者', '藝術家', '其他']"
                                label="Position"
                                required
                                :rules='inputRules'
                              ></v-select>
                            </v-col>
                              <v-col
                              cols="12"
                              sm="6"
                              >
                              <v-autocomplete
                                :items="['Illustrator', 'Photoshop', 'Indesign', 'PowerPoint', 'Word', 'Figma', 'JS', 'CSS', 'JQ', 'HTML', 'SCSS', 'Vue', 'Node', 'Premiere', 'After Effects', 'Lightroom', 'Final Cut ProX', 'Sketch Up', 'AutoCAD', 'Rhino', 'V-ray', '3D MAX', 'Revit', 'Lumion', '其他']"
                                label="Technology"
                                multiple
                                :rules='inputRules'
                              ></v-autocomplete>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              >
                            <v-expansion-panels>
                              <v-expansion-panel>
                                <v-expansion-panel-header>
                                  <template v-slot:default="{ open }">
                                    <v-row no-gutters>
                                      <v-col cols="3">
                                        Prices 產品報價單
                                      </v-col>
                                      <v-col
                                        cols="8"
                                      >
                                        <v-fade-transition leave-absolute>
                                          <span
                                            v-if="open"
                                            key="0"
                                          >
                                          </span>
                                          <span
                                            v-else
                                            key="1"
                                          >
                                          </span>
                                        </v-fade-transition>
                                      </v-col>
                                    </v-row>
                                  </template>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                  <v-row>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="item1.name"
                                        placeholder="產品類別 ex.海報類"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="item1.prices"
                                        placeholder="NTD"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                   <v-row>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="item2.name"
                                        placeholder="產品類別 ex.海報類"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="item2.prices"
                                        placeholder="NTD"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                   <v-row>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="item3.name"
                                        placeholder="產品類別 ex.海報類"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="item3.prices"
                                        placeholder="NTD"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                   <v-row>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="item4.name"
                                        placeholder="產品類別 ex.海報類"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="item4.prices"
                                        placeholder="NTD"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                   <v-row>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="item5.name"
                                        placeholder="產品類別 ex.海報類"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="item5.prices"
                                        placeholder="NTD"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                            </v-col>
                            <v-col cols="12">
                            <div>
                              <v-textarea
                                name="input-7-1"
                                filled
                                label="About me"
                                auto-grow
                              ></v-textarea>
                            </div>
                          </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog4 = false"
                        >
                          Close
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          type="submit"
                          @click="dialog4 = false"
                        >
                          Send
                        </v-btn>
                      </v-card-actions>
                    </v-list>
                  </v-card>
                </v-dialog>
                <!-- 發案者註冊頁 -->
                <v-dialog
                  v-model="dialog5"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="var(--color-white)"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      class="btn2 textBlue rounded-0"
                      plain
                      max-height="20"
                      style="border-left: 0;"
                    >
                      成為發案者
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar
                      color="var(--color-blue)"
                      style="color: var(--color-white);"
                    >
                      <v-btn
                        icon
                        color="var(--color-white)"
                        @click="dialog5 = false"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title>加入 goodjob !</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn class="savebtn"
                          color="var(--color-white)"
                          :ripple="false"
                        >
                          Join Us
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>
                    <v-list class="list">
                    <v-card-title>
                      <span class="text-h5">請填寫詳細資料 , 成為發案者</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                label="Name"
                                required
                                hint="名稱"
                                :rules='inputRules'
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                label="Account"
                                hint="帳號"
                                required
                                :rules='inputRules'
                              ></v-text-field>
                            </v-col>
                              <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                label="Password"
                                type="password"
                                required
                                hint="密碼"
                                :rules='inputRules'
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                label="Email"
                                hint="信箱"
                                required
                                :rules='inputRules'
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                label="State"
                                hint="發案狀況 ex：經常性"
                                required
                                :rules='inputRules'
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                label="Workingday"
                                hint="工作時段 ex：週一 ~ 週五 8:00am ~ 18:00pm"
                                required
                                :rules='inputRules'
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                            >
                              <v-select
                                :items="['教育', '科技', '廣告媒體', '設計', '餐旅', '新創', '寵物', '食品', '建築', '政府單位', '傳產', '攤販', '其他']"
                                label="Position"
                                required
                                :rules='inputRules'
                              ></v-select>
                            </v-col>
                              <v-col
                              cols="12"
                              sm="6"
                              >
                              <v-autocomplete
                                :items="['Illustrator', 'Photoshop', 'Indesign', 'PowerPoint', 'Word', 'Figma', 'JS', 'CSS', 'JQ', 'HTML', 'SCSS', 'Vue', 'Node', 'Premiere', 'After Effects', 'Lightroom', 'Final Cut ProX', 'Sketch Up', 'AutoCAD', 'Rhino', 'V-ray', '3D MAX', 'Revit', 'Lumion', '其他']"
                                label="Need Technology"
                                multiple
                                :rules='inputRules'
                              ></v-autocomplete>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              >
                            <v-expansion-panels>
                              <v-expansion-panel>
                                <v-expansion-panel-header>
                                  <template v-slot:default="{ open }">
                                    <v-row no-gutters>
                                      <v-col cols="3">
                                        Prices 產品預算單
                                      </v-col>
                                      <v-col
                                        cols="8"
                                      >
                                        <v-fade-transition leave-absolute>
                                          <span
                                            v-if="open"
                                            key="0"
                                          >
                                          </span>
                                          <span
                                            v-else
                                            key="1"
                                          >
                                          </span>
                                        </v-fade-transition>
                                      </v-col>
                                    </v-row>
                                  </template>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                  <v-row>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="Oitem1.name"
                                        placeholder="產品類別 ex.海報類"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="Oitem1.prices"
                                        placeholder="NTD"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                   <v-row>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="Oitem2.name"
                                        placeholder="產品類別 ex.海報類"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="Oitem2.prices"
                                        placeholder="NTD"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                   <v-row>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="Oitem3.name"
                                        placeholder="產品類別 ex.海報類"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="Oitem3.prices"
                                        placeholder="NTD"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                   <v-row>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="Oitem4.name"
                                        placeholder="產品類別 ex.海報類"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="Oitem4.prices"
                                        placeholder="NTD"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                   <v-row>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="Oitem5.name"
                                        placeholder="產品類別 ex.海報類"
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                      <v-text-field
                                        v-model="Oitem5.prices"
                                        placeholder="NTD"
                                      ></v-text-field>
                                    </v-col>
                                  </v-row>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                            </v-col>
                            <v-col cols="12">
                            <div>
                              <v-textarea
                                name="input-7-1"
                                filled
                                label="About me"
                                auto-grow
                              ></v-textarea>
                            </div>
                          </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog5 = false"
                        >
                          Close
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog5 = false"
                        >
                          Send
                        </v-btn>
                      </v-card-actions>
                    </v-list>
                  </v-card>
                </v-dialog>
              </div>
            <v-card-actions class="justify-end">
            <v-btn
              text
              @click="dialog.value = false"
            >Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      notifications: false,
      sound: true,
      widgets: false,
      valid: true,
      form: {
        name: '',
        account: '',
        password: '',
        email: '',
        state: '',
        workingday: '',
        position: '',
        technology: '',
        about: ''
      },
      inputRules: [
        v => !!v || '必填'
      ],
      item1: {
        name: '',
        price: ''
      },
      item2: {
        name: '',
        price: ''
      },
      item3: {
        name: '',
        price: ''
      },
      item4: {
        name: '',
        price: ''
      },
      item5: {
        name: '',
        price: ''
      },
      Oitem1: {
        name: '',
        price: ''
      },
      Oitem2: {
        name: '',
        price: ''
      },
      Oitem3: {
        name: '',
        price: ''
      },
      Oitem4: {
        name: '',
        price: ''
      },
      Oitem5: {
        name: '',
        price: ''
      }
    }
  },
  computed: {
    state () {
      return {
        account: this.form.account.length === 0 ? null : this.form.account.length >= 4 && this.form.account.length <= 20,
        password: this.form.password.length === 0 ? null : this.form.password.length >= 4 && this.form.password.length <= 20,
        email: this.form.email.length === 0 ? null : validator.isEmail(this.form.email)
      }
    }
  },
  methods: {
    async register () {
      try {
        await this.api.post('/users', this.form)
        this.$swal({
          icon: 'success',
          title: '成功',
          text: '註冊成功'
        })
        this.$router.push('/')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    }
  }
}
</script>
