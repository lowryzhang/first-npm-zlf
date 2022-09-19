<template>
  <div>
    <ep-title v-if="hasTitle">{{titleName}}</ep-title>
    <el-form id="switchInputFocus" :model="form" ref="form" :rules="rules">
      <el-row :gutter="10" v-if="receiveObj.isShow">
        <ep-select
          v-if="!isMain"
          :colspan="receiveObj.colspan"
          @select-message="changeform"
          label="领取人关系"
          name="receiptorRelation"
          :value="form.receiptorRelation"
          placeholder="请选择领取人关系"
          p="R"
        ></ep-select>
        <ep-input
          :colspan="receiveObj.colspan"
          label="领取人证件号"
          name="receiveidcard"
          p="R"
          placeholder="请输入领取人证件号"
          @input-message="changeform"
          :value="form.receiveidcard"
          maxlength="25"
        ></ep-input>
        <ep-input
          :eleDisabled="drawerDisabled"
          :colspan="receiveObj.colspan"
          label="领取人姓名"
          name="receivename"
          p="R"
          @input-message="changeform"
          :placeholder="drawerDisabled?'--':'请输入领取人姓名'"
          :value="form.receivename"
        ></ep-input>
      </el-row>
      <el-row :gutter="10">
        <!-- 有委托银行发放，才显示社保卡发放标志 -->
        <ep-select
          v-if="has11Type"
          @select-message="changeform"
          :colspan="colspan"
          label="是否社保卡发放"
          name="aae760"
          :value="form.aae760"
          placeholder="请选择"
          :eleDisabled="onlyRead"
          noList
          :SelfDictionaries="[{key:'0',value:'否'},{key:'1',value:'是'}]"
        ></ep-select>
        <ep-select
          @select-message="changeform"
          :colspan="colspan"
          label="发放方式"
          name="aae145"
          :value="form.aae145"
          placeholder="请选择发放方式"
          :eleDisabled="onlyRead||isSocialCard"
          noList
          :SelfDictionaries="issueOptions"
        ></ep-select>
        <ep-select
          v-if="!noFillBank && (form.aae145 === '44' || form.aae145 === '42' || form.aae145 === '43') && showMedSelect"
          :colspan="colspan"
          :label="form.aae145 === '44'?'辅助器具机构名称': '医疗机构名称'"
          name="akb020"
          placeholder="请选择机构名称"
          @select-message="changeform"
          :value="form.akb020"
          :eleDisabled="onlyRead"
          noList
          :SelfDictionaries="devicesInstitutionInfo"
        ></ep-select>
        <el-col
          :span="Number(colspan)"
          style="line-height: 40px;"
          v-if="showComChoose&&!noFillBank && form.aae145 === '31'"
        >
          <el-form-item
            prop="unitBankStatus"
            label="选择单位信息"
            label-width="140px"
          >
          <!-- 是否存在关系转移， aab001After 有值，说明存在关系转移，不可选单位类型 -->
            <el-radio
              v-model="form.unitBankStatus"
              @change="changeUnitBank"
              :disabled="onlyRead||!!panel.aab001After"
              label="1"
              >工伤单位</el-radio
            >
            <el-radio
              v-model="form.unitBankStatus"
              @change="changeUnitBank"
              :disabled="onlyRead||!!panel.aab001After"
              label="2"
              >参保单位<span v-if="panel.aab001After" style="color:red;margin-left:10px;">提示：该人员存在转移记录,单位代发以转入单位为主</span></el-radio
            >
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <epl-search-input
          :colspan="colspan"
          label="开户行行号"
          :eleDisabled="onlyRead||bankDisabled"
          @changeform="changeform"
          :value="form.aaf002"
          name="aaf002"
          type="bank"
          :searchtabledata="bankDeptList"
          :pageinfo="pageinfo"
          placeholder="请输入开户行行号"
          p="R"
          @onEnter="onEnter"
          @onSearch="onSearch"
          @check="check"
          @tableDbClick="dbClick"
          @submit="submit"
          @handlePageChange="handlePageChange"
          @handleSizeChange="handleSizeChange"
        >
          <epl-search-input-item
            header="开户行行号"
            :value="form.aaf002"
            name="aaf002"
          ></epl-search-input-item>
          <epl-search-input-item
            header="开户行名称"
            :value="form.aae668"
            name="aae668"
          ></epl-search-input-item>
          <epl-search-input-item
            header="银行行别"
            :value="form.aaf216"
            name="aaf216"
          ></epl-search-input-item>
        </epl-search-input>
        <ep-input
          @input-message="changeform"
          :colspan="colspan"
          label="开户银行名称"
          :value="form.aae668"
          name="aae668"
          p="D"
          :eleDisabled="onlyRead||eleDisabled"
        ></ep-input>
      <!-- </el-row>
      <el-row :gutter="10"> -->
        <ep-select
          :colspan="colspan"
          label="银行行别"
          :value="form.aaf216"
          name="aaf216"
          :placeholder="onlyRead||!noFillBank?'--':'请选择银行行别'"
          :eleDisabled="onlyRead||!noFillBank"
          @select-message="changeform"
          noList
          :SelfDictionaries="bankDic"
        ></ep-select>
        <ep-input
          @input-message="changeform"
          :colspan="colspan"
          :eleDisabled="onlyRead||bankDisabled"
          label="银行账号"
          name="aae010"
          maxlength="30"
          :value="form.aae010"
          placeholder="请输入银行账号"
          p="R"
        ></ep-input>
        <ep-input
          @input-message="changeform"
          :colspan="colspan"
          :eleDisabled="onlyRead||bankDisabled||accNameDisabled"
          label="银行开户名"
          name="aae009"
          :value="form.aae009"
          placeholder="请输入银行开户名"
          p="R"
        ></ep-input>
      </el-row>
    </el-form>
    <!-- 社保卡或单位代发多条信息 -->
    <el-dialog
      class="dialog-content"
      border
      :title="isUnitBank ? '参保单位信息' : '社保卡信息'"
      :visible.sync="dialogInjuryTable"
      width="70%"
    >
      <ep-table :data="injuryTableData" edited="true" @rowclick="getRowData">
        <ep-table-column editor="index" header="序号"></ep-table-column>
        <ep-table-column
          editor="text"
          name="regionName"
          header="统筹区"
          v-if="isUnitBank"
        ></ep-table-column>
        <ep-table-column
          editor="text"
          name="aae009"
          header="银行开户名"
        ></ep-table-column>
        <ep-table-column
          editor="text"
          name="aae668"
          header="开户行名称"
        ></ep-table-column>
        <ep-table-column
          editor="text"
          name="aae010"
          header="银行账号"
        ></ep-table-column>
        <ep-table-column
          editor="button"
          name="collectStatus"
          header="缴费状态"
          v-if="isUnitBank"
        >
          <template slot-scope="scope">
            <span>{{ unitBankOption[scope.row.row.collectStatus] }}</span>
          </template>
        </ep-table-column>
      </ep-table>
    </el-dialog>
  </div>
