<template>
    <div style="flex:1;" v-if="show">
        <div class="search-input">
            <span v-text="title"></span>
            <el-input @keyup.native.enter="onEnter" v-model="property.value" size="medium" :placeholder="placeholder">
                <i class="el-icon-search el-input__icon"
                   slot="suffix"
                   @click="onClick">
                </i>
            </el-input>
        </div>
        <el-dialog class="dialog-content" border title="个人信息查询" @close='closeDialog' :visible.sync="dialogVisible" width="70%" v-if="type.indexOf('PERSON') != '-1'">
            <el-form :inline="true" :model="form" class="demo-form-inline" style="margin-bottom:20px;">
                <el-form-item colspan="16" :label="title">
                    <el-input style="width:300px" size="medium" v-model="form.aac147" placeholder="请输入身份证号码查询"></el-input>
                </el-form-item>
                <el-form-item colspan="16" label="姓名">
                    <el-input style="width:300px" size="medium" v-model="form.aac003" placeholder="输入姓名"></el-input>
                </el-form-item>
                <!-- <el-form-item label="缴费状态">
                    <el-select v-model="form.paymentStatus" placeholder="选择缴费状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="已缴费" value="1"></el-option>
                        <el-option label="未缴费" value="0"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item>
                    <el-button size="medium" type="primary" @click="query">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table class="ep-table" :data="tableData" style="width: 100%" height="250px" highlight-current-row @row-click="tableClick" @row-dblclick="tableDbClick">
                <!--<el-table-column class="ep-table-item" align="center" prop="aac002" label="社会保障号" min-width="80"></el-table-column>-->
                <!--<el-table-column align="center" prop="aac003" label="姓名" min-width="80"></el-table-column>-->
                <!--<el-table-column align="center" prop="aac004" label="性别" min-width="80"></el-table-column>-->
                <!--<el-table-column align="center" prop="aac006"label="出生日期" min-width="80"></el-table-column>-->
                <!--<el-table-column align="center" prop="aic162" label="退休时间" min-width="80"></el-table-column>-->
                <!--<el-table-column align="center" prop="aic161" label="退休类型" min-width="80"></el-table-column>-->
                <!--<el-table-column align="center" prop="aac006" label="单位名称" min-width="80"></el-table-column>-->
                <!--<el-table-column align="center" prop="aac999" label="人员管理码" min-width="80"></el-table-column>-->
                <el-table-column v-for="(item,index) in tableList" :key="index" align="center" :prop="item.value" :label="item.name" :width="item.width || ''" min-width="80"></el-table-column>
            </el-table>
            <!-- <div style="margin-bottom:10px;">
                <el-pagination
                    @size-change="handleSizeChange" @current-change="handlePageChange" background
                    layout="total, sizes, prev, pager, next, jumper" :page-sizes="[20, 40, 60, 80,100]"
                    :current-page="pager.page" :page-size="pager.size" :total="pager.total">
                </el-pagination>
            </div> -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog class="dialog-content" border title="单位信息查询" @close='closeDialog' :visible.sync="dialogVisible" width="70%" v-if="type.indexOf('COMPANY') != '-1'">
            <el-form :inline="true" :model="form1" class="demo-form-inline" style="margin-bottom:20px;">
                <el-form-item colspan="16" :label="title">
                    <el-input style="width:300px" v-model="form1.aab000" placeholder="请输入统一社会信用代码" ></el-input>
                </el-form-item>
                <el-form-item colspan="16" label="单位名称">
                    <el-input style="width:300px" v-model="form1.aab069" placeholder="请输入单位名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="medium" type="primary" @click="query">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table class="ep-table" :data="tableData" style="width: 100%" height="220px" highlight-current-row @row-click="tableClick" @row-dblclick="tableDbClick">
                <!--<el-table-column class="ep-table-item" align="center" prop="aab999" label="单位管理码" min-width="80"></el-table-column>-->
                <!--<el-table-column align="center" prop="aab069" label="单位名称" min-width="80"></el-table-column>-->
                <!--<el-table-column align="center" prop="bab010" label="统一社会信用代码" min-width="80"></el-table-column>-->
                <!--<el-table-column align="center" prop="aab019" label="单位类型" min-width="80"></el-table-column>-->
                <!--<el-table-column align="center" prop="aaa120" label="单位状态" min-width="80"></el-table-column>-->
                <!--<el-table-column align="center" prop="aae140" label="当前参保险种" min-width="80"></el-table-column>-->
                <el-table-column v-for="(item,index) in tableList" :key="index" align="center" :prop="item.value" :label="item.name" :width="item.width || ''" min-width="80"></el-table-column>
            </el-table>
            <!-- <div style="margin-bottom:10px;">
                <el-pagination
                    @size-change="handleSizeChange" @current-change="handlePageChange" background
                    layout="total, sizes, prev, pager, next, jumper" :page-sizes="[20, 40, 60, 80,100]"
                    :current-page="pager.page" :page-size="pager.size" :total="pager.total">
                </el-pagination>
            </div> -->

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">

