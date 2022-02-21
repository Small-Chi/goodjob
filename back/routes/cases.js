import express from 'express'
import content from '../middleware/content.js'
import authO from '../middleware/authO.js'
import uploadC from '../middleware/uploadC.js'
import {
  create,
  getCases,
  updateCaesById,
  deleteCase,
  getCaseById,
  getCasesOther,
  workingCase,
  NoworkCase,
  endCase
} from '../controllers/cases.js'

const router = express.Router()

// 新增案件
router.post('/', authO, content('multipart/form-data'), uploadC, create)
// 本人
router.get('/me', authO, getCases)
// 訪客
router.get('/visitor', getCasesOther)

// 取得指定案件
router.get('/:id', getCaseById)
// 編輯案件內容
router.patch('/:id', authO, content('multipart/form-data'), uploadC, updateCaesById)
// 刪除案件
router.delete('/:id', authO, deleteCase)
// 編輯案件內容
router.patch('/progress/:id', workingCase)
router.patch('/Nprogress/:id', NoworkCase)
router.patch('/Eprogress/:id', endCase)

export default router
