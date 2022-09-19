<template>
   <div style="display:inline-block">
  <el-upload
    v-loading.fullscreen="fullscreenLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.2)"
    style="display:inline-block"
    :action="actionUrl()"
    :data="data"
    name="file"
    :disabled="isDisabled"
    :show-file-list="false"
    :before-upload="beforeUpload"
    :on-success="onSuccess"
    :on-error="onError"
    :showMessage="showMessage"
    :hasprocess="hasprocess"
  >
    <el-button  type="primary" :disabled="isDisabled" :size="size">
      导入
      <i class="el-icon-upload"></i>
    </el-button>
  </el-upload>
  <span v-if="hasprocess">
    <ep-process
      v-if="showProcess"
      :processObj="processObj"
      :functionId="functionId"
      :userId="userId"
      :businessNumber="businessNumber"
      :platform="platform"
      :taskType="taskType"
      @upRF="upReflash"
      @upRT="resetTable"></ep-process>
  </span>
  </div>
</template>
<script>
import epProcess from '../methods/process/index.js'
import xlsxer from 'xlsx'
export default {
  components: {
    epProcess
  },
  name: 'UpLoadExcel',
  data() {
    return {
      fullscreenLoading: false,
      fileName: '',
      // 进度条组件的显示隐藏
      showProcess: true,
      // 进度条组件绑定的对象，卡片显示控制绑定的对象，使用对象的目的是，进度条子组件中显示隐藏变量也可以和这里同步
      processObj: {
        showCard: false
      }
    }
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: function() {
        return {}
      }
    },
    size: {
      type: String,
      default: ''
    },
    upLoadUrl: {
      type: String,
      default: ''
    },
    functionId: {
      type: String,
      default: ''
    },
    userId: {
      type: String,
      default: ''
    },
    businessNumber: {
      type: String,
      default: ''
    },
    platform: {
      type: String,
      default: 'insiis'
    },
    taskType: {
      type: String,
      default: 'insiis'
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    hasprocess: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
  },
  methods: {
    actionUrl() {
      if (this.$route.query.ticket) {
        return '/sbtz/injypay' + this.upLoadUrl
      } else {
        return this.upLoadUrl
      }
    },
    beforeUpload(file) {
      // this.processObj.showCard = false
      if (this.hasprocess) {
        this.showProcess = true
      } else {
        this.fullscreenLoading = true
      }
      this.fileName = file.name
      const xlsx = file.name.split('.')[file.name.split('.').length - 1] === 'xlsx'
      const xls = file.name.split('.')[file.name.split('.').length - 1] === 'xls'
      if (!xlsx && !xls) {
        this.$message.error('导入文件只能是xlsx/xls格式!')
        this.fullscreenLoading = false
        return false
      }
      let reader = new FileReader()
      reader.onload = e => {
        try {
          let workbook = xlsxer.read(e.target.result, {type: 'binary'})
          for (let sheet in workbook.Sheets) {
            // eslint-disable-next-line no-unused-vars
            let sheetArray = xlsxer.utils.sheet_to_json(workbook.Sheets[sheet])
            // console.log(sheetArray)
          }
        } catch (e) {
          return false
        }
      }
      // console.log(reader.readAsBinaryString(file))
      reader.readAsBinaryString(file)
    },
    // 导入后刷新 或 点导入任务刷新
    upReflash(val) {
      if (val) { this.$emit('RF', val) }
    },
    // 作废导入任务 清空列表
    resetTable(val) {
      if (val) { this.$emit('RT', val) }
    },
    onSuccess(res) {
      let _that = this
      if (res.success) {
        this.processObj.showCard = true
        if (this.showMessage) { // 显示message
          this.$message({
            type: 'success',
            message: res.resultDes
          })
          if (!_that.hasprocess) {
            _that.fullscreenLoading = false
          }
        }
        _that.$emit('uploadSuccess', res, _that.fileName)
      } else {
        this.$message({
          type: 'error',
          message: res.resultDes
        })
        if (!_that.hasprocess) {
          _that.fullscreenLoading = false
        }
      }
    },
    onError(res) {
      console.log(res)
      let _that = this
      if (!_that.hasprocess) {
        _that.fullscreenLoading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