export default {
  props: {
    title: {
      type: String,
      default: '请填写title属性'
    },
    placeholder: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'PERSON'
    },
    api: {
      type: String,
      default: ''
    },
    tableList: {
      type: Array,
      default: () => []
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
    datas: {
      type: Object,
      default: null
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    functionId: {
      type: String,
      default: 'person'
    }
  },
  data() {
    return {
      table: [],
      hidden: false,
      dialogVisible: false,
      tableData: [],
      id: {
        randowId: ''
      },
      pager: {
        page: 1,
        size: 20,
        total: 0
      },
      form: {
        aac147: '',
        aac003: ''
      },
      form1: {
        aab000: '',
        aab069: ''
      }
    }
  },
  watch: {
    property: {
      handler(value) {
        this.setProperty()
      },
      deep: true
    }
  },
  created() {
    console.log('api', this.api)
  },
  methods: {
    // dialog关闭事件 清空tableData
    closeDialog() {
      this.tableData = []
    },
    /**
             * 回选搜索框值
             */
    setProperty() {
      if (this.type.indexOf('PERSON') !== '-1') {
        this.form.aac147 = this.property.value
      } else if (this.type.indexOf('COMPANY') !== '-1') {
        this.form1.aab000 = this.property.value
      }
    },
    /**
             * 请求列表（回车）
             */
    onEnter() {
      this.getUserId(0)
    },
    /**
             * 点击弹框不请求
             */
    onClick() {
      if (this.property.value !== '') {
        this.dialogVisible = !this.dialogVisible
        this.getUserId(1)
      } else {
        this.dialogVisible = !this.dialogVisible
      }
    },

    /**
             * 表格点击事件
             */
    tableClick(row) {
      this.id.aac001 = row.aac001 || ''
      this.id.aab001 = row.aab001 || ''
      this.id.aaz127 = row.aaz127 || ''
      this.id.randowId = Math.random()
      this.id.data = this.datas
    },
    /**
             * 表格双击事件
             */
    tableDbClick(row) {
      this.dialogVisible = false
      this.id.aac001 = row.aac001 || ''
      this.id.aab001 = row.aab001 || ''
      this.id.aaz127 = row.aaz127 || ''
      this.id.data = this.datas
      this.id.randowId = Math.random()
      if (this.type.indexOf('PERSON') !== '-1') {
        this.$store.dispatch('SET_PERSONID', this.id)
      } else if (this.type.indexOf('COMPANY') !== '-1') {
        this.$store.dispatch('SET_COMPANYID', this.id)
      }
      if (this.isSearch) {
        this.getCommonData(this.id)
      }
    },
    /**
             * 提交id
             */
    submit() {
      if (this.id && (this.id.aac001 || this.id.aab001)) {
        this.dialogVisible = false
        // 改变状态
        this.id.randowId = Math.random()
        if (this.type.indexOf('PERSON') !== '-1') {
          this.$store.dispatch('SET_PERSONID', this.id)
        } else if (this.type.indexOf('COMPANY') !== '-1') {
          this.$store.dispatch('SET_COMPANYID', this.id)
        }
        if (this.isSearch) {
          this.getCommonData(this.id)
        }
      }
    },
    /**
             * 查询
             */
    query() {
      this.getUserId(1)
    },
    /**
             * 根据身份证获取id
             */
    getUserId(type) {
      // console.log(type)
      let params = {}
      if (this.type.indexOf('COMPANY') !== '-1') {
        this.form1.type = this.type
        params = {
          searchData: this.form1,
          ...this.pager
        }
      } else if (this.type.indexOf('PERSON') !== '-1') {
        this.form.type = this.type
        params = {
          searchData: this.form,
          ...this.pager
        }
      }
      this.$api.commonPost(this.api, params).then(res => {
        if (res.status === '0') {
          if (type) {
            if (this.type.indexOf('PERSON') !== '-1') {
              this.property.value = this.form.aac147
            } else if (this.type.indexOf('COMPANY') !== '-1') {
              this.property.value = this.form1.aab000
            }
            this.tableData = res.data
          } else {
            if (res.data && res.data.length === 1) {
              this.id.aac001 = res.data[0].aac001 || ''
              this.id.aab001 = res.data[0].aab001 || ''
              this.id.aaz127 = res.data[0].aaz127 || ''
              this.id.data = this.datas
              this.id.randowId = Math.random()
              if (this.type.indexOf('PERSON') !== '-1') {
                this.$store.dispatch('SET_PERSONID', this.id)
              } else if (this.type.indexOf('COMPANY') !== '-1') {
                this.$store.dispatch('SET_COMPANYID', this.id)
              }
              if (this.isSearch) {
                this.getCommonData(this.id)
              }
            } else if (res.data && res.data.length > 1) {
              this.dialogVisible = true
              this.tableData = res.data
            }
          }
        } else if (res.successMessage && res.successMessage.length > 0) {
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
          personInfo: row.aac001 || '',
          companyInfo: row.aab001 || ''
        },
        ...row.data,
        path: this.$route.path
      }
      if (this.isCodeType) {
        params.codeTypes = this.codeTypes
      }
      this.$api.commonPost(this.$route.path + '/doCheck/commonSearch_info/', params).then(res => {
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
      this.getUserId(1)
    },
    /**
             * 每页条数改变事件
             */
    handleSizeChange(size) {
      this.pager.size = size
      this.getUserId(1)
    }
  }
}
</script>

<style lang="less" scoped>
    .search-content{
        display: flex;
        justify-content:space-between;
        .search-input {
            display: flex;
            flex: 1;
            margin-right: 30px;
            max-width:500px;
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
                content: '*';
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
    .ep-table{
        .ep-table-item{
            padding:10px;
        }
    }
    .dialog-footer{
        width: calc(100% - 40px);
        /*position: absolute;*/
        bottom: 0;
        right: 0;
        padding: 0 20px 30px 20px;
    }
    .el-table__body tr.current-row>td{
        background-color:#cdebef!important;
    }
    // /deep/ .el-dialog{
    //     /*height:70vh;*/
    // }
    /deep/ .el-dialog__footer{
        padding:0px;
    }
    /deep/ .el-table--enable-row-transition .el-table__body td {
        padding: 12px 0!important;
    }
</style>
