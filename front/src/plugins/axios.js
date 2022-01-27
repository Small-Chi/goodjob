import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import Swal from 'sweetalert2'
// import store from '../store'
// import router from '../router'

export const api = axios.create({
  baseURL: process.env.VUE_APP_API
})

Vue.use(VueAxios, { axios, api })
