<template>
    <div>
        <el-button @click="closePop">关闭</el-button>
        <el-button v-if="tianzheng||!isHide||isHideTwo" :type="type" :disabled="disabled" :plain="plain" :round="round" :circle="circle" :icon="icon" :loading="loading" :size="size"
               :style="{marginTop: top + 'px', marginBottom: bottom + 'px'}" @click="submit">{{ name === '' ? '保存' : name
        }}
        </el-button>
    </div>

</template>

<script type="es6">
// import qs from 'qs'
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
    closePop() {
      this.$emit('addPop', false)
    },
    submit() {
      if (this.validate && this.validate.length > 0) {
        this.$emit('formValidate', this.validate)
        this.$emit('addPop', false)
      } else {
        this.btn()
      }
    },
    btn() {
      // console.log(this.datas)
      // console.log('this.$refs.form',this.$refs.form);
      // this.$showLoading()
      // let mdParam = qs.parse(sessionStorage.getItem('mdParam'))
      // let params = {}
      // if (mdParam && mdParam.mdParam && mdParam.mdParam.islog === '1') {
      //   params = {
      //     ...this.datas,
      //     path: this.$route.path,
      //     userlog: {
      //       orisource: document.querySelector('.ep-body').innerHTML
      //     }
      //   }
      // } else {
      //   params = {
      //     ...this.datas,
      //     path: this.$route.path
      //   }
      // }
      // if (this.isNext) {
      //   if (this.steps < 2) {
      //     this.$store.dispatch('SET_STEPS', this.steps += 1)
      //   }
      // }
      // let obj = {
      //   path: this.$route.path + '/doSave/' + this.id,
      //   params,
      //   isSave: '1'
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
