<template>
  <v-dialog v-model="dialog5" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="var(--color-white)" dark v-bind="attrs" v-on="on" class="btn2 textBlue rounded-0" plain max-height="20" style="border-left: 0">
        成為發案者
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="var(--color-blue)" style="color: var(--color-white)">
        <v-btn icon color="var(--color-white)" @click="dialog5 = false">
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
            <span class="text-h5 mx-auto">請填寫詳細資料 , 成為發案者</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="名稱" hint="中文字長度為 1 到 4 個字" :rules="inputRules1" v-model="form.ownername" :state="state.name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="帳號" hint="長度為 4 到 20 個字" :rules="inputRules2" v-model="form.account" :state="state.account"></v-text-field>
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
                  <v-text-field label="發案狀況" hint="ex：經常性" v-model="form.state"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="工作時段" hint="ex：週一 ~ 週五 8:00am ~ 18:00pm" v-model="form.workingday"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="form.position"
                    :items="['教育', '科技', '廣告媒體', '設計', '餐旅', '新創', '寵物', '食品', '建築', '政府單位', '傳產', '攤販', '其他']"
                    label="行業類別"
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
                      <v-expansion-panel-content>
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
                    <v-textarea name="input-7-1" filled v-model="form.about" label="公司介紹" auto-grow></v-textarea>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog5 = false">關閉</v-btn>
            <v-btn color="blue darken-1" text type="submit">送出</v-btn>
          </v-card-actions>
        </v-form>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
  import validator from 'validator'

  export default {
    data() {
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
          ownername: '',
          account: '',
          password: '',
          email: '',
          state: '',
          workingday: '',
          position: '',
          technology: '',
          about: '',
          item: '',
          prices: [{ item: '' }, { price: '' }]
        },
        inputRules1: [value => !!value || '必填', value => (value && value.length <= 10) || '最多 10 個字'],
        inputRules2: [value => !!value || '必填', value => (value && value.length >= 4) || '最少 4 個字'],
        inputRules3: [value => !!value || '必填', value => (value && value.length >= 4) || '最少 4 個字'],
        inputRules4: [value => !!value || '必填', value => (value && value.length >= 4) || '最少 4 個字']
      }
    },
    computed: {
      state() {
        return {
          name: this.form.ownername.length === 0 ? null : this.form.ownername.length >= 1 && this.form.ownername.length <= 4,
          account: this.form.account.length === 0 ? null : this.form.account.length >= 4 && this.form.account.length <= 20,
          password: this.form.password.length === 0 ? null : this.form.password.length >= 4 && this.form.password.length <= 20,
          email: this.form.email.length === 0 ? null : validator.isEmail(this.form.email)
        }
      }
    },
    methods: {
      async register() {
        try {
          await this.api.post('/owners', this.form)
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
      ownerlogin() {
        this.$store.dispatch('user/userlogin', this.form)
      },
      additem() {
        this.form.prices.push({ item: '' })
      },
      remove(index) {
        this.form.prices.splice(index, 1)
      }
    }
  }
</script>
