<template>
  <div id="adminwork">
    <div class="adminswiper">
      <span class="worktitle">首頁輪播作品管理</span>
      <span class="smalltitle">注意上傳圖片規格 1920 x 1080 像素 1MB 以下</span>
      <v-card style="border-radius: 10px; width: 80%">
        <swiper ref="mySwiper" :options="swiperOptions" class="swcontent">
          <swiper-slide v-for="(item, index) in pages" :key="index">
            <img class="sideItem" :src="item.image" />
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </v-card>

      <div class="row">
        <v-card class="adminAdd col-3 mx-5 my-5">
          <v-btn depressed icon class="addBtn" height="60" width="60" @click.stop="dialog = true">
            <v-icon size="35" class="addpuls" @click="dialog = true">mdi-plus</v-icon>
          </v-btn>
        </v-card>
        <div class="card col-3 mx-5 my-5" v-for="(item, index) in pages" :key="index">
          <v-card class="imgcol" style="padding: 0">
            <v-btn icon class="cardBtn3" max-width="20" max-height="20" style="padding: 0; background-color: var(--color-red)" @click="deleteImg(item._id)">
              <v-icon size="10" color="white" class="justify-content-center; Btn3Icon">mdi-close</v-icon>
            </v-btn>
            <v-img :src="item.image" class="imgcontent"></v-img>
          </v-card>
          <span class="item" style="font-weight: 700">{{ item.username }}</span>
          <span class="item">{{ new Date(item.date).toLocaleDateString().replace(/\//g, '／') }}</span>
        </div>
      </div>
    </div>

    <!-- 新增表單 -->
    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-col cols="12 d-flex justify-center">
          <v-card-title class="text-h5">上傳圖片</v-card-title>
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
        <v-col cols="12 d-flex justify-center mt-5 mb-n5">
          <v-col cols="12 d-flex justify-center" sm="5">
            <v-icon class="me-2">mdi-account-outline</v-icon>
            <v-text-field label="作者名稱" v-model="form.username"></v-text-field>
          </v-col>
        </v-col>
        <v-col cols="12 d-flex justify-center">
          <v-col cols="12 d-flex justify-center" sm="5">
            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="358px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field label="上傳日期" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" reactive v-model="form.date"></v-text-field>
              </template>
              <v-date-picker no-title scrollable style="width: 358px" v-model="form.date">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">取消</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(form.date)">確定</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-col>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="primary" @click="resetForm">取消</v-btn>

          <v-btn text color="primary" @click="submitModal" :disabled="dialogSubmitting">上傳</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogSubmitting: false,
        dialog: false,
        pages: [],
        menu: false,
        form: {
          image: null,
          date: '',
          username: ''
        },
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true
          },
          loop: true,
          autoplay: {
            delay: 6000,
            disableOninteraction: false
          }
        }
      }
    },
    methods: {
      async submitModal(event) {
        this.dialogSubmitting = true
        event.preventDefault()
        if (!this.form.date) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '缺少圖片或上傳日期'
          })
          this.dialogSubmitting = false
          return
        }
        const fd = new FormData()
        for (const key in this.form) {
          if (key !== '_id') {
            fd.append(key, this.form[key])
          }
        }

        try {
          const { data } = await this.api.post('/pages', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.pages.push(data.result)
          console.log(this.pages)
          this.dialog = false
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '新增輪播圖片成功'
          })
          this.getNewimage()
          this.resetForm()
        } catch (error) {
          console.log(error)
          this.$swal({
            icon: 'error',
            title: '失敗',
            text: '新增輪播圖圖片失敗'
          })
        }
      },
      async deleteImg(id) {
        try {
          await this.api.delete('/pages/' + id, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.$swal({
            icon: 'success',
            title: '成功',
            text: '刪除圖片成功'
          })
          this.getNewimage()
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '刪除失敗'
          })
        }
      },
      async getNewimage() {
        try {
          const { data } = await this.api.get('/pages')
          this.pages = data.result
        } catch (error) {
          this.$swal({
            icon: 'error',
            title: '錯誤',
            text: '取得圖片失敗'
          })
        }
      },
      resetForm() {
        this.dialog = false
        this.dialogSubmitting = false
        this.form = {
          image: null,
          date: '',
          username: ''
        }
      }
    },
    created() {
      this.getNewimage()
    }
  }
</script>
