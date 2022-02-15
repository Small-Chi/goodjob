<template>
  <div>
    <div class="name">
      <v-avatar size="90" class="me-2 avatarSwipwer">
        <v-img :src="'https://source.boringavatars.com/beam/120/' + case.account"></v-img>
      </v-avatar>
      <div class="nametext">
        <h3>{{ case.username }}</h3>
      </div>
    </div>
    <div class="col-4">
      <div>
        <!-- 卡片呈現 -->
        <v-card class="card mx-auto card-item" max-width="350" min-width="350" color="var(--color-lightblue)">
          <v-btn class="cardBtn" min-width="50" min-height="20" style="padding: 0" color="var(--color-red)">
            <v-icon size="18" color="white" class="justify-content-center; Btn1Icon">mdi-heart</v-icon>
            <div class="heartNum">0</div>
          </v-btn>
          <!-- <v-btn class="cardBtn2" min-width="40" min-height="20" style="padding: 0" color="var(--color-blue)">
              <v-icon size="18" color="white" class="justify-content-center; Btn2Icon">mdi-message-outline</v-icon>
            </v-btn> -->
          <v-btn icon class="cardBtn3" max-width="20" max-height="20" style="padding: 0; background-color: var(--color-red)" @click="deleteCase(item._id)">
            <v-icon size="10" color="white" class="justify-content-center; Btn3Icon">mdi-close</v-icon>
          </v-btn>
          <v-btn icon class="cardBtn4" min-width="30" style="padding: 0; background-color: var(--color-blue)" @click="editCase(index)">
            <v-icon size="18" color="white" class="justify-content-center; Btn4Icon">mdi-pencil-outline</v-icon>
          </v-btn>
          <!-- <v-img height="200px" style="border-radius: 10px; background-color: var(--color-white)"></v-img> -->
          <v-card-title class="ctext1 mb-2" style="margin-left: 10px">
            <h3 class="textWhite ms-n1">{{ `◔` }}</h3>
            <h3 class="textlightY ms-2">{{ new Date(item.endingday).toLocaleDateString().replace(/\//g, '-') }}</h3>
          </v-card-title>
          <v-card-subtitle class="ctext1 d-flex" style="margin-left: 10px">
            <h3 class="textWhite">{{ ` $ ` }}</h3>
            <h3 class="textlightY ms-2">{{ item.price }}</h3>
            <div class="textWhite sell">
              {{ item.sell ? '公開' : '隱藏' }}
            </div>
          </v-card-subtitle>
          <v-card-actions style="background: white" class="flex-wrap">
            <v-card-text class="col-12 mt-n1">
              <div class="text" style="height: 190px; background: white">
                <h2 class="card-title mb-1">{{ item.casename }}</h2>
                {{ item.description }}
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
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      case: {
        type: Object
      }
    }
  }
</script>
