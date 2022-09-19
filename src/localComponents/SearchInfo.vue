<template>
  <el-card class="er-card" v-if="isIfTrue || !isHide || isHideTwo">
    <ep-title>{{title}}</ep-title>
    <el-form @submit.native.prevent>
      <el-form-item label-width="140" :label="label" style="min-width:500px;">
        <el-row :gutter="15">
          <el-col :span="7">
            <el-input
              autofocus
              ref="inputref"
              :placeholder="placeholder"
              @blur="onBlur(searchinfo)"
              @change="onChange(searchinfo)"
              @keyup.native.enter="search"
              @input.native="changeValue(searchinfo)"
              v-model="searchinfo"
              :maxlength="maxlength"
              clearable
            >
              <!-- <i class="el-icon-search el-input__icon" slot="suffix" @click="onClick"></i> -->
            </el-input>
          </el-col>
          <!-- </el-form-item> -->
          <ep-select
            style="min-width:300px;display:inline-block;"
            v-if="showArea"
            colspan="4"
            label="统筹区"
            label-width="100"
            placeholder='请选择'
            :name="areaName"
            @select-message="changeform"
            :value="areaValue"
            noList
            :SelfDictionaries="areaOptions"
          ></ep-select>
          <!-- 删掉按钮大小 -->
          <el-col :span="6">
            <el-button type="primary" @click="search" :disabled="eleDisabledBtn">{{buttontext}}</el-button>
            <el-button v-if="isEmpty" @click="clearData">清空</el-button>
            <el-button v-if="again" @click="againClick">{{againName}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <el-dialog
      class="dialog-content"
      border
      title="个人信息查询"
      @close="closeDialog"
      :visible.sync="dialogVisible"
      width="70%"
      v-if="type.indexOf('PERSON') != '-1'"
    >
      <el-form :inline="true" :model="form" class="demo-form-inline" style="margin-bottom:20px;">
        <el-form-item colspan="16" :label="title">
          <el-input
            style="width:300px"
            size="medium"
            v-model="form.aac147"
            placeholder="请输入身份证号码查询"
          ></el-input>
        </el-form-item>
        <el-form-item colspan="16" label="证件类型">
          <el-select style="width:300px" v-model="form.aac058" placeholder="请选择">
            <el-option v-for="item in list" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
          <!--<el-input size="medium" v-model="form.aac058" placeholder="输入类型"></el-input>-->
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="query">查询</el-button>
        </el-form-item>
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
        <el-table-column
          v-for="(item,index) in tableList"
          :key="index"
          align="center"
          :prop="item.value"
          :label="item.name"
          :width="item.width || ''"
          min-width="80"
          :formatter="psTableFilter"
        ></el-table-column>
      </el-table>
      <!-- <div style="margin-bottom:10px;">
                <el-pagination
                        @size-change="handleSizeChange" @current-change="handlePageChange" background
                        layout="total, sizes, prev, pager, next, jumper" :page-sizes="[20, 40, 60, 80,100]"
                        :current-page="pager.page" :page-size="pager.size" :total="pager.total">
                </el-pagination>
      </div>-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      class="dialog-content"
      border
      title="单位信息查询"
      @close="closeDialog"
      :visible.sync="dialogVisible"
      width="70%"
      v-if="type.indexOf('COMPANY') != '-1'"
    >
      <el-form :inline="true" :model="form1" class="demo-form-inline" style="margin-bottom:20px;">
        <el-form-item colspan="16" :label="title">
          <el-input style="width:300px" v-model="form1.bab010" placeholder="请输入统一社会信用代码"></el-input>
        </el-form-item>
        <el-form-item colspan="16" label="行政区划">
          <el-select style="width:300px" v-model="form1.aab301" placeholder="请选择">
            <el-option v-for="item in list" :key="item.key" :label="item.value" :value="item.key"></el-option>
          </el-select>
          <!--<el-input  style="width:300px" v-model="form1.aab301" placeholder="请输入所属地区"></el-input>-->
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        class="ep-table"
        :data="tableData"
        style="width: 100%"
        height="220px"
        highlight-current-row
        @row-click="tableClick"
        @row-dblclick="tableDbClick"
      >
        <el-table-column
          v-for="(item,index) in tableList"
          :key="index"
          align="center"
          :prop="item.value"
          :label="item.name"
          :width="item.width || ''"
          min-width="80"
          :formatter="cpTableFilter"
        ></el-table-column>
      </el-table>
      <!-- <div style="margin-bottom:10px;">
                <el-pagination
                        @size-change="handleSizeChange" @current-change="handlePageChange" background
                        layout="total, sizes, prev, pager, next, jumper" :page-sizes="[20, 40, 60, 80,100]"
                        :current-page="pager.page" :page-size="pager.size" :total="pager.total">
                </el-pagination>
      </div>-->

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script type="es6">
export default {
  props: {
    isIfTrue: { // 是否强制显示
      type: Boolean,
      default: false // 默认否
    },
    tableList: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'PERSON'
    },
    eleDisabledBtn: {
      type: Boolean,
      default: false
    },
    isEmpty: {
      type: Boolean,
      default: false
    },
    againName: {
      type: String,
      default: '重发'
    },
    buttontext: {
      type: String,
      default: '查询'
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    noCheck: {
      type: Boolean,
      default: false
    },
    allow: {
      type: Boolean,
      default: false
    },
    clearValue: {
      type: Boolean,
      default: false
    },
    again: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: String,
      default: ''
    },
    showArea: {
      type: Boolean,
      default: false
    },
    areaName: {
      type: String,
      default: 'areaCode'
    },
    areaValue: {
      type: String,
      default: ''
    },
    areaOptions: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    value(val, oldValue) {
      this.searchinfo = val
    }
  },
  computed: {
    isHide() {
      return this.$store.getters.isHide
    },
    isHideTwo() {
      return this.$store.getters.isHideTwo
    }
  },
  created() {
    this.searchinfo = this.value
  },
  mounted() {
    this.$refs.inputref.focus()
  },
  data() {
    return {
      dialogVisible: false,
      searchinfo: '',
      form: {
        aac147: '',
        aac058: ''
      },
      form1: {
        bab010: '',
        aab301: ''
      },
      list: []
    }
  },
  methods: {
    changeform(val, name, obj, index) {
      this.$emit('changeform', val, name, obj, index)
    },
    changeValue(val) {
      if (!this.noCheck) {
        this.$nextTick(() => {
          if (!this.allow) {
            this.searchinfo = val.replace(/\s/g, '')
          }
        })
      }
    },
    onBlur(val) {
      this.$emit('onBlur', val)
      if (!this.noCheck) {
        this.$nextTick(() => {
          if (!this.allow) {
            this.searchinfo = val.replace(/\s/g, '')
          }
        })
      }
    },
    againClick() {
      this.$emit('againClick')
    },
    onChange(val) {
      if (!val) {
        this.$refs.inputref.focus()
      }
      if (!this.noCheck) {
        this.$nextTick(() => {
          if (!this.allow) {
            this.searchinfo = val.replace(/\s/g, '')
          }
        })
      }
    },
    // 清空输入内容
    clear() {
      this.searchinfo = ''
      if (this.showArea) {
        this.areaValue = ''
      }
    },
    /**
     * 个人统一过滤器
     */
    psTableFilter(row, column, cellValue, index) {
    },
    /**
     * 公司统一过滤器
     */
    cpTableFilter(row, column, cellValue, index) {},
    /**
     * 提交id
     */
    submit() {
    },
    /**
     * 表格点击事件
     */
    tableClick(row) {
    },
    /**
     * 表格双击事件
     */
    tableDbClick(row) {
    },
    /**
     * 查询
     */
    query() {
    },
    // 关闭遮罩
    closeDialog() {
      //   this.tableData = [];
    },
    // 点击放大镜
    onClick() {
      //   console.log("放大镜");
      // this.$message({
      //     type:'warning',
      //     message:'功能点尚未确定，确定后补全'
      // })
      this.dialogVisible = !this.dialogVisible
    },
    search() {
      sessionStorage.setItem('onlyOne', '')
      let value = this.searchinfo
      this.eleDisabled = true
      if (this.checkIDCard(value) || this.checkCode15_two(value)) {
        this.$emit('search', value, 'IdCard')
      } else if (this.CheckSocialCreditCode(value)) {
        // 统一社会信用代码
        this.$emit('search', value, 'SocialCreditCode')
      } else if (value === '') {
        this.$message({
          message: this.label + '不能为空!',
          type: 'error'
        })
      } else if (this.noCheck) {
        this.$emit('search', value, 'SocialCreditCode')
      } else {
        this.$emit('search', value, 'logid')
        // this.$message({
        //   message: this.label + '有误',
        //   type: 'error'
        // })
      }
    },
    clearData() {
      this.searchinfo = ''
      this.$emit('clearData')
      if (this.clearValue) {
        this.clear()
      }
      this.$refs.inputref.focus()
    },
    checkIDCard(value) {
      // 加权因子
      let weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      // 校验码
      let check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      let code = value + ''
      let last = value[17]// 最后一个
      let seventeen = code.substring(0, 17)
      // ISO 7064:1983.MOD 11-2
      // 判断最后一位校验码是否正确
      let arr = seventeen.split('')
      let len = arr.length
      let num = 0
      for (let i = 0; i < len; i++) {
        num = num + arr[i] * weight_factor[i]
      }
      // 获取余数
      let resisue = num % 11
      let last_no = check_code[resisue]
      let idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0-9][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/
      // 判断格式是否正确
      let format = idcard_patter.test(value)
      // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
      return !!(last === last_no && format)
    },
    CheckSocialCreditCode(value) {
      // 虚拟单位放开检验
      if (value.indexOf('X') === 0) {
        return true
      }
      let patrn = /^[0-9A-Z]+$/
      // 18位校验及大写校验
      if (value.length !== 18 || patrn.test(value) === false) {
        return false
      } else {
        let Ancode // 统一社会信用代码的每一个值
        let Ancodevalue // 统一社会信用代码每一个值的权重
        let total = 0
        let weightedfactors = [
          1,
          3,
          9,
          27,
          19,
          26,
          16,
          17,
          20,
          29,
          25,
          13,
          8,
          24,
          10,
          30,
          28
        ] // 加权因子
        let str = '0123456789ABCDEFGHJKLMNPQRTUWXY'
        // 不用I、O、S、V、Z
        for (let i = 0; i < value.length - 1; i++) {
          Ancode = value.substring(i, i + 1)
          Ancodevalue = str.indexOf(Ancode)
          total = total + Ancodevalue * weightedfactors[i]
          // 权重与加权因子相乘之和
        }
        let logiccheckcode = 31 - (total % 31)
        if (logiccheckcode === 31) {
          logiccheckcode = 0
        }
        let Str = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y'
        let Array_Str = Str.split(',')
        logiccheckcode = Array_Str[logiccheckcode]
        let checkcode = value.substring(17, 18)
        if (logiccheckcode !== checkcode) {
          return false
        }
        return true
      }
    },
    checkunitCardId(value) {
      const reg = /^[0-9A-HJ-NP-RT-UW-Y]{18}$/
      return reg.test(value)
    },
    checkCode15(value) {
      let regTwo = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
      return regTwo.test(value)
    },
    checkCode15_two(value) {
      let value18 = ''
      let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      let cardTemp = 0
      let i
      value18 = value.substr(0, 6) + '19' + value.substr(6, value.length - 6)
      for (i = 0; i < 17; i++) {
        cardTemp += value18.substr(i, 1) * arrInt[i]
      }
      value18 += arrCh[cardTemp % 11]
      return this.checkIDCard(value18)
    }
  }
}
</script>
<style scoped lang="less">
@media screen and (min-width: 410px) and (max-width: 1366px) {
  .el-button--primary,
  .el-button--default {
    height: 32px;
    font-size: 15px;
  }
  .el-button {
    padding: 6px 20px;
  }
}
</style>

