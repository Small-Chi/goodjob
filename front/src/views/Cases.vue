<template>
  <div class="contentleftC">
    <div class="row setRow">
      <div class="search">
        <v-btn rounded width="150px" class="Listbtn" @click="filter = ''">全部案件</v-btn>
        <v-btn rounded width="150px" class="Listbtn" @click="filter = '平面設計'">平面設計</v-btn>
        <v-btn rounded width="150px" class="Listbtn" @click="filter = '網頁設計'">網頁設計</v-btn>
        <v-btn rounded width="150px" class="Listbtn" @click="filter = '室內設計'">室內設計</v-btn>
        <v-btn rounded width="150px" class="Listbtn" @click="filter = '手作設計'">手作設計</v-btn>
        <div class="div200">
          <v-btn icon class="searchIcon"><v-icon size="30" color="var(--color-white)">mdi-magnify</v-icon></v-btn>
          <v-text-field @keydown.enter="filterItemsS()"></v-text-field>
        </div>
      </div>
      <div class="col-4" v-if="me">
        <div class="cardLine">
          <!-- 新增卡片按鈕 -->
          <v-btn depressed icon class="addcard" height="100" width="100">
            <v-icon size="50" class="addpuls" @click="dialog = true">mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>
      <!-- 要長出卡片的迴圈 -->
      <div class="col-4" v-for="(item, index) in filterItems" :key="index">
        <div>
          <!-- 卡片呈現 -->
          <v-card class="card mx-auto card-item" max-width="350" min-width="350" color="var(--color-lightblue)">
            <v-btn class="cardBtn" min-width="50" min-height="20" style="padding: 0" color="var(--color-red)">
              <v-icon size="18" color="white" class="justify-content-center; Btn1Icon">mdi-heart</v-icon>
              <div class="heartNum">0</div>
            </v-btn>
            <!-- <v-btn class="cardBtn2" min-width="40" min-height="20" style="padding: 0" color="var(--color-blue)">
              <v-icon size="18" color="white" class="justify-content-center; Btn2Icon">mdi-message-outline</v-icon>
            </v-btn> -->
            <v-btn
              icon
              class="cardBtn3"
              max-width="20"
              max-height="20"
              style="padding: 0; background-color: var(--color-red)"
              @click="deleteCase(item._id)"
              v-if="me"
            >
              <v-icon size="10" color="white" class="justify-content-center; Btn3Icon">mdi-close</v-icon>
            </v-btn>
            <v-btn icon class="cardBtn4" min-width="30" style="padding: 0; background-color: var(--color-blue)" @click="editCase(index)" v-if="me">
              <v-icon size="18" color="white" class="justify-content-center; Btn4Icon">mdi-pencil-outline</v-icon>
            </v-btn>
            <!-- <v-img height="200px" style="border-radius: 10px; background-color: var(--color-white)"></v-img> -->
            <v-card-title class="ctext1 mb-2" style="margin-left: 10px">
              <h3 class="textWhite ms-n1">{{ `◔` }}</h3>
              <h3 class="textlightY ms-2">{{ new Date(item.endingday).toLocaleDateString().replace(/\//g, '／') }}</h3>
            </v-card-title>
            <v-card-subtitle class="ctext1 d-flex" style="margin-left: 10px">
              <h3 class="textWhite">{{ ` $ ` }}</h3>
              <h3 class="textlightY ms-2">{{ item.price }}</h3>
              <div class="textWhite sell">
                {{ item.sell ? '公開' : '隱藏' }}
              </div>
            </v-card-subtitle>
            <v-card-actions style="background: white" class="flex-wrap">
              <v-card-text class="col-12 mt-n1">
                <router-link :to="`/owner/${$route.params.id}/casePage/` + item._id">
                  <div class="text" style="height: 190px; background: white">
                    <h2 style="color: var(--color-deepblue)" class="card-title mb-1">{{ item.casename }}</h2>
                    <p style="color: var(--color-deepblue)">{{ item.description }}</p>
                  </div>
                </router-link>
                <div class="hr mx-auto"></div>
              </v-card-text>
              <v-chip style="color: var(--color-white); background: var(--color-lightblue)">
                {{ item.category.big }}
              </v-chip>
              <v-chip>
                {{ item.category.small }}
              </v-chip>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </div>
    <!-- 新增卡片的表單 -->
    <v-row justify="center">
      <v-dialog id="modal-case" v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card color="var(--color-deepblue)" class="d-flex justify-center align-center">
          <div class="dialogbody">
            <v-form>
              <v-card-title>
                <span class="text-h5 mx-auto mb-6" style="font-weight: 700; color: var(--color-bule)" v-if="form._id">編輯案件</span>
                <span class="text-h5 mx-auto mb-6" style="font-weight: 700; color: var(--color-bule)" v-else>新增案件</span>
              </v-card-title>
              <v-btn icon style="position: absolute; top: 0px; right: 0" @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="名稱" hint="中文字長度為 1 到 10 個字" :rules="inputRules1" v-model="form.casename"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete v-model="form.category.big" :items="Object.keys(categories)" label="設計類別"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete v-model="form.category.small" :items="categories[form.category.big]" label="項目"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field label="尺寸" v-model="form.size"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-autocomplete v-model="form.sunit" :items="['mm', 'cm', 'm', '平方公尺', '坪', '其他']" label="單位" multiple></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-text-field v-model="form.quantity" label="數量"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3">
                  <v-autocomplete
                    v-model="form.qunit"
                    :items="['個', '張', '件', '頁', '本', '組', '支', '套', '平方公尺', '坪', '其他']"
                    label="單位"
                    multiple
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
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
                <v-col cols="12" sm="4">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="form.endingday"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="form.endingday"
                        label="結案日期"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        reactive
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="form.endingday" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">取消</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(form.endingday)">確定</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :return-value.sync="form.takeday"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="form.takeday" label="入賬日期" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="form.takeday" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu2 = false">取消</v-btn>
                      <v-btn text color="primary" @click="$refs.menu2.save(form.takeday)">確定</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field label="結案總金額" prefix="$" v-model="form.price"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div>
                    <v-textarea
                      v-model="form.description"
                      fluid
                      solo
                      counter
                      name="input-7-4"
                      :rules="rules"
                      filled
                      label="案件內容 140字 以內"
                      auto-grow
                    ></v-textarea>
                  </div>
                </v-col>
                <v-col cols="12 d-flex justify-center">
                  <img-inputer
                    accept="image/*"
                    v-model="form.image"
                    size="large"
                    bottomText="點擊或拖曳檔案至此"
                    hoverText="點擊或拖曳檔案至此"
                    placeholder="參考風格圖片"
                  ></img-inputer>
                </v-col>
              </v-row>
              <v-radio-group row>
                <v-switch v-model="form.sell" :label="`公開`"></v-switch>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn color="blue darken-1" plain class="rsBtn textRed" @click="resetForm">取消</v-btn>
                  <v-btn color="blue darken-1" plain class="rsBtn2 textYel" v-if="form._id" @click="submitModal" :disabled="dialogSubmitting">儲存</v-btn>
                  <v-btn color="blue darken-1" plain type="submit" class="rsBtn2 textYel" v-else @click="submitModal" :disabled="dialogSubmitting">新增</v-btn>
                </v-card-actions>
              </v-radio-group>
            </v-form>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        me: false,
        dialogSubmitting: false,
        dialog: false,
        reset: false,
        notifications: false,
        sound: true,
        widgets: false,
        show: false,
        cases: [],
        filter: '',
        form: {
          casename: '',
          size: '',
          sunit: '',
          quantity: '',
          qunit: '',
          technology: [],
          endingday: '',
          takeday: '',
          price: '',
          image: null,
          sell: false,
          category: { big: '', small: '' },
          description: '',
          _id: '',
          index: -1
        },
        categories: {
          平面設計: ['海報/DM', '書籍/手冊', '創作', 'CIS/VIS/ICON', '攝影', '產品/包裝', '插畫/漫畫', '簡報', '織品服裝設計', '其他'],
          網頁設計: ['版型設計', '切版製作', 'EDM設計', 'Banner', '維護/經營', '行銷/SEO', '程式設計/架設', '商品上架', 'UI/UX設計', '其他'],
          室內設計: [
            '室內空間設計',
            '櫥窗陳列展示',
            '房屋/建築設計',
            '展場/舞台設計',
            '店面/商業空間設計',
            '景觀園藝設計',
            '產品設計',
            '水電及其他工程繪圖',
            '3D繪圖/渲染',
            '其他'
          ],
          手作設計: ['紙藝', '皮件', '木質', '棉/麻', '花草植栽', '羊毛', '陶瓷', '編織', '其他']
        },
        rules: [v => !!v || '必填', v => (v && v.length <= 140) || '字數最多140'],
        inputRules1: [value => !!value || '必填', value => (value && value.length <= 10) || '最多 10 個字'],
        menu: false,
        menu2: false
      }
    },
    methods: {
      async submitModal(event) {
        this.dialogSubmitting = true
        event.preventDefault()
        if (!this.form.casename) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '缺少名稱或作品照片'
          })
          return
        }
        const fd = new FormData()
        for (const key in this.form) {
          if (key !== '_id') {
            if (key === 'category') {
              fd.append('category[big]', this.form.category.big)
              fd.append('category[small]', this.form.category.small)
            } else if (key === 'technology') {
              for (const t of this.form.technology) {
                fd.append('technology', t)
              }
            } else {
              fd.append(key, this.form[key])
            }
          }
        }

        try {
          if (!this.form._id) {
            console.log('增加商品')
            console.log(this.owner.token)
            const { data } = await this.api.post('/cases', fd, {
              headers: {
                authorization: 'Bearer ' + this.owner.token
              }
            })
            this.cases.push(data.result)
            console.log(this.cases)
          } else {
            console.log('編輯作品')
            const { data } = await this.api.patch('/cases/' + this.form._id, fd, {
              headers: {
                authorization: 'Bearer ' + this.owner.token
              }
            })
            this.cases[this.form.index] = { ...this.form, image: data.result.image }
          }
          this.$swal({
            icon: 'success',
            title: '完成'
          })
          this.getCases()
        } catch (error) {
          console.log(error)
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: error.response.data.message
          })
        }
      },
      editCase(index) {
        this.form = {
          // ...this.prtfolios[index], index
          casename: this.cases[index].casename,
          size: this.cases[index].size,
          sunit: this.cases[index].sunit,
          quantity: this.cases[index].quantity,
          qunit: this.cases[index].qunit,
          technology: this.cases[index].technology,
          endingday: new Date(this.cases[index].endingday).toLocaleDateString().replace(/\//g, '-'),
          takeday: new Date(this.cases[index].takeday).toLocaleDateString().replace(/\//g, '-'),
          price: this.cases[index].price,
          image: null,
          sell: this.cases[index].sell,
          category: this.cases[index].category,
          description: this.cases[index].description,
          _id: this.cases[index]._id,
          index: -1
        }
        this.dialog = true
      },
      async deleteCase(id) {
        try {
          await this.api.delete('/cases/' + id, {
            headers: {
              authorization: 'Bearer ' + this.owner.token
            }
          })
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '刪除商品成功'
          })
          this.getCases()
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '刪除商品失敗'
          })
        }
      },
      resetForm(event) {
        this.dialog = false
        if (this.dialogSubmitting) {
          event.preventDefault()
          return
        }
        this.form = {
          casename: '',
          size: '',
          sunit: '',
          quantity: '',
          qunit: '',
          technology: [],
          endingday: '',
          takeday: '',
          price: '',
          image: null,
          sell: false,
          category: { big: '', small: '' },
          description: '',
          _id: '',
          index: -1
        }
      },
      // 本人
      async getCases() {
        try {
          const { data } = await this.api.get('/cases/me', {
            headers: {
              authorization: 'Bearer ' + this.owner.token
            }
          })
          this.cases = data.result
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '取得案件失敗'
          })
        }
      },
      // 訪客
      async getCasesOther() {
        try {
          const { data } = await this.api.get('/cases/visitor?owner=' + this.$route.params.id)
          this.cases = data.result
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '取得案件失敗'
          })
        }
      }
    },
    computed: {
      filterItems() {
        return this.cases.filter(item => {
          if (this.filter === '') return true
          return item.category.big === this.filter
        })
      }
    },
    async created() {
      this.me = this.owner._id === this.$route.params.id
      if (this.me) {
        this.getCases()
      } else {
        this.getCasesOther()
      }
    }
  }
</script>
