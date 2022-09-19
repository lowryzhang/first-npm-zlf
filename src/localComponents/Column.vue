<template>
  <div class="ep-concont-item">
    <div class="ep-right-item" v-if="oneStyle == '1'">
      <div>
        <span :class="isMoney?'redColor':'blueColor'">{{value}}</span>
      </div>
      <div>
        <span class="col-hui">{{label}}</span>
      </div>
    </div>
    <div class="ep-right-item-two" v-else-if="oneStyle == '2'">
      <div>
        <span :class="isMoney?'redColor':'blueColor'">{{value}}</span>
      </div>
      <div>
        <span class="col-hui">{{label}}</span>
      </div>
    </div>
    <div class="ep-right-item-three" v-else-if="oneStyle == '3'">
      <div>
        <span class="col-hui">{{label}}</span>
        <span :class="isMoney?'redColor':'blueColor'">{{value}}</span>
      </div>
    </div>
    <div class="ep-right-item-three" v-else-if="oneStyle == '4'">
      <div>
        <span class="col-hui">{{label}}</span>
        <span :class="isMoney?'redColor':'blueColor'">{{value}}</span>
      </div>
    </div>
    <div class="ep-right-item-four" v-else-if="oneStyle == '5'">
      <div>
        <span class="col-hui">{{label}}</span>
        <span :class="isMoney?'redColor':'blueColor'">{{value}}</span>
      </div>
    </div>
  </div>
</template>

<script type="es6">
export default {
  props: {
    oneStyle: {
      type: String,
      default: '1'
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String / Number,
      default: ''
    },
    isMoney: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  watch: {
    value(newValue) {
      this.value = newValue
    },
    deep: true
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.ep-concont-item {
  span {
    // margin-right: 6px;
  }
  .redColor {
    color: #f56c6c;
    font-weight: bold;
    // font-size: 18px;
  }
  .blueColor {
    color: #008af0;
    font-weight: bold;
    // font-size: 18px;
  }
  .ep-right-item {
    color: #606266;
    // display: flex;
    // justify-content: center;
    text-align: center;
    // flex-direction: column;
    // margin-top: 40px;
    margin-top: 18px;
    // flex-wrap: nowrap;

    div {
      // margin: 10px 0;
    }
  }
  .ep-right-item-two {
    text-align: left;
    font-size: 12px;
    div {
      margin-top: 10px;
    }
  }
  .ep-right-item-three {
    text-align: left;

    font-size: 12px;
    div {
      margin-top: 10px;
    }
  }
  .ep-right-item-four {
    text-align: left;
    margin: 16px 0;
  }
}
</style>
