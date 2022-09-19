<template>
  <div class="InsuredInfoFastPhoto">
    <div class="ep-insuredInfo" :style="{marginTop: mt === '' ? '' : mt + 'px'}">
            <div class="ep-unit" :style="{ marginRight: AB01 != null ? '10px' : '' }" v-if="AC01 != null">
                <div class="ep-title" v-show="unitTitle">{{ unitTitle }}</div>
                <div class="ep-hd">
                    <span class="ep-hd-title">{{ AC01[unitData[0]] && AC01[unitData[0]].value }}</span>
                    <span class="ep-hd-btn">
                        <el-button v-show="unitDetailPath" type="primary" size="mini" @click="openDetail(unitDetailPath, '单位详情')">详细查询</el-button>
                        <el-button v-show="unitEditlPath" size="mini" @click="openEdit(unitEditlPath, '单位编辑')">编辑</el-button>
                    </span>
                </div>
                <div class="ep-bd">
                    <div class="ep-bd-item ep-bd-unit">
                        <span class="ep-bd-item-lf">{{AC01[unitData[0]] &&  AC01[unitData[1]].key }}：{{ AC01[unitData[0]] && AC01[unitData[1]].value }}</span>
                        <span>{{ AC01[unitData[0]] && AC01[unitData[2]].key }}：{{ AC01[unitData[0]] && AC01[unitData[2]].value }}</span>
                    </div>
                    <div class="ep-bd-item ep-bd-unit">
                        <span class="ep-bd-item-lf">{{ AC01[unitData[0]] && AC01[unitData[3]].key }}：{{ AC01[unitData[0]] && AC01[unitData[3]].value }}</span>
                        <span>{{ AC01[unitData[0]] && AC01[unitData[4]].key }}：{{ AC01[unitData[0]] && AC01[unitData[4]].value }}</span>
                    </div>
                    <div class="ep-bd-item ep-bd-unit">
                        <span class="ep-bd-item-lf">{{ AC01[unitData[0]] && AC01[unitData[5]].key }}：{{ AC01[unitData[0]] && AC01[unitData[5]].value }}</span>
                        <span>{{ AC01[unitData[0]] && AC01[unitData[6]].key }}：{{ AC01[unitData[0]] && AC01[unitData[6]].value }}</span>
                    </div>
                    <div class="ep-bd-item ep-bd-unit">
                        <span class="ep-bd-item-lf">{{ AC01[unitData[0]] && AC01[unitData[7]].key }}：{{ AC01[unitData[0]] && AC01[unitData[7]].value }}</span>
                        <span>{{ AC01[unitData[0]] && AC01[unitData[8]].key }}：{{ AC01[unitData[0]] && AC01[unitData[8]].value }}</span>
                    </div>
                </div>
            </div>
            <div class="ep-personal" v-if="AB01 != null">
                <div class="ep-title" v-show="personalTitle">{{ personalTitle }}</div>
                <div class="ep-hd">
                    <span class="ep-hd-title">{{ AB01[personalData[0]] && AB01[personalData[0]].value }}</span>
                    <span class="ep-hd-btn">
                        <el-button v-show="personalDetailPath" type="primary" size="mini"
                                   @click="openDetail(personalDetailPath, '个人详情')">详细查询</el-button>
                        <el-button v-show="personalEditlPath" size="mini" @click="openEdit(personalEditlPath, '个人编辑')">编辑</el-button>
                    </span>
                </div>
                <div class="ep-bd">
                    <el-row :gutter="20" class="ep-bd-item">
                        <el-col :span="16"><span class="ep-bd-item-lf">{{ AB01[personalData[0]] && AB01[personalData[1]].key }}：{{ AB01[personalData[0]] && AB01[personalData[1]].value }}</span></el-col>
                        <el-col :span="8"><span>{{ AB01[personalData[0]] && AB01[personalData[2]].key }}：{{ AB01[personalData[0]] && AB01[personalData[2]].value }}</span></el-col>
                    </el-row>
                    <el-row :gutter="20" class="ep-bd-item">
                        <el-col :span="8"><span class="ep-bd-item-list" style="width: 33%;">{{ AB01[personalData[0]] && AB01[personalData[3]].key }}：{{ AB01[personalData[0]] && AB01[personalData[3]].value }}</span></el-col>
                        <el-col :span="8"><span class="ep-bd-item-list" style="width: 33%;">{{ AB01[personalData[0]] && AB01[personalData[4]].key }}：{{ AB01[personalData[0]] && AB01[personalData[4]].value }}</span></el-col>
                        <el-col :span="8"><span class="ep-bd-item-list" style="width: 33%;">{{ AB01[personalData[0]] && AB01[personalData[5]].key }}：{{ AB01[personalData[0]] && AB01[personalData[5]].value }}</span></el-col>
                    </el-row>
                    <el-row :gutter="20" class="ep-bd-item">
                        <el-col :span="16"><span class="ep-bd-item-lf">{{ AB01[personalData[0]] && AB01[personalData[6]].key }}：{{ AB01[personalData[0]] && AB01[personalData[6]].value }}</span></el-col>
                        <el-col :span="8"><span>{{ AB01[personalData[0]] && AB01[personalData[7]].key }}：{{ AB01[personalData[0]] && AB01[personalData[7]].value }}</span></el-col>
                    </el-row>
                    <el-row :gutter="20" class="ep-bd-item">
                        <el-col :span="24"><span class="ep-bd-item-lf">{{ AB01[personalData[0]] && AB01[personalData[8]].key }}：{{ AB01[personalData[0]] && AB01[personalData[8]].value }}</span></el-col>
                    </el-row >
                </div>
            </div>
        </div>
  </div>

