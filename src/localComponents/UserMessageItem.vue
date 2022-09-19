<template>
  <div class="ep-message-item">
    <p class="col-hui">{{title}}</p>
    <div class="content">
      <h1 :class="isBottom?'is-show':''" v-if="title?title:''" :style="ismoney?mtop:''">
        <span v-show="money">￥</span>
        {{sum}}
      </h1>
      <div :class="isCenter?'slotContent' :''">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script type="es6">
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    sum: {
      type: String / Number,
      default: ''
    },
    money: {
      type: String / Number,
      default: 'true'
    },
    isCenter: {
      type: Boolean,
      default: false
    },
    ismoney: {
      type: Boolean,
      default: false
    },
    isBottom: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      personMessage: {},
      companyMessage: {},
      id: '',
      tableList: [],
      mtop: {
        marginTop: '34px'
      }
    }
  },
  created() {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.col-hui {
  font-weight: 700;
  font-size: 18px;
  padding: 0;
  margin: 0;
  color: #008af0;
}
.ep-message-item {
  border-top: 2px solid #7CD3A8;
  min-width: 300px;
  margin-left: 10px;
  background: #fff;
  padding:0px 15px;
  border-radius: 6px;
  .content {
    // display: flex;
    // justify-content: center;
    // text-align: center;
    // flex-direction: column;
    // // margin-top: 40px;
    // flex-wrap: nowrap;
    width: 100%;
    position: relative;
    // margin-top: 10px;
    height: 100%;
    .slotContent{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  h1 {
    text-align: center;
    font-size: 20px;
    color: #f56c6c;
    margin-top: 10px;
    margin-bottom: 0 !important;
    padding-bottom: 0;
  }
  .is-show {
    border-bottom: 1px solid #efefef;
    display: none;
  }
}
</style>
