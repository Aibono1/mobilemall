// const BASEURL = "https://www.easy-mock.com/mock/5fbdcb1f1bc0682deacbfd12/mobilemall/"
const BASEURL = "https://www.fastmock.site/mock/57f3dd5a4978d0b97093cc0e2fb65dac/mobileshop/"
const LOCALURL = "http://localhost:3000/"
const URL = {
  getShoppingMallInfo: BASEURL + "index",
  getGoodsInfo: BASEURL + "getGoodsInfo",
  registerUser: LOCALURL + 'user/register',    //用户注册接口
  login: LOCALURL + 'user/login',    //用户登陆接口
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',   //获取商品详情
  getCategoryList: LOCALURL + 'goods/getCategoryList',    //商品大类信息
  getCategorySubList: LOCALURL + 'goods/getCategorySubList',   //商品小类
  getGoodsListByCategorySubId: LOCALURL + 'goods/getGoodsListByCategorySubId'   //小类商品信息
}

module.exports = URL