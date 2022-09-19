<template>
  <div class="sidebarFastPhoto">
    <div class="ep-aside" :style="isSidebar ? 'width: 256px;' : 'width: 80px;'">
        <div class="ep-logo">
            <img src="data:image/png;base64,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">
            <h1>经办平台</h1>
        </div>
        <div class="ep-menu">
            <ep-scrollbar :isUseScrollbar="isSidebar">
                <!-- S 一级菜单 -->
                <ul class="ep-menu-body" :style="isSidebar ? 'width: 256px;' : 'width: 80px;'">
                    <template v-for="(item, index) in menus">
                        <el-tooltip class="item" effect="dark" :content="item.title" placement="right"
                                    v-if="!isSidebar && !item.children" :key="index">
                            <li class="ep-submenu"
                                @click="handleClick(index, item)"
                                :style="isSidebar && selIndex === index ? 'background: #1891ff;' : ''">
                                <div class="ep-submenu__title">
                                    <i class="el-icon-menu" :style="isSidebar ? '' : 'margin-left: 8px;'"></i>
                                    <span class="ep-title" v-show="isSidebar"
                                          :title="item.title">{{ item.title }}</span>
                                    <i class="el-submenu__icon-arrow" v-show="isSidebar && item.children"
                                       :class="selIndex === index ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                                </div>
                            </li>
                        </el-tooltip>
                        <li class="ep-submenu"
                            :key="index"
                            @click="handleClick(index, item)"
                            :style="isSidebar && selIndex === index && selTwoIndex === -1 ? 'background: #1891ff; margin:0 10px; border-radius: 5px;' : ' margin:0 10px;'"
                            v-else>
                            <div class="ep-submenu__title">
                                <i class="el-icon-menu" :style="isSidebar ? '' : 'margin-left: 8px;'"></i>
                                <span class="ep-title" v-show="isSidebar" :title="item.title" style="width: 80%;">{{ item.title }}</span>
                                <i class="el-submenu__icon-arrow" v-show="isSidebar && item.children"
                                   :class="isExpand && selIndex === index ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                            </div>
                            <!-- S 收缩后效果 -->
                            <ul v-show="!isSidebar">
                                <li v-for="(two, i) in item.children" :key="index + '-' + i"
                                    @click="handleClick1(i, two)">
                                    <span class="ep-title" :title="two.title">{{ two.title }}</span>
                                    <i class="el-submenu__icon-arrow el-icon-arrow-right" v-show="two.children"></i>
                                    <ul v-show="two.children">
                                        <li v-for="(three, j) in two.children" :key="index + '-' + i + '-' + j"
                                            @click="handleClick2(j, three)">
                                            <span :title="three.title">{{ three.title }}</span>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <!-- E 收缩后效果 -->
                        </li>
                        <!-- S 二级菜单 -->
                        <template v-if="isSidebar">
                            <transition name="slide-fade" :key="index">
                                <ul v-show="isExpand && selIndex === index">
                                    <template v-for="(two, i) in item.children">
                                        <li class="ep-submenu" style="padding-left: 10px; margin: 0 15px; border-radius: 5px;"
                                            @click="handleClick1(i, two)"
                                            :style="selTwoIndex === i && selThreeIndex === -1 ? 'background: #1891ff;' : ''"
                                            :key="i">
                                            <div class="ep-submenu__title">
                                                <!--<i :class="two.icon"></i>-->
                                                <span class="ep-title" :title="two.title">{{ two.title }}</span>
                                                <i class="el-submenu__icon-arrow"
                                                v-show="two.children && two.children.length > 0"
                                                :class="isExpand && selTwoIndex === i ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                                            </div>
                                        </li>
                                        <!-- S 三级菜单 -->
                                        <transition name="slide-fade" :key="i">
                                            <ul v-show="isExpandTwo && selTwoIndex === i">
                                                <template v-for="(three, j) in two.children">
                                                    <li class="ep-submenu"
                                                        style="padding-left: 20px; margin: 0 15px; border-radius: 5px;"
                                                        @click="handleClick2(j, three)"
                                                        :style="three.location === routePath ? 'background: #1891ff;' : ''"
                                                        :key="j">
                                                        <div class="ep-submenu__title">
                                                            <!--<i :class="three.icon"></i>-->
                                                            <span class="ep-title" :title="three.title">{{ three.title }}</span>
                                                            <i class="el-submenu__icon-arrow"
                                                            v-show="three.children && three.children.length > 0"
                                                            :class="selIndex === index ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
                                                        </div>
                                                    </li>
                                                </template>
                                            </ul>
                                        </transition>
                                        <!-- E 三级菜单 -->
                                    </template>
                                </ul>
                            </transition>
                            <!--</el-scrollbar>-->
                        </template>
                        <!-- E 二级菜单 -->
                    </template>
                </ul>
            <div v-if="meunquery" style="text-align:center;">{{meunquery}}</div>
            </ep-scrollbar>
        </div>
        <div class="ep-sidebar-bg" :style="isSidebar ? 'width: 256px;' : 'width: 80px;'"></div>
    </div>
  </div>

</template>

