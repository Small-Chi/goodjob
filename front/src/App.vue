<template>
<v-app id="app">
  <v-app-bar
    absolute
    elevate-on-scroll
    color="var(--color-blue)"
    scroll-target="#scrolling-techniques-7"
    height="80"
    class="textWhite"
    style="border-bottom: 1px solid var(--color-white);   "
    >
    <!-- logo -->
    <v-img class="logo1 me-n2 ms-8"
    max-height="76"
    max-width="160"
    src="../images/logo.png"
    s
    ></v-img>
    <div
    class="solgon rounded-pill d-flex justify-end align-center ms-n16">
    <v-toolbar-title class="ctext1 me-10">接案 ､ 發包 , 真好用</v-toolbar-title>
    </div>
    <v-spacer></v-spacer>
    <!-- 導覽連結 -->
    <div class="navA d-flex align-center"><a href="#" class="textWhite ctext1 px-5">找專業</a></div>
    <div class="navA d-flex align-center"><a href="#" class="textWhite ctext1 px-5">找案子</a></div>
    <div class="navA d-flex align-center"><a href="#" class="textWhite ctext1 px-5">知識加值庫</a></div>

    <!-- 登入 -->
    <div class="ms-6">
        <v-dialog
          max-width="600"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="rgba(0,0,0,0)"
              v-bind="attrs"
              v-on="on"
              height="50"
              width="120"
              class="textWhite login me-8"
              plain
            ><v-icon class="me-2">mdi-login-variant</v-icon>登入</v-btn>
          </template>
          <template v-slot:default="dialog">
            <v-card color="var(--color-white)">
              <v-card-text>
                <div class="text-h2 pa-12">
                  <v-row justify="space-around">
                    <v-dialog
                      v-model="dialog2"
                      persistent
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          class="textWhite btn1 ctext1"
                          width="150"
                          height="150"
                          plain
                        >
                          接案
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5 py-5">接案會員 , 請登入</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" class="px-16">
                                <v-text-field
                                  label="Account*"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" class="px-16">
                                <v-text-field
                                  label="Password*"
                                  type="password"
                                  required
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog2 = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog2 = false"
                          >
                            Login
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-dialog
                      v-model="dialog3"
                      persistent
                      max-width="600px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          class="textWhite btn1 ctext1"
                          width="150"
                          height="150"
                          plain
                        >
                          發案
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5 py-5">發案會員 , 請登入</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" class="px-16">
                                <v-text-field
                                  label="Account*"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" class="px-16">
                                <v-text-field
                                  label="Password*"
                                  type="password"
                                  required
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog3 = false"
                          >
                            Close
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog3 = false"
                          >
                            Login
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </div>
              </v-card-text>
              <div class="d-flex justify-center">
                    <v-dialog
                      v-model="dialog4"
                      fullscreen
                      hide-overlay
                      transition="dialog-bottom-transition"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="var(--color-white)"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          class="btn2 textBlue"
                          style="font-weight: 700;"
                          plain
                        >
                          註冊
                        </v-btn>
                      </template>
                      <v-card>
                        <v-toolbar
                          color="var(--color-blue)"
                          style="color: var(--color-white);"
                        >
                          <v-btn
                            icon
                            color="var(--color-white)"
                            @click="dialog4 = false"
                          >
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                          <v-toolbar-title>加入 goodjob !</v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-toolbar-items>
                            <v-btn class="savebtn"
                              color="var(--color-white)"
                            >
                              Join Us
                            </v-btn>
                          </v-toolbar-items>
                        </v-toolbar>
                        <v-list class="list">
                        <v-card-title>
                          <span class="text-h5">請填寫詳細資料</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12">
                                  <v-text-field
                                    label="Name*"
                                    required
                                    hint="名稱"
                                    height="50"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="6"
                                >
                                  <v-text-field
                                    label="Account"
                                    hint="帳號"
                                    required
                                    height="50"
                                  ></v-text-field>
                                </v-col>
                                 <v-col
                                  cols="12"
                                  sm="6"
                                >
                                  <v-text-field
                                    label="Password*"
                                    type="password"
                                    required
                                    hint="密碼"
                                    height="50"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="6"
                                >
                                  <v-text-field
                                    label="Email*"
                                    hint="信箱"
                                    required
                                    height="50"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="6"
                                >
                                  <v-text-field
                                    label="State"
                                    hint="接案狀況 ex：全職"
                                    required
                                    height="50"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="6"
                                >
                                  <v-text-field
                                    label="Workingday*"
                                    hint="工作時段 ex：週一 ~ 週五 8:00am ~ 18:00pm"
                                    required
                                    height="50"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  cols="12"
                                  sm="6"
                                >
                                  <v-select
                                    :items="['平面設計師', '攝影師', '室內設計師', '插畫家', '創作者', '藝術家', '其他']"
                                    label="Position*"
                                    required
                                    height="50"
                                  ></v-select>
                                </v-col>
                                 <v-col cols="12">
                                  <v-autocomplete
                                    :items="['Illustrator', 'Photoshop', 'Indesign', 'PowerPoint', 'Word', 'Figma', 'JS', 'CSS', 'JQ', 'HTML', 'SCSS', 'Vue', 'Node', 'Premiere', 'After Effects', 'Lightroom', 'Final Cut ProX', 'Sketch Up', 'AutoCAD', 'Rhino', 'V-ray', '3D MAX', 'Revit', 'Lumion', '其他']"
                                    label="Technology"
                                    multiple
                                    height="50"
                                  ></v-autocomplete>
                                </v-col>
                                <v-col cols="12">
                                <div>
                                  <v-text-field
                                  label="About me"
                                  height="50"
                                  >
                                  </v-text-field>
                                </div>
                              </v-col>
                              </v-row>
                            </v-container>
                            <small>*還缺報價表</small>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="dialog4 = false"
                            >
                              Close
                            </v-btn>
                            <v-btn
                              color="blue darken-1"
                              text
                              @click="dialog4 = false"
                            >
                              Send
                            </v-btn>
                          </v-card-actions>
                        </v-list>
                      </v-card>
                    </v-dialog>
                  </div>
                <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialog.value = false"
                >Close</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
    </div>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
</v-app>
</template>

<script>
export default {
  data: () => ({
    dialog2: false,
    dialog3: false,
    dialog4: false,
    notifications: false,
    sound: true,
    widgets: false
  })
}

</script>
