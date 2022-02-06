import md5 from 'md5'
import jwt from 'jsonwebtoken'
import owners from '../models/owners.js'
// import products from '../models/products.js'
// 註冊
export const register = async (req, res) => {
  try {
    await owners.create(req.body)
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).send({ success: false, message: '帳號已存在' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const login = async (req, res) => {
  try {
    const owner = await owners.findOne(
      { account: req.body.account, password: md5(req.body.password) },
      '-password'
    )
    if (owner) {
      const token = jwt.sign({ _id: owner._id.toString() }, process.env.SECRET, { expiresIn: '7 days' })
      owner.tokens.push(token)
      await owner.save()
      const result = owner.toObject()
      delete result.tokens
      result.token = token
      res.status(200).send({ success: true, message: '', result })
    } else {
      res.status(404).send({ success: false, message: '帳號或密碼錯誤' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const logout = async (req, res) => {
  try {
    req.owner.tokens = req.owner.tokens.filter(token => token !== req.token)
    await req.owner.save()
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const extend = async (req, res) => {
  try {
    const idx = req.owner.tokens.findIndex(token => token === req.token)
    const token = jwt.sign({ _id: req.owner._id.toString() }, process.env.SECRET, { expiresIn: '7 days' })
    req.owner.tokens[idx] = token
    req.owner.markModified('tokens')
    await req.owner.save()
    res.status(200).send({ success: true, message: '', result: { token } })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getInfo = (req, res) => {
  try {
    const result = req.owner.toObject()
    delete result.tokens
    result.cart = result.cart.length
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
