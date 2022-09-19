<template>
    <el-col :span="Number(colspan)">
        <el-form-item
                :prop="name"
                :label-width="labelWidth + 'px'"
                :label="label"
                :title="label"
                v-if="ishide === true?false:true">
            <el-date-picker
                :picker-options = 'pickerOptions'
                :format="format"
                :type="type"
                :unlink-panels="unlink"
                :disabled="eleDisabled === true?true:false"
                :placeholder="placeholder"
                :start-placeholder="startPlaceholder"
                :end-placeholder="endPlaceholder"
                :value-format="valueFormat"
                :id="'input' + name"
                v-model="chosedata"
                :title="chosedata"
                style="width: 100%;"
                @change="onChange"
                @blur="onBlur"
                @focus="onFocus"
                :name="name"
                :data-value="property.value"
                :data-p="property.p"></el-date-picker>
            </el-form-item>
    </el-col>
</template>

<script type="es6">
// import moment from 'moment'

export default {
  props: {
    ForbiddenTime: {
      type: Array,
      default: function() {
        return []
      }
    },
    eleDisabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Array],
      default: ''
    },
    ishide: {
      type: Boolean,
      default: false
    },
    colspan: {
      type: String,
      default: '24'
    },
    p: {
      type: String,
      default: 'R'
    },
    labelWidth: {
      type: String,
      default: '140'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期'
    },
    type: {
      type: String,
      default: function() {
        return 'date'
      }
    },
    format: {
      type: String,
      default: function() {
        return 'yyyy-MM-dd'
      }
    },
    valueFormat: {
      type: String,
      default: function() {
        return 'yyyyMMdd'
      }
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
    },
    isCodeType: {
      type: Boolean,
      default: false
    },
    limittoday: {
      type: Boolean,
      default: false
    },
    limitmonth: {
      type: Boolean,
      default: false
    },
    limitafter: {
      type: Boolean,
      default: false
    },
    yewuqi: {
      type: Boolean,
      default: false
    },
    unlink: {
      type: Boolean,
      default: false
    },
    starttime: {
      type: String,
      default: ''
    },
    endtime: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chosedata: '',
      pickerOptions: this.date()
    }
  },
  created() {
    this.chosedata = this.value
  },
  computed: {
    codeTypes() {
      return this.$store.getters.codeTypes
    }
  },
  watch: {
    ForbiddenTime: {
      handler(value) {
        this.ForbiddenTime = value
        this.pickerOptions = this.date()
      },
      deep: true
    },
    value(newvalue, oldvalue) {
      this.chosedata = newvalue
    },
    starttime(val) {
      this.pickerOptions = this.date()
    },
    endtime(val) {
      this.pickerOptions = this.date()
    }
  },
  mounted() {

  },
  methods: {
    date() {
      if (this.limittoday) {
        return {
          disabledDate(time) {
            return time.getTime() > Date.now()// 之后的时间不能选
          }
        }
      } else if (this.limitmonth) {
        let This = this
        return {
          disabledDate(time) {
            var now = new Date(This.$currentDate)
            var nowMonth = now.getMonth() + 1
            var nowYear = now.getFullYear()
            var monthStartDate = new Date(nowYear, nowMonth, 1)
            return time.getTime() > monthStartDate - 8.64e7// 之前的时间不能选
          }
        }
      } else if (this.ForbiddenTime.length !== 0) {
        let start = this.ForbiddenTime[0].substring(0, 4) + '-' + this.ForbiddenTime[0].substring(4, 6) + '-' + this.ForbiddenTime[0].substring(6, 8)
        let end = this.ForbiddenTime[1].substring(0, 4) + '-' + this.ForbiddenTime[1].substring(4, 6) + '-' + this.ForbiddenTime[1].substring(6, 8)
        return {
          disabledDate(time) {
            return time <= new Date(start) - 8.64e7 || time >= new Date(end)
          }
        }
      } else if (this.limitafter) {
        return {
          disabledDate(time) {
            return time.getTime() <= Date.now() - 8.64e7// 之前的时间不能选
          }
        }
      } else if (this.yewuqi) {
        let This = this
        return {
          disabledDate(time) {
            var now = new Date(This.$currentDate)
            var nowMonth = now.getMonth() + 2
            var nowYear = now.getFullYear()
            var monthStartDate = new Date(nowYear, nowMonth, 1)
            return time.getTime() > monthStartDate - 8.64e7// 之前的时间不能选
          }
        }
      } else if (this.starttime) {
        let starttime = this.starttime.substring(0, 4) + '-' + this.starttime.substring(4, 6) + '-' + this.starttime.substring(6, 8)
        return {
          disabledDate(time) {
            return time <= new Date(starttime) - 8.64e7
          }
        }
      } else if (this.endtime) {
        let endtime = this.endtime.substring(0, 4) + '-' + this.endtime.substring(4, 6) + '-' + this.endtime.substring(6, 8)
        return {
          disabledDate(time) {
            return time >= new Date(endtime)
          }
        }
      }
    },
    /**
             * 点击事件
             */
    onClick() {

    },
    /**
             * 选择事件
             */
    onChange(val) {
      var value
      val === null ? value = '' : value = val
      this.$emit('timepicker-message', value, this.name)
      this.$emit('calculate-condition-changes', this.inputvalue, this.name, this.indexNum)
    },
    /**
             * 失去焦点
             */
    onBlur() {

    },
    /**
             * 获取焦点
             */
    onFocus(e) {
      // this.utils.setDatePickerPosition(e, 255)
    }
  }
}
</script>