</template>

<script type="es6">
export default {
  props: {
    hasTitle: { // 是否有表头标题
      type: Boolean,
      default: true // 默认有
    },
    titleName: {
      type: String,
      default: '待遇发放信息'
    },
    isMain: { // 是否是主体确认页面
      type: Boolean,
      default: false // 默认不是
    },
    receiveObj: { // 领取人
      type: Object,
      default: function() {
        return {
          isShow: false, // 是否有领取人 默认无
          required: false, // 领取人是否需要必填校验 默认不必填
          colspan: '12' // 领取人 colspan
        }
      }
    },
    noRequired: { // 是否不需要必填校验
      type: Boolean,
      default: false // 默认需要
    },
    colspan: {
      type: String,
      default: '8'
    },
    labelWidth: {
      type: String,
      default: '140'
    },
    defaultIssue: {
      type: String | Number,
      default: ''
    },
    // 发放方式option类型
    issueType: {
      type: String,
      default: 'default'
    },
    issueList: { // 发放方式下拉框
      type: Array,
      default: function() {
        return []
      }
    },
    panel: { // 工亡亲属传入亲属的，亲属单位代发（需要用职工的 deatherUnitId,deatherId ）；其他传入工伤职工的
      type: Object,
      default: function() {
        return {}
      }
    },
    initBank: {
      type: Object,
      default: function() {
        return {}
      }
    },
    devicesOptions: { // 辅助器具下拉框
      type: Array,
      default: function() {
        return []
      }
    },
    isRelative: { // 是否供养亲属
      type: Boolean,
      default: false
    },
    onlyRead: { // 是否所有只读
      type: Boolean,
      default: false
    },
    noFillBank: { // 不根据发放方式调用接口回填银行信息，用户手动填写。默认需要调用接口
      type: Boolean,
      default: false
    },
    aae009Bug: { // 是否存在aae009不能回填的bug
      type: Boolean,
      default: false
    },
    showComChoose: { // 是否有单位选择，默认有，特殊情况没有
      type: Boolean,
      default: true
    },
    showMedSelect: { // 是否有机构选择，默认有，特殊情况没有
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      regionCode: this.$store.state.loginuserInfo.areaId || '',
      bankDisabled: false,
      eleDisabled: true, // 是否禁止编辑
      accNameDisabled: false, // 账户名是否可编辑
      drawerDisabled: false, // 领取人是否可手动输入 // 需求：不准客户自己填写领取人，必须有身份证号，若发错钱有迹可循 // 二次需求3.16：产品要求完全放开，任用户填写
      has11Type: true, // 是否有委托银行发放
      bankDic: [],
      form: {
        receiveidcard: '',
        receivename: '',
        receiptorRelation: '',
        unitBankStatus: '',
        aae760: '0', // 是否社保卡发放，社保卡发放并入 委托银行发放方式中
        aae145: '', // 发放方式
        akb020: '', // 辅助器具机构
        aae668: '', // 开户行网点名
        aae009: '', // 银行户名(银行开户名)
        aae010: '', // 银行账号(银行账号)
        aaf216: '', // 银行行别代码
        aaf002: '',
        aaz003: '' // 银行id
      },
      nameChangeMap: {
        issueMode: 'aae145',
        medicalInstitutionNum: 'akb020',
        bankDeptName: 'aae668',
        bankAccountName: 'aae009',
        bankAccountNumber: 'aae010',
        bankCode: 'aaf216',
        bankDeptCode: 'aaf002',
        bankId: 'aaz003'
      },
      pageinfo: {
        page: 1,
        size: 20,
        total: 0
      },
      bankDeptList: [],
      devicesInstitutionInfo: [],
      dialogInjuryTable: false, // 社保卡或单位代发多条信息
      unitBankOption: {
        1: '正常',
        2: '暂停'
      },
      isUnitBank: '', // 是否单位代发银行
      injuryTableData: {
        Data: [],
        total: 0
      },
      rules: {
        aae760: [
          {
            required: !this.noRequired,
            validator: this.$rules.test_noBlank,
            trigger: 'change'
          }
        ],
        aae145: [
          {
            required: !this.noRequired,
            validator: this.$rules.test_noBlank,
            trigger: 'change'
          }
        ],
        akb020: [
          {
            required: !this.noRequired,
            validator: this.$rules.test_noBlank,
            trigger: 'change'
          }
        ],
        aaf216: [
          {
            required: !this.noRequired,
            validator: this.$rules.test_noBlank,
            trigger: 'blur'
          }
        ],
        aae010: [
          { required: !this.noRequired, validator: this.$rules.noChinese, trigger: ['blur', 'change'] }
        ],
        aae009: [
          {
            required: !this.noRequired,
            validator: this.$rules.test_noBlank,
            trigger: 'blur'
          }
        ],
        aaf002: [
          { required: !this.noRequired, validator: this.$rules.num, trigger: ['blur', 'change'] }
        ],
        receiveidcard: [
          {
            required: false,
            // required: this.receiveObj.required,
            validator: this.$rules.isId,
            trigger: 'blur'
          }
        ],
        receivename: [
          {
            required: false,
            // required: this.receiveObj.required,
            validator: this.$rules.test_noBlank,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    // 是否社保卡发放
    isSocialCard() {
      return this.form.aae760 === '1'
    },
    issueOptions() {
      return this.issueList.length > 0 ? this.issueList : this.dealIssueMode(this.issueType)
    }
  },
  watch: {
    // 父组件初始化获取的银行信息
    initBank: {
      handler(value) {
        if (!this.common.isBlank(value)) {
          if (Object.keys(value).includes('issueMode')) {
            let keyList = Object.keys(value)
            keyList.forEach(item => {
              if (this.nameChangeMap[item]) {
                if (item === 'issueMode') {
                  // 网报来源数据依然有80，此处全局转换
                  this.form[this.nameChangeMap[item]] = value[item] === '80' ? '11' : value[item]
                } else {
                  this.form[this.nameChangeMap[item]] = value[item]
                }
              }
            })
            this.form.aae760 = value['issueMode'] === '80' ? '1' : value['aae760'] || '0'
          } else {
            // 此处可能获取到的是空值，就用空值覆盖，保持与父组件银行信息一致。
            for (let key in this.form) {
              if (key === 'aae145') {
                // 网报来源数据依然有80，此处全局转换
                this.form[key] = value[key] === '80' ? '11' : value[key]
              } else {
                this.form[key] = value[key] || ''
              }
            }
            this.form.aae760 = value['aae145'] === '80' ? '1' : value['aae760'] || '0'
          }
          // 单位发放/社保卡发放，全部禁用
          if ((this.form.issueMode === '31' || (this.form.issueMode === '11' && this.form.aae760 === '1')) ||
          (this.form.aae145 === '31' || (this.form.aae145 === '11' && this.form.aae760 === '1'))) {
            this.bankDisabled = true
          }
          // 委托银行发放、邮政发放，如果户名有值，不可更改
          if ((this.form.bankAccountName && (this.form.issueMode === '12' || (this.form.issueMode === '11' && this.form.aae760 === '0'))) ||
          (this.form.aae009 && (this.form.aae145 === '12' || (this.form.aae145 === '11' && this.form.aae760 === '0')))) {
            this.accNameDisabled = true
          }
          if ((this.form.issueMode === '31' || this.form.aae145 === '31') && !this.form.unitBankStatus) {
            this.form.unitBankStatus = '1'
          }
          this.clearValidate()
        }
      },
      deep: true,
      immediate: true
    },
    form: {
      handler(value) {
        console.log('updateBank')
        let bankInfo = {...value}
        if (!this.common.isBlank(this.initBank) && Object.keys(this.initBank).includes('issueMode')) {
          let keyList = Object.keys(this.initBank)
          keyList.forEach(item => {
            if (this.nameChangeMap[item]) {
              bankInfo[item] = value[this.nameChangeMap[item]]
              delete bankInfo[this.nameChangeMap[item]]
            }
          })
        }
        if ((bankInfo.aae145 !== '31' || bankInfo.issueMode !== '31') && bankInfo.unitBankStatus) {
          bankInfo.unitBankStatus = ''
        }
        if (!bankInfo.aae009 && this.aae009Bug) {
          bankInfo.aae009 = this.initBank.aae009
          this.form.aae009 = this.initBank.aae009
        }
        this.$emit('updateBankInfo', bankInfo, true)
      },
      deep: true
    },
    'form.receivename': {
      handler(value) {
        // 非单位和非机构的 个人账户
        if (this.form.aae145 !== '44' && this.form.aae145 !== '31') {
          if (value) {
            this.form.aae009 = value
          } else {
            if (!this.receiveObj.required) {
              this.form.aae009 = this.panel.aac003 || ''
            } else {
              this.form.aae009 = ''
            }
          }
          this.accNameDisabled = !this.noFillBank && !!this.form.aae009
        }
      },
      immediate: true
    },
    issueOptions: {
      handler(data) {
        let has11Type = false
        if (data.length > 0) {
          data.forEach(item => {
            if (item.key === '11') {
              has11Type = true
            }
          })
        }
        this.has11Type = has11Type
      },
      deep: true,
      immediate: true
    },
    'form.receiptorRelation': {
      handler(data) {
        if (!data || (data && data === '3') || this.form.aae145 === '31') {
          this.rules.receiveidcard[0].required = false
          this.rules.receivename[0].required = false
          if (this.$refs['form']) {
            this.$refs['form'].clearValidate('receiveidcard')
            this.$refs['form'].clearValidate('receivename')
          }
        } else {
          this.rules.receiveidcard[0].required = this.receiveObj.required
          this.rules.receivename[0].required = this.receiveObj.required
        }
      },
      immediate: true
    },
    'form.aae145': {
      handler(data) {
        if (!data || (data && data === '31') || this.form.receiptorRelation === '3') {
          this.rules.receiveidcard[0].required = false
          this.rules.receivename[0].required = false
          if (this.$refs['form']) {
            this.$refs['form'].clearValidate('receiveidcard')
            this.$refs['form'].clearValidate('receivename')
          }
        } else {
          this.rules.receiveidcard[0].required = this.receiveObj.required
          this.rules.receivename[0].required = this.receiveObj.required
        }
      },
      immediate: true
    }
  },
  created() {
    if (this.defaultIssue) {
      this.form.aae145 = String(this.defaultIssue)
    }
  },
  mounted() {
    this.getOptions()
    // this.clearValidate()
  },
  methods: {
    // 银行行别下拉
    async getOptions() {
      this.bankDic = await this.common.getBankCodeFn()
      let hasMed = false
      let hasMed2 = false
      if (this.issueOptions.length > 0) {
        this.issueOptions.forEach(item => {
          if (item.key === '44') {
            hasMed = true
          }
          if (item.key === '43' || item.key === '42') {
            hasMed2 = true
          }
        })
      }
      if (this.showMedSelect && this.common.isBlank(this.devicesOptions) && hasMed) {
        this.getMedOptions()
      } else if (this.showMedSelect && this.common.isBlank(this.devicesOptions) && hasMed2) {
        this.getMedicalOptions()
      } else {
        this.devicesInstitutionInfo = [ ...this.devicesOptions ]
      }
    },
    // 辅助器具机构
    getMedOptions() {
      this.$api.commonGet('/treatment/indemnity/assistiveDevicesSearch/getMedicalInstitutionInfoList', {
        regionCode: this.panel.aab359 || this.regionCode
      }).then(res => {
        if (res.success) {
          if (res.result && res.result.length > 0) {
            let medOptions = []
            res.result.forEach(item => {
              medOptions.push({
                id: item.blc577,
                blc577: item.blc577,
                key: item.devicesInstitutionNum,
                value: item.devicesInstitutionName
              })
            })
            this.devicesInstitutionInfo = [...medOptions]
          } else {
            this.devicesInstitutionInfo = []
          }
        } else {
          this.devicesInstitutionInfo = []
        }
      })
    },
    // 医疗机构下拉（所选统筹区下）[入参可传多个统筹区用逗号隔开]
    getMedicalOptions() {
      this.$api.commonGet('/treatment/indemnity/hospitalManagement/getMedicalInstitutionInfoList', {
        aaa027: this.panel.aaa027
      }).then(res => {
        if (res.success) {
          if (res.result && res.result.length > 0) {
            let resultList = res.result
            let medOptions = []
            resultList.forEach(item => {
              let itemObj = {
                key: item.medicalInstitutionNum || '',
                value: item.medicalInstitutionName || '',
                id: item.medicalInstitutionId || ''
              }
              medOptions.push(itemObj)
            })
            this.devicesInstitutionInfo = [...medOptions]
          } else {
            this.devicesInstitutionInfo = []
          }
        } else {
          this.devicesInstitutionInfo = []
        }
      })
    },
    clearValidate() {
      this.$nextTick(() => {
        this.$refs['form'].clearValidate('aaf216')
        this.$refs['form'].clearValidate('aaf002')
        this.$refs['form'].clearValidate('aae668')
        this.$refs['form'].clearValidate('aae010')
        this.$refs['form'].clearValidate('aae009')
        this.$refs['form'].clearValidate('aae145')
        this.$refs['form'].clearValidate('aae760')
      })
    },
    switchInputFocusFn() {
      // 键盘敲击回车切换input
      const $inputs = document.querySelectorAll('#switchInputFocus .el-input__inner')
      let count = 0

      $inputs.forEach(function(e, i) {
        if (!e.disabled) {
          e.classList.add('switchInputIndex' + count)
          e.setAttribute('data-nextIndex', count + 1)
          count += 1
        }
      })
    },
    listenerKeyDown(e) {
      const nextIndex = e.target.getAttribute('data-nextIndex')
      const $nextInput = document.querySelector(
        '.switchInputIndex' + nextIndex
      )
      $nextInput && $nextInput.focus()
    },
    // 点击enter触发(银行)
    onEnter(data) {
      // 在此处触发enter事件，data是框里面的值
    },
    // 点击放大镜触发事件
    onSearch(data) {
      // 在此处触发点击放大镜的事件，data是框里面的值
      this.pageinfo = {
        page: 1,
        size: 20,
        total: 0
      }
      this.bankDeptList = []
      this.form.aaf002 = '' // 客户要求，查询不携带开户行号进弹框
    },
    // 点击查询触发事件
    check(aaf002, aae668, aaf216) {
      // searchtabledata传到子组件中 后台列表值赋值给它
      this.aaf002 = aaf002
      this.aae668 = aae668
      this.aaf216 = aaf216
      this.pageinfo.page = 1
      this.exeSearch()
    },
    // 表格双击事件
    dbClick(data) {
      this.form.aaf002 = data.aaf002
      this.form.aae668 = data.aae668
      this.form.aaf216 = data.aaf216
      this.form.aaz003 = data.aaz003
    },
    // 确定按钮
    submit(data) {
      this.dbClick(data)
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
    exeSearch() {
      let bankJson = {
        aaf216: this.aaf216,
        aaf002: this.aaf002,
        aae668: this.aae668,
        pageRows: this.pageinfo.size,
        pageNumber: this.pageinfo.page
      }
      this.$api.commonGet(this.$insiisApi + '/common/bankInfo', bankJson).then((res) => {
        if (res.success) {
          this.bankDeptList = res.result.list || []
          this.pageinfo.total = Number(res.result.total || '0')
        } else {
          this.bankDeptList = []
          this.pageinfo = {
            page: 1,
            size: 20,
            total: 0
          }
          this.$message.error(res.resultDes)
        }
      })
    },
    // 获取银行信息备用接口
    async getBankInfo() {
      let bankInfo = await this.common.getBankInfo(this.panel.aac001, this.panel.aab359)
      this.common.forKeyValue(bankInfo, this.form)
      // 主体申请页面，单位代发的时候，不要默认值，此接口未有返回单位代发类型，避免歧义
      if (this.isMain) {
        this.form.unitBankStatus = ''
      }
    },
    // 处理发放方式下拉列表
    dealIssueMode(val) {
      let list = [
        {
          key: '11',
          value: '委托银行发放'
        },
        {
          key: '12',
          value: '委托邮局发放'
        },
        {
          key: '31',
          value: '单位代发'
        }
      ]
      switch (val) {
        case 'all':
          let add = [
            {
              key: '44',
              value: '辅助器具机构发放'
            }, {
              key: '42',
              value: '协议医院机构发放'
            }, {
              key: '43',
              value: '康复医院机构发放'
            }
          ]
          list = [
            ...list,
            ...add
          ]
          this.has11Type = true
          break
        case 'helper':
          list.push({
            key: '44',
            value: '辅助器具机构发放'
          })
          this.has11Type = true
          break
        case 'medDev':
          list = [{
            key: '42',
            value: '协议医院机构发放'
          }]
          this.has11Type = false
          break
        case 'AuxDev':
          list = [{
            'key': '44',
            'value': '辅助器具机构发放'
          }]
          this.has11Type = false
          break
        case 'companyType':
          list = [
            {
              key: '31',
              value: '单位代发'
            }, {
              key: '42',
              value: '协议医院机构发放'
            }
          ]
          this.has11Type = false
          break
        default:
          this.has11Type = true
          break
      }
      return list
    },
    changeform(data, type) {
      this.form[type] = data
      if (type === 'akb020' && data && this.form.aae145 === '44') {
        this.resetForm('akb020')
        let options = this.devicesInstitutionInfo.filter((item) => {
          return item.key === data
        })
        this.$api.commonGet('/treatment/indemnity/assistiveDevicesChange/onChangeGetPayInfo', {
          devicesInstitutionNum: data,
          devicesInstitutionID: options.length > 0 ? options[0].blc577 || options[0].id : ''
        }).then((res) => {
          if (res.success) {
            if (res.result) {
              this.fillBankFn(res.result, '44')
            }
          } else {
            this.$message.error(res.resultDes)
          }
        })
      }
      if (type === 'akb020' && data && (this.form.aae145 === '42' || this.form.aae145 === '43')) {
        this.getMedBankInfoFn(data)
      }
      if (type === 'aaf002') {
        if (data === '') {
          this.form.aae668 = ''
          this.form.aaf216 = ''
          this.$nextTick(() => {
            this.bankDeptList = []
            this.$refs['form'].clearValidate('aaf216')
            this.$refs['form'].clearValidate('aae668')
            this.$refs['form'].clearValidate('aaf002')
          })
        }
      }
      if (type === 'aae760') {
        this.resetForm('aae760')
        if (data === '1') {
          // 社保卡发放
          if (this.form.aae145 !== '11') {
            this.form.aae145 = '11'
          }
          this.getBankCardInfo()
        } else if (data === '0') {
          this.getBankMsgFn(this.form.aae145)
        }
      }
      if (type === 'aae145') {
        if (!data) {
          this.resetForm()
        }
        this.clearValidate()
        if (this.noFillBank) {
          // 手动选择，不请求接口联动回填
          return
        }
        this.bankDisabled = false
        // 根据不同的方法方式，调用接口回填银行信息
        if (data === '12' || (data === '11' && this.form.aae760 === '0')) {
          this.resetForm('aae760')
          this.getBankMsgFn(data)
        } else if (data === '31') {
          this.resetForm()
          this.form.unitBankStatus === '2' ? this.getUnitBank() : this.getInjuryUnitBank()
        } else if (data === '11' && this.form.aae760 === '1') {
          this.resetForm('aae760')
          // 社保卡发放
          this.getBankCardInfo()
        }
      }
      if (type === 'receiveidcard') {
        if (data && this.common.checkIDCard(data)) {
          this.$refs['form'].clearValidate('receiveidcard')
          if (this.form.aae145 === '11' && this.form.aae760 === '1') {
            // 社保卡发放
            this.getBankCardInfo()
          }
          this.$api.commonGet(this.$insured + '/person/personFlexible/queryInsuranceId', {
            aac002: data,
            aab359: this.panel.aab359 || this.regionCode,
            aab001: '1'
          }).then(res => {
            if (res.success && res.result && res.result.length > 0) {
              this.form.receivename = res.result[0].aac003 || ''
            } else {
              this.form.receivename = ''
              this.$message.error('未查询到领取人姓名')
            }
          })
        }
      }
    },
    resetForm(str) {
      if (str !== 'akb020') {
        this.form.akb020 = ''
      }
      if (str !== 'aae760') {
        this.form.aae760 = '0'
      }
      this.form.aaz003 = ''
      this.form.aae668 = ''
      this.form.aaf216 = ''
      this.form.aaf002 = ''
      this.form.aae010 = ''
      this.form.aae009 = ''
      this.form.unitBankStatus = this.form.aae145 === '31' ? this.form.unitBankStatus : ''
      this.clearValidate()
    },
    // radio change 工伤单位发放
    changeUnitBank(val) {
      this.resetForm()
      this.form.unitBankStatus = val
      if (val === '1') {
        this.getInjuryUnitBank()
      } else {
        this.getUnitBank()
      }
    },
    // 工伤 11或12 的银行信息
    getBankMsgFn(data) {
      this.$api.commonGet('/common/treatment/injury/getBankByIssuemode', {
        aae145: data
      }).then((res) => {
        if (res.success) {
          if (res.result) {
            this.fillBankFn(res.result, data)
          }
        } else {
          this.$message.error(res.resultDes)
        }
      })
    },
    // 获取工伤 31 单位银行信息
    getInjuryUnitBank() {
      if (!this.form.unitBankStatus) {
        this.form.unitBankStatus = '1'
      }
      // 如果是工亡亲属，取死亡人员的单位信息 deatherUnitId ；如果存在关系转移，取新转移的单位 aab001After ；其他为该人员原单位 unitId 。
      this.$api.commonGet('/treatment/indemnity/modify/bankInfo', {
        aab001: this.isRelative ? this.panel.deatherUnitId : this.panel.aab001After || this.panel.aab001,
        aab359: this.panel.aab359
      }).then((res) => {
        if (res.success) {
          if (res.result && res.result.individualBank) {
            this.fillBankFn(res.result.individualBank, '31')
          } else {
            this.fillBankFn('', '31')
          }
        } else {
          this.fillBankFn('', '31')
          this.$message.error(res.resultDes)
        }
      })
    },
    // 获取参保单位银行账户，亲属单位代发（需要用职工的）
    getUnitBank() {
      if (!this.form.unitBankStatus) {
        this.form.unitBankStatus = '2'
      }
      this.$api.commonGet('/treatment/indemnity/injuryAcceptCtr/getUnitBankInfo', {
        aab359: this.panel.aab359,
        aac001: this.isRelative ? this.panel.deatherId : this.panel.aac001
        // aac001: this.panel.aac001
      }).then((res) => {
        if (res.success) {
          if (res.result && res.result.list && res.result.list.length === 1) {
            this.fillBankFn(res.result.list[0], '31')
          } else if (res.result && res.result.list && res.result.list.length > 1) {
            this.isUnitBank = true
            this.dialogInjuryTable = true
            this.injuryTableData.Data = res.result.list
          }
        } else {
          this.fillBankFn('', '31')
          this.$message.error(res.resultDes)
        }
      })
    },
    // 工伤社保卡发放
    getBankCardInfo() {
      let idcard = ''
      if (this.form.receiveidcard) { // 有无领取人
        idcard = this.form.receiveidcard
      } else {
        idcard = this.panel.aac002 || this.panel.insuranceId
      }
      this.$api.commonGet('/treatment/indemnity/pay/getBackInfo', {
        aab359: this.panel.aab359 || this.panel.regionCode || '0',
        aac002: idcard
      }).then(res => {
        if (res.success) {
          if (res.result && res.result.bankCardInfo && res.result.bankCardInfo.length === 1) {
            this.fillBankFn(res.result.bankCardInfo[0], '11')
          } else if (res.result && res.result.bankCardInfo && res.result.bankCardInfo.length > 1) {
            this.dialogInjuryTable = true
            this.injuryTableData.Data = res.result.bankCardInfo
          }
        } else {
          this.bankDisabled = false // 如果没有获取到数据，可以手动填写
          this.resetForm('aae760')
          this.$message.error(res.resultDes)
        }
      })
    },
    /** 获取机构银行发放信息
     * @param {string} akb020 // 机构编码（非id）
     */
    getMedBankInfoFn(akb020) {
      let param = {
        aaa027: this.panel.aaa027 ? this.panel.aaa027 : null,
        aab359: this.panel.aab359 ? this.panel.aab359 : null,
        akb020: akb020,
        isPage: 1,
        pageSize: '10', // 每页几条
        page: '1' // 第几页
      }
      this.$api.commonGet('/treatment/indemnity/hospitalManagement/getMedicalInstitutionInfo', param).then(res => {
        if (res.success) {
          if (res.result && res.result.length > 0) {
            this.fillBankFn(res.result[0])
          }
        } else {
          this.$message.error(res.resultDes)
        }
      })
    },
    // 银行数据回填
    fillBankFn(bankInfo, aae145) {
      if (!this.common.isBlank(bankInfo)) {
        let bankAll = {}
        // aae145 特殊情况赋值
        if (aae145) {
          bankAll = {
            ...bankInfo,
            aae145
          }
        } else if (!this.form.aae145 && !bankInfo.aae145) {
          bankAll = {
            ...bankInfo,
            aae145: '11'
          }
        } else {
          bankAll = {
            ...bankInfo
          }
        }

        // 银行信息回填
        this.common.forKeyValue(bankAll, this.form)

        if (this.form.aae145 !== '31' && this.form.aae145 !== '44' && this.form.aae145 !== '42' && this.form.aae145 !== '43' && this.form.aae760 !== '1') {
          // aae009 特殊情况赋值
          if (this.form.receivename) {
            this.form.aae009 = this.form.receivename
          } else {
            this.form.aae009 = this.panel.aac003
          }
        }
        // if (this.form.aae145 === '44' && !this.form.akb020 && bankInfo.akb020) {
        //   this.form.akb020 = bankInfo.akb020
        // }
        // if (this.form.aae145 === '31' && !this.form.unitBankStatus && bankInfo.unitBankStatus) {
        //   this.form.unitBankStatus = bankInfo.unitBankStatus
        // }
        if (this.form.aae145 === '31' || (this.form.aae145 === '11' && this.form.aae760 === '1')) {
          this.bankDisabled = true
        } else {
          this.bankDisabled = false
        }

        this.accNameDisabled = !this.noFillBank && (this.form.aae145 === '11' || this.form.aae145 === '12') && !!this.form.aae009
      } else {
        this.resetForm()
      }
    },
    // 社保卡或单位多条信息
    getRowData(row) {
      this.common.forKeyValue(row, this.form)
      this.dialogInjuryTable = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
