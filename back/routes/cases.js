import express from 'express'
import content from '../middleware/content.js'
import authO from '../middleware/authO.js'
import uploadC from '../middleware/uploadC.js'
import { create, getCases, updateCaesById, deleteCase, getCaseById } from '../controllers/cases.js'

const router = express.Router()

// 新增案件
router.post('/', authO, content('multipart/form-data'), uploadC, create)
// 一進畫面取得所有案件
router.get('/', authO, getCases)
// 編輯案件內容
router.patch('/:id', authO, content('multipart/form-data'), uploadC, updateCaesById)
// 刪除案件
router.delete('/:id', authO, deleteCase)
// 取得指定案件
router.get('/:id', getCaseById)

export default router
