<template>
<v-app id="app">
  <v-app-bar
    absolute
    elevate-on-scroll
    color="var(--color-blue)"
    scroll-target="#scrolling-techniques-7"
    height="121"
    class="textWhite"
    >
    <v-img class="logo1 me-n2 ms-8"
    max-height="76"
    max-width="199"
    src="../images/logo.png"
    ></v-img>
    <div
    class="titile rounded-pill d-flex justify-end align-center ms-n16">
    <v-toolbar-title class="ctext1 me-5">接案、發包，不煩惱。</v-toolbar-title>
    </div>

    <v-spacer></v-spacer>

    <a href="#" class="textWhite ctext1">找專業</a>

    <v-btn icon class="textWhite">
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon class="textWhite">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
</v-app>
</template>
<style>
  .text {
   color: var(--color-white);
  }
</style>
