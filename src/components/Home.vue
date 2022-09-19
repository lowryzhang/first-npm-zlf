<template>
  <el-container>
    <keep-alive>
      <ep-sidebar v-show="tianzheng && !isShow && !isHide"></ep-sidebar>
    </keep-alive>
    <el-container
      class="is-vertical"
      :style="!tianzheng || isHide? 'margin-left: 0;' : isSidebar ? 'margin-left: 256px;' : 'margin-left: 80px;'"
    >
      <ep-header v-show="tianzheng && !isShow && !isHide"></ep-header>
      <ep-tabs :show="isShow">
        <!--<keep-alive>-->
        <!--<router-view v-if="this.keepAlive"/>-->
        <!--</keep-alive>-->
        <router-view v-if="isReloadAlive" />
      </ep-tabs>
      <!-- <ep-footer></ep-footer> -->
    </el-container>

    <!-- 一键保障功能触发图标 -->
    <div
      v-drag
      id="dragbtn"
      :class="{beLeftAlittle: menuFlag, beAlittle: !menuFlag}"
    >
      <!-- <img
        class="qaImg"
        @click="beforeReport"
        :src="qaIcon"
        alt
        draggable="false"
      /> -->
      <div v-if='menuFlag'
        :class="{mydialog:menuFlag,mydialogClose:!menuFlag}">
        <div class="menuMain">
          <div class="menuBk" @click="checkGuize">
            <div class="menuIconBk">业务规则</div>
            <div class="menu-circle">
              <i class="circle" v-if="hasCircle"></i>
              <img class="qaImg" :src="guizeIcon" alt='业务规则' title="业务规则" draggable="false"/>
            </div>
          </div>
          <div class="menuBk" @click="beforeReport">
            <div class="menuIconBk">一键报障</div>
            <img class="qaImg" :src="qaIcon" alt='一键报障' title="一键报障" draggable="false"/>
          </div>
        </div>
      </div>
      <div class="menu-circle">
        <i class="circle" v-if="hasCircle"></i>
        <img class="qaImg" @click="showMenu" :src="menuIcon" alt='菜单导航' title="菜单导航" draggable="false"/>
      </div>
      <!-- <div v-if="menuFlag" class="blackScreen" @click="menuFlag=false"></div> -->
    </div>
    <el-dialog :visible.sync="dialogVisible" width="90%" show-close title="添加故障信息">
      <iframe
        id="iframeId"
        class="iframeId"
        style="width: 100%;height: 500px;"
        :src="env"
        frameborder="0" v-if="testFlag"
      ></iframe>
    </el-dialog>
    <el-dialog :visible.sync="dialogGuize" width="80%" show-close title="业务规则信息" class="guizeDialog" @close="handlerClose">
      <iframe
        v-if="dialogGuize"
        id="iframeId"
        class="iframeId"
        ref="ruleIframe"
        style="width: 100%;height: 100%;"
        :src="envGuize"
        frameborder="0"
      ></iframe>
    </el-dialog>
    <div class="guize-iframe">
      <!-- 此处iframe用于父页面接收子iframe的postMessage -->
      <iframe
        id="iframeId"
        class="iframeId"
        ref="ruleIframe1"
        style="width: 100%;height: 500px;"
        :src="envGuize"
        frameborder="0"
      ></iframe>
    </div>
  </el-container>
</template>

<script type="es6">
import qaIcon from '../../static/img/qa_icon/icon_baozhang_pre.png'
import menuIcon from '../../static/img/qa_icon/icon_daohang_pre.png'
import guizeIcon from '../../static/img/qa_icon/icon_guize_pre.png'
import Message from 'tmessage'

