<template>
  <v-app id="app">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  async created () {
    this.$store.dispatch('user/usergetInfo')
    this.$store.dispatch('owner/ownergetInfo')
  }
}
</script>
