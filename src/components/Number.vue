<template>
    <el-col :span="Number(colspan)">
        <el-form-item
                :prop="name"
                :label-width="labelWidth + 'px'"
                :label="label"
                :title="label"
                v-if="ishide === true?false:true"
            >
            <el-input-number
              :disabled="eleDisabled || false"
              :controls="controls"
              :controls-position="controlBtn"
              v-model.number="inputvalue"
              :precision="property.precision"
              :id="'number' + name"
              :step="property.step" :min="0" :max="property.max"
              @change="onChange(inputvalue)" @blur="onBlur(inputvalue)"
              @focus="onFocus" :name="name" :data-value="property.value"
              :data-p="property.p"
            ></el-input-number>
        </el-form-item>
    </el-col>
</template>

<script type="es6">
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    eleDisabled: {
      type: Boolean,
      default: false
    },
    ishide: {
      type: Boolean,
      default: false
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
    property: {
      type: Object,
      default: function() {
        return {
          value: 0,
          p: '',
          precision: 0,
          max: Infinity,
          min: 0,
          step: 1
        }
      }
    },
    propertyNum: {
      type: Number,
      default: 0
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
    },
    isRed: {
      type: Boolean,
      default: false
    },
    isCodeType: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    },
    controlBtn: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputvalue: this.value
    }
  },
  created() {
    this.inputvalue = this.value
    this.property.precision = this.propertyNum
    // console.log(this.propertyNum)
  },
  watch: {
    value(newValue, oldValue) {
      this.inputvalue = newValue
    },
    deep: true
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    /**
             * 点击事件
             */
    onClick() {

    },
    /**
             * 选择事件
             */
    onChange(val) {
      this.$emit('input-number', val, this.name)
    },
    /**
             * 失去焦点
             */
    onBlur(val) {
      this.$emit('input-number', val, this.name)
    },
    /**
             * 获取焦点
             */
    onFocus() {

    }
  }
}
</script>
