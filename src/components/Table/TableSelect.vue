<template>
  <el-select
    :disabled="isdisabled"
    @change="onChange"
    @visible-change="selectData"
    :name="name"
    clearable
    v-model="selValue"
    style="position: relative;"
    filterable
    :placeholder="placeholder"
  >
    <el-option
      v-for="item in selectoptions"
      :key="item.key"
      :title="item.key + ' - ' + item.value"
      :label="item.key + ' - ' + item.value"
      :disabled="(selectAble == '3' && item.key == '1') || (selectAble == '2' && item.key == '1') || (selectAble == '1' && item.key == '2') || (selectAble=='01' && item.key =='05') || (selectAble=='02' && item.key =='03') || (selectAble=='02' && item.key =='04') || (selectAble == '')?true:false"
      :value="item.key"
    >
      <span style="float: left">{{ item.key }} - {{ item.value }}</span>
    </el-option>
  </el-select>
</template>

<script type="es6">
import Dictionaries from '@/localJs/Dictionaries.js'
export default {
  props: {
    isdisabled: {
      type: Boolean,
      default: false
    },
    selectAble: {
      type: String,
      default: '00000'
    },
    ishide: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    eleDisabled: {
      type: Boolean,
      default: false
    },
    p: {
      type: String,
      default: 'R'
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
    codetype: {
      type: String,
      default: ''
    },
    property: {
      type: String,
      default: ''
    },
    datas: {
      type: Object,
      default: null
    },
    name: {
      type: String,
      default: ''
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
    isPage: {
      type: Boolean,
      default: false
    },
    isPageFilter: {
      type: Boolean,
      default: false
    },
    SelectFilterData: {
      type: String,
      default: ''
    },
    pageData: {
      type: String,
      default: 'formData'
    },
    api: {
      type: String,
      default: ''
    },
    isRed: {
      type: Boolean,
      default: false
    },
    isCodeType: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    selectClick: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectoptions: [],
      show: false,
      text: '',
      selectList: [],
      selValue: '',
      time: null,
      a: '',
      id: ''
    }
  },
  created() {
    console.log(this.value)
    this.selValue = this.value
    this.selectoptions = Dictionaries[this.name] // 查询对应加载项 selectoptions
  },
  computed: {},
  watch: {
    value(newvalue, oldvalue) {
      console.log(newvalue)
      this.selValue = newvalue
    }
  },
  mounted() {},
  methods: {
    selectData() {},
    onChange(val) {
      this.selValue = val
      this.$emit('select-message', val, this.name)
    }
  }
}
</script>

<style lang="less" scoped>
.input-focus {
  border: 1px solid #4ca2fb;
}

.active {
  color: #3bb2ff;
  font-weight: 700;
  background-color: #e1f9ff;
}

.ac {
  background-color: #e1f9ff;
  color: #3bb2ff;
  font-weight: 700;
}

.ep-select .ep-scrollbar li:hover {
  background-color: #e1f9ff;
  color: #3bb2ff;
}

.ep-input-search {
  width: 100%;
  /deep/ .el-input__inner {
    border: 0 !important;
  }
}

.ep-select {
  /deep/ .el-input__inner {
    border: 0;
    height: inherit;
  }
  .el-input__suffix-inner {
    .el-icon-error {
      display: none;
    }
  }
  &:hover /deep/ .el-input__suffix-inner {
    .el-icon-error {
      display: block;
      font-size: 14px;
    }
  }
}

.ep-select .ep-scrollbar .el-pagination {
  border-top: 0;
  padding-top: 0;
}

.ep-pagination-column {
  border-top: 1px solid #efefef;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
}

/deep/ .el-select {
  width: 100%;
  min-height: 40px;
  /*line-height: 40px;*/
  /*.el-select__tags {*/
  /*overflow: hidden;*/
  /*span {*/
  /*width: 80%;*/
  /*display: flex;*/
  /*align-items: center;*/
  /*.el-tag:nth-child(1) {*/
  /*width: auto;*/
  /*display: flex;*/
  /*align-items: center;*/
  /*overflow: hidden;*/
  /*flex: 1;*/
  /*.el-select__tags-text {*/
  /*width: 70%;*/
  /*display: inline-block;*/
  /*overflow: hidden;*/
  /*flex: none;*/
  /*}*/
  /*}*/
  /*.el-tag:nth-child(2) {*/
  /*width: auto;*/
  /*flex: none;*/
  /*.el-select__tags-text {*/
  /*width: 20px;*/
  /*flex: none;*/
  /*}*/
  /*}*/
  /*}*/
  /*}*/
}

/deep/ .is-error .el-input.is-disabled .el-input__inner {
  border-color: #f56c6c;
}

@media screen and (min-width: 410px) and (max-width: 1366px) {
  /deep/ .el-select {
    min-height: 30px;
    /*line-height: 30px;*/
  }
}
</style>
