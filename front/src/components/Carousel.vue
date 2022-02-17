<template>
  <v-carousel hide-delimiters height="100%" cycle interval="4000">
    <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src"></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            src: 'https://raw.githubusercontent.com/Small-Chi/goodjob/master/front/src/assets/images/LINE_ALBUM_%E5%AE%A4%E5%85%A7%E4%BD%9C%E5%93%81_220206_1.jpg'
          },
          {
            src: 'https://raw.githubusercontent.com/Small-Chi/goodjob/master/front/src/assets/images/img002.jpg'
          },
          {
            src: 'https://raw.githubusercontent.com/Small-Chi/goodjob/master/front/src/assets/images/S__73769057.jpeg'
          },
          {
            src: 'https://raw.githubusercontent.com/Small-Chi/goodjob/master/front/src/assets/images/%E5%B0%81%E9%9D%A2%E8%A8%AD%E8%A8%88.jpg'
          }
        ]
      }
    }
  }
</script>
