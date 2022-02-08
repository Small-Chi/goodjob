<template>
  <div class="contentleft">
    <div class="row setRow">
      <div class="col-4">
        <div>
          <v-card class="card mx-auto card-item" max-width="350" color="var(--color-lightblue)">
            <v-btn class="cardBtn"><v-icon>mdi-plus</v-icon></v-btn>
            <v-img src="https://picsum.photos/300/200/?random=10"
              height="200px">
            </v-img>
            <v-card-title class="ctext1 textWhite">
              Top western road trips
            </v-card-title>
            <v-card-subtitle class="textWhite">
              $ 1000 ~ 2000
            </v-card-subtitle>
            <hr style="color:var(--color-white); width:80%;" class="mx-auto">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show" color="var(--color-white)">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>
                <v-card-text class="textWhite">
                  I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </div>
      </div>
      <div class="col-4">
        <div class="cardLine">
          <v-btn depressed icon class="addcard" height="100" width="100">
            <v-icon size="50" color="var(--color-white)" @click="dialog = true">mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <!-- 新增卡片的表單 -->
    <v-row justify="center">
    <v-dialog id="modal-card"
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      :title="form._id.length > 0 ? '編輯商品' : '新增商品'"
      centered
      ok-variant='success'
      ok-title='送出'
      cancel-variant='danger'
      cancel-title='取消'
      @ok="submitModal"
      @hidden="resetForm"
      :ok-disabled="dialogSubmitting"
      :cancel-disabled="dialogSubmitting"
      >
      <v-card color="var(--color-deepblue)" class="d-flex justify-center align-center">
        <div class="cardbody">
          <v-form>
            <v-card-title>
              <span class="text-h5 mx-auto mb-6" style="font-weight:700;color:var(--color-blue);">新增作品</span>
            </v-card-title>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="名稱" hint="中文字長度為 1 到 10 個字" :state='state.pname'
                    v-model="form.pname"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete v-model="form.category.big"
                    :items="Object.keys(categories)"
                    label="設計類別"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete v-model="form.category.small"
                    :items="categories[form.category.big]"
                    label="項目"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="尺寸" v-model="form.size"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete v-model="form.sunit"
                    :items="['mm', 'cm', 'm', '平方公尺', '坪', '其他']"
                    label="單位" multiple></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete v-model="form.technology"
                    :items="['Illustrator', 'Photoshop', 'Indesign', 'PowerPoint', 'Word', 'Figma', 'JS', 'CSS', 'JQ', 'HTML', 'SCSS', 'Vue', 'Node', 'Premiere', 'After Effects', 'Lightroom', 'Final Cut ProX', 'Sketch Up', 'AutoCAD', 'Rhino', 'V-ray', '3D MAX', 'Revit', 'Lumion', '其他']"
                    label="使用工具" multiple></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="完成天數" v-model="form.workingday"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="估計價格" prefix="$" v-model="form.price"></v-text-field>
                </v-col>
                <v-col cols="12 d-flex justify-center">
                  <img-inputer
                    accept="image/*"
                    v-model="form.image"
                    size="large"
                    bottomText="點擊或拖曳檔案至此"
                    hoverText="點擊或拖曳檔案至此"
                    placeholder="點擊或拖曳檔案至此"
                    ></img-inputer>
                </v-col>
              </v-row>
              <v-col cols="12">
                <div>
                  <v-textarea fluid solo counter :rules="rules" name="input-7-4" filled v-model="form.about" label="作品介紹 100字 以內" auto-grow class="mt-2"></v-textarea>
                </div>
              </v-col>
              <v-radio-group v-model="row" row>
                <v-switch
                  v-model="form.sell"
                  :label="`是否公開 ${form.sell.toString()}`"
                ></v-switch>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                  Close
                  </v-btn>
                    <v-btn color="blue darken-1" text type="submit" @click="dialog = false">
                      Send
                  </v-btn>
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
  data () {
    return {
      dialogSubmitting: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      show: false,
      form: {
        pname: '',
        size: '',
        sunit: '',
        technology: '',
        workingday: '',
        price: null,
        image: null,
        sell: false,
        category: { big: '', small: '' },
        description: '',
        _id: ''
      },
      categories: {
        平面設計: ['海報/DM', '書籍/手冊', '創作', 'CIS/VIS/ICON', '攝影', '產品/包裝', '插畫/漫畫', '簡報', '織品服裝設計', '其他'],
        網頁設計: ['版型設計', '切版製作', 'EDM設計', 'Banner', '維護/經營', '行銷/SEO', '程式設計/架設', '商品上架', 'UI/UX設計', '其他'],
        室內設計: ['室內空間設計', '櫥窗陳列展示', '房屋/建築設計', '展場/舞台設計', '店面/商業空間設計', '景觀園藝設計', '產品設計', '水電及其他工程繪圖', '3D繪圖/渲染', '其他'],
        手作設計: ['紙藝', '皮件', '木質', '棉/麻', '花草植栽', '羊毛', '陶瓷', '編織', '其他']
      },
      rules: [
        v => v.length <= 100 || '字數最多100'
      ]
    }
  },
  methods: {
    async submitModal (event) {
      event.preventDefault()
      if (!this.state.pname) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '缺少必填欄位'
        })
        return
      }
      this.dialogSubmitting = true

      const fd = new FormData()
      for (const key in this.form) {
        if (key !== '_id') {
          fd.append(key, this.form[key])
        }
      }

      try {
        if (this.form._id.length === 0) {
          const { data } = await this.api.post('/portfolios', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.portfolios.push(data.result)
        } else {
          const { data } = await this.api.patch('/portfolios/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.portfolios[this.form.index] = { ...this.form, image: data.result.image }
          this.$refs.table.refresh()
        }

        this.$bvModal.hide('modal-portfolio')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }

      this.dialogSubmitting = false
    },
    resetForm (event) {
      if (this.dialogSubmitting) {
        event.preventDefault()
        return
      }
      this.form = {
        pname: '',
        size: '',
        sunit: '',
        technology: '',
        workingday: '',
        price: null,
        image: null,
        sell: false,
        category: { big: '', small: '' },
        description: '',
        _id: ''
      }
    },
    editportfolio (index) {
      this.form = { ...this.portfolios[index], image: null, index }
      this.$bvModal.show('modal-portfolio')
    }
  },
  computed: {
    state () {
      return {
        pname: this.form.pname.length === 0 ? null : true
      }
    }
  }
}
</script>
