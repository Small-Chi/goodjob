<template>
  <!-- 作品 Card 清單 -->
  <div class="contentleft">
    <div class="row setRow">
      <div class="col-4">
        <div class="cardLine">
          <!-- 新增卡片按鈕 -->
          <v-btn depressed icon class="addcard" height="100" width="100">
            <v-icon size="50" class="addpuls" @click="dialog = true">mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>
      <!-- 要長出卡片的迴圈 -->
      <div class="col-4" v-for="(item, index) in portfolios" :key="index">
        <div>
          <!-- 卡片呈現 -->
          <v-card class="card mx-auto card-item" max-width="350" color="var(--color-lightblue)">
            <v-btn class="cardBtn" min-width="50" min-height="20" style="padding: 0" color="var(--color-red)">
              <v-icon size="18" color="white" class="justify-content-center; Btn1Icon">mdi-heart</v-icon>
              <div class="heartNum">0</div>
            </v-btn>
            <!-- <v-btn class="cardBtn2" min-width="40" min-height="20" style="padding: 0" color="var(--color-blue)">
              <v-icon size="18" color="white" class="justify-content-center; Btn2Icon">mdi-message-outline</v-icon>
            </v-btn> -->
            <v-btn icon class="cardBtn3" max-width="20" max-height="20" style="padding: 0; background-color: var(--color-red)">
              <v-icon size="10" color="white" class="justify-content-center; Btn3Icon" @click="deletePortfolio(item._id)">mdi-close</v-icon>
            </v-btn>
            <v-btn icon class="cardBtn4" min-width="30" style="padding: 0; background-color: var(--color-blue)" @click="editPortfolio(index)">
              <v-icon size="18" color="white" class="justify-content-center; Btn4Icon">mdi-pencil-outline</v-icon>
            </v-btn>
            <v-img :src="item.image" height="200px" style="border-radius: 10px; background-color: var(--color-white)"></v-img>
            <v-card-title class="ctext1 textlightY" style="margin-left: 10px">
              <router-link :to="'/user/portfolioPage/' + item._id">
                <h2 style="color: var(--color-lightY)">{{ item.pname }}</h2>
              </router-link>
              <div class="textWhite sell">
                {{ item.sell ? '公開' : '隱藏' }}
              </div>
            </v-card-title>
            <v-card-subtitle class="textWhite d-flex" style="margin-left: 10px">
              <h3>$</h3>
              <h3 class="textlightY ms-2">{{ item.price }}</h3>
            </v-card-subtitle>
            <div class="hr mx-auto"></div>
            <v-card-actions>
              <v-chip>{{ item.category.big }}</v-chip>
              <v-chip style="color: var(--color-white); background: var(--color-lightblue); border: 1px solid var(--color-white)">
                {{ item.category.small }}
              </v-chip>
              <v-spacer></v-spacer>
              <v-btn icon @click="show = !show" color="var(--color-white)">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-if="show">
                <v-divider></v-divider>
                <v-card-text class="textWhite">
                  {{ item.description }}
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </div>
      </div>
    </div>
    <!-- 新增卡片的表單 -->
    <v-row justify="center">
      <v-dialog
        id="modal-portfolio"
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        :title="form._id.length > 0 ? '編輯商品' : '新增商品'"
      >
        <v-card color="var(--color-deepblue)" class="d-flex justify-center align-center">
          <div class="dialogbody">
            <v-form>
              <v-card-title>
                <span class="text-h5 mx-auto mb-6" style="font-weight: 700; color: var(--color-bule)" v-if="form._id">編輯作品</span>
                <span class="text-h5 mx-auto mb-6" style="font-weight: 700; color: var(--color-bule)" v-else>新增作品</span>
              </v-card-title>
              <v-btn icon style="position: absolute; top: 0px; right: 0" @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="名稱" hint="中文字長度為 1 到 10 個字" :rules="inputRules1" v-model="form.pname"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete v-model="form.category.big" :items="Object.keys(categories)" label="設計類別"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete v-model="form.category.small" :items="categories[form.category.big]" label="項目"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field label="尺寸" v-model="form.size"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete v-model="form.sunit" :items="['mm', 'cm', 'm', '平方公尺', '坪', '其他']" label="單位" multiple></v-autocomplete>
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
                    label="使用工具"
                    multiple
                  ></v-autocomplete>
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
                  <v-textarea
                    fluid
                    solo
                    counter
                    name="input-7-4"
                    :rules="rules"
                    filled
                    v-model="form.description"
                    label="作品介紹 100字 以內"
                    auto-grow
                    class="mt-2"
                  ></v-textarea>
                </div>
              </v-col>
              <v-radio-group row>
                <v-switch v-model="form.sell" :label="`公開`"></v-switch>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn color="blue darken-1" plain @click="resetForm" class="rsBtn textRed">取消</v-btn>
                  <v-btn color="blue darken-1" plain @click="submitModal" v-if="form._id" class="rsBtn2 textYel" :disabled="dialogSubmitting">儲存</v-btn>
                  <v-btn color="blue darken-1" plain type="submit" @click="submitModal" :disabled="dialogSubmitting" v-else class="rsBtn2 textYel">新增</v-btn>
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
        dialogSubmitting: false,
        dialog: false,
        reset: false,
        notifications: false,
        sound: true,
        widgets: false,
        show: false,
        valid: true,
        portfolios: [],
        form: {
          pname: '',
          size: '',
          sunit: '',
          technology: '',
          workingday: '',
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
        rules: [v => !!v || '必填', v => (v && v.length <= 100) || '字數最多100'],
        inputRules1: [value => !!value || '必填', value => (value && value.length <= 10) || '最多 10 個字']
      }
    },
    methods: {
      async submitModal(event) {
        this.dialogSubmitting = true
        event.preventDefault()
        if (!this.form.pname) {
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
            fd.append(key, this.form[key])
          }
        }
        // 大類別裡有小類別的取法
        for (const key in this.form.category) {
          fd.append(`category[${key}]`, this.form.category[key])
        }
        try {
          if (!this.form._id) {
            console.log('增加商品')
            console.log(this.user.token)
            const { data } = await this.api.post('/portfolios', fd, {
              headers: {
                authorization: 'Bearer ' + this.user.token
              }
            })
            this.portfolios.push(data.result)
            console.log(this.portfolios)
          } else {
            console.log('編輯作品')
            const { data } = await this.api.patch('/portfolios/' + this.form._id, fd, {
              headers: {
                authorization: 'Bearer ' + this.user.token
              }
            })
            this.portfolios[this.form.index] = { ...this.form, image: data.result.image }
          }
          this.$swal({
            icon: 'success',
            title: '完成'
          })
          this.getPortfolio()
        } catch (error) {
          console.log(error)
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: error.response.data.message
          })
        }
      },
      editPortfolio(index) {
        this.form = {
          // ...this.prtfolios[index], index
          pname: this.portfolios[index].pname,
          size: this.portfolios[index].size,
          sunit: this.portfolios[index].sunit,
          technology: this.portfolios[index].technology,
          workingday: this.portfolios[index].workingday,
          price: this.portfolios[index].price,
          image: null,
          sell: this.portfolios[index].sell,
          category: { big: this.portfolios[index].big, small: this.portfolios[index].small },
          description: this.portfolios[index].description,
          _id: this.portfolios[index]._id,
          index: -1
        }
        this.dialog = true
      },
      async deletePortfolio(id) {
        try {
          await this.api.delete('/portfolios/' + id, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '刪除商品成功'
          })
          this.getPortfolio()
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
          pname: '',
          size: '',
          sunit: '',
          technology: '',
          workingday: '',
          price: '',
          image: null,
          sell: false,
          category: { big: '', small: '' },
          description: '',
          _id: '',
          index: -1
        }
      },
      async getPortfolio() {
        try {
          const { data } = await this.api.get('/portfolios', {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.portfolios = data.result
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '取得商品失敗'
          })
        }
      }
    },
    async created() {
      try {
        const { data } = await this.api.get('/portfolios', {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.portfolios = data.result
        console.log(this.portfolios)
        console.log(this.portfolios._id)
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '取得商品失敗'
        })
      }
    }
  }
</script>
