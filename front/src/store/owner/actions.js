import { api } from '@/plugins/axios.js'
import swal from 'sweetalert2'
import router from '@/router'

export const ownerlogin = async ({ commit }, form) => {
  try {
    const { data } = await api.post('/owners/login', form)
    commit('login', data.result)
    router.push('/')
    swal.fire({
      icon: 'success',
      title: '成功',
      text: '登入成功'
    })
  } catch (error) {
    swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.response.data.message
    })
  }
}

export const ownerlogout = async ({ commit, state }) => {
  try {
    await api.delete('/owners/logout', {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    commit('logout')
    router.push('/')
    swal.fire({
      icon: 'success',
      title: '成功',
      text: '登出成功'
    })
  } catch (error) {
    swal.fire({
      icon: 'error',
      title: '失敗',
      text: error.response.data.message
    })
  }
}

export const ownergetInfo = async ({ commit, state }) => {
  if (state.token.length === 0) return
  try {
    const { data } = await api.get('/owners/me', {
      headers: {
        authorization: 'Bearer ' + state.token
      }
    })
    commit('getInfo', data.result)
  } catch (error) {
    commit('logout')
  }
}
