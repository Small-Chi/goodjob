<template>
  <div class="ms-6">
    <v-btn color="rgba(0,0,0,0)" @click="dialog = true" class="textWhite login ms-n6" plain v-if="!user.isuserLogin && !owner.isownerLogin">
      <v-icon>mdi-login-variant</v-icon>
      <!-- 登入 -->
    </v-btn>
    <v-dialog max-width="600" v-model="dialog">
      <template v-slot:default="dialog">
        <v-card color="var(--color-white)">
          <v-card-text>
            <div class="text-h2 pa-12">
              <v-row justify="space-around">
                <v-dialog v-model="dialog2" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" class="textWhite btn1 rounded-pill" style="font-size: 21px" width="150" height="150" plain>接案</v-btn>
                  </template>
                  <!-- 接案會員登入 -->
                  <v-card>
                    <v-form @submit.prevent="userlogin">
                      <v-card-title>
                        <span class="text-h5 py-5 mx-auto">接案會員 , 請登入</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" class="px-16">
                              <v-text-field label="帳號" :state="state.account" v-model="form.account"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="px-16">
                              <v-text-field label="密碼" :state="state.password" v-model="form.password" type="password"></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog2 = false">關閉</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog, (dialog.value = false)" type="submit">登入</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog3" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" class="textWhite btn1 rounded-pill" style="font-size: 21px" width="150" height="150" plain>發案</v-btn>
                  </template>
                  <!-- 發案會員登入 -->
                  <v-card>
                    <v-form @submit.prevent="ownerlogin">
                      <v-card-title>
                        <span class="text-h5 py-5 mx-auto">發案會員 , 請登入</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" class="px-16">
                              <v-text-field label="帳號" :state="state.account" v-model="form.account"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="px-16">
                              <v-text-field label="密碼" :state="state.password" v-model="form.password" type="password"></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog3 = false">關閉</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog3, (dialog.value = false)" type="submit">登入</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-row>
            </div>
          </v-card-text>
          <div class="d-flex justify-center">
            <!-- 接案方註冊單 -->
            <v-dialog v-model="dialog4" fullscreen hide-overlay transition="dialog-bottom-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="var(--color-white)" dark v-bind="attrs" v-on="on" class="btn2 textBlue rounded-0" plain max-height="20">成為接案者</v-btn>
              </template>
              <v-card>
                <v-toolbar color="var(--color-blue)" style="color: var(--color-white)">
                  <v-btn icon color="var(--color-white)" @click="dialog4 = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>加入 goodjob !</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn class="savebtn" color="var(--color-white)" :ripple="false">Join Us</v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-list class="list">
                  <v-form @submit.prevent="register">
                    <v-card-title>
                      <span class="text-h5 mx-auto">請填寫詳細資料 , 成為接案者</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              label="名稱"
                              hint="中文字長度為 1 到 4 個字"
                              :rules="inputRules1"
                              v-model="form.username"
                              :state="state.name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="帳號"
                              hint="長度為 4 到 20 個字"
                              :rules="inputRules2"
                              v-model="form.account"
                              :state="state.account"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              label="密碼"
                              type="password"
                              hint="長度為 4 到 20 個字"
                              :rules="inputRules3"
                              v-model="form.password"
                              :state="state.password"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field label="信箱" hint="長度為 4 到 20 個字" :rules="inputRules4" v-model="form.email" :state="state.email"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field label="接案狀況" hint="ex：全職" v-model="form.state"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field label="工作時段" hint="ex：週一 ~ 週五 8:00am ~ 18:00pm" v-model="form.workingday"></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="form.position"
                              :items="['平面設計師', '網頁設計師', '攝影師', '室內設計師', '插畫家', '創作者', '藝術家', '其他']"
                              label="職業類別"
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
                                      <v-text-field v-model="prices.item" placeholder="產品類別 ex.海報類"></v-text-field>
                                    </v-col>
                                    <v-col cols="6" class="d-flex align-center">
                                      <v-text-field v-model="prices.price" prefix="$"></v-text-field>
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
                              <v-textarea name="input-7-1" filled v-model="form.about" label="個人介紹" auto-grow></v-textarea>
                            </div>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog4 = false">關閉</v-btn>
                      <v-btn color="blue darken-1" text type="submit" @click="dialog.value = false">送出</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-list>
              </v-card>
            </v-dialog>
            <!-- 發案者註冊頁 -->
            <OwnerRegisters />
          </div>
          <v-card-actions d-actions class="justify-end">
            <v-btn text @click="dialog.value = false">關閉</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
  import validator from 'validator'
  import OwnerRegisters from '../components/OwnerRegister.vue'

  export default {
    data() {
      return {
        dialog: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        dialog5: false,
        notifications: false,
        sound: true,
        widgets: false,
        valid: true,
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
        inputRules1: [value => !!value || '必填', value => (value && value.length <= 10) || '最多 10 個字'],
        inputRules2: [value => !!value || '必填', value => (value && value.length >= 4) || '最少 4 個字'],
        inputRules3: [value => !!value || '必填', value => (value && value.length >= 4) || '最少 4 個字'],
        inputRules4: [value => !!value || '必填', value => (value && value.length >= 4) || '最少 4 個字'],
        newitem: ''
      }
    },
    computed: {
      state() {
        return {
          name: this.form.username.length === 0 ? null : this.form.username.length >= 1 && this.form.username.length <= 4,
          account: this.form.account.length === 0 ? null : this.form.account.length >= 4 && this.form.account.length <= 20,
          password: this.form.password.length === 0 ? null : this.form.password.length >= 4 && this.form.password.length <= 20,
          email: this.form.email.length === 0 ? null : validator.isEmail(this.form.email)
        }
      },
      user() {
        return this.$store.getters['user/user']
      },
      owner() {
        return this.$store.getters['owner/owner']
      }
    },
    methods: {
      async register() {
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
      },
      userlogin() {
        this.$store.dispatch('user/userlogin', this.form)
      },
      ownerlogin() {
        this.$store.dispatch('owner/ownerlogin', this.form)
      },
      additem() {
        this.form.prices.push({ item: '' })
      },
      remove(index) {
        this.form.prices.splice(index, 1)
      }
    },
    components: { OwnerRegisters }
  }
</script>
