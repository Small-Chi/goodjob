import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'

import {
  register,
  login,
  logout,
  extend,
  getInfo,
  updateInfo,
  getPortfolios
  // addCart,
  // getCart,
  // updateCart
} from '../controllers/users.js'

const router = express.Router()

// 註冊
router.post('/', content('application/json'), register)
// 更改會員資料
router.patch('/info', auth, updateInfo)
// 登入
router.post('/login', content('application/json'), login)
// token舊換新
router.post('/extend', auth, extend)
// 登出
router.delete('/logout', auth, logout)
// 拿取自己的資料
router.get('/me', auth, getInfo)

// 找專業的頁面使用 不需要登入就能看見
router.get('/visitor', getPortfolios)

export default router
