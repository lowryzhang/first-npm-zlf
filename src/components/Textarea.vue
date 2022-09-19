<template>
    <el-col :span="Number(colspan)">
        <el-form-item
                :prop="name"
                :label-width="labelWidth + 'px'"
                :label="label"
                :title="label"
                v-show="p === 'H'?false:true">
            <el-input :disabled="eleDisabled || false"
                       type="textarea"
                      :id="'input' + name"
                      :maxlength="Number(maxlength)"
                      :placeholder="placeholder" v-model="inputvalue" :rows="rows" @change="onChange" @blur="onBlur"
                      @focus="onFocus" :name="name" :data-value="property.value" :data-p="property.p"></el-input>
        </el-form-item>
    </el-col>
</template>

<script type="es6">
export default {
  props: {
    p: {
      type: String,
      default: ''
    },
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
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: '',
    property: {
      type: Object,
      default: function() {
        return {
          value: '',
          type: 'textarea',
          p: ''
        }
      }
    },
    rows: {
      type: Number,
      default: 2
    },
    name: {
      type: String,
      default: ''
    },
    datas: {
      type: Object,
      default: null
    },
    eleDisabled: {
      type: Boolean,
      default: false
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
    },
    isRed: {
      type: Boolean,
      default: false
    },
    isCodeType: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    codeTypes() {
      return this.$store.getters.codeTypes
    }
  },
  mounted() {
    // document.getElementById('textarea' + this.name).style.color = this.isRed ? 'red' : '';
  },
  watch: {
    value(newValue, oldValue) {
      this.inputvalue = newValue
    }
  },
  created() {
    this.inputvalue = this.value
  },
  data() {
    return {
      inputvalue: this.value
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
    onChange(data) {
      this.$emit('input-message', data, this.name)
      // if (!this.isChange) return;
      // let obj = {
      //     path: this.$route.path + '/doCheck/' + this.name,
      //     params: {
      //         path: this.$route.path,
      //         ...this.datas
      //     }
      // };
      // if(this.isCodeType){
      //     obj.params.codeTypes = this.codeTypes;
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj);
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
