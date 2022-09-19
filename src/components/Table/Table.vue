<template>
  <div class="ep-table">
    <div class="toolsBar" v-if="titleControl || (JSON.stringify(exportParm) != '{}')">
      <el-popover
        v-if="titleControl && toolsFlag"
        placement="bottom"
        trigger="click"
        visible-arrow="true"
      >
        <div v-for="(item, i) in tableTitle" :key="i">
          <el-checkbox v-model="item.checked">{{ item.title }}</el-checkbox>
        </div>
        <!-- <el-button slot="reference">显示列</el-button> -->
        <img src="../../../static/img/icon_shuaixuan_nor.png" alt="筛选"
          :class="{flyBtn: titleControl && (JSON.stringify(exportParm) != '{}'),
          flyBtnb: titleControl && !(JSON.stringify(exportParm) != '{}')}"
          style="cursor:pointer;" slot="reference" id="SXIcon">
      </el-popover>
      <img src="../../../static/img/icon_daochu_nor.png" alt="导出"
        :class="{flyBtnb: (JSON.stringify(exportParm) != '{}')}" title="导出" @click="allExcel"
        style="cursor:pointer;" v-if="(JSON.stringify(exportParm) != '{}') && toolsFlag">
      <!-- <el-popover
        v-if="JSON.stringify(exportParm) != '{}'"
        placement="bottom"
        trigger="hover"
        visible-arrow="true"
      >
        <div>
          <el-button @click="curExcel">导出当前页</el-button>
        </div>
        <div>
          <el-button @click="allExcel">导出所有页</el-button>
        </div>
        <el-button slot="reference">导出</el-button>
      </el-popover> -->
    </div>

    <el-popover
      v-if="titleFilter.length > 0"
      placement="top-start"
      title="当前列"
      width="300"
      trigger="click"
    >
      <el-checkbox-group v-model="list">
        <el-checkbox
          v-for="(item, index) in titleFilter"
          :key="index"
          :label="item"
          :title="item"
          >{{ item }}
        </el-checkbox>
      </el-checkbox-group>
      <div class="ep-title-filter" slot="reference">
        <el-button
          type="text"
          size="mini"
          icon="iconfont ep-icon-filter"
        ></el-button>
      </div>
      <!-- <el-popover placement="bottom" width="200" trigger="hover">
        <div v-for="item in tableTitle" :key="item">
          <el-checkbox v-model="item.checked">{{ item.title }}</el-checkbox>
        </div>
        <el-button slot="reference">显示列控制</el-button>
      </el-popover> -->
    </el-popover>

    <!-- 单个table（不分类显示） -->
    <div v-if="!isGroupTable" :style="singleStyle">
      <el-table
        ref="multipleTable"
        :show-summary="summaryTitles.length != 0"
        :summary-method="getSummaries"
        :span-method="objectSpanMethod"
        @row-click="rowclick"
        class="singleTable maxHeightTable"
        highlight-current-row
        :row-class-name="tableRowClassName"
        @select-all="selectAll"
        @select="select"
        @selection-change="handleSelectionChange"
        :data="tableData"
        :border="border"
        style="width: 99.9%"
        :max-height="maxheight"
        @sort-change="sortchange"
        @row-dblclick="rowDblclick"
        @cell-click="cellclick"
        @cell-dblclick="cellDbClick"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        id="titleControl"
        stripe
      >
        <slot></slot>
      </el-table>
    </div>

    <!-- 用作多个table分类显示表头 -->
    <div v-if="isGroupTable && tableData.length !== 0" style="margin-bottom:10px" class="mainGroup">
      <div style="margin-bottom: 10px" :class="{flyTitle: flyTitle}" id="flyTitle">
        <el-table
          :span-method="objectSpanMethod"
          ref="mainTable"
          class="mainTable maxHeightTable"
          @row-click="rowclick"
          highlight-current-row
          :row-class-name="tableRowClassName"
          @select-all="selectAll"
          @select="select"
          @selection-change="handleSelectionChange"
          :border="border"
          style="width: 99.9%"
          :max-height="maxheight"
          @sort-change="sortchange"
          @row-dblclick="rowDblclick"
          @cell-click="cellclick"
          @cell-dblclick="cellDbClick"
          @cell-mouse-enter="cellMouseEnter"
          @cell-mouse-leave="cellMouseLeave"
          id="titleControl"
          stripe
        >
          <slot></slot>
        </el-table>
      </div>
      <!-- 用于定位以取消浮动 -->
      <el-table class="victims maxHeightTable" :class="{disFly: flyTitle}" ref="nearmaintable"></el-table>
      <!-- 多个table分类显示 -->
      <div v-for="(value, key, i) in groupTable" :key="i" style="margin-bottom:10px">
        <div style="display: flex">
          <!-- <el-button class="togle" v-show="!noShowArr.includes(i)" type="primary"
            @click="hidThisTable(i)" size="mini">收起</el-button> -->
          <img src="../../../static/img/icon_guizeshouqi_nor.png" alt="收起"
            class="togle" v-show="!noShowArr.includes(i)" title="收起" @click="hidThisTable(i)"
            style="cursor:pointer;">
          <!-- <el-button class="togle" v-show="noShowArr.includes(i)" type="primary"
            @click="showThisTable(i)">展开</el-button> -->
          <img src="../../../static/img/icon_guizezhankai_nor.png" alt="展开"
             class="togle" v-show="noShowArr.includes(i)" title="展开" @click="showThisTable(i)"
            style="cursor:pointer;">
          <div style="margin-bottom:10px;font-size:16px;color:#409EFF;font-weight:bold">{{ `${key}` }}</div>
        </div>
        <el-table
          v-show="!noShowArr.includes(i)"
          :show-summary="summaryTitles.length != 0"
          :summary-method="getSummaries"
          :span-method="objectSpanMethod"
          :show-header="i === key"
          ref="multipleTable"
          class="multipleTable maxHeightTable"
          @row-click="rowclick"
          highlight-current-row
          :row-class-name="tableRowClassName"
          @select-all="selectAll"
          @select="select"
          @selection-change="handleSelectionChange"
          :data="value"
          :border="border"
          style="width: 99.9%"
          :max-height="maxheight"
          @sort-change="sortchange"
          @row-dblclick="rowDblclick"
          @cell-click="cellclick"
          @cell-dblclick="cellDbClick"
          @cell-mouse-enter="cellMouseEnter"
          @cell-mouse-leave="cellMouseLeave"
          id="titleControl"
          stripe
        >
          <slot></slot>
        </el-table>
      </div>
    </div>
    <!-- 多个table但没有数据时以单个table表格显示暂无数据 -->
    <div v-if="isGroupTable && tableData.length === 0" style="text-align:center;color:#909399">
      <el-table
        ref="multipleTable"
        :show-summary="summaryTitles.length != 0"
        :summary-method="getSummaries"
        :span-method="objectSpanMethod"
        @row-click="rowclick"
        highlight-current-row
        :row-class-name="tableRowClassName"
        @select-all="selectAll"
        @select="select"
        @selection-change="handleSelectionChange"
        :data="tableData"
        :border="border"
        style="width: 100%"
        class="maxHeightTable"
        :max-height="maxheight"
        @sort-change="sortchange"
        @row-dblclick="rowDblclick"
        @cell-click="cellclick"
        @cell-dblclick="cellDbClick"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        id="titleControl"
        stripe
      >
        <slot></slot>
      </el-table>
    </div>

    <!-- 分页 -->
    <slot name="pagination"></slot>
    <el-pagination
      v-if="pagesize > 0 && toolsFlag"
      background
      small
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="sizeExample"
      :page-size="pagesize"
      :layout="layout"
      :total="Number(data.total)"
    >
    </el-pagination>
  </div>
