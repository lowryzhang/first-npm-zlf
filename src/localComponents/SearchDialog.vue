<template>
<!-- 组件基于 searchinput 组件，初始用于银行查询框，可根据自己需求添加，以type 进行区分（type 根据searchinput 组件配置）
    <epl-searchDialog
      ref="searchBank"
      colspan="12"
      label="开户行行号"
      type="bank"
      nameKey="aaf002"
      :initData="form.aaf002"
      @update="updateBank"
      :placeholder="isFinancial?'--':'请输入'"
      :eleDisabled="isFinancial"
    ></epl-searchDialog>

    updateBank(data){
      this.form.aaf002 = data && data.aaf002 || ''
      this.form.aae668 = data && data.aae668 || ''
      this.form.bankId = data && data.bankId || ''
      this.form.aaf216 = data && data.aaf216 || ''
    }
-->
  <div>
    <epl-search-input
      ref="searchInput"
      :colspan="colspan"
      :label="label"
      @changeform="changeform"
      :value="form[nameKey]"
      :name="nameKey"
      :type="type"
      :searchtabledata="tableList"
      :pageinfo="pageinfo"
      :placeholder="placeholder"
      :eleDisabled="eleDisabled"
      :maxlength="maxlength"
      p="R"
      :showVirtual="showVirtual"
      @updateVir="updateVir"
      :virRegioncode="virRegioncode"
      @onSearch="onSearch"
      @check="check"
      @tableDbClick="dbClick"
      @submit="submit"
      @handlePageChange="handlePageChange"
      @handleSizeChange="handleSizeChange"
    >
      <div v-if="type==='bank'">
        <epl-search-input-item
          colspan="8"
          header="开户行行号"
          :value="form.aaf002"
          name="aaf002"
        ></epl-search-input-item>
        <epl-search-input-item
          colspan="8"
          header="开户行名称"
          :value="form.aae668"
          name="aae668"
        ></epl-search-input-item>
        <epl-search-input-item
          colspan="8"
          header="银行行别"
          :value="form.aaf216"
          name="aaf216"
        ></epl-search-input-item>
      </div>
      <div v-if="type==='company'">
        <epl-search-input-item
          colspan="8"
          header="统一社会信用代码"
          :value="form.aab998"
          name="aab998"
        ></epl-search-input-item>
        <epl-search-input-item
          colspan="8"
          header="单位名称"
          :value="form.aab004"
          name="aab004"
        ></epl-search-input-item>
      </div>
      <div v-if="type==='person'">
        <epl-search-input-item
          colspan="8"
          header="社会保障号码"
          :value="form.aac002"
          name="aac002"
        ></epl-search-input-item>
        <epl-search-input-item
          colspan="8"
          header="姓名"
          :value="form.aac003"
          name="aac003"
        ></epl-search-input-item>
        <epl-search-input-item
          colspan="8"
          header="性别"
          :value="form.aac004"
          name="aac004"
        ></epl-search-input-item>
        <!-- <epl-search-input-item
          colspan="8"
          header="单位名称"
          :value="form.aab004"
          name="aab004"
        ></epl-search-input-item> -->
      </div>
      <div v-if="type==='land'"></div>
    </epl-search-input>
  </div>
</template>


