import mongoose from 'mongoose'
import md5 from 'md5'
import validator from 'validator'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, '名稱為必填']
    },
    account: {
      type: String,
      minlength: [4, '帳號必須 4 個字以上'],
      maxlength: [20, '帳號必須 20 個字以下'],
      unique: true,
      required: [true, '帳號為必填']
    },
    password: {
      type: String,
      required: [true, '密碼為必填']
    },
    role: {
      // 0 = 接案者
      // 1 = 委託人
      // 2 = 管理員
      type: Number,
      default: 0
    },
    tokens: {
      type: [String]
    },
    email: {
      type: String,
      required: [true, '信箱為必填'],
      unique: true,
      validate: {
        validator(email) {
          return validator.isEmail(email)
        },
        message: '信箱格式不正確'
      }
    },
    image: {
      type: String
    },
    position: {
      type: String
    },
    state: {
      type: String
    },
    technology: {
      type: []
    },
    workingday: {
      type: String
    },
    prices: {
      type: [
        {
          item: {
            type: String
          },
          price: {
            type: String
          }
          // index: {
          //   type: Number,
          //   default: 0
          // }
        }
      ]
    },
    about: {
      type: String
    },
    favorite: {
      type: [mongoose.ObjectId],
      ref: 'cases',
      default: []
    },
    purview: {
      // 0 = 正常
      // 1 = 優良
      // -1 = 封鎖
      type: Number,
      default: 0
    }
    // good: {
    //   type: Number,
    //   default: 47
    // },
    // bad: {
    //   type: Number,
    //   default: 16
    // },
    // assess: {
    //   type: Number,
    //   default: 33
    // }
  },
  { versionKey: false }
)

userSchema.pre('save', function (next) {
  const user = this
  if (user.isModified('password')) {
    if (user.password.length >= 4 && user.password.length <= 20) {
      user.password = md5(user.password)
    } else {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

userSchema.pre('findOneAndUpdate', function (next) {
  const user = this._update
  if (user.password) {
    if (user.password.length >= 4 && user.password.length <= 20) {
      user.password = md5(user.password)
    } else {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('password', new mongoose.Error.ValidatorError({ message: '密碼長度錯誤' }))
      next(error)
      return
    }
  }
  next()
})

export default mongoose.model('users', userSchema)
