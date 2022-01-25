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
    <v-toolbar-title class="ctext1 me-5">接案、發包，不煩惱。</v-toolbar-title>
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
                          <span class="text-h5">User Profile</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  label="Legal first name*"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  label="Legal middle name"
                                  hint="example of helper text only on focus"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  label="Legal last name*"
                                  hint="example of persistent helper text"
                                  persistent-hint
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  label="Email*"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  label="Password*"
                                  type="password"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-select
                                  :items="['0-17', '18-29', '30-54', '54+']"
                                  label="Age*"
                                  required
                                ></v-select>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-autocomplete
                                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                  label="Interests"
                                  multiple
                                ></v-autocomplete>
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*indicates required field</small>
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
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
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
                          發案
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">User Profile</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  label="Legal first name*"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  label="Legal middle name"
                                  hint="example of helper text only on focus"
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-text-field
                                  label="Legal last name*"
                                  hint="example of persistent helper text"
                                  persistent-hint
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  label="Email*"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  label="Password*"
                                  type="password"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-select
                                  :items="['0-17', '18-29', '30-54', '54+']"
                                  label="Age*"
                                  required
                                ></v-select>
                              </v-col>
                              <v-col
                                cols="12"
                                sm="6"
                              >
                                <v-autocomplete
                                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                  label="Interests"
                                  multiple
                                ></v-autocomplete>
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>*indicates required field</small>
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
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </div>
              </v-card-text>
                <v-row justify="center">
                    <v-dialog class="overflowY"
                      v-model="dialog3"
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
                          dark
                          color="primary"
                        >
                          <v-btn
                            icon
                            dark
                            @click="dialog3 = false"
                          >
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                          <v-toolbar-title>Settings</v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-toolbar-items>
                            <v-btn
                              dark
                              text
                              @click="dialog3 = false"
                            >
                              Save
                            </v-btn>
                          </v-toolbar-items>
                        </v-toolbar>
                        <v-list
                          three-line
                          subheader
                        >
                          <v-subheader>User Controls</v-subheader>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>Content filtering</v-list-item-title>
                              <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              <v-list-item-title>Password</v-list-item-title>
                              <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                        <v-divider></v-divider>
                        <v-list
                          three-line
                          subheader
                        >
                          <v-subheader>General</v-subheader>
                          <v-list-item>
                            <v-list-item-action>
                              <v-checkbox v-model="notifications"></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>Notifications</v-list-item-title>
                              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-action>
                              <v-checkbox v-model="sound"></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>Sound</v-list-item-title>
                              <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-action>
                              <v-checkbox v-model="widgets"></v-checkbox>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>Auto-add widgets</v-list-item-title>
                              <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-dialog>
                  </v-row>
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
    notifications: false,
    sound: true,
    widgets: false
  })
}

</script>
