<template>
<div>
  <div class="goods-info">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="100%">
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">¥{{goodsPrice | moneyFilter}}</div>
  </div>
  </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  props:['goodsImage','goodsName','goodsPrice'],
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  }
}
</script>

<style scoped>
.goods-info div:first-child {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #ddd;
}
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>