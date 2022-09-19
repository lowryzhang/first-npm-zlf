<template>
    <el-col :span="Number(colspan)">
        <el-form-item
                :prop="name"
                :label-width="labelWidth + 'px'"
                :label="label"
                :title="label"
                v-show="property.p.indexOf('H') === -1">
            <el-switch :disabled="property.p.indexOf('D') >= 0" v-model="property.value"
                       @change="onChange"></el-switch>
            <input type="hidden" :name="name" :data-value="property.value" :data-p="property.p" />
        </el-form-item>
    </el-col>
</template>

<script type="es6">
export default {
  props: {
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
    property: {
      type: Object,
      default: function() {
        return {
          value: false,
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
    isChange: {
      type: Boolean,
      default: false
    },
    isClick: {
      type: Boolean,
      default: false
    },
    isBlur: {
      type: Boolean,
      default: false
    },
    isFocus: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
             * 点击事件
             */
    onClick() {
      // if (!this.isClick) return
      // let obj = {
      //   path: this.$route.path + '/doQuery/' + this.name,
      //   params: {
      //     path: this.$route.path,
      //     ...this.datas
      //   }
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj)
    },
    /**
             * 选择事件
             */
    onChange() {
      // if (!this.isChange) return
      // let obj = {
      //   path: this.$route.path + '/doCheck/' + this.name,
      //   params: {
      //     path: this.$route.path,
      //     ...this.datas
      //   }
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj)
    },
    /**
             * 失去焦点
             */
    onBlur() {
      // if (!this.isBlur) return
      // let obj = {
      //   path: this.$route.path + '/blur/' + this.name,
      //   params: {
      //     path: this.$route.path,
      //     ...this.datas
      //   }
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj)
    },
    /**
             * 获取焦点
             */
    onFocus() {
      // if (!this.isFocus) return
      // let obj = {
      //   path: this.$route.path + '/focus/' + this.name,
      //   params: {
      //     path: this.$route.path,
      //     ...this.datas
      //   }
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj)
    }
  }
}
</script>
