<template>
  <!-- 获取统筹区行政区下拉组件:有三级下拉,和二级下拉

  <epl-areaSelectGroup
    labelWidth="140"
    ref="areaSelectGroup"
    :colspan="[0,8,6]"
    labelName="统筹区"
    :isThree="false"
    :initData="[form.aae027,form.aae027]"
    @updateArea="changeQueryInfo"
  ></epl-areaSelectGroup>

  // 清空 (清空需置空父组件相关参数)
  this.$refs.areaSelectGroup.resetForm()
  // 必填校验
  refs = this.$refs.areaSelectGroup && this.$refs.areaSelectGroup.$refs['areaForm']
  // 必填校验调用
  if (!this.someValidateFn('queryInfo') || !this.someValidateFn('areaForm')) {
    return
  }
  -->
  <div>
    <el-form :model="form" :rules="rules" ref="areaForm">
      <ep-select
        v-if="isThree"
        :labelWidth="labelWidth"
        :colspan="colspan[0]?String(colspan[0]):'4'"
        name="cityCode"
        noList
        :SelfDictionaries="cityOptions"
        :label="labelName"
        placeholder="请选择"
        p="R"
        @select-message="changeform"
        :value="form.cityCode"
      ></ep-select>
      <ep-select
        :multiple="areaMultiple"
        :colspan="colspan[1]?String(colspan[1]):'3'"
        name="areaCode"
        noList
        :SelfDictionaries="areaOptions"
        :label="isThree?'':labelName"
        :labelWidth="isThree?'0':labelWidth"
        placeholder="请选择"
        p="R"
        @select-message="changeform"
        :value="form.areaCode"
        :eleDisabled="form.cityCode==='330000'"
      ></ep-select>
      <ep-select
        :multiple="regionMultiple"
        :colspan="colspan[2]?String(colspan[2]):'3'"
        noList
        :SelfDictionaries="regionOptions"
        name="regionCode"
        label
        labelWidth="0"
        placeholder="请选择"
        p="R"
        @select-message="changeform"
        :value="form.regionCode"
        :eleDisabled="form.cityCode==='330000'"
      ></ep-select>
    </el-form>
  </div>
</template>

