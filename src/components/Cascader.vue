<template>
<div class="CascaderFastPhoto">
  <el-col :span="Number(colspan)">
        <el-form-item
                :prop="name"
                :label-width="labelWidth + 'px'"
                :label="label"
                :title="label"
                v-show="property.p.indexOf('H') === -1">
            <el-cascader
                    :disabled="eleDisabled === true?true:false"
                    :options="options"
                    :props="oneCheck"
                    filterable
                    clearable
                    :change-on-select="changeOnSelect"
                    :id="'input' + name"
                    expand-trigger="hover"
                    :placeholder = 'placeholder'
                    v-model="selectValue"
                    @active-item-change="activeChange"
                    style="width: 100%;"
                    @visible-change="visibleChange"
                    @change="handleChange">
            </el-cascader>
            <input type="hidden" v-model="property.value"/>
        </el-form-item>
    </el-col>
</div>

</template>

<script type="es6">
export default {
  props: {
    oneCheck: {
      type: Object,
      default: function() {
        return {
          checkStrictly: false
        }
      }
    },
    eleDisabled: {
      type: Boolean,
      default: false
    },
    changeOnSelect: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: function() {
        return []
      }
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    colspan: {
      type: String,
      default: '24'
    },
    labelWidth: {
      type: String,
      default: '120'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    p: {
      type: String,
      default: ''
    },
    type: String,
    maxlength: Number,
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
    codetype: {
      type: String,
      default: ''
    },
    isChange: {
      type: Boolean,
      default: false
    },
    noTreeText: {
      type: Boolean,
      default: false
    },
    isClick: {
      type: Boolean,
      default: false
    }
  },
  computed: {

  },
  data() {
    return {
      optionsindata: [],
      list: [],
      selectValue: []
    }
  },
  created() {
    this.selectValue = this.value
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        this.selectValue = newValue
      },
      deep: true
    }
  },
  methods: {
    /**
             * 改变绑定值
             */
    changeValue(value) {
      if (value && value.length > 0) {
        this.selectValue = value.split(',')
        window.setTimeout(() => {
          this.getList(this.selectValue, this.options)
        }, 1000)
      }
    },

    /**
             * 点击末级值变化回调
             */
    handleChange(value) {
      this.$emit('cascader-message', value, this.name)
      // this.selectValue = value;
      // this.property.value = value.join(',') || '';
    },
    /**
             * 点击加载下一级
             */
    activeChange(value) {
      this.getList(value, this.options)
    },
    /**
             * 显示options列表
             */
    visibleChange(value) {
      // 点击下拉后赋值，避免进入页面渲染数据量过大
      // if (value & this.optionsindata.length === 0) {
      //   this.optionsindata = this.options
      // }
    },
    /**
             * 获取列表数据
             */
    getList(currentId, array) {
      // console.log(currentId)
      let key = currentId[0]
      array.map((item, index) => {
        if (item.id === key) {
          if (item.children && item.children.length > 0) {
            let id = currentId.filter((el, i) => i !== 0)
            this.getList(id, item.children)
          } else {
            let params = {
              id: item.id
            }
            if (!this.noTreeText) {
              this.$api.commonGet('function/treeText?codetype=' + this.codetype, params).then(res => {
                if (res.status === '0') {
                  if (res.message !== null) {
                    this.$message.success(res.message)
                  }
                  item.children = res.data || []
                } else if (res.status === '1' && res.message !== null) {
                  this.$message.warning(res.message)
                } else if (res.status === '9' && res.message !== null) {
                  this.$message.error(res.message)
                }
              })
            }
          }
        }
      })
    },
    /**
             * 点击事件
             */
    onClick() {
      // if (!this.isClick) return
      // let obj = {
      //   path: this.$route.path + '/doQuery/' + this.name,
      //   params: {
      //     ...this.datas
      //   }
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj)
    },
    /**
             * 选择事件
             */
    onChange() {
      // if (!this.isChange) return
      // let obj = {
      //   path: this.$route.path + '/doCheck/' + this.name,
      //   params: {
      //     ...this.datas
      //   }
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj)
    }
  }
}
</script>

<style lang="less">
.CascaderFastPhoto{
    .el-icon-search {
      color: #000;
      cursor: pointer;
  }
}

</style>
