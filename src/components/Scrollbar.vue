<template>
  <div class="scrollbarFastPhoto">
    <div v-if="isUseScrollbar" class="scrollbar">
        <el-scrollbar  style="height: calc(100vh - 64px);">
            <slot></slot>
        </el-scrollbar>
    </div>
    <div v-else>
        <slot></slot>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    isUseScrollbar: {
      type: Boolean,
      default: true
    }
  },
  mounted() {

  }
}
</script>

<style lang="less">
.scrollbarFastPhoto{
  .scrollbar /deep/ .el-scrollbar .el-scrollbar__wrap {
        overflow-x: hidden;
    }
}

</style>
