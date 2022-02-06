<template>
  <v-carousel hide-delimiters height="100%" cycle="ture" interval="4000" show-arrows-on-hover="ture">
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          src: 'https://raw.githubusercontent.com/Small-Chi/goodjob/master/front/src/assets/images/LINE_ALBUM_%E5%AE%A4%E5%85%A7%E4%BD%9C%E5%93%81_220206.jpg'
        },
        {
          src: 'https://raw.githubusercontent.com/Small-Chi/goodjob/master/front/src/assets/images/LINE_ALBUM_%E5%AE%A4%E5%85%A7%E4%BD%9C%E5%93%81_220206_1.jpg'
        },
        {
          src: 'https://raw.githubusercontent.com/Small-Chi/goodjob/master/front/src/assets/images/LINE_ALBUM_%E5%AE%A4%E5%85%A7%E4%BD%9C%E5%93%81.jpg'
        },
        {
          src: ''
        }
      ]
    }
  }
}
</script>
