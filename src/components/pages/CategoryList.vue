<template>
<div>
  <div class="navbar-div">
    <van-nav-bar title="类别列表"></van-nav-bar>
  </div>
  <div>
    <van-row>
      <van-col span="6">
        <div id="leftNav">
          <ul>
            <li v-for="(item, index) in category" :key="index" @click="clickCategory(index, item.ID)" :class="{categoryActive: categoryIndex == index}">
              {{item.MALL_CATEGORY_NAME}}
            </li>
          </ul>
        </div>
      </van-col>
      <van-col span="18">
        <div class="tabCategorySub">
          <van-tabs v-model="active" @click="onClickCategorySub">
            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
          </van-tabs>
        </div>
        <div id="list-div">
          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" @load="onLoad">
              <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item, index) in goodList" :key="index">
                <div class="list-item-img">
                  <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
                </div>
                <div class="list-item-text">
                  <div>{{item.NAME}}</div>
                  <div class="">¥ {{item.ORI_PRICE | moneyFilter}}</div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-col>
    </van-row>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {
  Toast
} from 'vant'
import { toMoney } from '@/filter/moneyFilter.js'
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [], //小类类别
      active: 0, //激活标签的值
      list: [],
      loading: false, //上拉加载
      finished: false, // 上拉加载是否有数据
      isRefresh: false, // 下拉刷新
      page: 1, //商品列表的页数
      goodList: [], //商品信息
      categorySubId: '', //商品子分类ID
      errorImg: 'this.src ="' + require('@/assets/images/errorimg.png') + '"' //错误图片显示路径
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  created() {
    this.getCategory()
  },
  mounted() {
    // 让左侧当行适应页面高度
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
    document.getElementById('list-div').style.height = winHeight - 90 - 50 + 'px'
  },
  methods: {
    getCategory() {
      axios({
          url: url.getCategoryList,
          method: 'get'
        })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.category = res.data.message
            this.getCategorySubByCategoryId(this.category[0].ID) //通过数组索引取得默认的第一个分类的ID值
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
    },
    //根据大类id获取小类
    getCategorySubByCategoryId(categoryId) {
      axios({
          url: url.getCategorySubList,
          method: 'post',
          data: {
            categoryId: categoryId
          }
        })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.categorySub = res.data.message
            this.active = 0
            this.categorySubId = this.categorySub[0].ID
            this.onLoad()
          } else {
            Toast('服务器错误，数据取得失败')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击大类的方法
    clickCategory(index, categoryId) {
      this.categoryIndex = index
      this.page = 1
      this.finished = false
      this.goodList = []
      this.getCategorySubByCategoryId(categoryId)
    },
    // 获取商品列表
    getGoodList() {
      axios({
          url: url.getGoodsListByCategorySubId,
          method: 'post',
          data: {
            categorySubId: this.categorySubId,
            page: this.page
          }
        })
        .then(res => {
          if (res.data.code == 200 && res.data.message.length) {
            this.page++
            this.goodList = this.goodList.concat(res.data.message)
          } else {
            this.finished = true
          }
          this.loading = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击子类获取商品信息
    onClickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID
      this.goodList = []
      this.finished = false
      this.page = 1
      this.onLoad()
    },
    //上拉加载方法
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
        this.getGoodList()
      }, 1000)
    },
    //下拉刷新方法
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false
        // 清空列表数据
        this.finished = false
        this.goodList = []
        this.page = 1
        this.onLoad()
      }, 500)
    },
    //跳转到商品详情页
    goGoodsInfo(id) {
      this.$router.push({name:'Goods', params:{goodsId: id}})
    }
  }
}
</script>

<style>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}

.categoryActive {
  background-color: #fff;
}

.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  padding: 5px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}

#list-div {
  overflow: scroll;
}

.list-item-img {
  flex: 8;
}

.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}

</style>
