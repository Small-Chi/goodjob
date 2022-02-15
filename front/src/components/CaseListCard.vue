<template>
  <div class="Clistswiper">
    <swiper ref="mySwiper" :options="swiperOptions" style="width: 88%; padding-bottom: 20px">
      <swiper-slide v-for="(item, index) in casedata.cases" :key="index">
        <!-- 卡片呈現 -->
        <v-card class="card mx-auto card-item" max-width="350" min-width="350" color="var(--color-lightblue)">
          <v-btn class="cardBtn" min-width="50" min-height="20" style="padding: 0" color="var(--color-red)">
            <v-icon size="18" color="white" class="justify-content-center; Btn1Icon">mdi-heart</v-icon>
            <div class="heartNum">0</div>
          </v-btn>
          <!-- <v-btn icon class="cardBtn3" max-width="20" max-height="20" style="padding: 0; background-color: var(--color-red)" @click="deleteCase(item._id)">
            <v-icon size="10" color="white" class="justify-content-center; Btn3Icon">mdi-close</v-icon>
          </v-btn> -->
          <!-- <v-btn icon class="cardBtn4" min-width="30" style="padding: 0; background-color: var(--color-blue)" @click="editCase(index)">
            <v-icon size="18" color="white" class="justify-content-center; Btn4Icon">mdi-pencil-outline</v-icon>
          </v-btn> -->
          <!-- <v-img height="200px" style="border-radius: 10px; background-color: var(--color-white)"></v-img> -->
          <dir class="d-flex">
            <div class="col-1 ms-1 me-2">
              <v-avatar size="70" class="me-2 avatarSwipwer">
                <v-img :src="'https://source.boringavatars.com/beam/120/' + casedata.account"></v-img>
              </v-avatar>
            </div>
            <div class="col-10">
              <v-card-title class="ctext1 mb-1" style="margin-left: 10px; padding-top: 5px">
                <h3 class="textWhite ms-n1">{{ `◔` }}</h3>
                <h3 class="textlightY ms-2">{{ new Date(item.endingday).toLocaleDateString().replace(/\//g, '-') }}</h3>
              </v-card-title>
              <v-card-subtitle class="ctext1 d-flex" style="margin-left: 10px">
                <h3 class="textWhite">{{ ` $ ` }}</h3>
                <h3 class="textlightY ms-2">{{ item.price }}</h3>
                <!-- <div class="textWhite sell">
              {{ item.sell ? '公開' : '隱藏' }}
            </div> -->
              </v-card-subtitle>
            </div>
          </dir>
          <v-card-actions style="background: white" class="flex-wrap">
            <v-card-text>
              <div style="height: 215px">
                <h2 class="card-title mt-n2 mb-2">{{ item.casename }}</h2>
                <p style="font-size: 16px">{{ item.description }}</p>
              </div>
              <div class="hr mx-auto"></div>
            </v-card-text>
            <v-chip style="color: var(--color-white); background: var(--color-lightblue)">
              {{ item.category.big }}
            </v-chip>
            <v-chip>
              {{ item.category.small }}
            </v-chip>
            <v-spacer></v-spacer>
            <!-- <v-btn icon @click="show = !show" color="var(--color-white)">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn> -->
          </v-card-actions>
          <!-- <v-expand-transition> -->
          <!-- <div v-if="show">
                <v-divider></v-divider>
                <v-card-text class="textWhite">
                  {{ `5` }}
                </v-card-text>
              </div> -->
          <!-- </v-expand-transition> -->
        </v-card>
      </swiper-slide>

      <!-- <div class="swiper-pagination" slot="pagination" style="margin-top: 50px"></div> -->
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
    </swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import '../../node_modules/swiper/css/swiper.css'
  export default {
    name: 'carrousel',
    props: {
      casedata: {
        type: Object
      }
    },
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          // freeMode: true,
          breakpoints: {
            // 576: {
            //   slidesPerView: 1
            // },
            // 768: {
            //   slidesPerView: 3
            // },
            // 992: {
            //   slidesPerView: 3
            // }
          },
          spaceBetween: 0
          // Some Swiper option/callback...
        }
      }
    },
    components: {
      Swiper,
      SwiperSlide
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mountd() {
      console.log('Current Swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script>
