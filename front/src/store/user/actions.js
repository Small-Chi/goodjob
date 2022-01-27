import { api } from '@/plugins/axios.js'
import swal from 'sweetalert2'
import router from '@/router'

export const userlogin = async ({ commit }, form) => {
  try {
    const { data } = await api.post('/users/userlogin', form)
    commit('userlogin', data.result)
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
