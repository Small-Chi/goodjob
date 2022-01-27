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
      result.cart = result.cart.length
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

export const getownerInfo = (req, res) => {
  try {
    const result = req.owner.toObject()
    delete result.tokens
    result.cart = result.cart.length
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const addCart = async (req, res) => {
  try {
    const idx = req.owner.cart.findIndex(item => item.product.toString() === req.body.product)
    if (idx > -1) {
      req.owner.cart[idx].quantity += req.body.quantity
    } else {
      const result = await products.findById(req.body.product)
      if (!result || !result.sell) {
        res.status(404).send({ success: false, message: '商品不存在' })
        return
      }
      req.owner.cart.push(req.body)
    }
    await req.owner.save()
    res.status(200).send({ success: true, message: '', result: req.owner.cart.length })
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到' })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      res.status(400).send({ success: false, message: error.errors[key].message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}

export const getCart = async (req, res) => {
  try {
    const { cart } = await owners.findById(req.owner._id, 'cart').populate('cart.product')
    res.status(200).send({ success: true, message: '', result: cart })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const updateCart = async (req, res) => {
  try {
    if (req.body.quantity === 0) {
      // await owners.findByIdAndUpdate(req.owner._id,
      //   {
      //     $pull: {
      //       cart: { product: req.body.product }
      //     }
      //   }
      // )
      const idx = req.owner.cart.findIndex(item => item.product.toString() === req.body.product)
      if (idx > -1) {
        req.owner.cart.splice(idx, 1)
      }
      await req.owner.save()
      res.status(200).send({ success: true, message: '' })
    } else {
      // await owners.findOneAndUpdate(
      //   { _id: req.owner._id, 'cart.product': req.body.product },
      //   {
      //     $set: {
      //       'cart.$.quantity': req.body.quantity
      //     }
      //   }
      // )
      const idx = req.owner.cart.findIndex(item => item.product.toString() === req.body.product)
      if (idx > -1) {
        req.owner.cart[idx].quantity = req.body.quantity
      }
      await req.owner.save()
      res.status(200).send({ success: true, message: '' })
    }
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
