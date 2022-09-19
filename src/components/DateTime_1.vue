<template>
  <el-col :span="Number(colspan)">
        <el-form-item
                :prop="name"
                :label-width="labelWidth + 'px'"
                :label="label"
                :title="label"
                v-show="property.p.indexOf('H') === -1">
            <el-date-picker
                    :title="date"
                    :picker-options="pickerOptions"
                    :disabled="eleDisabled || false"
                    :unlink-panels='unlink'
                    :format="format"
                    :value-format="valueFormat"
                    v-model="date"
                    :type="type"
                    :id="'date' + name"
                    align="right"
                    :start-placeholder="startPlaceholder"
                    :end-placeholder="endPlaceholder"
                    @change="onChange" @blur="onBlur"
                    @focus="onFocus">
            </el-date-picker>
        </el-form-item>
    </el-col>

</template>

<script type="es6">
// import moment from 'moment'
export default {
  props: {
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期'
    },
    eleDisabled: {
      type: Boolean,
      default: false
    },
    unlink: {
      type: Boolean,
      default: true // 客户大部分要求dateTime组件选择时，希望固定
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
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'daterange'
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
        return 'yyyy-MM-dd'
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
    indexNum: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    pickerOptions: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      date: []
    }
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        this.date = this.value
      },
      deep: true
    }
  },
  created() {
    this.date = this.value
  },
  mounted() {
    const $target = document.getElementById('date' + this.name)
    if ($target) {
      document.getElementById('date' + this.name).style.color = this.isRed ? 'red' : ''
    }
  },
  methods: {
    /**
             * 点击事件
             */
    onClick() {
      // if (!this.isClick) return
      // let obj = {
      //   path: this.$route.path + '/doQuery/' + this.name,
      //   params: {
      //     path: this.$route.path,
      //     ...this.datas
      //   }
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj)
    },
    /**
             * 选择事件
             */
    onChange(val) {
      this.$emit('timepicker-message', val, this.name, this.indexNum)
      this.$emit('calculate-condition-changes', this.inputvalue, this.name, this.indexNum)
      // if (val == null) {
      //     val = [];
      //     this.$emit('timepicker-message',val,this.name);
      // }
      // this.date = [];
      // let list = [];
      // val.forEach(item => {
      //     this.date.push(item);
      //     list.push(moment(item).format('YYYYMMDD'));
      // });
      // this.property.value = list.join(',');
      // if (!this.isChange) return;
      // let obj = {
      //     path: this.$route.path + '/doCheck/' + this.name,
      //     params: {
      //         path: this.$route.path,
      //         ...this.datas
      //     }
      // };
      // this.$store.dispatch('SET_COMMONPOST', obj);
    },
    /**
             * 失去焦点
             */
    onBlur() {
      // this.$emit('timepicker-message', this.date, this.name, this.indexNum)
      // if (!this.isBlur) return;
      // let obj = {
      //     path: this.$route.path + '/blur/' + this.name,
      //     params: {
      //         path: this.$route.path,
      //         ...this.datas
      //     }
      // };
      // this.$store.dispatch('SET_COMMONPOST', obj);
    },
    /**
             * 获取焦点
             */
    onFocus() {
      // if (!this.isFocus) return;
      // let obj = {
      //     path: this.$route.path + '/focus/' + this.name,
      //     params: {
      //         path: this.$route.path,
      //         ...this.datas
      //     }
      // };
      // this.$store.dispatch('SET_COMMONPOST', obj);
    }
  }
}
</script>


<style lang="less" scoped>
// .dateTimeFastPhoto{
  /deep/ .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
      width: 100%;
  }

  /deep/ .el-date-editor .el-range__icon {
      line-height: 1;
  }
  /deep/ .el-range-editor.el-input__inner {
    width:100%
  }
  /deep/ .el-date-editor .el-range-separator {
      line-height: 20px;
  }

  /deep/ .el-date-editor .el-range__close-icon {
      line-height: 20px;
  }

  /deep/ .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
      width: 100%;
  }

  /deep/ .el-range-input {
      font-size: 12px;
  }
// }

</style>
