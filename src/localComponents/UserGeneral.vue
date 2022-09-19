<template>
  <!-- 组件说明：（工伤核准支付模块通用） 工伤基础信息模块展示 & 之前保存没有进天正下一步的校验与下一步保存 -->
  <!-- 父组件应用举例
    vue:
    <epl-UserGeneral
      ref="injuryUserMsg"
      @updateFn="updateFn"
      idCount="newPersonInfo_four"
      :initPanel="initPanel"
      colspan='24'
    ></epl-UserGeneral>
    js:
    // initPanel的定义：如果有panel信息，比如网报进来的，不用调用接口，那就直接给子组件用于显示基础信息
    this.initPanel = {...obj}
    // 调用子组件查询接口
    this.$refs.injuryUserMsg.queryBasicFn(idCard)
    /**
      * 基础信息数据更新
      * @param {Object} value
      */
    updateFn(value) {
      // 更新工伤基础信息
      this.panel = { ...value }
      // 根据需要调用校验接口或计算接口
    } -->
  <div>
    <div class="ep-user-general userMessageFastPhoto" v-if="hasBasicCard">
      <el-col :span="Number(colspan)">
        <div class="ep-message-content" v-if="hasTwoCard">
          <el-row class="ep-left">
            <el-col :span="12">
              <!-- 工伤保险定期待遇暂停或终止 供养人员信息 -->
              <div v-if="idCount =='relative_half'">
                <ep-title>供养人员信息</ep-title>
                <ep-title>{{selfTitle || panel.aac003 || '人员姓名'}}</ep-title>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="12" class="el-list-item">
                    <span>社会保障号:</span>
                    <span :title="panel.aac002">{{panel.aac002}}</span>
                  </el-col>
                  <el-col :span="12" class="el-list-item">
                    <span>姓名:</span>
                    <span :title="panel.aac003">{{panel.aac003}}</span>
                  </el-col>
                </el-row>

                <el-row :gutter="20" class="el-list">
                  <el-col :span="12" class="el-list-item">
                    <span>性别:</span>
                    <span>{{panel.aac004 | sexTypeFilter}}</span>
                  </el-col>
                  <el-col :span="12" class="el-list-item">
                    <span>出生日期:</span>
                    <span>{{panel.aac006|YYYYmmDD_Filter}}</span>
                  </el-col>
                </el-row>

                <el-row :gutter="20" class="el-list">
                  <el-col :span="12" class="el-list-item">
                    <span>民族:</span>
                    <span>{{panel.aac005 | nationTypeFilter}}</span>
                  </el-col>
                  <el-col :span="12" class="el-list-item">
                    <span title="户口性质">户口性质：</span>
                    <span
                      :title="panel.aac009|residenceType"
                    >{{panel.aac009|residenceType}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="12" class="el-list-item">
                    <span>供养关系:</span>
                    <span>{{panel.aae144}}</span>
                  </el-col>
                  <el-col :span="12" class="el-list-item">
                    <span>孤寡标志:</span>
                    <span>{{panel.aac086}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list">
                    <el-col :span="12" class="el-list-item">
                    <span>待遇享受开始年月:</span>
                    <span>{{panel.aic160|YYYYmm_Filter}}</span>
                  </el-col>
                  <el-col :span="12" class="el-list-item">
                    <span title="待遇享受终止年月">待遇享受终止年月：</span>
                    <span>
                      <a
                        :title="panel.aic301"
                      >{{panel.aic301|YYYYmm_Filter}}</a>
                    </span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="12" class="el-list-item">
                    <span title="联系人姓名">联系人姓名：</span>
                    <span :title="panel.aae004">{{panel.aae004 || '--'}}</span>
                  </el-col>
                  <el-col :span="12" class="el-list-item">
                    <span title="联系人手机号">联系人手机号:</span>
                    <span
                      :title="panel.aae005"
                    >{{panel.aae005}}</span>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="12">
              <!-- 工伤保险定期待遇暂停或终止 工亡人员信息 -->
              <div v-show="idCountTwo =='self_half'">
                <ep-title>工亡人员信息</ep-title>
                <ep-title>{{selfTitle || panel1.aac003 || '人员姓名'}}</ep-title>
                  <el-row :gutter="20" class="el-list">
                    <el-col :span="12" class="el-list-item">
                      <span title="社会保障号">社会保障号:</span>
                      <span :title="panel1.aac002">{{panel1.aac002||'--'}}</span>
                    </el-col>
                    <el-col :span="12" class="el-list-item">
                      <span title="姓名">姓名:</span>
                      <span :title="panel1.aac003">{{panel1.aac003||'--'}}</span>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" class="el-list">
                    <el-col :span="12" class="el-list-item">
                      <span title="性别">性别:</span>
                      <span :title="panel1.aac004">{{panel1.aac004 | sexTypeFilter}}</span>
                    </el-col>
                    <el-col :span="12" class="el-list-item">
                      <span>民族:</span>
                      <span>{{panel1.aac005 | nationTypeFilter}}</span>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20" class="el-list">
                    <el-col :span="12" class="el-list-item">
                      <span title="出生日期">出生日期:</span>
                      <span :title="panel1.aac006">{{panel1.aac006 | YYYYmmDD_Filter}}</span>
                    </el-col>
                    <el-col :span="12" class="el-list-item">
                      <span title="工伤发生时间">工伤发生时间:</span>
                      <span :title="panel1.alc020">{{panel1.alc020 | YYYYmmDD_Filter}}</span>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20" class="el-list">
                    <el-col :span="12" class="el-list-item">
                      <span title="工伤发生单位">工伤发生单位:</span>
                      <span :title="panel1.aab004">{{panel1.aab004||'--'}}</span>
                    </el-col>
                    <el-col :span="12" class="el-list-item">
                      <span title="统一社会信用代码">统一社会信用代码:</span>
                      <span :title="panel1.aab998">{{panel1.aab998||'--'}}</span>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20" class="el-list">
                    <el-col :span="12" class="el-list-item">
                      <span title="工伤认定书编号">工伤认定书编号：</span>
                      <span
                        :title="panel1.alc011"
                      >{{panel1.alc011}}</span>
                    </el-col>
                    <el-col :span="12" class="el-list-item">
                      <span title="工伤认定日期">工伤认定日期:</span>
                      <span :title="panel1.alc031">{{panel1.alc031 | YYYYmmDD_Filter}}</span>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20" class="el-list">
                    <el-col :span="12" class="el-list-item">
                      <span title="因工死亡时间">因工死亡时间:</span>
                      <span :title="panel1.alc040">{{panel1.alc040 | YYYYmmDD_Filter}}</span>
                    </el-col>
                    <el-col :span="12" class="el-list-item">
                      <span title="老工伤标识">老工伤标识:</span>
                      <span :title="panel1.bae476 | oldInjuryFlag">{{panel1.bae476 | oldInjuryFlag}}</span>
                    </el-col>
                  </el-row>
              </div>
            </el-col>
          </el-row>
          <slot :row="row"></slot>
        </div>
        <div class="ep-message-content"  v-else>
          <div class="ep-left" >
            <div class="ep-card-title">
              <div>{{selfTitle || panel.aac003 || '人员姓名'}}</div>
              <div>
                <!-- <el-button size="mini" type="primary" v-if="buchong">查看详情</el-button> -->
                <el-button  type="text" @click="addMessage" v-if="buchong">补充/修改</el-button>
                <el-button  type="text" @click="checkDetail" v-if="isDetail">查看详情</el-button>
                <el-button  type="text" @click="showExpend" v-if="expendBase" style="font-weight:bold;">缴费基数</el-button>
                <!-- <el-button size="mini">编辑</el-button> -->
              </div>
            </div>
            <div v-if="idCount =='newPersonInfo_three'">
              <!-- <el-carousel
                indicator-position="outside"
                trigger="click"
                arrow="never"
                :height="maHeight"
                :autoplay="false"
              > -->
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="社会保障号">社会保障号:</span>
                  <span :title="panel.aac002">{{panel.aac002||'--'}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="性别">性别:</span>
                  <span :title="panel.aac004">{{panel.aac004 | sexTypeFilter}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="出生日期">出生日期:</span>
                  <span :title="panel.aac006">{{panel.aac006 | YYYYmmDD_Filter}}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="统筹区">统筹区:</span>
                  <span :title="panel.aab359">{{panel.aab359|regionTypeFilter}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="离退休状态">离退休状态:</span>
                  <span :title="panel.aac084 | retireStatus">{{panel.aac084 | retireStatus}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="手机号码">手机号码:</span>
                  <span :title="panel.aac067">{{panel.aac067||'--'}}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="工伤发生时间">工伤发生时间:</span>
                  <span :title="panel.alc020">{{panel.alc020 | YYYYmmDD_Filter}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="认定申请日期">认定申请日期:</span>
                  <span :title="panel.aae127">{{panel.aae127 | YYYYmmDD_Filter}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="工伤认定日期">工伤认定日期:</span>
                  <span :title="panel.alc031">{{panel.alc031 | YYYYmmDD_Filter}}</span>
                </el-col>
                </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="伤害部位">伤害部位:</span>
                  <span :title="panel.alc042Name">{{panel.alc042Name}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="是否涉及第三人">是否涉及第三人:</span>
                  <span :title="panel.blc543 | isThirdPerson">{{panel.blc543 | isThirdPerson}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="工伤认定结论">工伤认定结论:</span>
                  <span :title="panel.ala015 | cognizanceConclusion">{{panel.ala015 | cognizanceConclusion}}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list" v-if="DisabilityBenefit">
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="伤残等级">伤残等级:</span>
                  <span :title="panel.ala040 | injuryLevel">{{panel.ala040 | injuryLevel}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="伤残等级鉴定日期">伤残等级鉴定日期:</span>
                  <span :title="panel.alc034">{{panel.alc034 | YYYYmmDD_Filter}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="老工伤标识">老工伤标识:</span>
                  <span :title="panel.bae476 | oldInjuryFlag">{{panel.bae476 | oldInjuryFlag}}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item" v-if="DisabilityBenefit">
                  <span class="col_title" title="生活自理障碍等级">生活自理障碍等级:</span>
                  <span :title="panel.alc060 | selfcareDisorderLevel">{{panel.alc060 | selfcareDisorderLevel}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="生活自理障碍鉴定日期">生活自理障碍鉴定日期:</span>
                  <span :title="panel.alc074">{{panel.alc074 | YYYYmmDD_Filter}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="职业病名称">职业病名称:</span>
                  <span :title="panel.ala017Name">{{panel.ala017Name}}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="16" class="el-list-item">
                  <span class="col_title" :title="panel.blc360=='1'?'建筑项目名称':'工伤发生单位'">{{panel.blc360=='1'?'建筑项目名称：':'工伤发生单位：'}}</span>
                  <span :title="panel.aab004" style="width:500px !important;">{{panel.aab004||'--'}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="统一社会信用代码">统一社会信用代码:</span>
                  <span :title="panel.aab998">{{panel.aab998||'--'}}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="16" class="el-list-item">
                  <span class="col_title" title="总包单位名称">总包单位名称:</span>
                  <span :title="panel.zbAab004" style="width:500px !important;">{{panel.zbAab004 || '--'}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="col_title" title="因工死亡时间">因工死亡时间:</span>
                  <span :title="panel.alc040">{{panel.alc040 | YYYYmmDD_Filter}}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="24" class="el-list-item">
                  <span class="col_title" title="伤害事件情况">伤害事件情况:</span>
                  <span :title="panel.alc006">{{panel.alc006}}</span>
                </el-col>
              </el-row>
              <!-- </el-carousel> -->
            </div>
            <div v-if="idCount =='newPersonInfo_four'">
              <!-- <el-carousel
                indicator-position="outside"
                trigger="click"
                arrow="never"
                :height="maHeight"
                :autoplay="false"
              > -->
                  <el-row :gutter="20" class="el-list">
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="社会保障号">社会保障号:</span>
                      <span :title="panel.aac002">{{panel.aac002||'--'}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="性别">性别:</span>
                      <span :title="panel.aac004">{{panel.aac004 | sexTypeFilter}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="出生日期">出生日期:</span>
                      <span :title="panel.aac006">{{panel.aac006 | YYYYmmDD_Filter}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="手机号码">手机号码:</span>
                      <span :title="panel.aac067">{{panel.aac067||'--'}}</span>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20" class="el-list">
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="统筹区">统筹区:</span>
                      <span :title="panel.aab359">{{panel.aab359|regionTypeFilter}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="离退休状态">离退休状态:</span>
                      <span :title="panel.aac084 | retireStatus">{{panel.aac084 | retireStatus}}</span>
                    </el-col>
                    <!-- 计算所得，不存表 -->
                    <el-col :span="6" class="el-list-item" v-if="avgSalary">
                      <span class="col_title" title="工亡人员工资">工亡人员工资:</span>
                      <span :title="panel.avgSalary">{{panel.avgSalary || '--'}} 元</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="工伤认定结论">工伤认定结论:</span>
                      <span :title="panel.ala015 | cognizanceConclusion">{{panel.ala015 | cognizanceConclusion}}</span>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" class="el-list">
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="工伤发生时间">工伤发生时间:</span>
                      <span :title="panel.alc020">{{panel.alc020 | YYYYmmDD_Filter}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="认定申请日期">认定申请日期:</span>
                      <span :title="panel.aae127">{{panel.aae127 | YYYYmmDD_Filter}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="工伤认定日期">工伤认定日期:</span>
                      <span :title="panel.alc031">{{panel.alc031 | YYYYmmDD_Filter}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="因工死亡时间">因工死亡时间:</span>
                      <span :title="panel.alc040">{{panel.alc040 | YYYYmmDD_Filter}}</span>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20" class="el-list">
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="伤害部位">伤害部位:</span>
                      <span :title="panel.alc042Name">{{panel.alc042Name}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="伤残等级">伤残等级:</span>
                      <span :title="panel.ala040">{{panel.ala040 | injuryLevel}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="伤残等级鉴定日期">伤残等级鉴定日期:</span>
                      <span :title="panel.alc034">{{panel.alc034 | YYYYmmDD_Filter}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="老工伤标识">老工伤标识:</span>
                      <span :title="panel.bae476 | oldInjuryFlag">{{panel.bae476 | oldInjuryFlag}}</span>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20" class="el-list">
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="是否涉及第三人">是否涉及第三人:</span>
                      <span :title="panel.blc543 | isThirdPerson">{{panel.blc543 | isThirdPerson}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="生活自理障碍等级">生活自理障碍等级:</span>
                      <span :title="panel.alc060 | selfcareDisorderLevel">{{panel.alc060 | selfcareDisorderLevel}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="生活自理障碍鉴定日期">生活自理障碍鉴定日期:</span>
                      <span :title="panel.alc074">{{panel.alc074 | YYYYmmDD_Filter}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="职业病名称">职业病名称:</span>
                      <span :title="panel.ala017Name">{{panel.ala017Name}}</span>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20" class="el-list">
                    <el-col :span="12" class="el-list-item">
                      <span class="col_title" :title="panel.blc360=='1'?'建筑项目名称':'工伤发生单位'">{{panel.blc360=='1'?'建筑项目名称：':'工伤发生单位：'}}</span>
                      <span :title="panel.aab004" style="width:500px !important;">{{panel.aab004||'--'}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="统一社会信用代码">统一社会信用代码:</span>
                      <span :title="panel.aab998">{{panel.aab998||'--'}}</span>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" class="el-list">
                    <el-col :span="12" class="el-list-item">
                      <span class="col_title" title="总包单位名称">总包单位名称:</span>
                      <span :title="panel.zbAab004" style="width:500px !important;">{{panel.zbAab004 || '--'}}</span>
                    </el-col>
                    <el-col :span="12" class="el-list-item">
                      <span class="col_title" title="伤害事件情况">伤害事件情况:</span>
                      <span :title="panel.alc006">{{panel.alc006}}</span>
                    </el-col>
                  </el-row>
              <!-- </el-carousel> -->
            </div>
            <!-- 工伤认定登记，idCount=newInfo -->
            <div v-if="idCount == 'newInfo'">
              <!-- <el-carousel
                indicator-position="outside"
                trigger="click"
                arrow="never"
                :height="'60px'"
                :autoplay="false"
              > -->
                <el-row :gutter="20" class="el-list">
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="社会保障号">社会保障号：</span>
                    <span
                      :title="panel.aac002"
                    >{{panel.aac002}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="性别">性别：</span>
                    <span
                      :title="panel.aac004 |sexTypeFilter"
                    >{{panel.aac004 | sexTypeFilter}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="出生日期">出生日期：</span>
                    <span
                      :title="panel.aac006|YYYYmmDD_Filter"
                    >{{panel.aac006|YYYYmmDD_Filter}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="离退休状态">离退休状态：</span>
                    <span
                      :title="panel.aac084|retireStatus"
                    >{{panel.aac084|retireStatus}}</span>
                  </el-col>
                </el-row>

                <el-row :gutter="20" class="el-list">
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="行政区">行政区：</span>
                    <span v-if="isPerson"
                      :title="panel.aab359Name"
                    >{{panel.aab359Name}}</span>
                    <span v-else
                      :title="panel.aab359|regionTypeFilter"
                    >{{panel.aab359|regionTypeFilter}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="当前单位">当前单位：</span>
                    <span :title="panel.aab004">{{panel.aab004}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="统一社会信用代码">统一社会信用代码：</span>
                    <span
                      :title="panel.aab998"
                    >{{panel.aab998}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="手机号">手机号：</span>
                    <span
                      :title="panel.aac067"
                    >{{panel.aac067}}</span>
                  </el-col>
                </el-row>
              <!-- </el-carousel> -->
            </div>
            <!-- 银行变更 -->
            <div v-if="idCount == 'bankChange'">
              <!-- <el-carousel
                indicator-position="outside"
                trigger="click"
                arrow="never"
                height="60px"
                :autoplay="false"
              > -->
                <el-row :gutter="20" class="el-list">
                  <el-col :span="8" class="el-list-item">
                    <span class="col_title" title="社会保障号">社会保障号：</span>
                    <span :title="panel.aac002"
                      >{{panel.aac002}}
                    </span>
                  </el-col>
                  <el-col :span="8" class="el-list-item">
                    <span class="col_title" title="性别">性别：</span>
                    <span :title="panel.aac004 | sexTypeFilter">{{panel.aac004 | sexTypeFilter}}</span>
                  </el-col>
                  <el-col :span="8" class="el-list-item">
                    <span class="col_title" title="出生日期">出生日期：</span>
                    <span :title="panel.aac006">{{panel.aac006 | YYYYmmDD_Filter}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list" v-if="!noRetireMsg">
                  <el-col :span="8" class="el-list-item">
                    <span class="col_title" title="年龄">年龄：</span>
                    <span :title="panel.age || panel.aac006 && (Number(thisYear)-Number(panel.aac006.substr(0,4)))">{{ panel.age || panel.aac006 && (Number(thisYear)-Number(panel.aac006.substr(0,4)))+'岁'}}</span>
                  </el-col>
                  <el-col :span="8" class="el-list-item">
                    <span class="col_title" title="离退休状态">离退休状态：</span>
                    <span :title="panel.aac084 | retireStatus">{{panel.aac084 | retireStatus}}</span>
                  </el-col>
                  <el-col :span="8" class="el-list-item">
                    <span class="col_title" title="单位名称">单位名称：</span>
                    <span :title="panel.aab004">{{panel.aab004}}</span>
                  </el-col>
                </el-row>
              <!-- </el-carousel> -->
            </div>
            <!-- 工伤生存认证，idCount=SurvivalAuthentication -->
            <div v-if="idCount == 'SurvivalAuthentication'">
              <el-carousel
                indicator-position="outside"
                trigger="click"
                arrow="never"
                :height="'60px'"
                :autoplay="false"
              >
                <el-row :gutter="20" class="el-list">
                  <el-col :span="8" class="el-list-item">
                    <span class="col_title" title="姓名">姓名：</span>
                    <span
                      :title="panel.aac003"
                    >{{panel.aac003}}</span>
                  </el-col>
                  <el-col :span="8" class="el-list-item">
                    <span class="col_title" title="社会保障号">社会保障号：</span>
                    <span
                      :title="panel.aac002"
                    >{{panel.aac002}}</span>
                  </el-col>
                  <el-col :span="8" class="el-list-item">
                    <span class="col_title" title="待遇类别">待遇类别：</span>
                    <span
                      :title="panel.eae003|treatmentType"
                    >{{panel.eae003|treatmentType}}</span>
                  </el-col>
                </el-row>

                <el-row :gutter="20" class="el-list">
                  <el-col :span="8" class="el-list-item">
                    <span class="col_title" title="单位名称">单位名称：</span>
                    <span :title="panel.aab069">{{panel.aab069}}</span>
                  </el-col>
                  <el-col :span="8" class="el-list-item">
                    <span class="col_title" title="统一社会信用代码">统一社会信用代码：</span>
                    <span
                      :title="panel.bab010"
                    >{{panel.bab010}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="8" class="el-list-item">
                    <span class="col_title" title="当前享受金额">当前享受金额：</span>
                    <span :title="panel.aae019">{{panel && panel.aae019 ? panel.aae019 + ' 元':''}}</span>
                  </el-col>
                  <el-col :span="8" class="el-list-item">
                    <span class="col_title" title="待遇开始时间">待遇开始时间：</span>
                    <span
                      :title="panel.aic160|YYYYmm_Filter"
                    >{{panel.aic160|YYYYmm_Filter}}</span>
                  </el-col>
                </el-row>
              </el-carousel>
            </div>
            <!-- 工伤认定信息 -->
            <div v-if="idCount =='newInjuryInfo'">
              <!-- <el-carousel
                  indicator-position="outside"
                  trigger="click"
                  arrow="never"
                  :height="maHeight"
                  :autoplay="false"
                > -->
                  <el-row :gutter="20" class="el-list">
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="姓名">姓名:</span>
                      <span :title="panel.aac003">{{panel.aac003||'--'}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="社会保障号">社会保障号:</span>
                      <span :title="panel.aac002">{{panel.aac002||'--'}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="性别">性别:</span>
                      <span :title="panel.aac004">{{panel.aac004 | sexTypeFilter}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="出生日期">出生日期:</span>
                      <span :title="panel.aac006">{{panel.aac006 | YYYYmmDD_Filter}}</span>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20" class="el-list">
                    <el-col :span="12" class="el-list-item">
                      <span class="col_title" title="工伤时所在单位">工伤时所在单位:</span>
                      <span :title="panel.aab004">{{panel.aab004||'--'}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="工伤时间">工伤时间:</span>
                      <span :title="panel.alc020">{{panel.alc020 | YYYYmmDD_Filter}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="工伤申请日期">工伤申请日期:</span>
                      <span :title="panel.aae127">{{panel.aae127 | YYYYmmDD_Filter}}</span>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" class="el-list">
                    <el-col :span="12" class="el-list-item">
                      <span class="col_title" title="建筑项目名称">建筑项目名称:</span>
                      <span :title="panel.companyBuildName" style="width:500px !important;">{{panel.companyBuildName || '--'}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="工伤认定书编号">工伤认定书编号:</span>
                      <span :title="panel.alc011">{{panel.alc011||'--'}}</span>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" class="el-list">
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="工伤认定时间">工伤认定时间:</span>
                      <span :title="panel.alc031">{{panel.alc031 | YYYYmmDD_Filter}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="伤害部位">伤害部位:</span>
                      <span class="content">
                        <div
                      class="multiple"
                      v-if="panel.alc042Name"
                    >{{panel.alc042Name}}</div>
                      </span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="伤残鉴定日期">伤残鉴定日期:</span>
                      <span :title="panel.alc034">{{panel.alc034 | YYYYmmDD_Filter}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="工伤认定结论">工伤认定结论:</span>
                      <span :title="panel.ala015 | cognizanceConclusion">{{panel.ala015 | cognizanceConclusion}}</span>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" class="el-list">
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="护理鉴定日期">护理鉴定日期:</span>
                      <span :title="panel.alc074">{{panel.alc074 | YYYYmmDD_Filter}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="伤残等级">伤残等级:</span>
                      <span :title="panel.ala040">{{panel.ala040 | injuryLevel}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="护理等级">护理等级:</span>
                      <span :title="panel.alc060 | selfcareDisorderLevel">{{panel.alc060 | selfcareDisorderLevel}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="工伤类别">工伤类别:</span>
                      <span :title="panel.alc027|jobInjuryType">{{panel.alc027|jobInjuryType}}</span>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20" class="el-list">
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="因工死亡时间">因工死亡时间:</span>
                      <span :title="panel.alc040">{{panel.alc040 | YYYYmmDD_Filter}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="鉴定书编号">鉴定书编号:</span>
                      <span :title="panel.alc035">{{panel.alc035||'--'}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="工伤认定单位名称">工伤认定单位名称:</span>
                      <span :title="panel.alc030|cognizanceInstitution">{{panel.alc030|cognizanceInstitution}}</span>
                    </el-col>
                    <el-col :span="6" class="el-list-item">
                      <span class="col_title" title="伤害事件情况">伤害事件情况:</span>
                      <span :title="panel.alc006">{{panel.alc006}}</span>
                    </el-col>
                  </el-row>
              <!-- </el-carousel> -->
            </div>
            <!-- 工伤待遇调整 -->
            <div v-if="idCount == 'injuryTreat'">
              <!-- <el-carousel
                indicator-position="outside"
                trigger="click"
                arrow="never"
                :height="maHeight"
                :autoplay="false"
              > -->
                <el-row :gutter="20" class="el-list">
                  <el-col :span="12" class="el-list-item">
                    <span title="社会保障号">社会保障号:</span>
                    <span :title="panel.aac002" class="hideText">{{panel.aac002}}</span>
                  </el-col>
                  <el-col :span="12" class="el-list-item">
                    <span title="单位编号">单位编号:</span>
                    <span :title="panel.aab001" class="hideText">{{panel.aab001}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="12" class="el-list-item">
                    <span title="统一社会信用代码">统一社会信用代码:</span>
                    <span :title="panel.aab998" class="hideText">
                      {{ panel.aab998 }}
                    </span>
                  </el-col>
                  <el-col :span="12" class="el-list-item">
                    <span title="工伤发生单位">工伤发生单位:</span>
                    <span :title="panel.aab004" class="hideText">
                      {{ panel.aab004 }}
                    </span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="12" class="el-list-item">
                    <span title="待遇类型">待遇类型:</span>
                    <span :title="panel.treatmentType | treatmentType">
                      {{panel.treatmentType | treatmentType}}</span>
                  </el-col>
                  <el-col :span="12" class="el-list-item">
                    <span title="待遇金额">待遇金额:</span>
                    <span :title="panel.adjustmentTreatment">
                      {{panel.adjustmentTreatment}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list" v-if="panel.treatmentType&&panel.treatmentType=='100'">
                  <el-col :span="8" class="el-list-item">
                    <span title="伤害程度">伤害程度:</span>
                    <span :title="panel.alc021">
                      {{panel.alc021 | injuryDegree}}</span>
                  </el-col>
                  <el-col :span="8" class="el-list-item">
                    <span title="生活自理障碍等级">生活自理障碍等级:</span>
                    <span :title="panel.alc060">
                      {{panel.alc060 | selfcareDisorderLevel}}</span>
                  </el-col>
                  <el-col :span="8" class="el-list-item">
                    <span title="伤残等级">伤残等级:</span>
                    <span :title="panel.ala040">
                      {{panel.ala040 | injuryLevel}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list" v-if="panel.treatment&&panel.treatment=='100'">
                  <el-col :span="8" class="el-list-item">
                    <span title="认定日期">认定日期:</span>
                    <span :title="panel.alc031">{{panel.alc031}}</span>
                  </el-col>
                  <el-col :span="8" class="el-list-item">
                    <span title="认定结论">认定结论:</span>
                    <span
                      :title="
                        panel.ala015 | cognizanceConclusion
                      "
                      >{{panel.ala015 | cognizanceConclusion}}</span
                    >
                  </el-col>
                </el-row>
              <!-- </el-carousel> -->
            </div>
            <!-- 老工伤待遇核定 -->
            <div v-if="idCount =='oldTreatPay'">
              <!-- <el-carousel
                indicator-position="outside"
                trigger="click"
                arrow="never"
                :height="maHeight"
                :autoplay="false"
              > -->
                <el-row :gutter="20" class="el-list">
                  <el-col :span="6" class="el-list-item">
                    <span title="社会保障号">社会保障号:</span>
                    <span :title="panel.aac002">{{panel.aac002||'--'}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span title="性别">性别:</span>
                    <span :title="panel.aac004">{{panel.aac004 | sexTypeFilter}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span title="出生日期">出生日期:</span>
                    <span :title="panel.aac006">{{panel.aac006 | YYYYmmDD_Filter}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span title="民族">民族:</span>
                    <span :title="panel.aac005">{{panel.aac005 | nationTypeFilter}}</span>
                  </el-col>
                </el-row>

                <el-row :gutter="20" class="el-list">
                  <el-col :span="6" class="el-list-item">
                    <span title="工伤发生单位">工伤发生单位:</span>
                    <span :title="panel.aab004">{{panel.aab004||'--'}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span title="统一社会信用代码">统一社会信用代码:</span>
                    <span :title="panel.aab998">{{panel.aab998||'--'}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span title="工伤类别">工伤类别:</span>
                    <span :title="panel.alc027|jobInjuryType">{{panel.alc027|jobInjuryType}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span title="工伤时间">工伤时间:</span>
                    <span :title="panel.alc020">{{panel.alc020 | YYYYmmDD_Filter}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="6" class="el-list-item">
                    <span title="护理等级">护理等级:</span>
                    <span :title="panel.alc060 | selfcareDisorderLevel">{{panel.alc060 | selfcareDisorderLevel}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span title="伤残等级">伤残等级:</span>
                    <span :title="panel.ala040">{{panel.ala040 | injuryLevel}}</span>
                  </el-col>
                </el-row>
              <!-- </el-carousel> -->
            </div>
            <!-- 劳动能力鉴定 -->
            <div v-if="idCount == 'newInjury_person'">
              <!-- <el-carousel
                indicator-position="outside"
                trigger="click"
                arrow="never"
                :height="maHeight"
                :autoplay="false"
              > -->
                <el-row :gutter="20" class="el-list">
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="社会保障号">社会保障号:</span>
                    <span :title="panel.aac002">{{panel.aac002||'--'}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="性别">性别:</span>
                    <span :title="panel.aac004">{{panel.aac004 | sexTypeFilter}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="出生日期">出生日期:</span>
                    <span :title="panel.aac006 | YYYYmmDD_Filter">{{panel.aac006 | YYYYmmDD_Filter}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="离退休状态">离退休状态:</span>
                    <span :title="panel.aac084 | retireStatus">{{panel.aac084 | retireStatus}}</span>
                  </el-col>
                </el-row>

                <el-row :gutter="20" class="el-list">
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="统筹区">统筹区:</span>
                    <span :title="panel.aab359 | regionTypeFilter">{{panel.aab359 | regionTypeFilter}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="手机号">手机号:</span>
                    <span :title="panel.aac067">{{panel.aac067}}</span>
                  </el-col>
                </el-row>
                <ep-title>工伤认定信息</ep-title>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="工伤发生时间">工伤发生时间:</span>
                    <span :title="panel.alc020|YYYYmmDD_Filter">{{panel.alc020|YYYYmmDD_Filter}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="统一社会信用代码">统一社会信用代码:</span>
                    <span :title="panel.aab998">{{panel.aab998}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="工伤发生单位">工伤发生单位:</span>
                    <span :title="panel.aab004">{{panel.aab004}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="工伤认定书编号">工伤认定书编号:</span>
                    <span :title="panel.alc011">{{panel.alc011}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="工伤认定日期">工伤认定日期:</span>
                    <span :title="panel.alc031">{{panel.alc031 | YYYYmmDD_Filter}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="工伤报告日期">工伤报告日期:</span>
                    <span :title="panel.alc026">{{panel.alc026 | YYYYmmDD_Filter}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="工伤认定申请日期">工伤认定申请日期:</span>
                    <span :title="panel.aae127 | YYYYmmDD_Filter">{{panel.aae127 | YYYYmmDD_Filter}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="工伤认定结论">工伤认定结论:</span>
                    <span :title="panel.ala015 | cognizanceConclusion">
                      {{panel.ala015 | cognizanceConclusion}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="认定依据类别">认定依据类别:</span>
                    <span :title="
                        panel.ala016Name
                        ">{{panel.ala016Name}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="工伤认定单位">工伤认定单位:</span>
                    <span :title="
                        panel.alc030 | cognizanceInstitution
                        ">{{panel.alc030 | cognizanceInstitution}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="事故类别">事故类别:</span>
                    <span :title="panel.ala028 | accidentType">{{panel.ala028 | accidentType}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="工伤类别">工伤类别:</span>
                    <span :title="panel.alc027 | jobInjuryType">{{panel.alc027 | jobInjuryType}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="伤害程度">伤害程度:</span>
                    <span :title="panel.alc021 | injuryDegree">{{panel.alc021 | injuryDegree}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="伤害部位">伤害部位:</span>
                    <span :title="panel.alc042Name">{{panel.alc042Name}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="24" class="el-list-item">
                    <span class="col_title" title="伤害部位描述">伤害部位描述:</span>
                    <span :title="panel.alc022">{{panel.alc022}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="职业（工种）">职业（工种）:</span>
                    <span :title="panel.aca111 | occupationWorkType">{{panel.aca111 | occupationWorkType}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="接触职业病危害日期">接触职业病危害日期:</span>
                    <span :title="panel.blc150 | YYYYmmDD_Filter">{{ panel.blc150 |YYYYmmDD_Filter }}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="接触职业病危害月数">接触职业病危害月数:</span>
                    <span :title="panel.alc048">{{panel.alc048||0}}个月</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="职业病名称">职业病名称:</span>
                    <span :title="panel.ala017Name">{{panel.ala017Name}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="因工死亡日期">因工死亡日期:</span>
                    <span :title="panel.alc040 | YYYYmmDD_Filter">{{panel.alc040 | YYYYmmDD_Filter}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="是否第三人">是否第三人:</span>
                    <span :title="panel.blc543 | isThirdPerson">{{ panel.blc543 | isThirdPerson}}</span>
                  </el-col>
                  <el-col :span="6" class="el-list-item">
                    <span class="col_title" title="老工伤标识">老工伤标识:</span>
                    <span :title="panel.bae476 | oldInjuryFlag">{{panel.bae476 | oldInjuryFlag}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="24" class="el-list-item">
                    <span class="col_title" title="伤害事件情况">伤害事件情况:</span>
                    <span :title="panel.alc006">{{panel.alc006}}</span>
                  </el-col>
                </el-row>
              <!-- </el-carousel> -->
            </div>
          </div>
          <slot :row="row"></slot>
        </div>
      </el-col>
    </div>
    <!-- 缴费基数 伤残一次性和定期 缴费基数弹框 -->
    <el-dialog :visible.sync="expendDialog" width="80%">
      <el-row>
        <el-col :span="12">
          <ep-title>年度汇总信息</ep-title>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-button type="primary" size="mini" @click="refresh">刷新</el-button>
          <el-button type="primary" size="mini" @click="exportEx" v-if="$showExportBtn">导出</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="boxWrap">
        <el-col >
          累计缴费月数: <span>{{monthTotal.a}}</span>
        </el-col>
        <el-col >
          欠费月数: <span>{{monthTotal.b}}</span>
        </el-col>
        <el-col >
          断交月数: <span>{{monthTotal.c}}</span>
        </el-col>
      </el-row>
      <el-table class="ep-table" :data="tableData1" border style="width: 100%" highlight-current-row max-height="400">
        <el-table-column prop="aae001" label="年度" align="center" width="100px"></el-table-column>
        <el-table-column prop="aae202" label="缴费月数" align="center">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.aae202" :key="index">
            <i style="font-size:26px" v-show="item==='A'" class="el-icon-star-on"></i>
            <i style="font-size:26px" v-show="item==='B'" class="el-icon-star-off"></i>
            <i style="font-size:26px" v-show="item==='C'" class="el-icon-minus"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="aae013" label="缴费基数（月份区域）" align="center"></el-table-column>
        <el-table-column prop="dateCreated" width="200px" label="生成时间" align="center"></el-table-column>
      </el-table>
      <!-- <div v-show="!isHide" class="buttonHouse">
        <ep-saveButton isIfTrue id="doSave" type="primary" ref="save" @formValidate="formValidate" :validate="['form']" :datas="{}"></ep-saveButton>
      </div> -->
      <p style="clolr:red">注：“★”代表已到账，“☆”代表未到账，“-”代表无缴费基数</p>
    </el-dialog>
    <el-dialog
      class="dialog-content"
      border
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="70%">
      <el-table
        class="ep-table"
        :data="tableData"
        @row-dblclick="tableDbClick"
        style="width: 100%"
        max-height="550px"
        highlight-current-row
      >
      <ep-table-column editor="index" header="序号" width="50" v-if="false"></ep-table-column>
      <div v-if="isPerson">
        <ep-table-column editor="button" name="blc360" header="工伤类型">
          <template slot-scope="scope">
            <span>{{scope.row.row.blc360==='1'?'建筑工伤':'普通工伤'}}</span>
          </template>
        </ep-table-column>
        <ep-table-column
          editor="button"
          name="aab359"
          header="行政区"
        >
          <template slot-scope="scope">
            <span>{{scope.row.row.aab359|regionTypeFilter}}</span>
          </template>
        </ep-table-column>
        <ep-table-column editor="text" name="aac002" header="社会保障号"></ep-table-column>
        <ep-table-column editor="text" name="aac003" header="姓名"></ep-table-column>
        <ep-table-column editor="text" name="aab004" header="参保单位" width="180"></ep-table-column>
        <ep-table-column editor="button" name="aae030" header="参保开始时间" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.row.aae030|YYYYmmDD_Filter}}</span>
          </template>
        </ep-table-column>
        <ep-table-column editor="button" name="aae031" header="参保结束时间" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.row.aae031|YYYYmmDD_Filter}}</span>
          </template>
        </ep-table-column>
      </div>
      <div v-else>
        <ep-table-column editor="button" name="ala015" header="工伤认定结论">
          <template slot-scope="scope">
            <span>{{scope.row.row.ala015|cognizanceConclusion}}</span>
          </template>
        </ep-table-column>
        <ep-table-column editor="button" name="alc020" header="工伤发生时间" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.row.alc020|YYYYmmDD_Filter}}</span>
          </template>
        </ep-table-column>
        <ep-table-column editor="text" name="aab004" header="工伤发生单位" width="180"></ep-table-column>
        <ep-table-column editor="button" name="ala040" header="伤残等级">
          <template slot-scope="scope">
            <span>{{scope.row.row.ala040|injuryLevel}}</span>
          </template>
        </ep-table-column>
        <ep-table-column
          editor="button"
          name="alc060"
          header="生活自理障碍等级"
          width="100"
        >
          <template slot-scope="scope">
            <span>{{scope.row.row.alc060|selfcareDisorderLevel}}</span>
          </template>
        </ep-table-column>
        <ep-table-column editor="button" name="aab359" header="统筹区">
          <template slot-scope="scope">
            <span>{{scope.row.row.aab359|regionTypeFilter}}</span>
          </template>
        </ep-table-column>
        <span v-if="isInjuryBuild">
          <ep-table-column editor="text" name="zbAab004" header="总包单位名称" width="180"></ep-table-column>
          <ep-table-column editor="text" name="zbAab998" header="总包单位统一社会信用代码" width="120"></ep-table-column>
        </span>
      </div>
      </el-table>
    </el-dialog>
    <!-- 下一步天正 -->
    <el-dialog
      class="dialog-content next-box"
      border
      title="操作提示"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="dialogNext"
      width="30%">
      <div class="next-body">
        <span>该笔办件经办数据已保存，请点击右下角<span style="color:#1890ff;fone-weight:bold;"> 下一步 </span>进入下一环节</span>
      </div>
    </el-dialog>
  </div>
</template>

<script type="es6">
// import qs from 'qs'
export default {
  props: {
    modelName: { // 模块名
      type: String,
      default: ''
    },
    selfTitle: {
      type: String,
      default: ''
    },
    hasBasicCard: { // 是否有工伤基础信息卡
      type: Boolean,
      default: true // 默认有
    },
    buchong: {
      type: Boolean,
      default: false
    },
    expendBase: { // 缴费基数
      type: Boolean,
      default: false
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    colspan: {
      type: String,
      default: '12'
    },
    idCount: {
      type: String,
      default: ''
    },
    idCountTwo: {
      type: String,
      default: ''
    },
    certNumber: {
      type: String,
      default: ''
    },
    DisabilityBenefit: {
      type: Boolean,
      default: false
    },
    isMedModule: { // 是否医疗费申报模块 或 一次性医疗补助金模块（有特殊校验）
      type: Boolean,
      default: false
    },
    avgSalary: {
      type: Boolean,
      default: false
    },
    nextValid: { // 是否需要 下一步 校验
      type: Boolean,
      default: false // 默认不需要
    },
    medValid: { // 是否需要 参保 校验
      type: Boolean,
      default: false // 默认不需要 大多数模块用到基础信息，不需要校验。只有个别八统一事项需要参保校验
    },
    initPanel: {
      type: Object,
      default: function() {
        return {}
      }
    },
    noRetireMsg: {
      type: Boolean,
      default: false
    },
    isInjuryBuild: { // 是否有建筑工伤
      type: Boolean,
      default: true
    },
    isRelative: { // 是否查供养信息
      type: Boolean,
      default: false
    },
    isPerson: { // 是否查个人参保信息
      type: Boolean,
      default: false
    },
    isOldInjury: { // 是否查老工伤
      type: Boolean,
      default: false
    },
    noInjDialog: { // 是否需要工伤信息选择弹框
      type: Boolean,
      default: false // 默认需要
    },
    hasTwoCard: { // 是否双卡片
      type: Boolean,
      default: false // 默认无
    }
  },
  data() {
    return {
      regionCode: this.$store.state.loginuserInfo.areaId,
      operator: this.$store.state.loginuserInfo.code || 'admin',
      timer: null,
      dialogNext: false,
      dialogVisible: false,
      dialogTitle: '信息列表',
      tableData: [], // 认定鉴定信息列表
      panel: {}, // 工伤人员信息
      panel1: {}, // 供养人员信息
      maHeight: '100px',
      row: [],
      // 缴费基数弹框
      expendDialog: false,
      monthTotal: {},
      tableData1: [],
      ala016Filter: {}
    }
  },
  computed: {
  },
  watch: {
    initPanel: {
      handler(value) {
        this.panel = { ...value }
        // if (Object.keys(value).length > 0) {
        // }
      }
      // deep: true
    }
  },
  created() {
    this.thisYear = this.common.commonYYYYmmdd().substr(0, 4)
  },
  async mounted() {
    this.ala016Filter = await this.common.filterFn('ALA016')
  },
  methods: {
    /** step 1: 查询
     * 基础信息获取 由父组件触发 调用
     * @param {string} idCard 身份证号码
     * @param {string} channle 来源渠道（选填）
     * @param {string} aaz127 工伤认定id（选填）
     */
    queryBasicFn(idCard, channle, aaz127) {
      // 去空格
      let cardId = idCard.replace(/\s+/g, '')
      if (this.isPerson) {
        this.qureyPersonFn(cardId) // 人员参保信息查询
      } else if (this.isRelative) {
        this.queryRelativeFn(cardId) // 供养亲属信息查询
      } else {
        this.queryInjuryFn(cardId, channle, aaz127) // 工伤人员信息查询
      }
    },
    /** 工伤人员信息
     * @param {string} idCard 证件号码
     * @param {string} channle 来源渠道（选填）
     * @param {string} aaz127 工伤认定id（选填）
     */
    queryInjuryFn(idCard, channle, aaz127) {
      let url = ''
      if (this.isOldInjury) {
        url = '/treatment/injury/oldinjuryReg/injuryInfoUnion'
      } else {
        if (this.modelName && this.modelName === 'MedBenefit') {
          url = '/treatment/indemnity/medSubsidyBenefit/injuryInfo'
        } else {
          url = '/treatment/common/indemnity/injuryInfoUnion'
        }
      }
      this.$api.commonGet(url, {
        aac002: idCard
      }).then(res => {
        if (res.success) {
          if (channle && aaz127) {
            let injuryList = []
            if (res.result && res.result.injuryInfo && res.result.injuryInfo.length > 0) {
              // 网报1.0 & 2.0; 2.0:伤残定期，伤残一次性，医疗一次性,工亡一次性；1.0:工亡一次性;自助机
              // 省集中升级到国统时，有部分省集中的数据认定id还是以前的，国统的认定id都加了33，所以加一个判断，让这部分数据流转进来
              injuryList = res.result.injuryInfo.filter(item => {
                return item.aaz127 === aaz127 || ((item.aaz127.length === 2 + aaz127.length) && item.aaz127 === `33${aaz127}`)
              })
            }
            if (injuryList.length > 0) {
              let panel = {
                ...injuryList[0],
                ...res.result.basicInfoWithUnit,
                aaa027: injuryList[0].aaa027,
                aab359: injuryList[0].aab359
              }
              this.panel = this.handlerFilterFn(panel)
              this.regionCode = this.panel.aab359 || this.regionCode
              this.validateFn(this.panel)
            } else {
              this.$message.error(`未匹配到对应认定信息【认定ID:${aaz127}】`)
            }
          } else {
            if (this.noInjDialog) { // 不从injuryInfounion 获取个人信息，到父级页面的 validate 再获取
              let injuryAllList = res.result && res.result.injuryInfo && res.result.injuryInfo.length > 0 ? res.result.injuryInfo : []
              this.validateFn(res.result.basicInfoWithUnit, injuryAllList)
            } else if (res.result && res.result.injuryInfo && res.result.injuryInfo.length === 1) {
              let panel = {
                ...res.result.injuryInfo[0],
                ...res.result.basicInfoWithUnit,
                aaa027: res.result.injuryInfo[0].aaa027,
                aab359: res.result.injuryInfo[0].aab359
              }
              this.panel = this.handlerFilterFn(panel)
              this.regionCode = this.panel.aab359 || this.regionCode
              this.validateFn(this.panel)
            } else if (res.result && res.result.injuryInfo && res.result.injuryInfo.length > 1) {
              this.dialogVisible = true
              this.dialogTitle = '认定鉴定信息'
              this.panel = {...res.result.basicInfoWithUnit}
              this.tableData = res.result.injuryInfo
            } else if (res.result && res.result.basicInfoWithUnit) {
              this.regionCode = this.panel.aab359 || this.regionCode
              let panel = {
                ...res.result.basicInfoWithUnit,
                aaa027: '', // basicInfoWithUnit 中的 aaa027 是伪数据，用其赋值会报错，故手动置空
                aab359: this.regionCode
              }
              this.panel = this.handlerFilterFn(panel)
              this.validateFn(this.panel)
            }
          }
        } else {
          this.panel = {}
          this.$message({
            message: res.resultDes,
            type: 'error'
          })
        }
      })
    },
    tableDbClick(row) {
      let panel = {
        ...row,
        ...this.panel,
        aaa027: row.aaa027,
        aab359: row.aab359
      }
      this.panel = this.handlerFilterFn(panel)
      this.regionCode = row.aab359 || this.regionCode
      this.dialogVisible = false
      this.validateFn(this.panel)
    },
    handlerFilterFn(panel) {
      if (panel.ala016 && !this.common.isBlank(this.ala016Filter)) {
        let ala016List = panel.ala016.split(',') || []
        let ala016NameList = []
        ala016List.forEach(item => {
          ala016NameList.push(this.ala016Filter[item])
        })
        panel.ala016Name = ala016NameList.join(' ；')
      }
      return panel
    },
    /** 供养人员信息
     * @param {string} idCard 证件号码
     * @param {string} regionCode
     */
    queryRelativeFn(idCard) {
      this.$api.InjuryInfoUnionGY({
        aac002: idCard
      }).then(res => {
        if (res.success) {
          this.panel1 = { ...res.result.gwInjuryInfo, ...res.result.gwInfo }
          this.panel = { ...res.result.gygx, ...res.result.basicInfoWithUnit }
          if (!this.nextValid) {
            // 调用父组件 更新和校验接口 --> 走正常流程
            this.$emit('updateFn', res.result)
          } else {
            this.validateNextFn(this.panel)
          }
        } else {
          this.$message({
            message: res.resultDes,
            type: 'error'
          })
        }
      })
    },
    /** 人员参保信息查询
     * @param {string} idCard 证件号码
     */
    qureyPersonFn(idCard) {
      this.$api.commonGet('/treatment/common/indemnity/personQuery', {
        aac002: idCard
      }).then(res => {
        if (res.success) {
          if (res.result && res.result.resultList && res.result.resultList.length === 1) {
            this.panel = {
              ...res.result.resultList[0],
              ...res.result.AC01,
              aaa027: res.result.resultList[0].aaa027,
              aab359: res.result.resultList[0].aab359
            }
            this.regionCode = this.panel.aab359 || this.regionCode
            this.validateFn(this.panel)
          } else if (res.result && res.result.resultList && res.result.resultList.length > 1) {
            this.dialogVisible = true
            this.dialogTitle = '人员参保信息'
            this.panel = {...res.result.AC01}
            this.tableData = res.result.resultList
          } else {
            this.panel = {...res.result.AC01, aab359: res.result.AC01.aab359 || this.regionCode}
            this.regionCode = this.panel.aab359
            this.validateFn(this.panel)
          }
        } else {
          this.$message({
            message: res.resultDes,
            type: 'error'
          })
        }
      })
    },
    /** step 2: 校验--更新父组件数据
     * @param {Object} row 人员或工伤基础信息
     * @param {Array} injuryList （选填）供养亲属新增模块，取值和其他不同，在validate中获取工伤信息，injuryList是工伤人员所有工伤信息，是/validate的入参
     */
    validateFn(row, injuryList) {
      // 下一步校验
      if (this.nextValid) {
        this.validateNextFn(row, injuryList)
        return
      }
      // 人员和供养
      if (this.isPerson || this.isRelative) {
        this.$emit('updateFn', row)
        return
      }
      this.validateMed(row, injuryList)
    },
    // 校验: 八统一事项参保校验
    validateMed(row, injuryList) {
      // 不需要参保校验，直接返回父组件更新数据且调用校验
      if (!this.medValid || this.isRelative) {
        this.$emit('updateFn', row, injuryList)
        return
      }
      let param = {
        individualId: row.aac001,
        injuryCognizanceId: row.aaz127,
        regionCode: row.aab359
      }
      if (this.isMedModule) {
        param.type = '7'
      }
      this.$api.commonGet('/treatment/indemnity/medFeeWithPJZX/validate', param).then(res => {
        if (res.success) {
          // 调用父组件 更新和校验接口 --> 走正常流程
          this.$emit('updateFn', row, injuryList)
        } else {
          this.$message.error(res.resultDes)
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    // 校验: 程序没有流转到天正，则直接下一步
    validateNextFn(row, injuryList) {
      // this.$api.commonGet('/treatment/indemnity/medFee/validateNext', {
      //   projid: this.$route.query.projid || '',
      //   individualId: row.aac001
      // }).then(res => {
      //   if (res.success) {
      //     this.dialogNext = true
      //     let ythInfo = res.result && res.result.ythInfo ? res.result.ythInfo : ''
      //     let canNext = true
      //     // canNext === true 直接下一步
      //     this.$emit('updateFn', ythInfo, canNext)
      //   } else {
      //     this.dialogNext = false
      //     this.validateMed(row)
      //   }
      // }).catch(() => {
      //    this.validateMed(row)
      // })

      this.validateMed(this.panel, injuryList)
    },
    // ----------  ------------
    addMessage() {
      this.$emit('messageAdd')
    },
    checkDetail() {
      this.$emit('checkDetail')
    },
    showExpend() {
      this.expendDialog = true
      this.expendResetFn()
      this.queryExpendInfo()
    },
    // 缴费基数 查询
    expendResetFn(type) {
      this.monthTotal = {
        a: '0.00',
        b: '0.00',
        c: '0.00'
      }
      this.tableData1 = []
    },
    queryExpendInfo(type) {
      this.$api.commonGet('/employment/query/personMultiple/annualSummary', {
        aac001: this.panel.aac001,
        refresh: type ? '1' : null
      }).then(res => {
        if (res.success) {
          if (!type) {
            this.expendDialog = true
          }
          this.tableData1 = res.result.data
          let str = ''
          for (let i = 0; i < this.tableData1.length; i++) {
            str += this.tableData1[i].aae202
          }
          this.monthTotal.a = this.getCharCount(str, 'A')
          this.monthTotal.b = this.getCharCount(str, 'B')
          this.monthTotal.c = this.getCharCount(str, 'C')
        } else {
          this.$message.error(res.resultDes)
        }
      })
    },
    refresh() {
      this.queryExpendInfo('1')
    },
    exportEx() {
      let params = {}
      params.aac001 = this.panel.aac001
      this.common.commonDownload('/employment/query/personMultiple/exportAnnualSummary', params)
    }
  }
}
</script>

<style lang="less" scoped>
.ep-user-general {
    width: 100%;
    .ep-message-content {
      display: flex;
      overflow: inherit;
      border-radius: 6px;
      // border: 1px solid red;

      .ep-left {
        flex: 1;
      }
      .ep-left {
        background: #fff;
        padding: 20px;
        border-radius: 6px;
      }
      .ep-card-title {
        font-size: 18px;
        color: #1a81ce;
        font-weight: bold;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
      }
      .el-list {
        .el-list-item {
          display: flex;
          margin-bottom: 15px;
          span {
            max-width: 500px;
            margin-right: 5px;
            color: #606266;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            a {
              color: #008af0;
            }
          }
          span:first-child {
            text-align: right;
            margin-right: 10px;
          }
          div {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          /deep/ .col_title {
            width: 120px;
            margin-right: 6px;
            // text-align: right;
            color: #666666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .searchMore {
          text-align: center;
          i {
            font-size: 16px;
            cursor: pointer;
            // transition: transform .3s,-webkit-transform .3s;
            &:hover {
              color: #1a81ce;
            }
          }
          .is-active {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
.boxWrap{
  display: flex;
  margin-bottom: 6px;
  span{
    color:#1890ff;
    font-weight: bold;
  }
}
</style>
