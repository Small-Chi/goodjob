<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="listswiper">
    <swiper-slide class="Swipercard">
      <div>
        <!-- 卡片呈現 -->
        <v-card class="card mx-auto card-item" max-width="350" color="var(--color-lightblue)">
          <v-img
            src="https://miro.medium.com/max/1200/1*bsukUGpEQQQLwXqewNDRfw.jpeg"
            height="200px"
            style="border-radius: 10px; background-color: var(--color-white)"
          ></v-img>
          <v-card-title class="ctext1 textlightY" style="margin-left: 10px">
            <h2></h2>
            <div class="textWhite sell"></div>
          </v-card-title>
          <v-card-subtitle class="textWhite d-flex" style="margin-left: 10px">
            <h3>$</h3>
            <h3 class="textlightY ms-2"></h3>
          </v-card-subtitle>
          <div class="hr mx-auto"></div>
          <v-card-actions>
            <v-chip></v-chip>
            <v-chip style="color: var(--color-white); background: var(--color-lightblue); border: 1px solid var(--color-white)"></v-chip>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </div>
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import '../../node_modules/swiper/css/swiper.css'
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          loop: true,
          autoplay: {
            delay: 8000,
            disableOnInteraction: false
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            576: {
              slidesPerView: 1
            },
            768: {
              slidesPerView: 3
            },
            992: {
              slidesPerView: 3
            }
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
