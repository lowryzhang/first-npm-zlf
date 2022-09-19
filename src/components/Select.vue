<template>
   <el-col :span="Number(colspan)">
        <el-form-item
                :prop="name"
                :label-width="labelWidth + 'px'"
                :label="label"
                :title="label"
                v-if="ishide === true?false:true"
                :class="{zdyLabel:zdyLabel}"
                >
            <el-select
                       :disabled="eleDisabled === true?true:false"
                       ref="mySelect"
                       :multiple="multiple"
                       :multiple-limit="multipleLimit"
                       :collapse-tags="collapse"
                       @change="onChange"
                       @visible-change="selectData"
                       :name="name"
                       :size="size"
                       :title='selValuename'
                       :clearable="clearable"
                       v-model="selValue"
                       style="position: relative;width:100%"
                       :filterable="filterable"
                       :remote="remote"
                       :remote-method="remoteMethod"
                       :filter-method="search"
                       :id="'input' + name"
                       @clear="clear"
                       @remove-tag="removeTag"
                       :placeholder="placeholder">
                <el-option v-if="canChoseAll" label="全选" value="all_select" @click.native="selectAll"></el-option>
                <el-option
                        v-for="(item,index) in selectoptions"
                        :key="index"
                        :label="item[`${lablevalue}`]"
                        :disabled="item.disabled"
                        :value="item[`${keyvalue}`]">
                        <span v-if="villageNub" style="float: left">{{item.villageNub+ ' - ' + item[`${lablevalue}`]}}</span>
                        <span v-else-if="!noKey" style="float: left">{{`${lablevalue}`=='label'?item[`${lablevalue}`]:item[`${keyvalue}`]+ ' - ' + item[`${lablevalue}`]}}</span>
                        <span v-else style="float: left">{{item[`${lablevalue}`]}}</span>
              </el-option>
            </el-select>
        </el-form-item>
    </el-col>
</template>

