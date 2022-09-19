<template>
    <el-table-column
        :type="editor === 'index' ? 'index' : ''"
        :prop="name"
        :label="header"
        :sortable="sortable"
        align="center"
        :width="width">
        <template slot-scope="scope">
            <span v-if="name == 'aaf216'">{{scope.row[name] | resDic(bankDic)}}</span>
            <span v-if="name == 'aac004'">{{scope.row[name] | sexTypeFilter}}</span>
            <span v-if="name != 'aaf216' && name != 'aac004'">{{ scope.row[name] }}</span>
        </template>
    </el-table-column>
</template>

<script type="es6">
export default {
  props: {
    fixed: {
      type: String,
      default: 'left'
    },
    width: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    editor: {
      type: String,
      default: ''
    },
    sortable: {
      type: Boolean,
      default: false
    },
    format: String,
    valueFormat: String,
    dateType: {
      type: String,
      default: ''
    },
    codetype: {
      type: String,
      default: ''
    }
  },
  computed: {
    selIndex() {
      return this.$store.getters.selIndex
    },
    rowDbClick() {
      return this.$store.getters.dbClick
    },
    column() {
      return this.$store.getters.column
    },
    codeTypes() {
      if (this.$store.getters.cacheData && this.$store.getters.cacheData[this.$route.path]) {
        this.selData(this.$store.getters.cacheData[this.$route.path].codeTypes[this.codetype])
      }
      return this.$store.getters.codeTypes
    },
    titleList() {
      return this.$parent.$parent.list || []
    },
    titleFilter() {
      return this.$parent.$parent.titleFilter || []
    }
  },
  watch: {
    selIndex: {
      handler(value) {
        return value
      },
      deep: true
    },
    column: {
      handler(value) {
        return value
      },
      deep: true
    },
    codeTypes: {
      handler(value) {
        if (this.codetype) {
          this.selData(value[this.codetype])
        }
      },
      deep: true
    }
  },
  data() {
    return {
      bankDic: [],
      selectList: [],
      checked: []
    }
  },
  mounted() {
    if (this.name === 'aaf216') {
      this.getOptions()
    }
    let self = this
    document.onclick = function() {
      self.$store.dispatch('SET_INDEX', -1)
    }
  },
  methods: {
    // 银行行别下拉
    async getOptions() {
      this.bankDic = await this.common.getBankCodeFn()
    },
    getEditor() {
      this.$store.dispatch('SET_INDEX', this.selIndex)
    },
    checkItem(val) {
      val.checked = !val.checked
    },
    selData(value) {
      if (value && value.length > 0) {
        this.selectList = value
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
