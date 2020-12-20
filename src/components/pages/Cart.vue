<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="购物车"></van-nav-bar>
    </div>
    <div class="card-title">
      <van-button size="small" type="danger" @click="clearCart">清空购物车</van-button>
    </div>
    <!-- 显示购物车中的商品 -->
    <div class="cart-list">
      <div class="pang-row" v-for="(item, index) in cartInfo" :key="index">
        <div class="pang-img"><img :src="item.image" width="100%"></div>
        <div class="pang-text">
          <div class="pang-goods-name">{{item.NAME}}</div>
          <div class="pang-control">
            <van-stepper v-model="item.count"></van-stepper>
          </div>
        </div>
        <div class="pang-goods-price">
          <div>¥{{item.Price | moneyFilter}}</div>
          <div>
            x{{item.count}}
          </div>
          <div class="allPrice">
            ¥{{item.Price * item.count | moneyFilter}}
          </div>
        </div>
      </div>
    </div>
    <!-- 显示总金额 -->
    <div class="totalMoney">
      商品总价：¥{{totalMoney | moneyFilter}}
    </div>
  </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  data() {
    return {
      cartInfo: [],   //购物车商品的信息
      notEmpty: false    //判断购物车是否为空
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  created() {
    this.getCartInfo()
  },
  computed: {
    //计算商品总价
    totalMoney() {
      let allMoney = 0
      this.cartInfo.forEach((item, index) => {
        allMoney += item.Price * item.count
      })
      localStorage.cartInfo = JSON.stringify(this.cartInfo)
      return allMoney
    }
  },
  methods: {
    //得到购物车的商品
    getCartInfo() {
      if(localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo)
      }
      this.notEmpty = this.cartInfo.length>0 ? true : false
    },
    //清空购物车
    clearCart() {
      localStorage.removeItem('cartInfo')
      this.cartInfo = []
    }
  }
}
</script>

<style scoped>
.cart-list {
  background-color: #fff;
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.pang-img {
  flex: 6;
}
.pang-text {
  flex: 14;
  padding-left: 10px;
}
.pang-control {
  padding-top: 10px;
}
.pang-goods-price {
  flex: 4;
  text-align: right;
}
.totalMoney {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
</style>