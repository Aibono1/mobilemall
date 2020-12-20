const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()
router.get('/', async(ctx)=>{
  ctx.body = "这是用户操作首页"
})

/* 注册的实践 */
router.post('/register', async(ctx)=>{
  // 取得Model
  const User = mongoose.model('User')
  // 把从前端接收的POST数据封装成一个新的user对象
  let newUser = new User(ctx.request.body)
  // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
  await newUser.save().then(()=>{
    //注册成功
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(err => {
    //注册失败
    ctx.body = {
      code: 500,
      message: err
    }
  })
})

/* 登陆的实践 */
router.post('/login',async(ctx)=>{
  // 得到前端传递过来的数据
  let loginUser = ctx.request.body
  let userName = loginUser.userName
  let password = loginUser.password
  // 引入User的model
  const User = mongoose.model('User')
  // 查找用户名是否存在，如果存在则开始比对密码
  await User.findOne({userName: userName}).exec()
  .then(async(result) => {
    if(result) {
      // 当用户名存在时，开始比对密码
      let newUser = new User()    //因为是实例方法，所以要new出对象，才能调用
      await newUser.comparePassword(password, result.password)
      .then((isMatch)=>{
        // 返回比对结果
        ctx.body = {code: 200, message: isMatch}
      })
      .catch(err => {
        // 出现异常，返回异常
        ctx.body = {code: 500, message: err}
      })
    }else {
      ctx.body = {code: 500, message: '用户名不存在'}
    }
  })  
  .catch(err => {
    ctx.body = {code: 500, message: err}
  })
})

module.exports = router