</template>

<script type="es6">
export default {
  props: {
    sizeExample: {
      type: Array,
      default: () => [10, 20, 60, 100, 200, 500, 2000]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    // 负责声明哪些字段需要统计
    summaryTitles: {
      type: Array,
      default: () => []
    },
    // 表格列显隐控制
    titleControl: {
      type: Boolean,
      default: false
    },
    maxheight: {
      type: Number,
      default: 2000
    },
    onlyData: {
      type: Boolean,
      default: false
    },
    sortable: {
      type: Boolean,
      default: false
    },
    checkRow: {
      type: Boolean,
      default: false
    },
    data: {
      type: [Object, Array],
      default: () => {
        return {
          total: 0,
          Data: [],
          mouseOnIndex: -1
        }
      }
    },
    // allPageNum:{
    //   type: string,
    //   default: 0
    // },
    border: {
      type: Boolean,
      default: true
    },
    isClass: {
      type: Boolean,
      default: false
    },
    isNoteClass: {
      type: Boolean,
      default: false
    },
    isrevoke: {
      type: Boolean,
      default: false
    },
    isColor: {
      type: Boolean,
      default: false
    },
    // 总计与否
    showsummary: {
      type: Boolean,
      default: false
    },
    allsummary: {
      type: String,
      default: '0'
    },
    // rowKey: {
    //   type: String,
    //   default: ''
    // },
    rowDbClick: {
      type: Boolean,
      default: false
    },
    pager: {
      type: [String, Number]
      // default: 10
    },
    pageNum: {
      type: [String, Number],
      default: 1
    },
    name: String,
    api: {
      type: String,
      default: function() {
        return 'doQuery'
      }
    },
    titleFilter: {
      type: Array,
      default: () => []
    },
    pathName: {
      type: String,
      default: 'tableData'
    },
    isCodeType: {
      type: Boolean,
      default: false
    },
    ismerge: {
      type: Boolean,
      default: false
    },
    // 导出excel
    exportParm: {
      type: Object,
      default: function() {
        return {}
      }
    },
    // 是否要分组显示
    isGroupTable: {
      type: Boolean,
      default: false
    },
    // 分组依据
    group: {
      type: String,
      default: 'group'
    },
    isSpanMethods: {
      type: Boolean,
      default: false
    },
    zydExcel: {
      type: Boolean,
      default: false
    },
    // 超出多少加滚动条
    singleHeight: {
      type: String,
      default: ''
    },
    hideTableTitle: {
      type: Array,
      default: () => []
    },
    titleControlArr: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    // 监听传入主数据的改变以更新显示数据
    data: {
      handler(newValue, oldValue) {
        this.$emit('getData', newValue)
        if (newValue.Data) {
          this.tableData = this.onlyData ? newValue.Data.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize) : newValue.Data
          // this.allPageNum = newValue.total > 0 ? newValue.total : 0
          if (this.titleControl) {
            this.getTitleListName()
          }
          if (this.isGroupTable) {
            this.$nextTick(() => this.addScrollEventLister())
          }
          if (this.tableData.length > 0) {
            this.toolsFlag = true
          }
        }
      },
      deep: true
    },
    pageNum: {
      handler(val) {
        this.currentPage = Number(val)
      },
      deep: true
    },
    pager: {
      handler(val) {
        this.pagesize = Number(val)
      },
      deep: true
    },
    // tableData: {
    //   handler(val) {
    //     for (const d of this.$refs.multipleTable) {
    //       d.bodyWrapper.addEventListener('scroll', (res) => {
    //         this.howLong = res.target.scrollLeft
    //       }, false)
    //     }
    //   }
    //   // deep: true
    // },

    // 同步横向滚动条
    howLong: {
      handler(val) {
        for (const d of this.$refs.multipleTable) {
          d.bodyWrapper.scrollLeft = this.howLong
        }
        this.$refs.mainTable.bodyWrapper.scrollLeft = this.howLong
      }
    },
    // 同步标题宽度
    flyTitle: {
      handler(val) {
        // eslint-disable-next-line eqeqeq
        if (val === true && this.howWidth && this.howWidth != '0') {
          document.getElementById('flyTitle').style.maxWidth = this.howWidth + 'px'
        }
      }
    }
  },
  beforeDestroy() {
  },
  computed: {
    // 计算分类显示依据
    groupTable() {
      var groupCollect = {}// 形式如，{组名1：[{},{}]，组名2：[{},{}]}
      // 处理tableData中的分组信息，将tableData分组
      for (var j = 0; j < this.tableData.length; j++) {
        var groupname = this.tableData[j][this.group]
        if (typeof groupCollect[groupname] === 'undefined') {
          groupCollect[groupname] = []
        }
        groupCollect[groupname].push(this.tableData[j])
      }
      return groupCollect// 形式如，{{groupName:'',children:[{},{}]}
    }

  },

  data() {
    return {
      singleStyle: {
        overflow: 'auto',
        height: this.singleHeight ? this.singleHeight : '100%'
      },
      howLong: null,
      howWidth: null,
      tableTitle: [], // 存放列表表头对象，{title:"",checked:}控制列显示用
      mytable: false,
      index: 0,
      pagesize: Number(this.pager),
      currentPage: Number(this.pageNum),
      tableData: [],
      list: [],
      flyTitle: false,
      noShowArr: [], // 分类显示的收起隐藏中的隐藏内容
      toolsFlag: false // 控制是否展示按钮工具
    }
  },
  created() {
    // this.tableData = this.data.Data
    if (this.onlyData) {
      this.tableData = this.data.Data.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
    } else {
      this.tableData = this.data.Data
    }

    // console.log(this.info);
    // this.list.push  = this.titleFilter;
  },
  mounted() {
    // 监听表头高度
    if (this.isGroupTable) {
      window.addEventListener('scroll', this.handleScrollx, true)
    }
    // 表格初始化时获得列名
    this.toolsFlag = true
    if (this.titleControl) {
      this.getTitleListName()
    }
    if (this.isGroupTable && this.tableData.length !== 0) {
      this.$nextTick(() => {
        this.addScrollEventLister()
      })
    }
    this.$nextTick(() => {
      setTimeout(() => {
        let arr = document.querySelectorAll('.maxHeightTable .el-table__body-wrapper')
        // let top = document.querySelector('.maxHeightTable .el-table__header').clientHeight + 15
        for (let i = 0; i < arr.length; i++) {
          // arr[i].stytle.maxHeight = Number(this.maxheight) + 'px'
          // arr[i].setAttribute('style', 'max-height: ' + this.maxheight + 'px !important')
        }
      }, 200)
    })
    // console.log('tableData:::', this.tableData)

    // if (this.$children[1] && this.$children[1].$children && this.$children[1].$children.length > 0) {
    //     this.$children[1].$children.map(item => {
    //         if (!item.hidden) {
    //             this.list.push(item.header);
    //         }
    //     })
    // }
    // console.log(this.list);

    this.list = this.titleFilter
    this.$store.dispatch('SET_CLICK', this.rowDbClick)
  },
  methods: {
    // 判定是否需要表头浮动
    handleScrollx() {
      if (this.$refs.mainTable) {
        this.howWidth = this.$refs.nearmaintable.bodyWrapper.clientWidth
        if (this.$refs.mainTable.bodyWrapper.getBoundingClientRect().top <= 38) {
          this.flyTitle = true
        }
        if (this.$refs.nearmaintable.bodyWrapper.getBoundingClientRect().top >= 49) {
          this.flyTitle = false
        }
      }
    },
    // 获得控制列显隐列表（表头列表）
    getTitleListName() {
      const self = this
      // self.tableTitle = []
      this.$nextTick(() => {
        if (this.titleControlArr.length) {
          if (!self.tableTitle.length) {
            let titles = this.titleControlArr
            for (let i = 0; i < titles.length; i++) {
              self.tableTitle.push({
                title: titles[i],
                checked: true
              })
            }
            for (let i = 0; i < self.hideTableTitle.length; i++) {
              const Index = self.tableTitle.findIndex((item) => { return item.title === self.hideTableTitle[i] })
              if (Index !== -1) {
                self.tableTitle[Index].checked = false
              }
            }
            self.tableTitle.push()
          }
        } else {
          if (document.getElementById('titleControl') && !self.tableTitle.length) {
            let titles = document.getElementById('titleControl')
              .getElementsByTagName('thead')[0]
              .getElementsByClassName('cell')
            for (let i = 0; i < titles.length; i++) {
              self.tableTitle.push({
                title: titles[i].innerText,
                checked: true
              })
            }
            for (let i = 0; i < self.hideTableTitle.length; i++) {
              const Index = self.tableTitle.findIndex((item) => { return item.title === self.hideTableTitle[i] })
              if (Index !== -1) {
                self.tableTitle[Index].checked = false
              }
            }
            self.tableTitle.push()
          }
        }
      })
    },
    // 添加滚动监听器
    addScrollEventLister() {
      if (this.$refs.mainTable) {
        this.$refs.mainTable.bodyWrapper.addEventListener('scroll', (res) => {
          this.howLong = res.target.scrollLeft
        }, false)
      }
      if (this.$refs.multipleTable.length && this.$refs.multipleTable.length > 0) {
        for (const d of this.$refs.multipleTable) {
          d.bodyWrapper.addEventListener('scroll', (res) => {
            this.howLong = res.target.scrollLeft
          }, false)
        }
      }
    },
    delScrollEventLister() {
      for (const d of this.$refs.multipleTable) {
        d.bodyWrapper.removeEventListener('scroll', (res) => {
          this.howLong = res.target.scrollLeft
        }, false)
      }
    },
    // 隐藏当前分表
    hidThisTable(i) {
      this.noShowArr.push(i)
      console.log(this.noShowArr)
      this.$nextTick(() => {
        setTimeout(() => {
          let arr = document.querySelectorAll('.maxHeightTable .el-table__body-wrapper')
          for (let i = 0; i < arr.length; i++) {
            console.log(arr[i])
            // arr[i].stytle.maxHeight = Number(this.maxheight) + 'px'
            arr[i].setAttribute('style', 'max-height: ' + this.maxheight + ' !important')
          }
        }, 200)
      })
    },
    // 展开当前分表
    showThisTable(i) {
      this.noShowArr.splice(this.noShowArr.indexOf(i), 1)
      console.log(this.noShowArr)
      this.$nextTick(() => {
        setTimeout(() => {
          let arr = document.querySelectorAll('.maxHeightTable .el-table__body-wrapper')
          for (let i = 0; i < arr.length; i++) {
            console.log(arr[i])
            // arr[i].stytle.maxHeight = Number(this.maxheight) + 'px'
            arr[i].setAttribute('style', 'max-height: ' + this.maxheight + ' !important')
          }
        }, 200)
      })
    },

    // 求和计算
    getSummaries({columns, data}) {
      const self = this
      // 求和算法 ~ 解决js语言浮点数数位计算bug
      const sumMethod = (arr) => {
        return arr.reduce((pre, cur) => {
          let r1, r2, m
          try {
            r1 = pre.toString().split('.')[1].length
          } catch (e) {
            r1 = 0
          }
          try {
            r2 = cur.toString().split('.')[1].length
          } catch (e) {
            r2 = 0
          }
          m = Math.pow(10, Math.max(r1, r2))
          return Math.round(pre * m + cur * m) / m
        })
      }

      const totalNumObj = {}
      data.forEach(groupDataItem => {
        // 遍历需要计算合计的type
        self.summaryTitles.forEach(totalType => {
          // 累加type
          if (groupDataItem[totalType]) {
            if (!totalNumObj[totalType]) {
              totalNumObj[totalType] = []
            }
            totalNumObj[totalType].push(Number(groupDataItem[totalType]))
          }
        })
      })
      // 对累加的结果进行求和计算
      for (let i in totalNumObj) {
        totalNumObj[i] = sumMethod(totalNumObj[i])
      }

      // 保存表最后一行的统计结果
      const sums = []
      // 遍历每一列
      columns.forEach((column, index) => {
        if (index === 0) { // 第一列为合计
          sums[index] = '合计'
        } else {
          if (totalNumObj[column.property] !== undefined) {
            // eslint-disable-next-line eqeqeq
            if (column.property.indexOf('months') != -1 || column.property.indexOf('aae202') != -1 || column.property.indexOf('count') != -1) {
              sums[index] = totalNumObj[column.property].toFixed(0)
            } else {
              sums[index] = totalNumObj[column.property].toFixed(2)
            }
          }
        }
      })
      return sums
    },


    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(row, column, rowIndex, columnIndex)
      if (this.isSpanMethods) {
        if (columnIndex === 0 && rowIndex === 1) {
          return [1, 5]
        }
      }
      if (this.ismerge) {
        if (columnIndex === 2 & rowIndex === 1) {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
        if (columnIndex === 4 & rowIndex === 1) {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
      }
    },
    parentHandleclick(e) {
      // console.log(e)
      this.mytable = e
      if (e) {
        this.data.Data.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row, true)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    parentHandleclick1(e, bool) {
      if (e) {
        this.$refs.multipleTable.toggleRowSelection(e)
      }
    },
    tableRowClassName({row, rowIndex}) {
      if (this.isrevoke) {
        if (row.isfullreceived === '未足额到账' && row.isrevoke === '未核销') {
          return 'error-row'
        }
      }
      if (this.isNoteClass) {
        if (row.note.indexOf('被征地') !== -1 || row.note.indexOf('延缴') !== -1 || row.note.indexOf('221') !== -1) {
          return 'error-row'
        }
      }
      if (this.isClass) {
        if (row.afterInfo !== row.beforeInfo) {
          return 'warning-row'
        }
      }
      if (this.checkRow) {
        if (this.onlyData) {
          row.index = (this.currentPage - 1) * this.pagesize + rowIndex
        } else {
          row.index = rowIndex
        }
      }
      if (this.isColor) {
        let stytle = ''
        this.$emit('tableRowClassName', row, rowIndex, function(str) {
          stytle = str
        })
        return stytle
      }
    },
    rowclick(row, column, event, rowIndex) {
      let index = this.data.Data.indexOf(row)
      this.$emit('rowclick', row, index)
    },
    selectAll(val) {
      this.$emit('selectAll', val)
    },
    select(selection, row) {
      this.$emit('select-checkbox', selection, row)
    },
    handleSelectionChange(val) {
      this.$emit('ischose', val, this.data.Data, this.mytable)
    },
    cellclick(row, column, cell, event) {
      // console.log(row,column,cell,event);
      let index = this.data.Data.indexOf(row)
      this.$emit('cellclick', row, column.property, index)
    },
    handleSizeChange(val) {
      this.pagesize = val

      if (this.onlyData) {
        this.tableData = this.data.Data.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
        if (this.mytable) {
          this.$nextTick(() => {
            this.data.Data.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row, true)
            })
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      }
      this.currentPage = 1
      this.$emit('changeIndex', this.pagesize, this.currentPage)
      // this.$store.dispatch('SET_COMMONPOST', obj);
    },
    handleCurrentChange(val) {
      // if(this.onlyData){
      this.currentPage = val
      // }
      if (this.onlyData) {
        this.tableData = this.data.Data.slice((this.currentPage - 1) * this.pagesize, this.currentPage * this.pagesize)
        if (this.mytable) {
          this.$nextTick(() => {
            this.data.Data.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row, true)
            })
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      }
      this.$emit('changeIndex', this.pagesize, this.currentPage)
    },
    cellDbClick(row, column) {
      if (!this.rowDbClick) return
      this.index = this.index + 1
      this.$store.dispatch('SET_COLUMN', column.property)
      let index = this.data.Data.indexOf(row)
      this.$store.dispatch('SET_INDEX', index)
      this.$store.commit('SET_ROW', row)
      this.index = 0
    },
    cellMouseEnter(row, column, cell, event) {
      let index = this.data.Data.indexOf(row)
      this.mouseOnIndex = index
      this.tableData.push()
    },
    cellMouseLeave(row, column, cell, event) {
      this.mouseOnIndex = -1
      this.tableData.push()
    },
    rowDblclick(row, column) {
      let index = this.data.Data.indexOf(row)
      // this.$store.dispatch('SET_ROWINDEX', index);
      this.$emit('rowdblclick', row, index)
    },
    sortchange(column) {
      console.log(column, this.tableData)
    },
    // 导出当前页03excel
    curExcel() {
      var parm = ''
      const self = this
      for (let key in self.exportParm) {
        parm += key + '=' + self.exportParm[key] + '&'
      }
      console.log(parm.slice(0, -1))
    },
    // todo 导出接口未完成
    allExcel() {
      if (this.zydExcel) {
        this.$emit('zydExcel')
        return
      }
      var parm = ''
      const self = this
      for (let key in self.exportParm) {
        if (key === 'pageSize' || key === 'page') { continue }
        parm += key + '=' + self.exportParm[key] + '&'
      }
      console.log(parm.slice(0, -1))
      window.open(`${this.$insured}/employment/query/personMultiple/export?${parm}`)
    }

  }
}
</script>

<style lang="less" scoped>
.none {
  display: none !important;
}
.ep-table {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  max-width: 100%;
  background-color: #fff;
  font-size: 14px;
  color: #606266;
}

.ep-title-filter {
  background: #fafbfa;
  position: absolute;
  z-index: 1000;
  right: 10px;
  top: 1px;
  display: flex;
  align-items: center;
  min-height: 47px;
  /deep/ i {
    font-size: 14px !important;
    color: #888 !important;
  }
}

/deep/ .el-table__header-wrapper {
  border-width: 1px 1px 0 1px;
  border-style: solid;
  border-color: #ebeef5;
  width: auto;
}

/deep/ .el-table__header th {
  background: #e3e3e3 !important;
  color: #333;
  padding-top: 6px;
  padding-bottom: 6px;
}

/deep/ .el-table--enable-row-transition .el-table__body td {
  padding: 0;
}

/*/deep/ .el-table th>.cell {*/
/*padding: 0 30px;*/
/*}*/

/deep/ .el-table td > .cell {
  padding: 0;
}

/deep/ .el-table tr td {
  padding: 0;
}

/deep/ .el-pagination {
  float: right;
  margin-top: 10px;
  margin-bottom: 10px;
}
.togle {
  // padding: 3px 5px 3px 5px;
  margin-top: 3px;
  margin-right: 10px;
  height: 16px;
}
.flyBtn {
  float: right;
  position: relative;
  right: 40px;
  top: -45px;
  margin-left: -32px;
}
.flyBtnb {
  float: right;
  position: relative;
  right: 0px;
  top: -45px;
  margin-left: -32px;
}
.toolsBar {
  width: 100%;
  // margin-top: 48px;
  // border-bottom: 1px solid #9A9A9A;
  // margin-bottom: 10px
}
/deep/ .mainTable {
  border: 0px;
  .el-table__body-wrapper {
    .el-table__empty-block {
      height: 0px !important;
      min-height: 0px !important;
    }
  }
}
/deep/ .singleTable {
  .el-table__header-wrapper {
    border: 0px;
  }
}
.victims {
  height: 0px;
  min-height: 0px;
}
.flyTitle {
  position: fixed;
  top: 0px;
  z-index: 999;
}
.disFly {
  margin-top: 58px
}
</style>
