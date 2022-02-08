import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import uploadP from '../middleware/uploadP.js'
import {
  create,
  getPortfolios,
  getPortfolioById
} from '../controllers/portfolios.js'

const router = express.Router()

router.post('/', auth, content('multipart/form-data'), uploadP, create)
router.get('/', getPortfolios)
router.get('/:id', getPortfolioById)

export default router