</template>

<script type="es6">
import qs from 'qs'

export default {
  props: {
    api: {
      type: String,
      default: ''
    },
    unitDetailPath: {
      type: String,
      default: ''
    },
    unitEditlPath: {
      type: String,
      default: ''
    },
    personalDetailPath: {
      type: String,
      default: ''
    },
    personalEditlPath: {
      type: String,
      default: ''
    },
    unitTitle: {
      type: String,
      default: ''
    },
    personalTitle: {
      type: String,
      default: ''
    },
    isBar: {
      type: Boolean,
      default: false
    },
    unitData: {
      type: Array,
      default: () => {
        return []
      }
    },
    personalData: {
      type: Array,
      default: () => {
        return []
      }
    },
    mt: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      AB01: {},
      AC01: {}
    }
  },
  computed: {
    menu() {
      return this.$store.getters.menu
    }
  },
  watch: {
    menu: {
      handler(value) {
        return value
      },
      deep: true
    }
  },
  mounted() {
    // eslint-disable-next-line no-unused-expressions
    sessionStorage.getItem('menuList') ? qs.parse(sessionStorage.getItem('menuList')) : []
    this.getInfo()
  },
  methods: {
    // 打开详情
    openDetail(path, title) {
      this.list = []
      this.$router.push({
        path: path
      })
      this.list.push({
        title: title,
        path: path
      })
      sessionStorage.setItem('menuList', qs.stringify(this.list))
      this.$store.dispatch('SET_MENU', this.unique(this.list))
    },
    // 打开编辑
    openEdit(path, title) {
      this.list = []
      this.$router.push({
        path: path
      })
      this.list.push({
        title: title,
        path: path
      })
      sessionStorage.setItem('menuList', qs.stringify(this.list))
      this.$store.dispatch('SET_MENU', this.unique(this.list))
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
    },
    // 获取信息接口
    getInfo() {
    //   let params = {}
      // Object.keys(this.$route.query).forEach(item => {
      //     params[item] = this.$route.query[item].value;
      // });
      this.$api.commonGet(this.api, this.$route.query).then(res => {
        if (res.status === '0') {
          if (res.message !== null) {
            this.$message.success(res.message)
          }
          this.AB01 = res.data.AB01 || null
          this.AC01 = res.data.AC01 || null
        } else if (res.status === '1' && res.message !== null) {
          this.$message.warning(res.message)
        } else if (res.status === '9' && res.message !== null) {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>

<style lang="less">
.InsuredInfoFastPhoto{
    .ep-insuredInfo {
        display: flex;
        -webkit-transition: all .3s;
        transition: all .3s;
        border-radius: 2px;
        border: none;
        .ep-title {
            color: #0080fa;
            font-size: 18px;
            border-bottom: 1px #DEDFE0 solid;
            padding: 0 20px 12px 20px;
            margin-bottom: 20px;
        }
        .ep-hd {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            padding: 10px 20px;
            &-title {
                font-size: 18px;
                font-weight: 600;
            }
        }
        .ep-bd {
            padding: 0 20px 20px 20px;
            &-item {
                padding: 5px 0;
                font-size: 14px;
                &-lf {
                    width: 65%;
                }
                &-list {
                    width: 32%;
                }
            }
            &-unit {
                display: flex;
                align-items: center;
            }
        }
        .ep-unit {
            flex: 1;
            border-right: 6px;
            background: #fff;
        }
        .ep-personal {
            flex: 1;
            border-right: 6px;
            background: #fff;
        }
        .ep-text-green {
            color: #00cc00;
        }
        .ep-text-red {
            color: #ff0000;
        }
    }
}

</style>
