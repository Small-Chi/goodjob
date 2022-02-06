import express from 'express'
import content from '../middleware/content.js'
import authO from '../middleware/authO.js'

import {
  register,
  login,
  logout,
  extend,
  getInfo,
  // addCart,
  // getCart,
  // updateCart
} from '../controllers/owners.js'

const router = express.Router()

router.post('/', register)
router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), login)
router.post('/extend', authO, extend)
router.delete('/logout', authO, logout)
router.get('/me', authO, getInfo)
// router.post('/me/cart', auth, addCart)
// router.get('/me/cart', auth, getCart)
// router.patch('/me/cart', auth, updateCart)

export default router
