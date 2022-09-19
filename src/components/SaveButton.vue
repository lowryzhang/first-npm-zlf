<template>
  <el-button
    :type="type"
    v-if="isIfTrue || !isHide || isHideTwo"
    :disabled="disabled"
    :plain="plain"
    :round="round"
    :circle="circle"
    :icon="icon"
    :loading="loading"
    :size="size"
    :style="{marginTop: top + 'px', marginBottom: bottom + 'px'}"
    @click="submit"
  >
    {{ name === '' ? '保存' :
    name
    }}
  </el-button>
</template>

<script type="es6">
import qs from 'qs'

export default {
  props: {
    isIfTrue: { // 是否强制显示
      type: Boolean,
      default: false // 默认否
    },
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
      default: ''
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
    validate: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    isHide() {
      return this.$store.getters.isHide
    },
    isHideTwo() {
      return this.$store.getters.isHideTwo
    },
    disabled() {
      return this.$store.getters.disabled
    }
  },
  watch: {
    disabled: {
      handler(value) {
        return value
      },
      deep: true
    },
    '$route.query.num': function(newVal, oldVal) {
      this.$emit('formValidate', this.validate)
    }
    // $route(to, from) {
    //   if (to.query.save) {
    //     console.log(to);
    //     this.$emit("formValidate", this.validate);
    //   }
    // }
  },
  methods: {
    submit() {
      if (this.validate && this.validate.length > 0) {
        // if (!this.disabled) {
        this.$emit('formValidate', this.validate, this.id)
        // this.$store.dispatch('SET_DISABLED', true)
        // }
      } else {
        this.btn()
      }
    },
    btn() {
      this.$showLoading()
      let mdParam = qs.parse(sessionStorage.getItem('mdParam'))
      let params = {}
      if (mdParam && mdParam.mdParam && mdParam.mdParam.islog === '1') {
        params = {
          ...this.datas,
          path: this.$route.path,
          userlog: {
            orisource: document.querySelector('.ep-body').innerHTML
          }
        }
      } else {
        params = {
          ...this.datas,
          path: this.$route.path
        }
      }
      if (this.isNext) {
        if (this.steps < 2) {
          this.$store.dispatch('SET_STEPS', (this.steps += 1))
        }
      }
      this.$api
        .commonPost(this.$route.path + '/doSave/' + this.id, params)
        .then(res => {
          this.$hideLoading()
          this.$store.dispatch('SET_DISABLED', false)
          this.$store.dispatch('SET_BACKFUN', res.backFunType)
          if (res.status === '0') {
            this.$store.dispatch('SET_CODETYPE', res.data)
            this.$store.dispatch('SET_COMMON', res.data)
          }
          if (res.successMessage) {
            this.$alert({
              type: 'success',
              title: res.successMessage
            }).then(r => {
              if (r && !this.tianzheng) {
                let ythInfo =
                  res.data.ythInfo === undefined ? null : res.data.ythInfo
                let postProcResult = {
                  code: (ythInfo && ythInfo.code) || '00', // 结果编码
                  msg: '', // 提示信息
                  bizId: (ythInfo && ythInfo.bizId) || '', // 业务主键
                  rollbackId: (ythInfo && ythInfo.rollbackId) || '', // 业务回退唯一标识号
                  condition: (ythInfo && ythInfo.condition) || '', // 网关条件
                  resultData: (ythInfo && ythInfo.resultData) || {} // 其他返回结果信息
                }
                window.parent.postProcResult &&
                  window.parent.postProcResult(postProcResult)
              }
            })
          } else if (res.errorMessage && res.errorMessage.length > 0) {
            this.$alert({
              text: res.errorMessage,
              textType: 'Array',
              type: 'error',
              title: '保存失败',
              titleBody: '您提交的内容有如下问题：'
            }).then(r => {
              if (res.warnMessage && res.warnMessage.length > 0) {
                this.$alert({
                  text: res.warnMessage,
                  textType: 'Array',
                  title: '提示信息',
                  type: 'warning'
                })
              }
            })
          } else if (res.warnMessage && res.warnMessage.length > 0) {
            this.$alert({
              text: res.warnMessage,
              textType: 'Array',
              type: 'warning'
            })
          }
        })
      // this.$store.dispatch('SET_COMMONPOST', obj)
    }
  }
}
</script>

<style lang="less">
</style>
