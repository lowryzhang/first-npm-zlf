<template>
  <div class="ep-pop">
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" :before-close='closeDialog'>
      1111

    </el-dialog>

  </div>
</template>

<script type="es6">
export default {
  data() {
    return {
      dialogVisible: true
    }
  },
  props: {

    title: {
      type: String,
      default: '消息'
    },
    width: {
      type: String,
      default: '70%'
    }
  },

  created() {},
  methods: {
    closeDialog() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