<script type="es6">
export default {
  data() {
    return {
      areaCode: '',
      regionCode: '',
      cityOptions: [],
      areaOptions: [],
      regionOptions: [],
      form: {
        cityCode: '',
        areaCode: '',
        regionCode: ''
      },
      rules: {
        cityCode: [
          { required: true, validator: this.$rules.test_noBlank, trigger: 'change' }
        ],
        areaCode: [
          { required: false, validator: this.$rules.test_noBlank, trigger: 'change' }
        ],
        regionCode: [
          { required: false, validator: this.$rules.test_noBlank, trigger: 'change' }
        ]
      }
    }
  },
  props: {
    rulesArr: {
      type: Array,
      default: function() {
        return [] // 1,1,0
      }
    },
    isThree: { // 是否三级统筹区选择
      type: Boolean,
      default: false // 默认 否
    },
    labelName: {
      type: String,
      default: '地区'
    },
    colspan: {
      type: Array,
      default: function() {
        return [4, 3, 3]
      }
    },
    labelWidth: {
      type: String,
      default: '140'
    },
    hasAllCity: { // 是否获取所有 cityCode
      type: Boolean,
      default: false
    },
    isAllarea: { // 是否有全省选项
      type: Boolean,
      default: false
    },
    areaMultiple: { // areaCode 是否多选
      type: Boolean,
      default: false
    },
    regionMultiple: { // regionCode 是否多选
      type: Boolean,
      default: false
    },
    initData: { // 父组件传过来的值['','',''] 三级数组框
      type: Array,
      default: function() {
        return ['', '', '']
      }
    },
    keyNameChange: { // 是否返回修改后的字段名
      type: Boolean,
      default: true
    }
  },

  created() {
    this.regionCode = this.$store.state.loginuserInfo.areaId
    if (this.rulesArr && this.rulesArr.length > 0) {
      if (this.rulesArr[0]) {
        this.rules.cityCode[0].required = true
      }
      if (this.rulesArr[1]) {
        this.rules.areaCode[0].required = true
      }
      if (this.rulesArr[2]) {
        this.rules.regionCode[0].required = true
      }
    }
    if (this.hasAllCity || !this.isThree) {
      this.rules.areaCode[0].required = true
    }
    if (this.regionMultiple) {
      this.form.regionCode = []
    }
    this.getCityOption()
  },
  watch: {
    initData: {
      handler(val) {
        // 赋值 父组件传过来的值
        if (val && val.length === 3) {
          this.form.cityCode = val[0] || ''
          this.form.areaCode = val[1] || ''
          this.form.regionCode = val[2] || ''
        } else {
          this.form.areaCode = val[0] || ''
          this.form.regionCode = val[1] || ''
        }
      }
    },
    'form.cityCode': {
      handler(value) {
        if (this.keyNameChange) {
          this.$emit('updateArea', value, 'cityCode')
        } else {
          this.$emit('updateArea', value, 'cityCode') // cityCode
        }
      }
    },
    'form.areaCode': {
      handler(value) {
        if (this.keyNameChange) {
          this.$emit('updateArea', value, 'aaa027') // areaCode
        } else {
          this.$emit('updateArea', value, 'areaCode') // areaCode
        }
      }
    },
    'form.regionCode': {
      handler(value) {
        if (this.keyNameChange) {
          this.$emit('updateArea', value, 'aab359') // regionCode
        } else {
          this.$emit('updateArea', value, 'regionCode') // regionCode
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    resetForm() {
      this.form.cityCode = ''
      this.form.areaCode = ''
      this.form.regionCode = this.regionMultiple ? [] : ''
      if (this.isThree) {
        this.areaOptions = []
      }
      this.regionOptions = []
      this.$refs.areaForm.resetFields()
    },
    // 获取所有 cityCode
    getAllcityOption() {
      this.$api.commonGet('/empfinance/finance/balance/getAllRegionCodes').then(res => {
        if (res.success) {
          this.cityOptions = res.result && res.result.length > 0 ? res.result : []
          if (this.cityOptions.length > 0) {
            for (let i = 0; i < this.cityOptions.length; i++) {
              if (this.regionCode === '339900') {
                this.form.cityCode = '339900'
                this.getZoneOption(this.form.cityCode, 'area')
                break
              } else if (this.cityOptions[i].key.substr(0, 4) === this.regionCode.substr(0, 4)) {
                this.form.cityCode = this.cityOptions[i].key
                this.getZoneOption(this.form.cityCode, 'area')
                break
              }
            }
          } else {
            this.form.cityCode = ''
          }
        } else {
          this.cityOptions = []
          this.areaOptions = []
          this.regionOptions = []
          this.$message.error(res.resultDes)
        }
      })
    },
    // 根据登录用户获取 cityCode
    getThisCityOption() {
      this.$api.commonGet(this.$insiisApi + '/common/getCorrespondRegionCodes', {
        aaa027: this.regionCode || ''
      }).then(res => {
        if (res.success) {
          this.cityOptions = res.result && res.result.areas && res.result.areas.length > 0 ? res.result.areas : []
          // isAllarea 是否全省
          if (this.isAllarea && this.regionCode === '339900') {
            this.cityOptions.unshift({
              key: '330000',
              value: '全省'
            })
            this.form.cityCode = this.cityOptions.length > 0 ? '339900' : ''
          } else {
            this.form.cityCode = this.cityOptions.length > 0 ? this.cityOptions[0].key : ''
          }
          this.changeform(this.form.cityCode, 'cityCode')
          this.areaCode = res.result && res.result.areaCode ? res.result.areaCode : ''
          if (!this.form.areaCode) {
            this.form.areaCode = this.areaCode
          }
          this.getZoneOption(this.form.areaCode, 'region')
        } else {
          this.cityOptions = []
          this.areaOptions = []
          this.regionOptions = []
          this.$message.error(res.resultDes)
        }
      })
    },
    // 统筹区二级下拉获取接口
    // , {regionCode: '339900'}
    getAreaList() {
      this.$api.commonGet(this.$insiisApi + '/common/getMedicalInstitutionArea').then(res => {
        if (res.success) {
          let resAreaList = []
          this.areaOptions = []
          if (res.result.userMes && res.result.userMes.length > 0) {
            resAreaList = res.result.userMes
            resAreaList.forEach(item => {
              let regions = []
              if (item.regions && item.regions.length > 0) {
                item.regions.forEach(reg => {
                  for (var key in reg) {
                    regions.push({
                      key: key,
                      value: reg[key]
                    })
                  }
                })
              }
              this.areaOptions.push({
                key: item.areaCode,
                value: item.areaCodeName,
                children: regions
              })
            })
          }
          // 默认统筹区和行政区
          if (!this.form.areaCode) {
            this.form.areaCode = this.areaOptions[0].key || ''
          }
          this.getZoneOption(this.form.areaCode, 'region')
        } else {
          this.$message.error(res.resultDes)
        }
      })
    },
    // 获取地区下拉
    getCityOption() {
      if (this.isThree) {
        if (this.hasAllCity) {
          // 获取所有 cityCode
          this.getAllcityOption()
        } else {
          // 根据登录用户获取 cityCode
          this.getThisCityOption()
        }
      } else {
        this.getAreaList()
      }
    },
    /**
     * 获取下一级地区下拉
     * @param {*} data 本级地区 code
     * @param {*} type 下一级：area【统筹区】，region【行政区】
     */
    getZoneOption(data, type) {
      if (data) {
        let list = []
        let zone = type === 'region' ? 'area' : 'city'
        list = this[`${zone}Options`].filter(item => {
          return item.key === data
        })
        if (list && list.length > 0) {
          this[`${type}Options`] = list[0].children || []
          if (type === 'area') {
            if (this[`${type}Options`].length > 0) {
              for (let i = 0; i < this[`${type}Options`].length; i++) {
                if (this[`${type}Options`][i].key === this.regionCode) {
                  this.form.areaCode = this[`${type}Options`][i].key
                  break
                }
              }
              if (!this.form.areaCode) {
                this.form.areaCode = this[`${type}Options`][0].key
              }
              this.getZoneOption(this.form.areaCode, 'region')
            }
          } else if (type === 'region') {
            if (!this.form.regionCode) {
              this.form.regionCode = this.regionCode || ''
            }
          }
        }
      }
    },
    changeform(data, type, obj) {
      this.form[type] = data
      if (type === 'cityCode') {
        this.form.areaCode = ''
        if (this.regionMultiple) {
          this.form.regionCode = []
        } else {
          this.form.regionCode = ''
        }
        this.areaOptions = []
        this.regionOptions = []
        if (data !== '330000') {
          this.getZoneOption(data, 'area')
        }
      }
      if (type === 'areaCode') {
        if (this.regionMultiple) {
          this.form.regionCode = []
        } else {
          this.form.regionCode = ''
        }
        this.regionOptions = []
        this.getZoneOption(data, 'region')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