<script type="es6">
export default {
  props: {
    colspan: {
      type: String,
      default: '8'
    },
    type: { // 类型，对应 searchinput 组件中的类型 type: 'company','bank','land','person'
      type: String,
      default: 'bank'
    },
    label: {
      type: String,
      default: '开户行行号'
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    nameKey: {
      type: String,
      default: 'aaf002'
    },
    eleDisabled: { // 是否禁用
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 40
    },
    initData: { // 父组件传来的值
      type: String,
      default: ''
    },
    noCheck: { // 是否不要进行单位校验
      type: Boolean,
      default: false // 默认进行校验
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
      form: {
        // 银行
        aaf002: '', // 开户行行号
        aae668: '', // 开户行名称
        aaf216: '', // 银行行别
        bankId: '',
        // 单位
        aab998: '', // 统一社会信用代码
        aab004: '', // 单位名称
        aab001: '', // 单位编码
        aaa027: '',
        aab359: '',
        unitCardId: '',
        companyName: '',
        unitId: '',
        // 人员
        aac001: '',
        aac002: '',
        aac003: '',
        aac004: ''
      },
      pageinfo: {},
      tableList: [],
      regionCode: this.$store.state.loginuserInfo.areaId || ''
    }
  },
  computed: {
  },
  watch: {
    initData: {
      handler(val) {
        this.form[this.nameKey] = val
        if (!val) {
          this.resetForm()
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
  },
  methods: {
    resetForm() {
      this.form = {
        // 银行
        aaf002: '', // 开户行行号
        aae668: '', // 开户行名称
        aaf216: '', // 银行行别
        bankId: '',
        // 单位
        aab998: '', // 统一社会信用代码
        aab004: '', // 单位名称
        aab001: '', // 单位编码
        aaa027: '',
        aab359: '',
        unitCardId: '',
        companyName: '',
        unitId: '',
        // 人员
        aac001: '',
        aac002: '',
        aac003: '',
        aac004: ''
      }
    },
    changeform(data, type, obj) {
      this.form[type] = data
      // 清空处理
      if (!data) {
        let updateparam = {}
        if (this.type === 'bank') {
          updateparam = {
            aaf002: '', // 开户行行号
            aae668: '', // 开户行名称
            aaf216: '', // 银行行别
            bankId: ''
          }
        } else if (this.type === 'company') {
          updateparam = {
            aab998: '', // 统一社会信用代码
            aab004: '', // 单位名称
            aab001: '', // 单位编码
            aaa027: '',
            aab359: ''
          }
        } else if (this.type === 'person') {
          updateparam = {
            aac001: '',
            aac002: '',
            aac003: '',
            aac004: '',
            aab004: ''
          }
        }
        this.$emit('update', updateparam)
      }
    },
    /*  开户行行号弹框(start)  */
    // 点击放大镜触发事件
    onSearch(data, tableList) {
      // 在此处触发点击放大镜的事件，data是框里面的值
      this.pageinfo = {
        page: 1,
        size: 20,
        total: 0
      }
      if (data) {
        this.exeSearch(data)
      } else if (tableList) {
        // 列表有数据，直接弹框table赋值
        this.tableList = tableList
        this.pageinfo.total = Number(this.tableList.length || '0')
        this.$refs['searchInput'].dialogVisible = true
        this.$refs['searchInput'].isOnlyDailog = true
      }
    },
    // 点击查询触发事件
    check(data1, data2, data3) {
      // searchtabledata传到子组件中 后台列表值赋值给它
      if (this.type === 'bank') {
        this.form.aaf002 = this.initData ? this.initData : data1
        this.form.aae668 = data2
        this.form.aaf216 = data3
      } else if (this.type === 'company') {
        this.form.aab998 = this.initData ? this.initData : data1
        this.form.aab004 = data2
      } else if (this.type === 'person') {
        this.form.aab998 = this.initData ? this.initData : data1
        this.form.aab004 = data2
      }
      this.pageinfo.page = 1
      this.exeSearch()
    },
    chooseFn(data) {
      let updateParam = {}
      if (this.type === 'bank') {
        this.form.aaf002 = data.aaf002 || ''
        updateParam.aaf002 = data.aaf002 || ''
        updateParam.aae668 = data.aae668 || ''
        updateParam.bankId = data.bankId || ''
        updateParam.aaf216 = data.aaf216 || ''
      } else if (this.type === 'company') {
        this.form.aab998 = data.aab998 || ''
        updateParam.aab998 = data.aab998 || ''
        updateParam.aab004 = data.aab004 || ''
        updateParam.aab001 = data.aab001 || ''
        updateParam.aaa027 = data.aaa027 || ''
        updateParam.aab359 = data.aab359 || ''
      } else if (this.type === 'person') {
        this.form.aac003 = data.aac003 || ''
        updateParam.aac001 = data.aac001 || ''
        updateParam.aac002 = data.aac002 || ''
        updateParam.aac003 = data.aac003 || ''
        updateParam.aac004 = data.aac004 || ''
        updateParam.aab004 = data.aab004 || ''
      }
      this.$emit('update', updateParam)
    },
    // 表格双击事件
    dbClick(data) {
      this.chooseFn(data)
    },
    // 确定按钮
    submit(data) {
      this.chooseFn(data)
    },
    // 翻页操作
    handlePageChange(data) {
      this.pageinfo.page = data
      this.exeSearch()
    },
    // 改变每页显示条数
    handleSizeChange(data) {
      this.pageinfo.size = data
      this.exeSearch()
    },
    // 查询
    exeSearch(data) {
      if (this.type === 'bank') {
        this.getBankList(data)
      } else if (this.type === 'company') {
        this.getCompanyList(data)
      } else if (this.type === 'person') {
        this.queryPersonList(data)
      } else if (this.type === 'land') {
        // doing
      }
    },
    // 是虚拟单位的，子组件获取，父组件直接赋值
    updateVir(form) {
      this.common.forKeyValue(form, this.form, 'all')
      this.$emit('update', this.form)
    },
    // 获取银行信息
    getBankList(data) {
      let bankJson = {
        aaf216: this.form.aaf216,
        aaf002: this.form.aaf002,
        aae668: this.form.aae668,
        isPage: 'true',
        pageRows: this.pageinfo.size,
        pageNumber: this.pageinfo.page
      }
      this.$api.commonGet(this.$insiisApi + '/common/bankInfo', bankJson).then(res => {
        if (res.success) {
          this.tableList = res.result.list || []
          this.pageinfo.total = Number(res.result.total || '0')
        } else {
          this.tableList = []
          this.pageinfo = {
            page: 1,
            size: 20,
            total: 0
          }
          this.$message.error(res.resultDes)
        }
      })
    },
    // 获取单位信息
    getCompanyList(data) {
      if (!this.noCheck && !this.common.CheckSocialCreditCode(data || this.form.aab998)) {
        this.$message({
          type: 'error',
          message: '您输入的统一社会信用代码不正确'
        })
        return
      }
      this.$api.commonPost('/treatment/common/indemnity/companylist', {
        aab998: data || this.form.aab998,
        unitType: '1'
      }).then(res => {
        if (res.success) {
          this.tableList = res.result || []
          this.pageinfo.total = Number(this.tableList.length || '0')
        } else {
          this.tableList = []
          this.pageinfo = {
            page: 1,
            size: 20,
            total: 0
          }
          this.$message({
            type: 'error',
            message: res.resultDes
          })
        }
      })
    },
    queryPersonList(data) {
      if (!this.noCheck && !this.common.checkIDCard(data || this.form.aac002)) {
        this.$message({
          type: 'error',
          message: '您输入的社会保障号码不正确'
        })
        return
      }
      this.$api.commonGet(this.$insured + '/person/personSocialInsured/queryInsuranceId', {
        aac002: data,
        aab359: this.regionCode,
        aab001: '1'
      }).then(res => {
        if (res.success) {
          this.tableList = res.result || []
          this.pageinfo.total = Number(this.tableList.length || '0')
        } else {
          this.tableList = []
          this.pageinfo = {
            page: 1,
            size: 20,
            total: 0
          }
          this.$message({
            type: 'error',
            message: res.resultDes
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .el-icon-search {
    // color: #000;
    cursor: pointer;
  }
</style>
