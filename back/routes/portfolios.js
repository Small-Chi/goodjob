import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import uploadP from '../middleware/uploadP.js'
import {
  create,
  getPortfolios,
  getPortfolioById,
  updatePortfolioById,
  deletePortfolio
} from '../controllers/portfolios.js'

const router = express.Router()

router.post('/', auth, content('multipart/form-data'), uploadP, create)
router.get('/', getPortfolios)
router.get('/:id', getPortfolioById)
router.patch('/:id', auth, content('multipart/form-data'), uploadP, updatePortfolioById)
router.delete('/:id', auth, deletePortfolio)

export default router
