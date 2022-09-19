<template>
    <div class="ep-expert-top">
    <el-row>
        <el-col :span="6" class="ep-expert-col">
            <el-row class="ep-expert-title">
                <span>鉴定场次名称</span>
            </el-row>
            <el-row class="ep-expert-content">
                <span></span>
            </el-row>
        </el-col>
        <el-col :span="6" class="ep-expert-col">
            <el-row class="ep-expert-title">
                <span>鉴定时间</span>
            </el-row>
            <el-row class="ep-expert-content">
                <span></span>
            </el-row>
        </el-col>
        <el-col :span="6" class="ep-expert-col">
            <el-row class="ep-expert-title">
                <span>科别</span>
            </el-row>
            <el-row class="ep-expert-content">
                <span></span>
            </el-row>
        </el-col>
        <el-col :span="6" class="ep-expert-col">
            <el-row class="ep-expert-title">
                <span>鉴定地点</span>
            </el-row>
            <el-row class="ep-expert-content">
                <span></span>
            </el-row>
        </el-col>
    </el-row>
    </div>
</template>
<script>
export default {
  name: 'ExpertEnter'
}
</script>
<style lang="less" scoped>
.ep-expert-top{
    margin: 10px 0;

    background: #ffffff;
    border-radius: 6px;
    padding: 20px;
    .ep-expert-col{
        text-align: center;
        .ep-expert-title{
            span{
                font-size: 16px;
            color: #0E99FF;
            font-weight: 400;
            }
        }
        .ep-expert-content{
            margin-top: 10px;
            span{
                font-size: 20px;
                color: #FE6176;
                font-weight: 400;
            }
        }
    }

}
</style>

