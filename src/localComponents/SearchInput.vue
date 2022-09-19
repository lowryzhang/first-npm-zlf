<template>
  <el-col :span="Number(colspan)" ref="searchInput">
    <el-col :span="showVirtual?20:24">
    <el-form-item
      :prop="name"
      :label-width="labelWidth + 'px'"
      :label="label"
      :title="label"
      v-show="p === 'H'?false:true"
      :rules="type =='bank'?{
        required: required, validator: this.$rules.bankLength, trigger: 'blur'
      }:null"
    >
      <el-input
        @keyup.native.enter="onEnter"
        @blur="onEnter"
        v-model="entervalue"
        :placeholder="placeholder"
        @change="change(entervalue)"
        @input.native="changeValue"
        :maxlength="maxlength"
        :disabled="eleDisabled || false"
      >
        <i class="el-icon-search el-input__icon" slot="suffix" @click="onClick" style="color:#1890ff;"></i>
      </el-input>
    </el-form-item>
    </el-col>
    <el-col :span="4" style="line-height:32px;" v-if="showVirtual">
      <el-checkbox v-model="isVirtual" @change="getVirtualFn">用虚拟单位</el-checkbox>
    </el-col>
    <el-dialog
      class="dialog-content"
      border
      :title="title"
      :visible.sync="dialogVisible"
      width="80%"
      :modal="modal"
      :append-to-body='true'
      :before-close="handleClose"
    >
      <el-form
        v-if="!isOnlyDailog"
        :inline="type == 'land'?false:true"
        :model="form"
        class="demo-form-inline"
        style="margin-bottom:20px;"
        label-width="140px"
      >
        <el-row>
          <el-col :span="type==='land'?8:6">
            <el-form-item :label="type != 'company'?label:'统一社会信用代码'">
              <el-input
                size="medium"
                maxlength="40"
                v-model="entervalue"
                :placeholder="type != 'company'?placeholder:'请输入统一社会信用代码'"
                @change="onChange"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="type == 'person' && searchList && searchList.length==0">
            <el-form-item label="姓名" v-if="type == 'person' && searchList && searchList.length==0">
              <el-input size="medium" v-model="username" placeholder="输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6" v-if="type == 'company' && searchList && searchList.length==0">
            <el-form-item label="单位名称">
              <el-input size="medium" v-model="companyname" placeholder="请输入单位名称"></el-input>
            </el-form-item>
          </el-col> -->

          <el-col :span="6" v-if="type == 'bank' && searchList && searchList.length==0">
            <el-form-item label="开户行名称" v-if="type == 'bank' && searchList && searchList.length==0">
              <el-input size="medium" maxlength="50" v-model="bankDeptName" placeholder="请输入开户行名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="type == 'bank' && searchList && searchList.length==0">
            <el-form-item label="银行行别" v-if="type == 'bank' && searchList && searchList.length==0">
              <ep-select
                v-if="bankDic.length < 1"
                size="medium"
                name="bankCode"
                placeholder="请输入银行行别"
                :value="bankCode"
                noList
                :SelfDictionaries="bankCodeOptions"
                @select-message="changeform"
              ></ep-select>
              <ep-select
                v-if="bankDic.length > 0 "
                size="medium"
                name="bankCode"
                selfBankList
                placeholder="请输入银行行别"
                :value="bankCode"
                @select-message="changeform"
                :SelfDictionaries='bankDic'
              ></ep-select>
            </el-form-item>
          </el-col>
          <ep-select
            v-if="type == 'land' && searchList && searchList.length==0"
            colspan="8"
            label="所属行政区"
            name="aab301"
            placeholder="请输入所属行政区"
            @select-message="changeform"
            :value="aab301"
            :SelfDictionaries="groupSelfaab301"
          ></ep-select>
          <ep-select
            v-if="type == 'land' && searchList && searchList.length==0"
            colspan="8"
            label="所属乡镇（街道）"
            filterable
            name="aaf013"
            placeholder="请输入所属乡镇（街道）"
            @select-message="changeform"
            :value="aaf013"
            :SelfDictionaries="groupSelfaaf013"
          ></ep-select>
          <el-col :span="4" v-for="(item,index) in inputList" :key="index">
            <el-form-item :label="item.value" v-for="(item,index) in inputList" :key="index">
              <el-input size="medium" v-model="form[item.key]" :placeholder="'请输入'+item.value"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6" v-if="type!=='land'">
            <el-form-item label>
              <el-button size="mini" type="primary" @click="query">查询</el-button>
              <el-button size="mini" @click="reset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="type==='land'" style="text-align:center">
          <el-button size="mini" type="primary" @click="query">查询</el-button>
          <el-button size="mini" @click="reset">重置</el-button>
        </div>
      </el-form>
      <el-table
        class="ep-table"
        :data="tableData"
        style="width: 100%"
        height="250px"
        highlight-current-row
        @row-click="tableClick"
        @row-dblclick="tableDbClick"
      >
        <slot></slot>
      </el-table>
      <div style="margin-top:20px;display:flex;justify-content: space-around;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[20, 40, 60, 80,100]"
          :current-page="pager.page"
          :page-size="pager.size"
          :total="pager.total"
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closed">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script type="es6">
export default {
  props: {
    eleDisabled: {
      type: Boolean,
      default: false
    },
    searchtabledata: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
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
    bankDic: {
      type: Array,
      default: function() {
        return []
      }
    },
    modal: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '信息查询'
    },
    placeholder: {
      type: String,
      default: ''
    },
    p: {
      type: String,
      default: ''
    },
    codetype: {
      type: String,
      default: ''
    },
    type: String,
    maxlength: {
      type: Number,
      default: 12
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
    api: {
      type: String,
      default: ''
    },
    tagType: {
      type: String,
      default: ''
    },
    functionId: {
      type: String,
      default: ''
    },
    isCodeType: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    searchList: {
      type: Array,
      default: () => []
    },
    formName: {
      type: String,
      default: 'formData'
    },
    pageinfo: {
      type: Object,
      default: () => {
        return {
          page: 1,
          size: 20,
          total: 0
        }
      }
    },
    showVirtual: {
      type: Boolean,
      default: false
    },
    virRegioncode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isVirtual: false, // 是否启用虚拟统一社会代码查询
      table: [],
      hidden: false,
      dialogVisible: false,
      isOnlyDailog: false, // 是否只是弹框
      tableData: [],
      id: {
        randowId: ''
      },
      pager: {},
      row: {},
      form: {},
      entervalue: this.value,
      companyname: '',
      username: '',
      bankDeptName: '',
      bankCode: '',
      aab301: '',
      aaf013: '',
      bankCodeOptions: [],
      groupSelfaab301: [],
      groupSelfaaf013: []
    }
  },
  watch: {
    value(newValue, oldValue) {
      this.entervalue = newValue
    },
    pageinfo: {
      handler(newValue, oldValue) {
        this.pager = newValue
      },
      deep: true
    },
    searchtabledata: {
      handler(newValue, oldValue) {
        this.tableData = newValue
      },
      deep: true
    },
    property: {
      handler(value) {
        this.setProperty(value)
      },
      deep: true
    },
    formData: {
      handler(value) {
        if (this.searchList && this.searchList.length > 0) {
          this.inputList.map(item => {
            this.form[item.key] = ''
            this.form[item.key] = this.formData[item.key].value
          })
        }
      },
      deep: true
    }
  },
  computed: {
    codeTypes() {
      return this.$store.getters.codeTypes
    },
    inputList() {
      let list = []
      if (this.searchList && this.searchList.length > 0) {
        this.searchList.map(item => {
          Object.keys(item).map(el => {
            list.push({
              key: el,
              value: item[el]
            })
          })
        })
      }
      return list
    },
    formData() {
      return (this.datas && this.datas[this.formName]) || {}
    }
  },
  mounted() {
    if (this.type === 'land') {
      this.$api.commonGet(this.$insiisApi + '/common/getAab301').then(res => {
        if (res.success) {
          this.groupSelfaab301 = res.result
          if (res.result.length) {
            this.aab301 = res.result[0].key
            this.changeform(res.result[0].key, 'aab301')
          }
        } else {
          this.$message.error(res.resultDes)
        }
      })
    }
    if (this.type === 'bank') {
      this.getOptions()
    }
    // this.form[this.name] = '';
    // this.form[this.name] = this.property.value;
  },
  methods: {
    // 银行行别下拉
    async getOptions() {
      this.bankCodeOptions = await this.common.getBankCodeFn()
    },
    remoteMethod1() {
      this.$api.commonGet(this.$insiisApi + '/common/queryStreetMapList', {
        regionCode: this.aab301
      }).then(res => {
        if (res.success) {
          this.groupSelfaaf013 = res.result
        } else {
          this.$message.error(res.resultDes)
        }
      })
    },
    changeValue() {
      this.$emit('changeValue')
    },
    closed() {
      this.dialogVisible = false
      // this.entervalue = ''
      // this.$emit('changeform', this.entervalue, this.name)
    },
    handleClose(done) {
      this.tableData = []
      // this.entervalue = ''
      // this.$emit('changeform', this.entervalue, this.name)
      done()
    },
    changeform(data, type) {
      // console.log(data,type);
      this[type] = data
      if (type === 'aab301') {
        this.remoteMethod1()
      }
    },
    change(value) {
      console.log(value, this.name)
      this.$emit('changeform', value, this.name)
    },
    /**
     * 同步property
     */
    setProperty(value) {
      this.form[this.name] = value.value
    },
    /**
     * form值改变
     */
    onChange(value) {
      this.property.value = value
    },
    digMainMessage(value) {
      this.dialogVisible = true
      this.bankCode = value
    },
    /**
     * 请求列表（回车）
     */
    onEnter() {
      // this.$emit('onEnter',this.entervalue);
      this.$emit('onSearch', this.entervalue)
      if (this.entervalue !== '') {
        this.dialogVisible = !this.dialogVisible
        // this.getUserId(1);
      } else {
        this.dialogVisible = false
      }
      this.bankCode = ''
      // this.getUserId(0);
    },
    /**
     * 点击弹框不请求
     */
    onClick() {
      if (!this.eleDisabled) {
        // this.reset()
        this.$emit('onSearch', this.entervalue)
        if (this.entervalue !== '') {
          this.dialogVisible = !this.dialogVisible
        } else {
          this.dialogVisible = !this.dialogVisible
        }
        this.bankCode = ''
      }
    },

    /**
     * 表格点击事件
     */
    tableClick(row) {
      this.row = row
      this.$emit('tableClick', row)
    },
    /**
     * 表格双击事件
     */
    tableDbClick(row) {
      this.row = row
      this.$emit('tableDbClick', row)
      this.dialogVisible = false
    },
    /**
     * 提交id
     */
    submit() {
      this.$emit('submit', this.row)
      this.dialogVisible = false
    },
    // dialog关闭事件 清空tableData
    closeDialog() {
      this.tableData = []
      this.entervalue = ''
    },
    /**
     * 查询
     */
    query() {
      // this.getUserId(1);
      if (this.type === 'bank') {
        this.$emit('check', this.entervalue, this.bankDeptName, this.bankCode)
      }
      if (this.type === 'land') {
        this.$emit('check', this.entervalue, this.aab301, this.aaf013)
      }
      if (this.type === 'company') {
        if (this.showVirtual && this.isVirtual) {
          this.getVirtualFn()
        } else {
          this.$emit('check', this.entervalue, this.companyname)
        }
      }
      if (this.type === 'person') {
        this.$emit('check', this.entervalue, this.companyname)
      }
    },
    // 虚拟统一社会信用代码
    getVirtualFn() {
      // 去除打钩，需要清空
      if (!this.isVirtual) {
        this.form.aab998 = ''
        this.form.unitCardId = ''
        this.form.aab004 = ''
        this.form.companyName = ''
        this.form.aab001 = ''
        this.form.unitId = ''
        this.$emit('updateVir', this.form)
        return
      }
      this.$api.commonGet('/treatment/indemnity/beforhandPayRegister/getVirtualUnitInfo', {
        regionCode: this.virRegioncode || ''
      }).then(res => {
        if (res.success) {
          if (res.result) {
            this.form.aab998 = this.form.unitCardId = res.result.unitCardId || ''
            this.form.aab004 = this.form.companyName = res.result.companyName || ''
            this.form.aab001 = this.form.unitId = res.result.unitId || ''
            this.$emit('updateVir', this.form)
          } else {
            this.form = {}
          }
        } else {
          this.form = {}
          this.$message.error(res.resultDes)
        }
      })
    },
    reset() {
      this.entervalue = ''
      this.username = ''
      this.companyname = ''
      this.bankDeptName = ''
      this.bankCode = ''
      this.aaf013 = ''
      this.aab301 = ''
      this.tableData = []
      this.$emit('changeform', this.entervalue, this.name)
    },
    /**
     * 根据身份证获取id
     */
    getUserId(type) {
      return false
      // eslint-disable-next-line no-unreachable
      let params = {
        searchData: this.form,
        ...this.pager
      }
      let url = this.api ? this.api : this.$route.path
      this.$api.commonPost(url, params).then(res => {
        if (res.status === '0') {
          if (type) {
            this.tableData = res.data
          } else {
            if (res.data && res.data.length === 1) {
              this.row = res.data[0] || {}
              this.getCommonData(this.row)
            } else if (res.data && res.data.length > 1) {
              this.dialogVisible = true
              this.tableData = res.data
            }
          }
        } else if (res.successMessage) {
          res.successMessage.map(item => {
            this.$message({
              type: 'success',
              message: item,
              duration: 0,
              showClose: true
            })
          })
        } else if (res.errorMessage && res.errorMessage.length > 0) {
          res.errorMessage.map(item => {
            this.$message({
              type: 'error',
              message: item,
              duration: 0,
              showClose: true
            })
          })
        } else if (res.warnMessage && res.warnMessage.length > 0) {
          res.warnMessage.map(item => {
            this.$message({
              type: 'warning',
              message: item,
              duration: 0,
              showClose: true
            })
          })
        }
      })
    },
    /**
     * 根据id获取用户信息
     */
    getCommonData(row) {
      let params = {
        panel: {
          psInfo: {},
          psInsure: [],
          cpInfo: {},
          cpInsure: [],
          functionid: this.functionId
        },
        commonSearch_info: {
          ...row
        },
        ...this.datas,
        path: this.$route.path
      }
      if (this.type === 'person') {
        params.commonSearch_info.personInfo = row.aac001
      } else if (this.type === 'company') {
        params.commonSearch_info.companyInfo = row.aab001
      }
      if (this.isCodeType) {
        params.codeTypes = this.codeTypes
      }
      this.$api
        .commonPost(this.$route.path + '/doCheck/commonSearch_info/', params)
        .then(res => {
          if (res.status === '0') {
            this.$store.dispatch('SET_COMMON', res.data)
            if (res.data.codeTypes) {
              this.$store.dispatch('SET_CODETYPE', res.data)
            }
          } else if (res.successMessage) {
            res.successMessage.map(item => {
              this.$message({
                type: 'success',
                message: item,
                duration: 0,
                showClose: true
              })
            })
          } else if (res.errorMessage && res.errorMessage.length > 0) {
            res.errorMessage.map(item => {
              this.$message({
                type: 'error',
                message: item,
                duration: 0,
                showClose: true
              })
            })
          } else if (res.warnMessage && res.warnMessage.length > 0) {
            res.warnMessage.map(item => {
              this.$message({
                type: 'warning',
                message: item,
                duration: 0,
                showClose: true
              })
            })
          }
        })
    },
    /**
     * 页面码改变时事件
     */
    handlePageChange(page) {
      this.pager.page = page
      this.$emit('handlePageChange', page)
    },
    /**
     * 每页条数改变事件
     */
    handleSizeChange(size) {
      this.pager.size = size
      this.$emit('handleSizeChange', size)
    }
  }
}
</script>

<style lang="less" scoped>
.el-form--inline .el-form-item {
  display: flex;
}
.search-content {
  display: flex;
  justify-content: space-between;
  .search-input {
    display: flex;
    flex: 1;
    margin-right: 30px;
    max-width: 500px;
    span {
      /*flex: 100px;*/
      display: inline-block;
      margin-right: 10px;
      line-height: 36px;
      /*overflow: hidden;*/
      /*text-overflow: ellipsis;*/
      white-space: nowrap;
      /*min-width:130px;*/
    }

    span:before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }

    .el-icon-search {
      cursor: pointer;
    }

    .el-icon-search:hover {
      color: #409eff;
    }
  }
}
.ep-table {
  .ep-table-item {
    padding: 10px;
  }
}
.dialog-footer {
  width: calc(100% - 40px);
  /*position: absolute;*/
  bottom: 0;
  right: 0;
  padding: 20px;
}
.el-table__body tr.current-row > td {
  background-color: #cdebef !important;
}
// /deep/ .el-dialog{
//     /*height:70vh;*/
// }
/deep/ .el-dialog__footer {
  padding: 0px;
}
/deep/ .el-table--enable-row-transition .el-table__body td {
  padding: 12px 0 !important;
}
</style>
