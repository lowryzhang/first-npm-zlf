<template>
  <div>
    <div class="legendContainer" @click="listToggle" v-show="true">
      <img src="/static/img/legend.svg" v-show="imgToggle" />
      <img src="/static/img/close.svg" v-show="!imgToggle" />
      <div class="goingNumber" v-if="taskNumber !== null && taskNumber < 99">{{taskNumber}}</div>
      <div class="goingNumber" v-if="taskNumber!==null && taskNumber > 99" style="font-size:12px">99+</div>
    </div>
    <div class="formBox">
      <div class="whiteFram" ref="whiteFram">
        <div class="iframeBox">
          <iframe class="taskList_iframe" :src="taskListSrc" ref="iframe"></iframe>
        </div>
        <div class="checkFile" @click="viewList">查看全部</div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="90%"
      top="20px">
      <iframe frameborder="0" :src="bigTaskListSrc" width="100%" height="100%" class="ifram_size"></iframe>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      taskNumber: null, // 任务数
      showList: false,
      dialogVisible: false,
      // strokeWidth: 3,
      imgToggle: true,
      taskListSrc: '',
      bigTaskListSrc: '',
      clickController: true,
      userId: this.$store.state.loginuserInfo.id,
      orgId: this.$store.state.loginuserInfo.orgId,
      axiosUrl: 'http://10.85.128.89:8004'
    }
  },
  props: {
    platform: {
      type: String,
      default: 'insivil'
    }
  },
  created() {
    axios.defaults.withCredentials = true
    // 跨域
    axios.get(this.axiosUrl + '/bpTask/getMyTaskCount', {
      params: {
        userId: this.userId,
        orgId: this.orgId,
        platform: this.platform
      }
    }).then(res => {
      if (res.data.success) {
        this.taskNumber = res.data.result
      }
    })
  },
  mounted() {
    this.taskListSrc = this.axiosUrl + `/#/page/ProgressList?isHide=true&userId=${this.userId}&orgId=${this.orgId}&platform=${this.platform}`
    // this.iframeWin = this.$refs.iframe.contentWindow
    this.$refs.iframe.onload = () => {
      window.addEventListener('message', this.handleMessage)
    }
  },
  methods: {
    handleMessage(event) {
      console.log(1)
      const data = event
      console.log(data)
    },
    viewList() {
      this.dialogVisible = true
      this.bigTaskListSrc = `//10.85.128.89:8004/#/page/TaskTable?isHide=true&userId=${this.userId}&orgId=${this.orgId}&platform=${this.platform}`
    },
    listToggle() { // 裂变显隐的切换.
      if (this.imgToggle) {
        this.taskListSrc = ''
        setTimeout(() => {
          this.taskListSrc = `//10.85.128.89:8004/#/page/ProgressList?isHide=true&userId=${this.userId}&orgId=${this.orgId}&platform=${this.platform}`
        }, 300)
      }
      if (!this.clickController) return
      this.clickController = false
      const whiteFram = this.$refs.whiteFram
      const width = window.getComputedStyle(whiteFram).width
      if (this.showList) {
        whiteFram.style.transform = `translateX(${width})`
        setTimeout(() => {
          this.taskListSrc = ''
          this.clickController = true
        }, 300)
      } else {
        whiteFram.style.transform = `translateX(0)`
        setTimeout(() => {
          this.taskListSrc = `//10.85.128.89:8004/#/page/ProgressList?isHide=true&userId=${this.userId}&orgId=${this.orgId}&platform=${this.platform}`
          this.clickController = true
        }, 300)
      }
      this.showList = !this.showList
      this.imgToggle = !this.imgToggle
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-dialog{
  height:700px
}
/deep/ .el-dialog__body{
  height:590px;
}
.iframeBox {
  height: 180px;
}
.taskList_iframe {
  width: 100%;
  height: 181px;
  border-width: 0;
}
.legendContainer {
  z-index: 9999;
  position: fixed;
  top: 160px;
  right: 50px;
  width: 65px;
  height: 50px;
}
.legendContainer img {
  width: inherit;
  height: inherit;
}
.goingNumber {
  position: relative;
  left: 45px;
  top: -55px;
  background-color: red;
  color: #ffffff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: block;
  text-align: center;
}
.formBox {
  z-index: 9999;
  position: fixed;
  width: 510px;
  height: 250px;
  top: 160px;
  right: 120px;
  overflow: hidden;
}
.whiteFram {
  position: relative;
  box-sizing: border-box;
  /* 必须设置成border-box, 否则边框会不可见. */
  width: 510px;
  height: 250px;
  padding: 15px;
  margin-left: 0;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  transform: translateX(510px);
  transition: all .3s;
}

.whiteCircle {
  z-index: 1000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 2px 2px #d3d3d3;
  background-color: #fff;
  position: absolute;
  top: 10px;
  right: 10px;
}

.redCircle {
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #f64444;
  color: #fff;
  font-size: 22px;
  font-weight: 500;
  display: block;
  text-align: center;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.document {
  position: relative;
  display: inline-block;
}

.document span {
  color: #adadad;
}
.ListItem {
  position: relative;
  top: 10px;
}

.el-progress {
  margin: 5px 0 0 18px;
}

.cancle {
  height: 10px;
  width: 10px;
  position: absolute;
  left: 448px;
  top: 122px;
  /* background-color: red; */
}

.checkFile {
  height: 45px;
  position: relative;
  /* top: 30px; */
  border-top: 1px solid #ccc;
  line-height: 45px;
  color: #169bd5;
  display: block;
  text-align: center;
  cursor: pointer;
}

.el-progress /deep/ .el-progress__text {
   display: none;
}

.progressIcon {
  position: relative;
  left: 5px;
  top: 12px;
}
</style>

