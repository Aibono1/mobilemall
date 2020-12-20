const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
const Router = require('koa-router')
let user = require('./appApi/user')
let goods = require('./appApi/goods')
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())
app.use(cors())

// 引入connect
const { connect, initSchemas } = require('./database/init.js')

// 立即执行函数
;(async() => {
  await connect()
  initSchemas()
})()

let router = new Router()
router.use('/user', user.routes())
router.use('/goods', goods.routes())

app.use(router.routes()).use(router.allowedMethods())

app.use(async(ctx)=>{
  ctx.set("Access-Control-Allow-Origin", "http://localhost:8080")
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
})

app.listen(3000,()=>{
  console.log('[Server] starting at port 3000....')
})