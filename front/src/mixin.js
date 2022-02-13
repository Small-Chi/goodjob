export default {
  computed: {
    user() {
      return this.$store.getters['user/user']
    },
    owner() {
      return this.$store.getters['owner/owner']
    }
  }
}
