<template>
  <div class="Clistswiper">
    <swiper ref="mySwiper" :options="swiperOptions" style="width: 88%; padding-bottom: 20px">
      <swiper-slide v-for="(casedata, index) in casedata.cases" :key="index">
        <!-- 卡片呈現 -->
        <v-card class="card mx-auto card-casedata" max-width="350" min-width="350" color="var(--color-lightblue)">
          <v-btn class="cardBtn" min-width="50" min-height="20" style="padding: 0" color="var(--color-red)">
            <v-icon size="18" color="white" class="justify-content-center; Btn1Icon">mdi-heart</v-icon>
            <div class="heartNum">0</div>
          </v-btn>
          <div class="col-10">
            <v-card-title class="ctext1 mb-1" style="margin-left: 10px; padding-top: 5px">
              <h3 class="textWhite ms-n1">{{ `◔` }}</h3>
              <h3 class="textlightY ms-2">{{ new Date(casedata.endingday).toLocaleDateString().replace(/\//g, '-') }}</h3>
            </v-card-title>
            <v-card-subtitle class="ctext1 d-flex" style="margin-left: 10px">
              <h3 class="textWhite">{{ ` $ ` }}</h3>
              <h3 class="textlightY ms-2">{{ casedata.price }}</h3>
              <!-- <div class="textWhite sell">
              {{ casedata.sell ? '公開' : '隱藏' }}
            </div> -->
            </v-card-subtitle>
          </div>

          <v-card-actions style="background: white" class="flex-wrap">
            <v-card-text>
              <router-link :to="`/owner/${casedata.owner}/casePage/` + casedata._id">
                <div style="height: 215px">
                  <h2 style="color: var(--color-deepblue)" class="card-title mt-n2 mb-2">{{ casedata.casename }}</h2>
                  <p style="font-size: 16px; color: var(--color-deepblue)">{{ casedata.description }}</p>
                </div>
              </router-link>
              <div class="hr mx-auto"></div>
            </v-card-text>
            <v-chip style="color: var(--color-white); background: var(--color-lightblue)">
              {{ casedata.category.big }}
            </v-chip>
            <v-chip>
              {{ casedata.category.small }}
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
    <div class="ms-1 me-2 catdBottom">
      <router-link :to="`/owner/${casedata.owner}/ownerself/`">
        <v-avatar size="90" class="me-5 caseava">
          <v-img :src="'https://source.boringavatars.com/beam/120/' + casedata.account"></v-img>
        </v-avatar>
      </router-link>
      <div class="nametext">
        <h3 class="mb-3 pb-2" style="border-bottom: 1px solid var(--color-lightY)">{{ casedata.ownername }}</h3>
        <div class="goodIcon">
          <h4 class="mb-2 me-3">
            <v-icon class="ms-2 me-1" color="var(--color-white)">mdi-charity</v-icon>
            <span>156</span>
          </h4>
          <h4 class="mb-2 me-3">
            <v-icon class="ms-2 me-1" color="var(--color-white)">mdi-thumb-up</v-icon>
            <span>156</span>
          </h4>
          <h4 class="mb-2 me-3">
            <v-icon class="ms-2 me-1" color="var(--color-white)">mdi-thumb-down</v-icon>
            <span>156</span>
          </h4>
        </div>
      </div>
    </div>
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
          loop: false,
          autoplay: {
            delay: 5000,
            disableOnInteraction: true
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
