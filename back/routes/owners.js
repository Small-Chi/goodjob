import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'

import {
  register,
  login,
  logout,
  extend,
  getownerInfo,
  // addCart,
  // getCart,
  // updateCart
} from '../controllers/owners.js'

const router = express.Router()

router.post('/', register)
router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), login)
router.post('/extend', auth, extend)
router.delete('/logout', auth, logout)
router.get('/me', auth, getownerInfo)
// router.post('/me/cart', auth, addCart)
// router.get('/me/cart', auth, getCart)
// router.patch('/me/cart', auth, updateCart)

export default router
