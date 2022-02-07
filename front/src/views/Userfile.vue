<template>
  <div class="contentleft">
    <div class="row setRow">
      <div class="col-4">
        <div class="cardLine">
          <v-btn v-bind="attrs" v-on="on" depressed icon class="addcard" height="120" width="120">
            <v-icon size="50" color="var(--color-white)" @click="dialog = true">mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <!-- 新增卡片的表單 -->
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card color="var(--color-deepblue)" class="d-flex justify-center align-center">
        <div class="cardbody">
          <v-form>
            <v-card-title>
              <span class="text-h5 mx-auto">新增作品</span>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text type="submit" @click="dialog = false">
                Send
              </v-btn>
            </v-card-actions>
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
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    }
  }
}
</script>
