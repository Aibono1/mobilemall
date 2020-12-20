const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySubSchema = new Schema({
  ID: {unique:true, type:'string'},
  MALL_CATEGORY_ID: String,
  MALL_SUB_NAME: String,
  COMMENTS: String,
  SORT: Number
})

mongoose.model('CategorySub', categorySubSchema, 'CategorySub')