<template>
<div>
  <!-- search bar area -->
  <div class="search-bar">
    <van-row>
      <van-col span="3">
        <img :src="locationIcon" class="location-icon">
      </van-col>
      <van-col span="16">
        <input type="text" class="search-input">
      </van-col>
      <van-col span="5">
        <van-button size="mini" class="search">查找</van-button>
      </van-col>
    </van-row>
  </div>
  <!-- swiper area -->
  <div class="swiper-area">
    <van-swipe :autoplay="1000">
      <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
        <img v-lazy="banner.image" width="100%">
      </van-swipe-item>
    </van-swipe>
  </div>
  <!-- type bar -->
  <div class="type-bar">
    <div v-for="(cate,index) in category" :key="index">
      <img v-lazy="cate.image" width="80%">
      <span>{{cate.mallCategoryName}}</span>
    </div>
  </div>
  <!-- adbanner area -->
  <div>
    <img v-lazy="adBanner" width="100%">
  </div>
  <!-- recommend goods area -->
  <div class="recommend-area">
    <div class="recommend-title">
      商品推荐
    </div>
    <div class="recommend-body">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
          <div class="recommend-item">
            <img :src="item.image" width="80%">
            <div>{{item.goodsName}}</div>
            <div>¥{{item.price | moneyFilter}}(¥{{item.mallPrice | moneyFilter}})</div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
  <!-- floor area -->
  <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
  <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
  <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
  <!-- hot area -->
  <div class="hot-area">
    <div class="hot-title">热卖商品</div>
    <div class="hot-goods">
      <!-- list组件 -->
      <van-list>
        <van-row gutter="20">
          <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
            <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price">哈哈</goods-info>
          </van-col>
        </van-row>
      </van-list>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {
  Swiper,
  SwiperSlide
} from 'vue-awesome-swiper'
import SwiperDefault from '../swiper/swiperDefault'
import 'swiper/swiper-bundle.css'
import floorComponent from '../component/floorComponent'
import goodsInfo from '../component/goodsInfoComponent'
import {
  toMoney
} from '@/filter/moneyFilter.js'
export default {
  data() {
    return {
      locationIcon: require('../../assets/images/location.png'),
      bannerPicArray: [], //轮播图片
      category: [], //商品类别标签栏
      adBanner: '', //广告图片
      recommendGoods: [], //推荐商品
      swiperOption: {
        slidesPerView: 3
      },
      //楼层数据
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      // 热卖商品
      hotGoods: []
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    SwiperDefault,
    floorComponent,
    goodsInfo
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  },
  created() {
    axios({
        url: url.getShoppingMallInfo,
        method: 'get'
      })
      .then(res => {
        if (res.status == 200) {
          this.category = res.data.data.category
          this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS
          this.bannerPicArray = res.data.data.slides
          this.recommendGoods = res.data.data.recommend
          this.floor1 = res.data.data.floor1
          this.floor2 = res.data.data.floor2
          this.floor3 = res.data.data.floor3
          this.floorName = res.data.data.floorName
          this.hotGoods = res.data.data.hotGoods
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.search-bar {
  background-color: #e5017d;
  height: 2.2rem;
  line-height: 2.2rem;
  overflow: hidden;
}

.location-icon {
  width: 1.8rem;
  padding-top: .2rem;
  padding-left: .3rem;
}

.search {
  margin-left: 1rem;
  width: 2.2rem;
}

.search-input {
  width: 100%;
  height: 1.3rem;
  border-width: 0;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}

.swiper-area {
  clear: both;
  max-height: 15rem;
}

.type-bar {
  background-color: #fff;
  margin: 0 .3rem .3rem .3rem;
  border-radius: .3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.type-bar div {
  flex: 1;
  padding-left: .3rem;
  font-size: 12px;
  text-align: center;
}

.recommend-area {
  background-color: #fff;
  margin-top: .3rem;
}

.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: .2rem;
  color: #e5017d;
}

.recommend-body {
  border-bottom: 1px solid #eee;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}

.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}

.hot-goods {
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
</style>