<script type="es6">
import qs from 'qs'
import onlineLeftMenu from '../mock/onlineLeftMenu'

const leftMenuData = (function() {
  let sysLeftMenuData = sessionStorage.getItem('sysLeftMenuData') && JSON.parse(sessionStorage.getItem('sysLeftMenuData'))
  let menuData = sysLeftMenuData || onlineLeftMenu
  // menuData.push({'location': '/yth/ProvinceInsurance/PersonInsure/ReportMainInfo', 'title': 'demo'})
  return menuData
}())

export default {
  props: ['index'],
  data() {
    return {
      meunquery: this.$route.query.menuquery || false,
      isCollapse: true,
      menus: leftMenuData,
      list: [],
      menuCur: [],
      selIndex: -1,
      selTwoIndex: -1,
      selThreeIndex: -1,
      isExpand: false,
      isExpandTwo: false
    }
  },
  computed: {
    isSidebar() {
      return this.$store.getters.isSidebar
    },
    menu() {
      return this.$store.getters.menu
    },
    routePath() {
      // console.log(this.$route.path)
      return this.$route.path
    }
    // meunquery() {
    //   return this.$route.query.menuquery
    // }
  },
  watch: {
    isSidebar: {
      handler(value) {
        return value
      },
      deep: true
    },
    menu: {
      handler(value) {
        return value
      },
      deep: true
    },
    routePath(value) {
      // console.log(value)
      if (value === '/Home') {
        this.isExpand = false
        this.isExpandTwo = false
      }
      return value
    }
  },
  mounted() {
    this.list = sessionStorage.getItem('menuList') ? qs.parse(sessionStorage.getItem('menuList')) : []
    // this.queryMenus();
  },
  created() {
    if (sessionStorage.getItem('selIndex')) {
      this.isExpand = true
      this.isExpandTwo = true
      this.selIndex = Number(sessionStorage.getItem('selIndex'))
      this.selTwoIndex = Number(sessionStorage.getItem('selTwoIndex'))
      this.selThreeIndex = Number(sessionStorage.getItem('selThreeIndex'))
    }
    /* 目前会报错，所以先注释掉  */
    if (!this.$route.query.ticket && !this.$route.query.projid) {
      this.$api.commonGet(this.$insiisApi + '/sys/function/queryFunctionList', {funType: 2}).then(res => {
        if (!res || !res.result) { return false }
        if (res && res.result.length) {
          sessionStorage.setItem('sysLeftMenuData', JSON.stringify(res.result))
          for (let index = 0; index < res.result.length; index++) {
            if (res.result[index].children && res.result[index].children.length > 0) {
              for (let i = 0; i < res.result[index].children.length; i++) {
                if (res.result[index].children[i].children !== undefined) {
                  for (let j = 0; j < res.result[index].children[i].children.length; j++) {
                    if (res.result[index].children[i].children[j].location === this.$route.path) {
                      this.selIndex = sessionStorage.setItem('selIndex', index)
                      this.selTwoIndex = sessionStorage.setItem('selTwoIndex', i)
                      this.selThreeIndex = sessionStorage.setItem('selThreeIndex', j)
                      this.selIndex = index
                      this.selTwoIndex = i
                      this.selThreeIndex = j
                      return
                    }
                  }
                }
              }
            }
          }

          // 筛选菜单
          if (this.$route.query.menuquery) {
            let menuqueryCondition = this.$route.query.menuquery
            for (let index = 0; index < res.result.length; index++) {
              for (let i = res.result[index].children.length - 1; i > -1; i--) {
                for (let j = res.result[index].children[i].children.length - 1; j > -1; j--) {
                  if (res.result[index].children[i].children[j].funCode.indexOf(menuqueryCondition) === -1) {
                    res.result[index].children[i].children.splice(j, 1)
                  }
                  if (res.result[index].children[i].children.length === 0) {
                    res.result[index].children.splice(i, 1)
                  }
                }
              }
            }
          }

          if (process.env.NODE_ENV === 'production') {
            this.menus = res.result
          } else {
            // let demo = {'location': '/yth/ProvinceInsurance/PersonInsure/ReportMainInfo', 'title': 'demo'}
            let demo2 = {'location': '/yth/ProvinceInsurance/OperatePlatform/CheckCenter', 'title': '审核中心'}
            let demo3 = {'location': '/yth/ProvinceInsurance/OperatePlatform/SysJournal', 'title': '操作日志管理'}
            res.result.push(demo2)
            // res.result.push(demo)
            res.result.push(demo3)
            this.menus = res.result
          }
        }
      })
    }
  },
  methods: {
    // 一级菜单点击
    handleClick(index, item) {
      // console.log(index);
      sessionStorage.setItem('selIndex', index)
      if (index !== this.selIndex) {
        this.isExpand = true
      } else {
        this.isExpand = !this.isExpand
      }
      this.selIndex = index
      this.selTwoIndex = -1
      this.selThreeIndex = -1
      if (item.children === undefined) {
        this.gotoPage(item)
      }
    },
    // 二级菜单点击
    handleClick1(index, item) {
      // console.log(index);
      sessionStorage.setItem('selTwoIndex', index)
      if (index !== this.selTwoIndex) {
        this.isExpandTwo = true
      } else {
        this.isExpandTwo = !this.isExpandTwo
      }
      this.selTwoIndex = index
      this.selThreeIndex = -1
      if (item.children === undefined) {
        this.gotoPage(item)
      }
    },
    // 三级菜单点击
    handleClick2(index, item) {
      sessionStorage.setItem('selThreeIndex', index)
      this.selThreeIndex = index
      if (item.children === undefined) {
        this.gotoPage(item)
      }
    },
    // 打开Tab页
    gotoPage(item) {
      this.list = []
      let path = item.location.indexOf('/#') !== -1 ? item.location.split('/#')[1] : item.location
      this.$router.push({
        path: path
      })
      this.list.push({
        title: item.title,
        path: path
      })
      this.menuCur = item
      sessionStorage.setItem('menuList', qs.stringify(this.list))
      this.$store.dispatch('SET_MENU', this.unique(this.list))
      this.$store.dispatch('SET_CLOSE', false)
    },
    // 去重
    unique(newList) {
      let list = []
      for (let i in this.menu) {
        list.push(this.menu[i])
      }
      if (newList) {
        if (!list) {
          return newList
        } else {
          let temp = []
          newList.forEach(item => {
            let flag = false
            list.forEach(menu => {
              if (menu.path && item.path && menu.path === item.path) {
                flag = true
              }
            })
            if (!flag) {
              temp.push(item)
            }
          })
          return list.concat(temp)
        }
      } else {
        return []
      }
    }
    // 获取菜单
    // queryMenus() {
    //   this.$api.commonGet('sys/menu/getMenuList').then(res => {
    //     if (res.status === '0') {
    //       this.menus = res.data
    //     }
    //   })
    // }
  }
}
</script>