<script type="es6">
import Dictionaries from '../localJs/Dictionaries.js'
export default {
  props: {
    branchComment: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    firstCan: {
      type: Boolean,
      default: true
    },
    noList: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    keyvalue: {
      type: String,
      default: 'key'
    },
    lablevalue: {
      type: String,
      default: 'value'
    },
    SelfDictionaries: {
      type: Array,
      default: function() {
        return []
      }
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
      type: [String, Array, Object],
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
    indexNum: {
      type: Number,
      default: 0
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
    selfBankList: {
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
    multiple: {
      type: Boolean,
      default: false
    },
    multipleLimit: {
      type: Number,
      default: 0
    },
    collapse: {
      type: Boolean,
      default: false
    },
    selectClick: {
      type: Boolean,
      default: false
    },
    noKey: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: true
    },
    canChoseAll: { // 模块应用时，在select-message方法中，需删除data中的all_select值
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    zdyLabel: {
      type: Boolean,
      default: false
    },
    villageNub: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      selValuename: '',
      selectoptions: [],
      zdyCodeList: [],
      selectoptionsResult: [],
      show: false,
      text: '',
      selectList: [],
      oldSelectList: [],
      selValue: '',
      branchOne: false,
      branchTwo: false,
      isCanBao: true,
      time: null,
      a: '',
      id: ''
    }
  },
  async created() {
    this.isCanBao = this.firstCan
    this.selValue = this.value
    if (this.branchComment) {
      let isComment = this.selValue.findIndex(item => {
        return item === '00'
      })
      if (isComment > -1) {
        this.branchOne = false
        this.branchTwo = true
      } else if (isComment <= -1) {
        this.branchOne = true
        this.branchTwo = false
      } else {
        this.branchOne = false
        this.branchTwo = false
      }
    }
    if (this.name === 'bankCode' && !this.selfBankList) {
      this.zdyCodeList = await this.getParamFn('AAF200')
    } else if (this.name === 'bae042') {
      this.zdyCodeList = await this.getParamFn('BAE042')
    } else {
      this.zdyCodeList = []
    }
    if (!this.noList) {
      this.SelfDictionaries.length === 0 ? this.selectoptions = Dictionaries[this.name] : this.selectoptions = this.SelfDictionaries// 查询对应加载项 selectoptions 或者加载传入项
    } else {
      this.selectoptions = this.SelfDictionaries
    }
    if (this.zdyCodeList.length > 0 && this.SelfDictionaries.length === 0) {
      this.selectoptions = this.zdyCodeList
    }
  },
  computed: {
  },
  watch: {
    selectoptions: {
      handler(val) {
        if (this.selectoptionsResult.length > 0) {
          this.selectoptions = this.selectoptionsResult
        }
      },
      deep: true
    },
    firstCan: {
      handler(val) {
        this.isCanBao = val
      },
      deep: true
    },
    value: {
      // console.log(newvalue)
      handler(val) {
        this.selValue = val
        if (this.branchComment) {
          let isComment = this.selValue.findIndex(item => {
            return item === '00'
          })
          if (isComment > -1) {
            this.branchOne = false
            this.branchTwo = true
          } else if (isComment <= -1) {
            this.branchOne = true
            this.branchTwo = false
          } else {
            this.branchOne = false
            this.branchTwo = false
          }
        }
      },
      deep: true
      // this.onChange(newvalue)
    },
    SelfDictionaries: {
      handler(newValue, oldValue) {
        if (!this.noList) {
          this.SelfDictionaries.length === 0 ? this.selectoptions = Dictionaries[this.name] : this.selectoptions = newValue// 查询对应加载项 selectoptions 或者加载传入项
        } else {
          this.selectoptions = newValue
        }
        if (this.zdyCodeList.length > 0 && this.SelfDictionaries.length === 0) {
          this.selectoptions = this.zdyCodeList
        }
      },
      deep: true
    }
  },
  mounted() {

  },
  methods: {
    getParamFn(paramType) {
      return new Promise((resolve, reject) => {
        // getParamkv获取key:value格式
        this.$api.commonGet(this.$insiisApi + '/common/getParam', {
          aaa100: paramType,
          aab359: this.$store.state.loginuserInfo.areaId || '000000'
        }).then(res => {
          if (res.success) {
            if (res.result.length > 0) {
              if (this.$store.state.loginuserInfo.areaId.slice(0, 4) !== '3301') {
                for (let index = 0; index < res.result.length; index++) {
                  if (res.result[index].key.includes('YH')) {
                    res.result.splice(index, 1)
                  }
                }
              }
              resolve(res.result)
            }
          }
        })
      })
    },
    remoteMethod(val) {
      this.$emit('remoteMethod', val)
    },
    search(val) {
      this.selectoptions = []
      let whichfilter
      if (!this.noList) {
        this.SelfDictionaries.length === 0 ? whichfilter = Dictionaries[this.name] : whichfilter = this.SelfDictionaries
      } else {
        whichfilter = this.SelfDictionaries
      }
      if (this.zdyCodeList.length > 0 && this.SelfDictionaries.length === 0) {
        whichfilter = this.zdyCodeList
      }
      if (val) {
        whichfilter.filter(item => {
          if (!!~item[this.keyvalue].indexOf(val) || !!~item[this.lablevalue].indexOf(val) || !!~item[this.keyvalue].indexOf(val.toUpperCase())) {
            // this.selectoptions.push({
            //   [this.keyvalue]: item[this.keyvalue],
            //   [this.lablevalue]: item[this.lablevalue]
            // })
            this.selectoptions.push(item) // 保留{}中除了key、value的其他字段，防止页面取值取不到
            // 多选是可能会因为多选框下拉列表数据变化而失去汉字
          }
        })
        // 单选框逻辑
        if (this.selectoptions.length > 0 & !this.multiple) {
          this.selValue = val
          if (this.selectoptions.length === 1) {
            this.onChange(this.selectoptions[0][this.keyvalue])
            this.$refs.mySelect.handleClose()
          }
        } else {
          if (!this.multiple) {
            this.selectoptions = []
          }
        }
      } else {
        if (!this.noList) {
          this.SelfDictionaries.length === 0 ? this.selectoptions = Dictionaries[this.name] : this.selectoptions = this.SelfDictionaries// 查询对应加载项 selectoptions 或者加载传入项
        } else {
          this.selectoptions = this.SelfDictionaries
        }
        if (this.zdyCodeList.length > 0 && this.SelfDictionaries.length === 0) {
          this.selectoptions = this.zdyCodeList
        }
      }
    },
    clear() {
      if (!this.noList) {
        this.SelfDictionaries.length === 0 ? this.selectoptions = Dictionaries[this.name] : this.selectoptions = this.SelfDictionaries// 查询对应加载项 selectoptions 或者加载传入项
      } else {
        this.selectoptions = this.SelfDictionaries
      }
      if (this.zdyCodeList.length > 0 && this.SelfDictionaries.length === 0) {
        this.selectoptions = this.zdyCodeList
      }
    },
    selectData() {
      if (!this.noList) {
        this.SelfDictionaries.length === 0 ? this.selectoptions = Dictionaries[this.name] : this.selectoptions = this.SelfDictionaries// 查询对应加载项 selectoptions 或者加载传入项
      } else {
        this.selectoptions = this.SelfDictionaries
      }
      if (this.zdyCodeList.length > 0 && this.SelfDictionaries.length === 0) {
        this.selectoptions = this.zdyCodeList
      }
    },
    onChange(val) {
      if (this.multiple) { // 多选
        console.log(val)
        let keyvalue = []
        for (let index = 0; index < val.length; index++) {
          this.selectoptions.find((item) => {
            if (item.key === val[index]) {
              keyvalue.push(item)
              return keyvalue
            }
          })
        }
        if (this.canChoseAll) {
          // 全选 all_select
          let allSelectList = []
          this.selectoptions.forEach(item => {
            allSelectList.push(item.key)
          })
          allSelectList.unshift('all_select')
          if (val.includes('all_select')) {
            if (this.oldSelectList.includes('all_select') && (val.length - 1) < this.selectoptions.length) {
              keyvalue = keyvalue.filter(item => {
                return item !== 'all_select'
              })
              val = val.filter(item => {
                return item !== 'all_select'
              })
            } else {
              keyvalue.unshift('all_select')
              val = allSelectList
            }
          } else if (this.oldSelectList.includes('all_select') && !val.includes('all_select')) {
            keyvalue = []
            val = []
          } else if (!this.oldSelectList.includes('all_select') && !val.includes('all_select') && val.length === this.selectoptions.length) {
            keyvalue.unshift('all_select')
            val.unshift('all_select')
          }
          this.oldSelectList = val
        }
        this.$emit('select-message', val, this.name, keyvalue, this.indexNum)
      } else { // 单选
        let obj = this.selectoptions.find((item) => {
          if (item[this.keyvalue] === val || item[this.lablevalue] === val) {
            return item
          }
        })
        // if (obj[this.lablevalue]) {
        //   this.selValuename = obj[this.lablevalue]
        // }暂时
        this.selValue = val
        this.$emit('calculate-condition-changes')
        this.$emit('select-message', val, this.name, obj, this.indexNum)
      }
    },
    selectAll() {
      if (this.selValue.length < this.selectoptions.length) {
        this.selValue = []
        this.selectoptions.map((item) => {
          this.selValue.push(item.key)
        })
        this.selValue.unshift('all_select')
      } else {
        this.selValue = []
      }
    },
    removeTag(val) {
      if (val === 'all_select') {
        this.selValue = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
 .input-focus {
        border: 1px solid #4ca2fb;
    }

    .active {
        color: #3BB2FF;
        font-weight: 700;
        background-color: #E1F9FF;
    }

    .ac {
        background-color: #E1F9FF;
        color: #3BB2FF;
        font-weight: 700;
    }

    .ep-select .ep-scrollbar li:hover {
        background-color: #E1F9FF;
        color: #3BB2FF;
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
