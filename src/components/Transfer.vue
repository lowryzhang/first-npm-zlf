<template>
  <el-col :span="Number(colspan)">
    <el-form-item
      :prop="name"
      :label-width="labelWidth + 'px'"
      :label="label"
      v-if="ishide === true?false:true"
    >
      <el-transfer
        :filterable="filterable"
        :titles="titles"
         :filter-method="filterMethod"
        @change="handleChange"
        v-model="transferValue"
        id="transfer"
        :data="data2"></el-transfer>
    </el-form-item>
  </el-col>
</template>
<script>
import Dictionaries from '../localJs/dataCon'
export default {
  name: 'Transfer',
  data() {
    const generateData = (Num) => {
      const data = []
      let dataCondition = []
      if (this.selfTransferData.length > 0) {
        dataCondition = this.selfTransferData
      } else {
        dataCondition = Dictionaries.slice(0, Num)
      }
      const dis = this.disabled
      dataCondition.forEach((item, index) => {
        data.push({
          label: item.value,
          key: item.key,
          disabled: dis
        })
      })
      // console.log(data);
      return data
    }
    return {
      transferValue: this.value,
      data2: generateData(20),
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1 || item.key.indexOf(query) > -1
      }
    }
  },
  props: {
    value: {
      type: [Array, String]

    },
    selfTransferData: {
      type: Array,
      default: () => {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    titles: {
      type: Array,
      default: () => {
        return []
      }
    },
    colspan: {
      type: String,
      default: '24'
    },
    ishide: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: '140'
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  watch: {
    value(newValue, oldValue) {
      // console.log(newValue);
      this.transferValue = newValue
    },
    disabled(newValue, oldValue) {
      // console.log(newValue);
      const data = []
      let dataCondition = []
      if (this.selfTransferData.length > 0) {
        dataCondition = this.selfTransferData
      } else {
        dataCondition = Dictionaries.slice(0, 20)
      }
      const dis = this.disabled
      dataCondition.forEach((item, index) => {
        data.push({
          label: item.value,
          key: item.key,
          disabled: dis
        })
      })
      this.data2 = data
    }
  },
  mounted() {
    // 穿梭框下拉到底部加载10条新的数据
    let _this = this
    let i = 10
    let scrollDiv = document.getElementById('transfer').childNodes[0].childNodes[1].childNodes[1]
    scrollDiv.onscroll = function() {
      if (scrollDiv.scrollTop + scrollDiv.offsetHeight >= scrollDiv.scrollHeight - 50) {
        i += 10
        if (i > 530) {
          i = 531
        }
        const data = []
        let dataCondition = []
        if (_this.selfTransferData.length > 0) {
          dataCondition = _this.selfTransferData
        } else {
          dataCondition = Dictionaries.slice(0, i)
        }
        const dis = _this.disabled
        dataCondition.forEach((item, index) => {
          data.push({
            label: item.value,
            key: item.key,
            disabled: dis
          })
        })
        _this.data2 = data
      }
    }
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      // console.log(value)
      this.$emit('tranfer-message', value, this.name)
    }
  }
}
</script>

