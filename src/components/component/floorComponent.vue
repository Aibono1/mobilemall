<template>
<div>
  <!-- floor one area -->
  <div class="floor">
    <div class="floor-title">
      {{floorTitle}}
    </div>
    <div class="floor-anomaly">
      <div class="floor-one"><img :src="floorData0.image" width="100%"></div>
      <div>
        <div class="floor-two"><img :src="floorData1.image" width="100%"></div>
        <div class="floor-three"><img :src="floorData2.image" width="100%"></div>
      </div>
    </div>
  </div>
  <!-- floor rule -->
  <div class="floor-rule">
    <div v-for="(item, index) in floorData.slice(3)" :key="index">
      <img :src="item.image" width="100%">
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['floorData', 'floorTitle'],
  data() {
    return {
      floorData0: {},
      floorData1: {},
      floorData2: {}
    }
  },
  watch: {
    floorData: function (val) {
      this.floorData0 = this.floorData[0]
      this.floorData1 = this.floorData[1]
      this.floorData2 = this.floorData[2]
    }
  }
}
</script>

<style scoped>
.floor-title {
  height: 1.8rem;
  line-height: 1.8rem;
  font-size: 14px;
  text-align: center;
}

.floor-anomaly {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.floor-anomaly div {
  width: 50%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.floor-one {
  border-right: 1px solid #ddd;
}

.floor-anomaly div.floor-two {
  width: 100%;
  border-bottom: 1px solid #ddd;
}

.floor-anomaly div.floor-three {
  width: 100%;
}

.floor-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
}

.floor-rule div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 50%;
  border-bottom: 1px solid #ddd;
}

.floor-rule div:nth-child(odd) {
  border-right: 1px solid #ddd;
}
</style>
