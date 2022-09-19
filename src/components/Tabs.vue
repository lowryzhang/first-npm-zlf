<template>
    <div class="ep-tabs" :style="{marginTop: !tianzheng ? '10px' : ''}">
        <div class="ep-tabs-top" v-show="tianzheng && !show && !isHide">
            <span class="ep-tab-home" @click="home">首页</span>
            <em class="ep-icon ep-prev-icon" @click="prev"></em>
            <div class="ep-tab-body">
                <div class="ep-tab-bd">
                    <span v-for="(item, index) in menu" :key="index" :title="item.title" @click="selTab(index, item)"
                          :class="path === item.path ? 'ep-tabs-cur' : ''">
                        <span>{{ item.title }}</span>
                        <i class="el-icon-close" @click.stop="remove(index)"></i>
                    </span>
                </div>
            </div>
            <em class="ep-icon ep-next-icon" @click="next"></em>
            <div class = 'ep-tab-closeall' @click="closeall">全部关闭</div>
        </div>
        <slot></slot>
    </div>
</template>

<script type="es6">
export default {
  props: ['show'],
  data() {
    return {
      selIndex: 0
    }
  },
  computed: {
    isHide() {
      return this.$store.getters.isHide
    },

    menu() {
      return this.$store.getters.menu
    },
    path: {
      get: function() {
        return this.$route.path || '/'
      },
      set: function(newValue) {
        return newValue
      }
    },
    tianzheng() {
      return !this.$route.query.ticket && !this.$route.query.projid
    }
  },
  watch: {
    menu: {
      handler(value) {
        return value
      },
      deep: true
    },
    path: {
      handler(value) {
        return value
      },
      deep: true
    }
  },
  mounted() {
    let list = []
    for (let i in this.menu) {
      list.push({
        path: this.menu[i].path,
        title: this.menu[i].title
      })
    }
    list.forEach((item, index) => {
      if (this.path === item.path) {
        this.selIndex = index
      }
    })
  },
  methods: {
    // 全部关闭
    closeall() {
      let menu = []
      this.$store.dispatch('SET_MENU', menu)
      this.$router.push({
        path: '/Home'
      })
    },
    prev() {
      let list = []
      for (let i in this.menu) {
        list.push({
          path: this.menu[i].path,
          title: this.menu[i].title
        })
      }
      if (this.selIndex === 0) return
      this.selIndex = this.selIndex - 1
      this.selTab(this.selIndex, list[this.selIndex])
    },
    next() {
      let list = []
      for (let i in this.menu) {
        list.push({
          path: this.menu[i].path,
          title: this.menu[i].title
        })
      }
      if (this.selIndex >= list.length - 1) return
      this.selIndex = this.selIndex + 1
      this.selTab(this.selIndex, list[this.selIndex])
    },
    selTab(index, item) {
      this.path = item.path
      this.selIndex = Number(index)
      if (this.$route.query.functionId !== '' || this.$route.query.functionId !== undefined) {
        this.$router.push({
          path: item.path,
          query: {
            keepAlive: false,
            functionId: this.$route.query.functionId
          }
        })
      } else {
        this.$router.push({
          path: item.path,
          query: {
            keepAlive: false
          }
        })
      }
      this.$store.dispatch('SET_CLOSE', false)
      localStorage.setItem('refresh', false)
    },
    remove(index) {
      let menu = []
      for (let i in this.menu) {
        menu.push(this.menu[i])
      }
      localStorage.removeItem('refresh')
      sessionStorage.removeItem(menu[index].path)
      sessionStorage.removeItem(menu[index].path + '/mdParam')
      if (this.$store.getters.cacheData[menu[index].path] !== undefined) {
        this.$store.dispatch('SET_CLOSE', true)
        this.$store.dispatch('SET_CACHEDATA', delete this.$store.getters.cacheData[menu[index].path])
      }
      menu.splice(index, 1)
      this.$store.dispatch('SET_MENU', menu)
      if (menu.length === 0) {
        this.$router.push({
          path: '/Home'
        })
        return
      }
      this.$router.push({
        path: menu[menu.length - 1].path,
        query: {
          keepAlive: false
        }
      })
    },
    home() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="less" scoped>
    .ep-tabs {
        .ep-tabs-top {
            background: #fff;
            border-bottom: 1px solid #e8e8e8;
            padding: 10px;
            display: flex;
            align-items: center;
            // overflow: hidden;
            position: relative;
            span {
                // width: 95px;
                border-bottom: 1px #ebebeb solid;
                margin: 0 5px;
                margin-right: 10px;
                cursor: pointer;
                color: #5a5a5a;
                height: 30px;
                line-height: 30px;
                display: flex;
                align-items: center;
                span {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    display: inline-block;
                    // width: 60%;
                    border-bottom: none;
                }
            }
            .ep-tab-home {
                width: 30px;
                border: none;
            }
            .ep-tab-closeall {
                cursor: pointer;
                border: none;
                position: absolute;
                right: 20px;
                top:16px;
            }
            .ep-tab-body {
                overflow: hidden;
                position: absolute;
                top:6px;
                left: 70px;
                right: 120px;
                &:hover .ep-tab-bd {
                    overflow-y: hidden;
                }
            }
            .ep-tab-bd {
                height: 40px;
                display: flex;

                align-items: center;

                &::-webkit-scrollbar { /*滚动条整体样式*/
                    width: 4px;
                    height: 6px;
                }
                &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
                    border-radius: 5px;
                    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                    background: rgba(0, 0, 0, 0.2);
                }
                &::-webkit-scrollbar-track { /*滚动条里面轨道*/
                    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                    border-radius: 0;
                    background: rgba(0, 0, 0, 0.1);
                }
            }
            .ep-tabs-cur {
                border-bottom: 2px solid #1890ff;
                color: #1890ff;
            }
            .ep-prev-icon {
                width: 20px;
                height: 20px;
                background: url(../assets/prev_icon.png) no-repeat;
                display: inline-block;
                background-size: 100%;
                cursor: pointer;
                position: absolute;
                left: 45px;
                top:16px;
            }
            .ep-next-icon {
                width: 20px;
                height: 20px;
                background: url(../assets/next_icon.png) no-repeat;
                display: inline-block;
                background-size: 100%;
                cursor: pointer;
                position: absolute;
                right: 80px;
                top:16px;
            }
        }
        /deep/ .el-scrollbar__wrap {
            width: 100%;
            overflow-y: hidden;
            overflow-x: scroll;
        }
    }
</style>
