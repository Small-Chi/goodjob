import md5 from 'md5'
import jwt from 'jsonwebtoken'
import users from '../models/users.js'
// import Users from '../models/Users.js'
// 註冊
export const register = async (req, res) => {
  try {
    await users.create(req.body)
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
    const user = await users.findOne({ account: req.body.account, password: md5(req.body.password) }, '-password')
    if (user) {
      const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET, { expiresIn: '7 days' })
      user.tokens.push(token)
      await user.save()
      const result = user.toObject()
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
    req.user.tokens = req.user.tokens.filter(token => token !== req.token)
    await req.user.save()
    res.status(200).send({ success: true, message: '' })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const extend = async (req, res) => {
  try {
    const idx = req.user.tokens.findIndex(token => token === req.token)
    const token = jwt.sign({ _id: req.user._id.toString() }, process.env.SECRET, { expiresIn: '7 days' })
    req.user.tokens[idx] = token
    req.user.markModified('tokens')
    await req.user.save()
    res.status(200).send({ success: true, message: '', result: { token } })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const getInfo = (req, res) => {
  try {
    const result = req.user.toObject()
    delete result.tokens
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const updateInfo = async (req, res) => {
  const data = {
    username: req.body.username,
    account: req.body.account,
    password: req.body.password,
    email: req.body.email,
    state: req.body.state,
    workingday: req.body.workingday,
    position: req.body.position,
    technology: req.body.technology,
    about: req.body.about,
    prices: req.body.prices
  }
  console.log(data)
  if (req.file) {
    data.image = req.file.path
  }
  console.log('updateInfo')
  try {
    const user = await users.findByIdAndUpdate(req.user.id, data, { new: true, runValidators: true })
    if (user) {
      res.status(200).send({ success: false, message: '', user })
    } else {
      res.status(404).send({ success: false, message: '找不到使用者' })
    }
  } catch (error) {
    console.log('編輯個人資料錯誤')
    if (error.name === 'CastError') {
      res.status(404).send({ success: false, message: '找不到' })
    } else if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      console.log(error)
      res.status(400).send({ sucess: false, message: error.errors[key].name })
    } else {
      res.status(500).send({ sucess: false, message: '伺服器錯誤' })
    }
  }
}

// 在 PortfoliosList 抓取的資料
export const getPortfolios = async (req, res) => {
  try {
    const result = await users.aggregate([
      {
        $lookup: {
          from: 'cases',
          localField: '_id',
          foreignField: 'user',
          as: 'cases'
        }
      },
      {
        $addFields: {
          good: {
            $size: {
              $filter: {
                input: '$cases.assess',
                as: 'assess',
                cond: {
                  $eq: ['$$assess', 1]
                }
              }
            }
          },
          bad: {
            $size: {
              $filter: {
                input: '$cases.assess',
                as: 'assess',
                cond: {
                  $eq: ['$$assess', -1]
                }
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: 'portfolios',
          localField: '_id',
          foreignField: 'user',
          as: 'portfolios'
        }
      },
      {
        $unwind: {
          path: '$portfolios',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'owners',
          localField: 'portfolios._id',
          foreignField: 'favorite',
          as: 'portfolios.favorite'
        }
      },
      {
        $addFields: {
          'portfolios.favorite': {
            $size: '$portfolios.favorite'
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          account: {
            $first: '$account'
          },
          portfolios: {
            $addToSet: '$portfolios'
          },
          good: {
            $first: '$good'
          },
          bad: {
            $first: '$bad'
          },
          username: {
            $first: '$username'
          }
        }
      }
    ])
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {}
}
