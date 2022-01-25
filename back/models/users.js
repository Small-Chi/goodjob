import mongoose from 'mongoose'
import md5 from 'md5'
import validator from 'validator'

const userSchema = new mongoose.Schema({
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
  tokens: {
    type: [String]
  },
  email: {
    type: String,
    required: [true, '信箱為必填'],
    unique: true,
    validate: {
      validator (email) {
        return validator.isEmail(email)
      },
      message: '信箱格式不正確'
    }
  },
  image: {
    type: String
  },
  position: {
    type: String,
    enum: {
      values: ['平面設計師', '攝影師', '室內設計師', '插畫家', '創作者', '藝術家', '其他'],
      message: '請選擇職業類別'
    }
  },
  state: {
    type: String,
    required: [true, '接案狀況為必填']
  },
  technology: {
    type: String,
    enum: {
      values: ['Illustrator', 'Photoshop', 'Indesign', 'PowerPoint', 'Word', 'Figma', 'JS', 'CSS', 'JQ', 'HTML', 'SCSS', 'Vue', 'Node', 'Premiere', 'After Effects', 'Lightroom', 'Final Cut ProX', 'Sketch Up', 'AutoCAD', 'Rhino', 'V-ray', '3D MAX', 'Revit', 'Lumion', '其他'],
      message: '請選擇擅長工具'
    }
  },
  workingday: {
    type: String,
    required: [true, '工作時段為必填']
  },
  prices: {
    type: [
      {
        item: {
          type: String,
          required: [true, '產品項目必填'],
        },
        price: {
          type: String,
          required: [true, '產品報價必填'],
        }
      }
    ]
  },
  description: {
    type: String
  },
  favorite: {
    type: mongoose.ObjectId,
    ref: 'cases',
  },
  purview: {
    // 0 = 正常
    // 1 = 優良
    // -1 = 封鎖
    type: Number,
    default: 0
  }
}, { versionKey: false })

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
