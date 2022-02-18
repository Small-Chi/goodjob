import express from 'express'
import content from '../middleware/content.js'
import authO from '../middleware/authO.js'

import {
  register,
  login,
  logout,
  extend,
  getInfo,
  updateInfo,
  getCases,
  ownerself
  // addCart,
  // getCart,
  // updateCart
} from '../controllers/owners.js'

const router = express.Router()

// 註冊
router.post('/', content('application/json'), register)
// 更改會員資料
router.patch('/info', authO, updateInfo)
// 登入
router.post('/login', content('application/json'), login)
// token舊換新
router.post('/extend', authO, extend)
// 登出
router.delete('/logout', authO, logout)
// 取自己的資料
router.get('/me', authO, getInfo)

// 找專業的頁面 不需要登入就能看見
router.get('/visitor', getCases)

// 訪客
router.get('/:id', ownerself)

export default router
