<template>
  <el-col :span="Number(colspan)">
    <el-form-item
      :prop="name"
      :label-width="labelWidth + 'px'"
      :label="label"
      :title="label"
      v-show="p === 'H'?false:true"
    >
      <div class="ep-ymd" @change="onChange" @blur="onBlur" @focus="onFocus">
        <div :class="{'item-33':type == 'YY-MM-DD','item-50':type == 'YY-MM'}" class="ep-ymd-item">
          <el-input
            clearable
            :disabled="p === 'D'?true:false"
            :id="name + '1'"
            v-model="ymd[0]"
             @input.native="changeValue1(ymd[0])"
            placeholder="请输入年"
            oninput="if(value.length>2)value=value.slice(0,2)"
            onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
            type="number"
          ></el-input>
          <span>年</span>
        </div>
        <div
          :class="{'item-33':type == 'YY-MM-DD','item-50':type == 'YY-MM'}"
          class="ep-ymd-item"
          v-if="type == 'YY-MM' || type == 'YY-MM-DD'"
        >
          <el-input
            clearable
            :disabled="p === 'D'?true:false"
            :id="name + '2'"
            v-model="ymd[1]"
            @input.native="changeValue(ymd[1])"
            placeholder="请输入月"
            onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
            oninput="if(value.length>2)value=value.slice(0,3)"
            type="number"
          ></el-input>
          <span>月</span>
        </div>
        <div
          :class="{'item-33':type == 'YY-MM-DD','item-50':type == 'YY-MM'}"
          class="ep-ymd-item"
          v-if="type == 'YY-MM-DD'"
        >
          <el-input
            clearable
            :disabled="p === 'D'?true:false"
            :id="name + '3'"
            v-model="ymd[2]"
            placeholder="请输入日"
            onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
            onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            oninput="if(value.length>2)value=value.slice(0,3)"
            type="number"
          ></el-input>
          <span>日</span>
        </div>
        <input type="hidden" v-model="property.value">
      </div>
    </el-form-item>
  </el-col>
</template>

<script type="es6">
export default {
  props: {
    value: {
      type: Array,
      default: function() {
        return []
      }
    },
    p: {
      type: String,
      default: 'R'
    },
    type: {
      type: String,
      default: 'YY-MM-DD'
    },
    limit: {
      type: Number,
      default: 81
    },
    colspan: {
      type: String,
      default: '24'
    },
    labelWidth: {
      type: String,
      default: '140'
    },
    label: {
      type: String,
      default: ''
    },
    codetype: {
      type: String,
      default: ''
    },
    property: {
      type: Object,
      default: function() {
        return {
          value: '',
          p: ''
        }
      }
    },
    name: {
      type: String,
      default: ''
    },
    datas: {
      type: Object,
      default: null
    },
    isChange: {
      type: Boolean,
      default: false
    },
    isClick: {
      type: Boolean,
      default: false
    },
    isBlur: {
      type: Boolean,
      default: false
    },
    isFocus: {
      type: Boolean,
      default: false
    },
    isRed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ymd: []
    }
  },
  computed: {
    // id() {
    //     return Math.random();
    // }
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        this.ymd = newValue
        // if (this.ymd[1] >= 12) {
        //   this.ymd = [Math.floor(this.ymd[1] / 12), this.ymd[1] % 12]
        // }
      },
      deep: true
    }
  },
  created() {
    this.ymd = this.value
  },
  mounted() {
    // document.getElementById(this.name + '1').style.color = this.isRed ? 'red' : '';
    // document.getElementById(this.name + '2').style.color = this.isRed ? 'red' : '';
    // document.getElementById(this.name + '3').style.color = this.isRed ? 'red' : '';
  },
  methods: {
    changeValue(value) {
      this.$nextTick(() => {
        if (value > 12) {
          this.ymd = [this.ymd[0], '']
          this.ymd.push()
        }
        if (this.limit) {
          if ((Number(value) + Number(this.ymd[0]) * 12) > 960) {
            this.ymd = ['', '']
            this.ymd.push()
          }
        }
        this.$emit('fillDate', this.ymd, this.name)
      })
    },

    changeValue1(value) {
      if (this.limit) {
        this.$nextTick(() => {
          if (value >= this.limit) {
            this.ymd = ['', this.ymd[1]]
            this.ymd.push()
          }
          if (Number(value) * 12 + Number(this.ymd[1]) > 960) {
            this.ymd = ['', '']
            this.ymd.push()
          }
          this.$emit('fillDate', this.ymd, this.name)
          // if ( ) {
          //   this.ymd = ['', value.slice(0, 2)]
          //   this.ymd.push()
          // }
        })
      }
    },
    // 满12加1(月份)
    changemonth(value) {
      console.log(value)
      if (value >= 12) {
        this.ymd = [Math.floor(value / 12), value % 12]
      }
      this.$emit('fillDate', this.ymd, this.name)
    },
    /**
     * 表单赋值
     */
    getValue(value) {
      let list = []
      value.forEach(item => {
        list.push(item)
      })
      this.property.value = list.join('-')
    },
    /**
     * 点击事件
     */
    onClick() {
      // if (!this.isClick) return
      // let obj = {
      //   path: this.$route.path + '/doQuery/' + this.name,
      //   form: this.form
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj)
    },
    /**
     * 选择事件
     */
    onChange() {
      this.$emit('fillDate', this.ymd, this.name)
      // if (!this.isChange) return;
      // let obj = {
      //     path: this.$route.path + '/doCheck/' + this.name,
      //     params: {
      //         path: this.$route.path,
      //         ...this.datas
      //     },
      //     form: this.form
      // };
      // this.$store.dispatch('SET_COMMONPOST', obj);
    },
    /**
     * 失去焦点
     */
    onBlur() {
      this.$emit('changeDate', this.ymd, this.name)
      // if (!this.isBlur) return;
      // let obj = {
      //     path: this.$route.path + '/blur/' + this.name,
      //     form: this.form
      // };
      // this.$store.dispatch('SET_COMMONPOST', obj);
    },
    /**
     * 获取焦点
     */
    onFocus() {
      // if (!this.isFocus) return
      // let obj = {
      //   path: this.$route.path + '/focus/' + this.name,
      //   form: this.form
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj)
    }
  }
}
</script>

<style lang="less">
.ep-ymd {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden\0;
  .ep-ymd-item {
    /*flex: 0 0 100%;*/
    display: flex;
    float: left\0;
    width: 30%\0;
    .el-input {
      width: 75%\0;
      flex: 0 0 70%;
      float: left\0;
    }
    span {
      width: 25%\0;
      flex: 0 0 30%;
      float: left\0;
      text-align: center;
    }
  }
}
.item-33 {
  flex: 0 0 33% !important;
}
.item-50 {
  flex: 0 0 50% !important;
}
</style>
