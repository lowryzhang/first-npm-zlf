<template>
    <div style="margin: -43px -43px 0;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script type="es6">
export default {
  data() {
    return {
      title: this.$route.meta.title || ''
    }
  }
}
</script>

<style lang="less">

</style>
