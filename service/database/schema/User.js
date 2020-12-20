const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// 创建用户Schema
const userSchema = new Schema({
  userId: ObjectId,
  userName: {unique: true, type: String},
  password: String,
  createAt: {type: Date, default: Date.now()},
  lastLoginAt: {type: Date, default: Date.now()}
})

userSchema.pre('save', function(next){
  // bcrypt加密
  bcrypt.genSalt(SALT_WORK_FACTOR, (err,salt) => {
    if(err) {
      return next(err)
    }
    bcrypt.hash(this.password, salt, (err,hash) => {
      if (err) {
        return next(err)
      }
      this.password = hash
      next()
    })
  })
})

userSchema.methods = {
  // 密码比对的方法
  comparePassword: (_password, password)=>{
    return new Promise((resolve, reject)=>{
      // 参数：客户端密码，数据库密码
      bcrypt.compare(_password, password, (err,isMatch)=>{
        if(!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

// 设置数字模型
mongoose.model("User", userSchema, "User")