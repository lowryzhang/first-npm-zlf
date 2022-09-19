<template>
<div class="footerFastPhoto">
     <el-footer class="ep-footer">
        <div class="ep-copy">
            技术支持：浙江网新恩普软件有限公司
        </div>
    </el-footer>
</div>

</template>

<script type="es6">
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less">
.footerFastPhoto{
    .ep-footer {
        padding: 0 16px;
        text-align: center;
        color: rgba(0, 0, 0, .65);
        font-size: 14px;
        margin-top: -25px;
        display: flex;
        align-items: center;
        justify-content: center;
        .ep-copy {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}

</style>
