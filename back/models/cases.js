import mongoose from 'mongoose'

const categories = {
  '平面設計': ['海報/DM', '書籍/手冊', '創作', 'CIS/VIS/ICON', '攝影', '產品/包裝', '插畫/漫畫', '簡報', '織品服裝設計', '其他'],
  '網頁設計': ['版型設計', '切版製作', 'EDM設計', 'Banner', '維護/經營', '行銷/SEO', '程式設計/架設', '商品上架', 'UI/UX設計', '其他'],
  '室內設計': ['室內空間設計', '櫥窗陳列展示', '房屋/建築設計', '展場/舞台設計', '店面/商業空間設計', '景觀園藝設計', '產品設計', '水電及其他工程繪圖', '3D繪圖/渲染', '其他'],
  '手作設計': ['紙藝', '皮件', '木質', '棉/麻', '花草植栽', '羊毛', '陶瓷', '編織', '其他']
}

const caseSchema = new mongoose.Schema({
  casename: {
    type: String,
    required: [true, '案件名稱為必填']
  },  
  size: {
    type: String,
    required: [true, '規格尺寸為必填']
  },
  sunit: {
    type: String,
    enum: {
      values: ['mm', 'cm', 'm', '平方公尺', '坪', '其他'],
      message: '單位分類不存在，請選「其他」'
    }
  },
  quantity: {
    type: Number,
    min: [0, '案件數量格式不正確'],
    required: [true, '數量為必填']
  },
  qunit: {
    type: String,
    enum: {
      values: ['個', '張', '件', '頁', '本', '組', '支', '套', '平方公尺', '坪', '其他'],
      message: '單位分類不存在，請選「其他」'
    }
  },
  technology: {
    type: String,
    enum: {
      values: ['Illustrator', 'Photoshop', 'Indesign', 'PowerPoint', 'Word', 'Figma', 'JS', 'CSS', 'JQ', 'HTML', 'SCSS', 'Vue', 'Node', 'Premiere', 'After Effects', 'Lightroom', 'Final Cut ProX', 'Sketch Up', 'AutoCAD', 'Rhino', 'V-ray', '3D MAX', 'Revit', 'Lumion', '其他'],
      message: '請選擇需求工具'
    }
  },
  endingday: {
    type: Date,
    required: [true, '結案日期為必填']
  },
  price: {
    type: Number,
    min: [0, '價格格式不正確'],
    required: [true, '產品預算為必填']
  },
  image: {
    type: String
  },
  takemoney: {
    type: Date,
    required: [true, '入帳時間必填']
  },   
  sell: {
    type: Boolean,
    default: false
  },
  category: {
    type: {
      big: {
        type: String,
        enum: {
          values: Object.keys(categories),
          message: '案件分類不存在'
        }
      }, 
      small: {
        type: [String],
      },
    }
  },   
  // smallcategory: {
  //   type: String,
  //   enum: {
  //     values: ['海報', '書籍', '創作', 'CIS/VIS', '攝影', '包裝', '插畫', '簡報', '其他'],
  //     message: '作品分類不存在，請選「其他」'
  //   }
  // },
  // smallcategoryOne: {
  //   type: String,
  //   enum: {
  //     values: ['海報/DM', '書籍/手冊', '創作', 'CIS/VIS/ICON', '攝影', '產品/包裝', '插畫/漫畫', '簡報', '織品服裝設計', '其他'],
  //     message: '作品分類不存在，請選「其他」'
  //   }
  // },
  // smallcategoryTwo: {
  //   type: String,
  //   enum: {
  //     values: ['版型設計', '切版製作', 'EDM設計', 'Banner', '維護/經營', '行銷/SEO', '程式設計/架設', '商品上架', 'UI/UX設計', '其他'],
  //     message: '作品分類不存在，請選「其他」'
  //   }
  // },
  // smallcategoryThree: {
  //   type: String,
  //   enum: {
  //     values: ['室內空間設計', '櫥窗陳列展示', '房屋/建築設計', '展場/舞台設計', '店面/商業空間設計', '景觀園藝設計', '產品設計', '水電及其他工程繪圖', '3D繪圖/渲染', '其他'],
  //     message: '作品分類不存在，請選「其他」'
  //   }
  // },
  // smallcategoryFour: {
  //   type: String,
  //   enum: {
  //     values: ['紙藝', '皮件', '木質', '棉/麻', '花草植栽', '羊毛', '陶瓷', '編織', '其他'],
  //     message: '作品分類不存在，請選「其他」'
  //   }
  // },
  description: {
    type: String
  },
  progress: {
    // 0 = 無
    // 1 = 收藏中
    // 2 = 進行中
    // 3 = 已結案
    type: Number,
    default: 0
  },
  username: {
    type: mongoose.ObjectId,
    ref: 'users'
  },
  ownername : {
    type: mongoose.ObjectId,
    ref: 'owners'
  },
  assess: {
    // 0 = 無
    // 1 = 好評
    // -1 = 差評
    type: Number,
    default: 0
  },
  // 按鈕其中一人點了以後id會進來這個陣列，判斷 1.裡面有沒有人，有的話就不要重複 push。2.兩個人的 id 都進去就轉成結案狀態。
  deal: {
    type: [mongoose.ObjectId],
    ref: 'users,owners'
  }
}, { versionKey: false })

caseSchema.pre('save', function (next) {
  const data = this
  if (data.isModified('category')) {
    if (!categories[data.category.big].includes(data.category.small)) {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('category', new mongoose.Error.ValidatorError({ message: '作品分類不存在，請選「其他」' }))
      next(error)
      return
    }
  }
  next()
})

caseSchema.pre('findOneAndUpdate', function (next) {
  const data = this._update
  if (data.isModified('category')) {
    if (!categories[data.category.big].includes(data.category.small)) {
      const error = new mongoose.Error.ValidationError(null)
      error.addError('category', new mongoose.Error.ValidatorError({ message: '作品分類不存在，請選「其他」' }))
      next(error)
      return
    }
  }
  next()
})


export default mongoose.model('cases', caseSchema)