<style lang="less">
.sidebarFastPhoto{
  .ep-aside {
        min-height: 100vh;
        box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
        z-index: 10;
        position: fixed;
        .ep-logo {
            height: 64px;
            position: relative;
            line-height: 64px;
            transition: all .3s;
            overflow: hidden;
            z-index: 9;
            img {
                display: inline-block;
                vertical-align: middle;
                width: 43px;
                height: 32px;
                margin-top: 16px;
                margin-left: 17px;
                float: left
            }
            h1 {
                float: left;
                color: #fff;
                display: inline-block;
                vertical-align: middle;
                font-size: 20px;
                margin: 0 0 0 12px;
                font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
                font-weight: 600;
            }
        }
        .ep-menu {
            z-index: 9;
            position: relative;
            height: calc(100vh - 64px);
            .ep-title {
                // width: 90%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            &-body {
                width: 256px;
                display: inline-block;
                text-align: left;
                padding: 0;
                .el-tooltip{
                    display: flex;
                    justify-content: center;
                }
                .ep-submenu {
                    position: relative;
                    &__title {
                        height: 46px;
                        line-height: 46px;
                        font-size: 14px;
                        color: #fff;
                        padding: 0 10px;
                        list-style: none;
                        cursor: pointer;
                        position: relative;
                        transition: all .3s;
                        box-sizing: border-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        display: flex;
                        align-items: center;
                        &__icon-arrow {
                            position: absolute;
                            top: 50%;
                            right: 20px;
                            margin-top: -7px;
                            transition: all .3s;
                            font-size: 12px;
                        }
                    }
                    ul {
                        position: absolute;
                        left: -999em;
                        width: 200px;
                        font-weight: normal;
                        margin: 10px 0 0 0;
                        padding: 0;
                        background: #fff;
                        box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
                        li {
                            width: 200px;
                            height: 40px;
                            line-height: 40px;
                            padding: 0 20px;
                            font-size: 14px;
                            cursor: pointer;
                            box-sizing: border-box;
                            transition: border-color .3s, background-color .3s, color .3s;
                            position: relative;
                            ul {
                                margin: 0 0 0 120px;
                                li {
                                    color: #606266;
                                    width: 200px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                            }
                        }
                    }
                }
                .ep-submenu [class^=el-icon-], [class^=ep-icon-] {
                    vertical-align: middle;
                    margin-right: 5px;
                    width: 24px;
                    text-align: center;
                    font-size: 18px;
                }
                .ep-submenu:hover {
                    left: auto;
                }
                .ep-submenu:hover ul ul {
                    left: -999em;
                }
                .ep-submenu:hover ul, .ep-submenu li:hover ul {
                    left: 80px;
                    top: 0;
                }
                .ep-submenu ul li:hover {
                    background: #1891ff;
                    color: #fff;
                }
                ul {
                    padding: 0;
                }
            }
        }
        .ep-sidebar-bg {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            display: block;
            position: absolute;
            // background: url(/empinjypay/static/img/sidebar.jpg) no-repeat center center / cover;
        }
        .ep-sidebar-bg:after {
            width: 100%;
            height: 100%;
            z-index: 3;
            content: "";
            display: block;
            opacity: .8;
            position: absolute;
            background: #000;
        }
    }
}


</style>
