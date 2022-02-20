import md5 from 'md5'
import jwt from 'jsonwebtoken'
import owners from '../models/owners.js'
import portfolios from '../models/portfolios.js'
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
    const owner = await owners.findOne({ account: req.body.account, password: md5(req.body.password) }, '-password')
    if (owner) {
      const token = jwt.sign({ _id: owner._id.toString() }, process.env.SECRET, { expiresIn: '7 days' })
      owner.tokens.push(token)
      await owner.save()
      const result = owner.toObject()
      delete result.tokens
      result.token = token
      result.favorite = result.favorite.length
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
    result.favorite = result.favorite.length
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const ownerself = async (req, res) => {
  try {
    const result = await owners.findById(req.params.id, '-password -tokens')
    delete result.tokens
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const updateInfo = async (req, res) => {
  const data = {
    ownername: req.body.ownername,
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
    const owner = await owners.findByIdAndUpdate(req.owner.id, data, { new: true, runValidators: true })
    if (owner) {
      res.status(200).send({ success: false, message: '', owner })
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

export const getCases = async (req, res) => {
  try {
    const result = await owners.aggregate([
      {
        $lookup: {
          from: 'portfolios',
          localField: '_id',
          foreignField: 'owner',
          as: 'portfolios'
        }
      },
      {
        $addFields: {
          good: {
            $size: {
              $filter: {
                input: '$portfolios.assess',
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
                input: '$portfolios.assess',
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
          from: 'cases',
          localField: '_id',
          foreignField: 'owner',
          as: 'cases'
        }
      },
      {
        $unwind: {
          path: '$cases',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'owners',
          localField: 'cases._id',
          foreignField: 'favorite',
          as: 'cases.favorite'
        }
      },
      {
        $match: {
          'cases.sell': true
        }
      },
      {
        $addFields: {
          'cases.favorite': {
            $size: '$cases.favorite'
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          account: {
            $first: '$account'
          },
          cases: {
            $addToSet: '$cases'
          },
          good: {
            $first: '$good'
          },
          bad: {
            $first: '$bad'
          },
          ownername: {
            $first: '$ownername'
          }
        }
      }
    ])
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {}
}

export const addFavorite = async (req, res) => {
  try {
    const idx = req.owner.favorite.findIndex(item => item.toString() === req.body.portfolio)
    if (idx === -1) {
      const result = await portfolios.findById(req.body.portfolio)
      if (!result || !result.sell) {
        res.status(404).send({ success: false, message: '作品不存在' })
        return
      }
      req.owner.favorite.push(req.body.portfolio)
    }
    await req.owner.save()
    res.status(200).send({ success: true, message: '', result: req.owner.favorite.length })
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

// 收藏
// export const addFavorite = async (req, res) => {
//   try {
//     // 檢查是不是已經喜歡
//     // 儲存此人按收藏的所有作品id
//     const owner = await owners.findById(req.owner.id, 'favorite')
//     // 儲存了這個作品所有按讚人id
//     const portfolio = await portfolios.findById(req.body._id, 'ownerf')
//     // 判斷此人按收藏的陣列裡是否已包含這個作品的id
//     const data = owner.favorite
//       .map(f => f.portfolios)
//       .toString()
//       .includes(req.body._id)
//     // 如果owner favorite陣列裡已經有這個作品 id 就移除
//     if (data === true) {
//       await owners.findByIdAndUpdate(req.owner.id, {
//         // 刪除陣列元素
//         $pull: {
//           // 欄位名稱
//           favorite: {
//             // 刪除條件
//             portfolios: req.body._id
//           }
//         }
//       })
//       await portfolios.findByIdAndUpdate(req.body._id, {
//         $pull: {
//           ownerf: {
//             owners: req.owner.id
//           }
//         }
//       })
//       res.status(200).send({ success: true, message: '取消收藏' })
//     } else {
//       // 尚未收藏 就將作品 push 到owner favorite
//       owner.favorite.push({ portfolios: req.body._id })
//       portfolio.owners.push({ owners: req.owner.id })
//       owner.save({ validateBeforeSave: false })
//       portfolio.save({ validateBeforeSave: false })
//       res.status(200).send({ success: true, message: '加入收藏' })
//     }
//   } catch (error) {
//     console.log(error)
//     if (error.name === 'ValidationError') {
//       const key = Object.keys(error.errors)[0]
//       const message = error.errors[key].message
//       res.status(400).send({ success: false, message: message })
//     } else {
//       res.status(500).send({ success: false, message: '伺服器錯誤' })
//     }
//   }
// }

export const getFavorite = async (req, res) => {
  try {
    const { favorite } = await owners.findById(req.owner._id, 'favorite').populate('favorite.portfolios')
    res.status(200).send({ success: true, message: '', result: favorite })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