export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isShow: this.$route.query.show || false,
      isReloadAlive: true,
      testFlag: false,
      keepAlive: true,
      dialogVisible: false,
      qaIcon: qaIcon,
      menuIcon: menuIcon,
      guizeIcon: guizeIcon,
      dialogGuize: false,
      menuFlag: false,
      baseInfo: {
        itemArea: '',
        itemName: '',
        idCard: '',
        reportName: '',
        logonName: '',
        password: '',
        reportTime: ''
      },
      // 报障系统当前IP地址
      env: 'http://10.85.94.57:8017/#/diaPost',
      envGuize: '',
      hasCircle: false
    }
  },
  computed: {
    isHide() {
      return this.$store.getters.isHide
    },

    isSidebar() {
      return this.$store.getters.isSidebar
    },
    tianzheng() {
      return !this.$route.query.ticket && !this.$route.query.projid
    }
  },
  watch: {
    isSidebar: {
      handler(value) {
        return value
      },
      deep: true
    },
    $route: {
      handler(value) {
        this.keepAlive = value.query.keepAlive !== undefined
      }
    },
    dialogVisible(newVal) {
      if (newVal === false) {
        this.testFlag = false
      }
    }
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem('loginuserinfo'))
    let urlParams
    if (this.userInfo) {
      urlParams = `?displayName=${this.userInfo.displayName}&areaName=${this.userInfo.areaName}&idCard=${this.userInfo.idCard}&itemName=${this.userInfo.itemName || ''}`
    }

    // 报障系统当前IP地址
    switch (window.location.port) {
      case '8585':
      // 生产
        this.env = 'http://10.85.94.57:8018/#/diaPost' + urlParams
        break
      case '8588':
        // 预发
        this.env = 'http://10.85.94.57:8017/#/diaPost' + urlParams
        break
      case '8587':
      // 测试
        this.env = 'http://10.85.94.238:8017/#/diaPost' + urlParams
        break
      case '9002':
      // 本地
        this.env = 'http://127.0.0.1:8080/#/diaPost' + urlParams
    }
    window.addEventListener('beforeunload', e => {
      localStorage.setItem('refresh', 'true')
    })
    this.getEnvGuize(0)
  },
  mounted() {
    // let inputs = document.getElementsByTagName('input')
    // for (let i = 0; i < inputs.length; i++) {
    //   // console.log(inputs[i])
    //   if (inputs[i].type === 'text' && inputs[i].name !== '') {
    //     inputs[i].onkeydown = function(e) {
    //       if (e.keyCode === 13) {
    //         try {
    //           document.getElementsByTagName('input')[++i].focus()
    //         } catch (e) {
    //           return false
    //         }
    //       }
    //     }
    //   }
    // }
    const that = this
    this.$nextTick(() => {
      window.addEventListener('message', function(messageEvent) {
        if (messageEvent.data.success) {
          that.hasCircle = messageEvent.data.result > 0
        }
      })
    })
  },
  methods: {
    showMenu() {
      let isClick = document.getElementById('dragbtn').getAttribute('data-flag')
      if (isClick !== 'true') {
        return false
      }
      this.menuFlag = !this.menuFlag
    },
    checkGuize() {
      this.dialogGuize = true
      this.menuFlag = false
      this.getEnvGuize(1)
    },
    handlerClose() {
      this.getEnvGuize(0)
    },
    getEnvGuize(guizePage) {
      let ticket = this.$route.query.ticket
      switch (window.location.port) {
        case '8585':
          // 生产
          this.envGuize = `http://10.85.94.7:8012/#/ruleList?onlyPage=true&guizePage=${guizePage}&ticket=${ticket}`
          break
        case '8588':
          // 预发
          this.envGuize = `http://10.85.94.57:16061/ruleList?onlyPage=true&guizePage=${guizePage}&ticket=${ticket}`
          break
        case '8587':
          // 测试
          this.envGuize = `http://10.85.94.57:16061/ruleList?onlyPage=true&guizePage=${guizePage}&ticket=${ticket}`
          break
        case '9002':
          // 本地
          this.envGuize = `http://127.0.0.1:8087/ruleList?onlyPage=true&guizePage=${guizePage}&ticket=${ticket}`
          break
      }
    },
    reload() {
      this.isReloadAlive = false
      this.$nextTick(() => {
        this.isReloadAlive = true
      })
    },
    // 一键报障功能逻辑
    async beforeReport() {
      // 验证是否为点击事件，是则继续执行click事件，否则不执行
      let isClick = document.getElementById('dragbtn').getAttribute('data-flag')
      if (isClick !== 'true') {
        return false
      }
      this.menuFlag = false
      this.dialogVisible = true
      this.testFlag = true
      this.baseInfo.itemName = this.$leftMenuTitle
      this.userInfo = JSON.parse(sessionStorage.getItem('loginuserinfo'))
      this.baseInfo.reportTime = new Date(this.$currentDate).toLocaleDateString()

      console.log('this.userInfo:', JSON.parse(sessionStorage.getItem('loginuserinfo')))

      if (this.route.query.ticket && this.route.query.projid) {
        let ticket = this.route.query.ticket
        let projid = this.route.query.projid
        await this.$api.NewYthInfo({ ticket: ticket, projid: projid }).then(res => {
          if (res.success === true) {
          // 根据初始化返回的参数调用页面查询方法
            this.baseInfo.idCard = res.result.applicationBodyIdCard
          } else {
            this.$message.error(res.resultDes)
          }
        })
      }

      // 其他页面点击的时候重新向 qa 系统发送数据
      if (document.getElementById('iframeId')) {
        this.htmlStr = this.common.creatHtml1()
        let { htmlText, cssUrl, version } = this.common.creatHtml(2)

        this.$iFrameMsgHub = new Message({
          origin: this.env + '/#/diaPost',
          receiverSelector: '.iframeId'
        })
        // console.log('this.$iFrameMsgHub::', this.$iFrameMsgHub)
        this.$iFrameMsgHub.send({
          // 判断传参类型，默认是 1
          type: 1,
          baseInfo: this.baseInfo,
          userInfo: this.userInfo,
          htmlStr: this.htmlStr,
          htmlText: htmlText,
          cssUrl: cssUrl,
          version: version,
          functionId: this.$leftMenuId,
          href: window.location.href
        })
      }

      // 弹框dom完全渲染之后执行
      this.$nextTick(() => {
        let frame = document.getElementById('iframeId')
        let that = this
        this.htmlStr = this.common.creatHtml1()
        let { htmlText, cssUrl, version } = this.common.creatHtml(2)
        frame.onload = function() {
          // console.log('frame.onload')
          self.$iFrameMsgHub = new Message({
            origin: that.env + '/#/diaPost',
            receiverSelector: '.iframeId'
          })
          // console.log('self.$iFrameMsgHub::', self.$iFrameMsgHub)
          self.$iFrameMsgHub.send({
            // 判断传参类型，默认是 1
            type: 1,
            baseInfo: that.baseInfo,
            userInfo: that.userInfo,
            htmlStr: that.htmlStr,
            htmlText: htmlText,
            cssUrl: cssUrl,
            version: version,
            functionId: that.$leftMenuId,
            href: window.location.href
          })
          self.$iFrameMsgHub.onMessage(dataReceived => {
            // console.log(dataReceived)
            if (dataReceived.type === 2) {
              if (dataReceived.success) {
                that.dialogVisible = false
                this.testFlag = false
                that.$message({
                  type: 'success',
                  duration: '3000',
                  message: '保存成功'
                })
              }
              // TODO
            }
          })

          // console.log('self.$iFrameMsgHub22::', self.$iFrameMsgHub)
        }
      })
    }
  },
  directives: {
    drag(el, bindings) {
      let odiv = el // 获取当前元素
      let firstTime = ''
      let lastTime = ''
      odiv.onmousedown = (e) => {
        document.getElementById('dragbtn').setAttribute('data-flag', false)
        self.isclick = false
        firstTime = new Date().getTime()

        // 算出鼠标相对元素的位置
        let disx = e.pageX - el.offsetLeft
        let disy = e.pageY - el.offsetTop
        document.onmousemove = (e) => {
          el.style.left = e.pageX - disx + 'px'
          el.style.top = e.pageY - disy + 'px'
        }
        document.onmouseup = (e) => {
          document.onmousemove = null
          document.onmouseup = null
          // onmouseup 时的时间，并计算差值
          lastTime = new Date().getTime()
          if ((lastTime - firstTime) < 200) {
            document.getElementById('dragbtn').setAttribute('data-flag', true)
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
body {
  overflow: hidden;
}
.menuIconBk {
  background-color: #D1E9FF;
  width: 192px;
  height: 35px;
  position: relative;
  right: -48px;
  // margin-top: -52px;
  z-index: -1;
  border-radius: 24px;
  color: #1890FF;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding-top: 13px;
  padding-right: 42px;
}
.menuBk {
  display: flex;
  width: 180px;
  height: 48px;
  margin-bottom: 15px
}
.menuMain {
  position: relative;
  right: 132px;
  margin-top: -126px;
  width: 180px;
}
.menu-circle {
  position: relative;
  .circle {
    position: absolute;
    top: 3px;
    left: 36px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #FF0000;
  }
}
.blackScreen {
  background-color: black;
  z-index: -2;
  height: 9999px;
  width: 9999px;
  position: relative;
  top: -5000px;
  left: -5000px;
}
.beLeftAlittle {
  z-index: 5; position: absolute; right: 30px; bottom: 50px; height: 48px; width: 48px
}
.beAlittle {
  z-index: 5; position: absolute; right: 30px; bottom: 50px; height: 48px; width: 48px
}
.guizeDialog {
  overflow: hidden;
  /deep/ .el-dialog {
    height: 80vh;
  }
  /deep/.el-dialog__body {
    height: calc(80vh - 70px);
    padding: 10px 20px;
  }
  /deep/.el-dialog__header {
    .el-dialog__title {
      color: white;
      line-height: 50px;
      margin-left: 20px
    }
    height: 50px;
    background-color: #1890FF;
    padding: 0px 0px;
  }
  /deep/.el-dialog__headerbtn i {
    font-size: 16px;
    color: white;
    // visibility: hidden;
  }
}
.guize-iframe {
  width: 0;
  height: 0;
}
.qaImg {
  cursor: pointer;
}
.el-main {
  margin: -20px 24px 0;
}
.is-vertical {
  // height: 100vh;
  overflow-y: auto;
}
@keyframes myfirst {
  0% { width:0;height: 0; position: absolute; opacity: 0; top:78px}
  100% { width:0;height: 0; position: absolute; opacity: 1; top:0px}
}
@-webkit-keyframes myfirst /* Safari 与 Chrome */{
  0% { width:0;height: 0; position: absolute; opacity: 0; top:78px}
  100% { width:0;height: 0; position: absolute; opacity: 1; top:0px}
}
.mydialog {
  animation: myfirst .5s;
  -webkit-animation: myfirst .5s; /* Safari 与 Chrome */
}
@keyframes myseconed {
  0% { width:0;height: 0; position: absolute; opacity: 1; top:0px}
  100% { width:0;height: 0; position: absolute; opacity: 0; top:78px}
}
@-webkit-keyframes myseconed /* Safari 与 Chrome */{
  0% { width:0;height: 0; position: absolute; opacity: 1; top:0px}
  100% { width:0;height: 0; position: absolute; opacity: 0; top:78px}
}
.mydialogClose {
  animation: myseconed .5s;
  -webkit-animation: myseconed .5s; /* Safari 与 Chrome */
}
</style>
