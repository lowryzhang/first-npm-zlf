<template>
  <div class="datePickerFastPhoto">
    <el-col :span="Number(colspan)">
        <el-form-item
                :prop="name"
                :label-width="labelWidth + 'px'"
                :label="label"
                :title="label"
                v-if="ishide === true?false:true"
                >
                <el-time-picker
                    :disabled="eleDisabled === true?true:false"
                    :name="name"
                    :format='timepickerformat'
                    :value-format='timevalueformat'
                    style="width: calc(100% - 7px);"
                    v-model="selValue"
                    :title='selValue'
                    is-range
                    @change='OnChange'
                    @blur='onBlur'
                    @focus='onFocus'
                    range-separator="-"
                    start-placeholder="开始"
                    end-placeholder="结束"
                    placeholder="选择时间范围">
                </el-time-picker>
        </el-form-item>
    </el-col>
  </div>

</template>

<script type="es6">
// import Dictionaries from '../localJs/Dictionaries.js'
export default {
  props: {
    timepickerformat: {
      type: String,
      default: 'HH:mm:ss'
    },
    timevalueformat: {
      type: String,
      default: 'HH:mm:ss'
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
    ishide: {
      type: Boolean,
      default: false
    },
    eleDisabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      selValue: []
    }
  },
  created() {
    this.selValue = this.value
  },
  computed: {

  },
  watch: {
    value(newvalue, oldvalue) {
      this.selValue = newvalue
    }
  },
  mounted() {

  },
  methods: {
    OnChange(value) {
      console.log(value)
      this.$emit('TimeChange', value, this.name)
      this.$emit('calculate-condition-changes', this.inputvalue, this.name, this.indexNum)
    },
    /**
     * 获取焦点
     */
    onFocus(event) {
      // this.utils.setDatePickerPosition(event, 285)
    },
    /**
     * 失去焦点
     */
    onBlur(event) {
    }
  }
}
</script>

<style lang="less">
.datePickerFastPhoto{
  /deep/.el-date-editor .el-range-separator {
      line-height: 32px;
      width: 7%;
      color: #999;
  }
  /deep/.el-date-editor .el-range__icon{
      line-height: 20px;
  }
  /deep/.el-date-editor .el-range__close-icon{
      line-height: 20px;
  }
}

</style>
