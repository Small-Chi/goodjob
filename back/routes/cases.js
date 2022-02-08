import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import uploadC from '../middleware/uploadC.js'
import {
  create,
  getCaess,
  getCaesById
} from '../controllers/portfolios.js'

const router = express.Router()

router.post('/', auth, content('multipart/form-data'), uploadC, create)
router.get('/', getCaess)
router.get('/:id', getCaesById)

export default router
