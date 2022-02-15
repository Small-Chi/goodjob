import cases from '../models/cases.js'

export const create = async (req, res) => {
  try {
    const result = await cases.create({ ...req.body, image: req.file.path, owner: req.owner._id })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getCases = async (req, res) => {
  try {
    const result = await cases.find({ owner: req.owner._id })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getCaseById = async (req, res) => {
  try {
    const result = await cases.findById(req.params.id)
    if (result) {
      res.status(200).send({ success: true, message: '', result })
    } else {
      console.log(error)
      res.status(404).send({ success: false, message: '找不到' })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      console.log(error)
      res.status(404).send({ success: false, message: '找不到' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const updateCaesById = async (req, res) => {
  console.log(req.body)
  const data = {
    casename: req.body.casename,
    size: req.body.size,
    sunit: req.body.sunit,
    quantity: req.body.quantity,
    qunit: req.body.qunit,
    technology: req.body.technology,
    endingday: req.body.endingday,
    takeday: req.body.takeday,
    price: req.body.price,
    sell: req.body.sell,
    category: req.body.category,
    description: req.body.description
  }
  console.log(data)
  if (req.file) {
    data.image = req.file.path
  }
  try {
    const result = await cases.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true })
    console.log(result)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'CastError') {
      console.log(error)
      res.status(404).send({ success: false, message: '找不到' })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const deleteCase = async (req, res) => {
  console.log('刪除項目')
  try {
    await cases.findByIdAndDelete(req.params.id)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    console.log('刪除失敗錯誤')
    if (error.name === 'CastError') {
      console.log(error)
      res.status(404).send({ success: false, message: '找不到項目' })
    } else {
      console.log(error)
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
