<template>
<!-- 组件说明：
    保存通用：父组件直接调用 子组件的 formValidate 方法
    例如：vue中设置 ref, js 中 通过 this.$refs['saveBtnPop'].formValidate(value, saveFn) 调用-->

<!-- 父组件应用举例：
    vue:
    <epl-saveBtnPop
      ref="saveBtnPop"
      id="doSave"
      type="primary"
      @save="formValidate"
    ></epl-saveBtnPop>
    js：
    // value 为 Object 直接下一步，value 为 Array 正常流程
    formValidate(value) {
      this.$refs['saveBtnPop'].formValidate(value, this.saveFn) // 要求 saveFn 方法返回的是 Promise 对象
    }
-->
  <span>
    <el-button
      v-if="!isHide||isHideTwo||tianzheng"
      :type="type"
      :disabled="disabled"
      :plain="plain"
      :round="round"
      :circle="circle"
      :icon="icon"
      :loading="loading"
      :size="size"
      :style="{marginTop: top + 'px', marginBottom: bottom + 'px'}" @click="submit"
    >{{ name === '' ? '保存' : name}}</el-button>
  </span>

</template>

<script type="es6">
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: '保存'
    },
    datas: {
      type: Object,
      default: null
    },
    top: {
      type: String,
      default: '0'
    },
    bottom: {
      type: String,
      default: '0'
    },
    isNext: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'primary'
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    hasReport: { // 是否有报表打印 默认有
      type: Boolean,
      default: true
    },
    showSaveMsg: { // 是否显示保存信息及选择
      type: Boolean,
      default: false
    },
    pageType: { // 模块名称，用于判断报表打印
      type: String,
      default: ''
    }
  },
  data() {
    return {
      regionCode: this.$store.state.loginuserInfo.areaId,
      operator: this.$store.state.loginuserInfo.code || 'admin',
      timer: null
    }
  },
  computed: {
    disabled() {
      return this.$store.getters.disabled
    },
    isHide() {
      return this.$store.getters.isHide
    },
    isHideTwo() {
      return this.$store.getters.isHideTwo
    },
    tianzheng() {
      return !this.$route.query.ticket && !this.$route.query.projid
    }
  },
  watch: {
    disabled: {
      handler(value) {
        return value
      },
      deep: true
    }
  },
  methods: {
    /** 下一步同步方法调用
     * @param {array} value formName List
     * @param {function} saveFn 保存方法
     */
    nextFn(value, saveFn) {
      saveFn(value).then(res => {
        this.$message({
          type: res.success ? 'success' : 'error',
          message: res.resultDes || ''
        })
        if (res && !res.success) {
          if (this.$route.query.ticket && this.$route.query.projid) {
            let errorMsg = {
              code: '-2',
              msg: ''
            }
            parent.postProcResult(errorMsg)
          }
          return
        }
        const saveMsg = res && res.result ? res.result : {}
        if (this.hasReport && !this.common.isBlank(saveMsg)) {
          const logId = saveMsg.notice && saveMsg.notice.logId ? saveMsg.notice.logId : ''
          const opseno = saveMsg.notice && saveMsg.notice.opseno ? saveMsg.notice.opseno : ''
          this.common.reportForm(this.regionCode, logId, opseno, this.pageType).then(report => {
            this.nextToTzFn(saveMsg)
            window.open(this.$rePrintURL(report))
          }).catch(err => {
            this.$message.error(err)
            // 打印报表，报表打印出错只要保存成功，依旧要流转到天正
            this.nextToTzFn(saveMsg)
          })
        } else {
          this.nextToTzFn(saveMsg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    nextToTzFn(saveMsg) {
      if (this.showSaveMsg && saveMsg && saveMsg.notice && saveMsg.notice.message) {
        this.$confirm(saveMsg.notice.message, '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          this.nextSaveFn(saveMsg.ythInfo)
        }).catch(() => {
        })
      } else {
        this.nextSaveFn(saveMsg.ythInfo)
      }
    },
    // 直接下一步
    nextSaveFn(ythInfo) {
      console.log('next step')
      if (this.$route.query.ticket && this.$route.query.projid) {
        this.common.commonResult(ythInfo)
      }
    },
    /**
     * 防抖
     * @param {*} callback 调用函数
     * @param {*} value 调用函数的参数
     * @param {*} saveFn 每个页面的保存方法
     * @param {*} time 防抖时间
     */
    debounce(callback, value, saveFn, time) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        callback(value, saveFn)
      }, time)
    },
    /** 下一步-提交
     * @param value {array} formName | {Object} ythInfo
     * @param {function} saveFn 保存函数 返回值为 Promise 对象
     */
    formValidate(value, saveFn) {
      let callBack
      if (Object.prototype.toString.call(value) === '[object Object]' && value) {
        callBack = this.nextSaveFn
        // this.nextSaveFn()
      } else {
        callBack = this.nextFn
        // this.nextFn(value, saveFn)
      }
      this.debounce(callBack, value, saveFn, 1000)
    },
    submit() {
      this.$emit('save')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
