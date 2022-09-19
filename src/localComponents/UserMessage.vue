<template>
  <div class="userMessageFastPhoto">
    <div class="collapseText" v-if="isCollapseControl">
      <a @click.prevent="collapse">{{collapseTitle}}</a>
    </div>
    <div class="ep-message-content clearfix">
      <div class="ep-left">
        <div class="ep-card-title" v-if="dataType == 'person'&&noName==false">
          <div>{{ SelfMessagename || personMessage.name||personMessage.aac003 || '人员姓名'}}</div>
          <div v-if="isInsuranceId" style="text-align:right;flex:auto">{{personMessage.insuranceId}}</div>
          <div>
            <el-button type="text" @click="checkInfo" v-if="isDetaily" style="font-szie:14px;">查看详情</el-button>
            <el-button type="text" @click="checkInfo5" v-if="isDetaily5" style="font-szie:14px;">查看详情</el-button>
            <span v-if="isDetaily2" @click="checkdetaily">查看详情</span>
            <!-- <el-button size="mini" type="primary" v-if="isDetaily"  @click="checkdetaily"></el-button> -->
            <!-- <el-button size="mini" type="primary">查看详情</el-button>
            <el-button size="mini" v-if="isEdit_1">编辑</el-button>-->
            <!-- <el-button size="mini" type="primary" @click="addMessage" v-if="buchong">补充信息</el-button> -->
            <span @click="addMessage" v-if="buchong">补充/修改</span>
            <span @click="addMessage" v-if="xiugai">修改信息</span>
          </div>
        </div>
        <div class="ep-card-title" v-if="dataType == 'specialPerson'">
          <div>人员基本信息</div>
        </div>
        <div class="ep-card-title" v-if="dataType == 'company'">
          <div>
            {{
            SelfMessagename ||
            companyMessage.companyName ||
            companyMessage.name ||
            "单位名称"
            }}
          </div>
          <div>
            <span v-if="isDetaily" @click="queryCompanyDetail">查看详情</span>
            <!-- <el-button size="mini" type="primary" v-if="isDetaily" @click="checkdetaily">查看详情</el-button> -->
            <!-- <el-button size="mini" type="primary" v-if="isDoc">电子档案</el-button> -->
            <!-- <el-button size="mini" v-if="isEdit">编辑</el-button> -->
          </div>
        </div>
        <div class="ep-card-title" v-if="dataType == 'company2'">
          <div>
            {{
            companyMessage.companyName ||
            companyMessage.unitName ||
            "单位名称"
            }}
          </div>
          <div>
            <span v-if="isDetaily2" @click="checkdetaily">查看详情</span>
            <el-button size="mini" type="primary" v-if="isDetaily" @click="checkdetaily">查看详情</el-button>
            <!-- <el-button size="mini" type="primary" v-if="isDoc">电子档案</el-button> -->
            <!-- <el-button size="mini" v-if="isEdit">编辑</el-button> -->
          </div>
        </div>
        <div class="ep-card-title" v-if="dataType == 'injuryPerson'">
          <div>
            {{ SelfMessagename || injuryMessage.name || "工伤人员姓名" }}
          </div>
          <div>
            <span v-if="isDetaily" @click="checkdetaily">查看详情</span>
            <!-- <el-button size="mini" type="primary" v-if="isDetaily"  @click="checkdetaily"></el-button> -->
            <!-- <el-button size="mini" type="primary">查看详情</el-button>
            <el-button size="mini" v-if="isEdit_1">编辑</el-button>-->
            <!-- <el-button size="mini" type="primary" @click="addMessage" v-if="buchong">补充信息</el-button> -->
            <span @click="addMessage" v-if="buchong">补充/修改</span>
            <span @click="addMessage" v-if="xiugai">修改信息</span>
          </div>
        </div>
        <div style="float:right">
          <!-- <el-button size="mini" type="primary" v-if="isDoc">电子档案</el-button> -->
          <!-- <el-button size="mini" v-if="isEdit">编辑</el-button> -->
        </div>
        <!-- 认定鉴定信息 idCount - 17-->
        <div v-if="dataType == 'person' && idCount == '17'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="12" class="el-list-item">
                  <span title="单位名称">单位名称：</span>
                  <span :title="personMessage.unitName || personMessage.companyName">{{
                    personMessage.unitName || personMessage.companyName
                    }}</span>
                </el-col>
                <el-col :span="12" class="el-list-item">
                  <span title="工伤发生时间">工伤发生时间：</span>
                  <span :title="personMessage.injuryOccurrenceTime">{{
                    personMessage.injuryOccurrenceTime
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="12" class="el-list-item">
                  <span title="工伤类别">工伤类别：</span>
                  <span :title="personMessage.jobInjuryType | jobInjuryType">{{
                    personMessage.jobInjuryType | jobInjuryType
                    }}</span>
                </el-col>
                <el-col :span="12" class="el-list-item">
                  <span title="工伤认定日期">工伤认定日期：</span>
                  <span :title="personMessage.cognizanceDate | YYYYmmDD_Filter">{{ personMessage.cognizanceDate |
                    YYYYmmDD_Filter }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="12" class="el-list-item">
                  <span title="伤残等级">伤残等级：</span>
                  <span :title="personMessage.injuryLevel | injuryLevel">{{
                    personMessage.injuryLevel | injuryLevel
                    }}</span>
                </el-col>
                <el-col :span="12" class="el-list-item">
                  <span title="生活自理障碍等级">生活自理障碍等级：</span>
                  <span :title="
                      personMessage.selfcareDisorderLevel
                        | selfcareDisorderLevel
                    ">{{
                    personMessage.selfcareDisorderLevel
                    | selfcareDisorderLevel
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="12" class="el-list-item">
                  <span title="是否涉及第三人">是否涉及第三人：</span>
                  <span :title="personMessage.isThirdPerson">{{
                    personMessage.isThirdPerson
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 人员标签2（经办系统） idCount - 32-->
        <div v-if="dataType == 'person' && idCount == '32'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="姓名">姓名：</span>
              <span :title="personMessage.name">{{ personMessage.name }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄:</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate">{{
                personMessage.joinWorkDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="离退休日期">离退休日期：</span>
              <span :title="personMessage.retirementData">{{
                personMessage.retirementDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="离退休类型">离退休类型：</span>
              <span>{{ personMessage.retirementType | retirementType }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="累计缴费年限">累计缴费年限：</span>
              <span :title="personMessage.totalyears">{{
                personMessage.totalyears
                }}</span>
            </el-col>
          </el-row>
          <div v-show="isMore" class="moreInfoBox_panel">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="结算单位名称">结算单位名称：</span>
                <span :title="personMessage.mainUnitName">{{
                  personMessage.mainUnitName
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="基本单位名称">基本单位名称：</span>
                <span :title="personMessage.unitName || personMessage.companyName">{{
                  personMessage.unitName || personMessage.companyName
                  }}</span>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="20" class="el-list">
            <el-col :span="24" class="searchMore">
              <i class="el-icon-arrow-down" :class="isMore ? 'is-active' : ''" @click="searchMore"></i>
            </el-col>
          </el-row>
        </div>
        <div v-if="dataType == 'person' && idCount == 'deathapproval'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">
                {{
                personMessage.insuranceId ||
                personMessage.insuranceNumber ||
                "--"
                }}
              </span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">
                {{
                personMessage.sex | sexTypeFilter
                }}
              </span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">
                {{
                personMessage.birthday | YYYYmmDD_Filter
                }}
              </span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate">
                {{
                personMessage.joinWorkDate | YYYYmmDD_Filter
                }}
              </span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <!-- <span title="首次参保年月">首次参保年月:</span>
                            <span :title="personMessage.ylBeginYM">{{personMessage.ylBeginYM}}</span>-->
              <span title="户口性质">户口性质：</span>
              <span :title="personMessage.residenceType | residenceType">
                {{
                personMessage.residenceType | residenceType
                }}
              </span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">
                {{
                personMessage.age || "--"
                }}
              </span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="personMessage.unitCardId">
                {{
                personMessage.unitCardId || "--"
                }}
              </span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称：</span>
              <span @click="queryCompanyDetail" class="ep-special2"
                :title="personMessage.unitName || personMessage.companyName">{{ personMessage.unitName ||
                personMessage.companyName }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="离退休类型">离退休类型：</span>
              <span>{{ personMessage.retirementType | retirementType }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 风险预警 -->
        <div v-if="dataType == 'person' && idCount == 'Risk'">
          <el-row class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="姓名">姓名：</span>
              <span :title="personMessage.name">{{ personMessage.name }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item" style="padding-left:20px">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex">{{ personMessage.sex }}</span>
            </el-col>
          </el-row>
          <el-row class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="民族">民族：</span>
              <span :title="personMessage.nation">{{
                personMessage.nation
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="学历">学历:</span>
              <span :title="personMessage.education">{{
                personMessage.education
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item" style="padding-left:20px">
              <span title="婚姻状况">婚姻状况：</span>
              <span :title="personMessage.marriage">{{
                personMessage.marriage
                }}</span>
            </el-col>
          </el-row>
          <el-row class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="手机号码">手机号码:</span>
              <span :title="personMessage.contacterMobilephone">{{
                personMessage.contacterMobilephone
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item" style="padding-left:20px">
              <span title="联系电话">联系电话：</span>
              <span :title="personMessage.contactAddress">{{
                personMessage.contactAddress
                }}</span>
            </el-col>
          </el-row>
          <el-row class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="户口性质">户口性质：</span>
              <span :title="personMessage.residenceType">{{
                personMessage.residenceType
                }}</span>
            </el-col>
            <el-col :span="16" class="el-list-item">
              <span title="户口所在地址">户口所在地址：</span>
              <span :title="personMessage.residenceAddress">{{
                personMessage.residenceAddress
                }}</span>
            </el-col>
          </el-row>
          <el-row class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="邮政编码">邮政编码：</span>
              <span :title="personMessage.zipCode">{{
                personMessage.zipCode
                }}</span>
            </el-col>
            <el-col :span="16" class="el-list-item">
              <span title="常住地址">常住地址：</span>
              <span>{{ personMessage.permanentAddr }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 公安预警 -->
        <div v-if="dataType == 'person' && idCount == 'Risk2'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="更新时间">更新时间：</span>
              <span :title="personMessage.updateTime | YYYYmmDD_Filter">{{
                personMessage.updateTime | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="生存状态">生存状态：</span>
              <span :title="personMessage.survival">{{
                personMessage.survival
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="失踪/状态不明/死亡日期">失踪/状态不明/死亡日期：</span>
              <span :title="personMessage.deathTime | YYYYmmDD_Filter">{{
                personMessage.deathTime | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 火化预警 -->
        <div v-if="dataType == 'person' && idCount == 'Risk3'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="更新时间">更新时间：</span>
              <span :title="personMessage.updateTime | YYYYmmDD_Filter">{{
                personMessage.updateTime | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="火化日期">火化日期：</span>
              <span :title="personMessage.fileDate | YYYYmmDD_Filter">{{
                personMessage.fileDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="所在殡仪馆">所在殡仪馆：</span>
              <span :title="personMessage.funeralHome">{{
                personMessage.funeralHome
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 判刑预警 -->
        <div v-if="dataType == 'person' && idCount == 'Risk4'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="更新时间">更新时间：</span>
              <span :title="personMessage.updateTime | YYYYmmDD_Filter">{{
                personMessage.updateTime | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="判决时间">判决时间：</span>
              <span :title="personMessage.sentence | YYYYmmDD_Filter">{{
                personMessage.sentence | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item" style="padding-left:20px">
              <span title="服刑类型">服刑类型：</span>
              <span :title="personMessage.servingType">{{
                personMessage.servingType
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="刑期起止时间">刑期起止时间：</span>
              <span :title="personMessage.startEndTime | YYYYmmDD_Filter">{{
                personMessage.startEndTime | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="是否剥夺政治权利">是否剥夺政治权利：</span>
              <span :title="personMessage.deprivePolitics">{{
                personMessage.deprivePolitics
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item" style="padding-left:20px">
              <span title="判处法院">判处法院：</span>
              <span :title="personMessage.court">{{
                personMessage.court
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="量刑类型">量刑类型：</span>
              <span :title="personMessage.sentencingType">{{
                personMessage.sentencingType
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="案号">案号：</span>
              <span :title="personMessage.caseNo">{{
                personMessage.caseNo
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item" style="padding-left:20px">
              <span title="生效时间">生效时间：</span>
              <span :title="personMessage.takeEffectTime | YYYYmmDD_Filter">{{
                personMessage.takeEffectTime | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>
          <el-row class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="服刑结果">服刑结果：</span>
              <span :title="personMessage.servingResult">{{
                personMessage.servingResult
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 人员信息和认定鉴定信息 idCount - 30-->
        <div v-if="dataType == 'person' && idCount == '102'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-carousel-item>
              <el-row :gutter="24" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="社会保障号">社会保障号：</span>
                  <span :title="
                      personMessage.insuranceId || personMessage.insuranceNumber
                    ">{{
                    personMessage.insuranceId || personMessage.insuranceNumber
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="性别">性别：</span>
                  <span :title="personMessage.sex | sexTypeFilter">{{
                    personMessage.sex | sexTypeFilter
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="出生日期">出生日期：</span>
                  <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                    personMessage.birthday | YYYYmmDD_Filter
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="24" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="离退休状态">离退休状态：</span>
                  <span :title="personMessage.retireStatus | retireStatus">{{
                    personMessage.retireStatus | retireStatus
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="行政区划">行政区划：</span>
                  <span :title="personMessage.regionCode | regionTypeFilter">{{
                    personMessage.regionCode | regionTypeFilter
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="老工伤标识">老工伤标识：</span>
                  <span :title="personMessage.oldInjuryFlag">{{
                    personMessage.oldInjuryFlag | oldInjuryFlag
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="24" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="统一社会信用代码">统一社会信用代码：</span>
                  <span :title="personMessage.unitCardId">{{
                    personMessage.unitCardId
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="单位名称">单位名称：</span>
                  <span :title="personMessage.unitName || personMessage.companyName">{{
                    personMessage.unitName || personMessage.companyName
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="是否涉及第三人">是否涉及第三人：</span>
                  <span :title="personMessage.isThirdPerson">{{
                    personMessage.isThirdPerson | isThirdPerson
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
            <el-carousel-item>
              <el-row :gutter="24" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="伤残等级">伤残等级：</span>
                  <span :title="personMessage.injuryLevel | injuryLevel">{{
                    personMessage.injuryLevel | injuryLevel
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="生活自理障碍等级">生活自理障碍等级：</span>
                  <span :title="
                      personMessage.selfcareDisorderLevel
                        | selfcareDisorderLevel
                    ">{{
                    personMessage.selfcareDisorderLevel
                    | selfcareDisorderLevel
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="工伤发生时间">工伤发生时间：</span>
                  <span :title="personMessage.injuryOccurrenceTime">{{
                    personMessage.injuryOccurrenceTime
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="24" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="工伤认定日期">工伤认定日期：</span>
                  <span :title="personMessage.cognizanceDate | YYYYmmDD_Filter">{{ personMessage.cognizanceDate |
                    YYYYmmDD_Filter }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="劳动能力鉴定日期">劳动能力鉴定日期：</span>
                  <span :title="personMessage.appraisalDate">{{
                    personMessage.appraisalDate | YYYYmmDD_Filter
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="工伤认定结论">工伤认定结论：</span>
                  <span :title="
                      personMessage.cognizanceConclusion | cognizanceConclusion
                    ">{{
                    personMessage.cognizanceConclusion | cognizanceConclusion
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="24" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="伤害部位1">伤害部位1：</span>
                  <span :title="personMessage.injurySiteOne | injurySiteOne">{{
                    personMessage.injurySiteOne | injurySiteOne
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="伤害部位2">伤害部位2：</span>
                  <span :title="personMessage.injurySiteTwo | injurySiteOne">{{
                    personMessage.injurySiteTwo | injurySiteOne
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="伤害部位3">伤害部位3：</span>
                  <span :title="personMessage.injurySiteThree | injurySiteOne">{{ personMessage.injurySiteThree |
                    injurySiteOne }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
            <el-carousel-item>
              <el-row :gutter="24" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="职业病名称1">职业病名称1：</span>
                  <span :title="personMessage.diseasesNameOne">{{
                    personMessage.diseasesNameOne | diseasesNameOne
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span class="name">因工死亡日期</span>
                  <span class="content">{{
                    personMessage.workDeathTime | YYYYmmDD_Filter
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="联系人姓名">联系人姓名：</span>
                  <span :title="personMessage.contacterName">{{
                    personMessage.contacterName
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="联系电话">联系电话：</span>
                  <span :title="personMessage.telephone">{{
                    personMessage.telephone
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="联系人手机号">联系人手机号:</span>
                  <span :title="personMessage.contacterMobilephone">{{
                    personMessage.contacterMobilephone
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 人员标签 idCount - 18-->
        <div v-if="dataType == 'person' && idCount == '18'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="社会保障号">社会保障号：</span>
                <span :title="
                    personMessage.insuranceId || personMessage.insuranceNumber
                  ">{{
                  personMessage.insuranceId || personMessage.insuranceNumber
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="性别">性别：</span>
                <span :title="personMessage.sex | sexTypeFilter">{{
                  personMessage.sex | sexTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="出生日期">出生日期：</span>
                <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                  personMessage.birthday | YYYYmmDD_Filter
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="离退休状态">离退休状态：</span>
                <span :title="personMessage.retireStatus | retireStatus">{{
                  personMessage.retireStatus | retireStatus
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="行政区划">行政区划：</span>
                <span :title="personMessage.regionCode">{{
                  personMessage.regionCode | regionTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系人">联系人：</span>
                <span :title="personMessage.contacterName">{{
                  personMessage.contacterName
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span :title="
                    personMessage.telephone || personMessage.contacterTelephone
                  ">{{
                  personMessage.telephone || personMessage.contacterTelephone
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系手机">联系手机：</span>
                <span :title="
                    personMessage.mobilephone ||
                      personMessage.contacterMobilephone
                  ">{{
                  personMessage.mobilephone ||
                  personMessage.contacterMobilephone
                  }}</span>
              </el-col>
            </el-row>
          </el-carousel>
        </div>

        <!-- 人员标签 idCount - 56-->
        <div v-if="dataType == 'person' && idCount == '56'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="证件类型">证件类型：</span>
                <span :title="personMessage.certType | countryTypeFilter">{{
                  personMessage.certType | countryTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="证件号码">证件号码:</span>
                <span :title="personMessage.certNumber">{{
                  personMessage.certNumber
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="性别">性别：</span>
                <span :title="personMessage.sex | sexTypeFilter">{{
                  personMessage.sex | sexTypeFilter
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="出生日期">出生日期：</span>
                <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                  personMessage.birthday | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="民族">民族：</span>
                <span :title="personMessage.nation | nationTypeFilter">{{
                  personMessage.nation | nationTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="单位名称">单位名称：</span>
                <span :title="personMessage.unitName">{{
                  personMessage.unitName
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="联系手机">联系手机：</span>
                <span :title="
                    personMessage.mobilephone ||
                      personMessage.contacterMobilephone
                  ">{{
                  personMessage.mobilephone ||
                  personMessage.contacterMobilephone
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="所在区域">所在区域：</span>
                <span :title="personMessage.residenceAddress">{{
                  personMessage.residenceAddress
                  }}</span>
              </el-col>
            </el-row>
          </el-carousel>
        </div>
        <!-- 人员标签 idCount - 57-->
        <div v-if="dataType == 'person' && idCount == '57'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="社会保障号">社会保障号：</span>
                <span :title="personMessage.aac002">{{personMessage.aac002}}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="姓名">姓名:</span>
                <span :title="personMessage.aac003">{{personMessage.aac003}}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="性别">性别：</span>
                <span :title="personMessage.aac004">{{personMessage.aac004 }}</span>
              </el-col>

            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="出生日期">出生日期：</span>
                <span :title="personMessage.birthday">{{personMessage.birthday}}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="参保状态">参保状态：</span>
                <span :title="personMessage.aac008">{{personMessage.aac008}}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="离退休标识">离退休标识：</span>
                <span :title="personMessage.aac084">{{personMessage.aac084}}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="用工性质">用工性质：</span>
                <span :title="personMessage.aac013">{{personMessage.aac013}}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span :title="personMessage.aae005">{{personMessage.aae005}}</span>
              </el-col>
            </el-row>
          </el-carousel>
        </div>
        <!-- 人员标签 idCount - 56-->
        <div v-if="dataType == 'person' && idCount == '566'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="社会保障号">社会保障号：</span>
                <span :title="
                    personMessage.insuranceId || personMessage.insuranceNumber
                  ">{{
                  personMessage.insuranceId || personMessage.insuranceNumber
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="性别">性别：</span>
                <span :title="personMessage.sex | sexTypeFilter">{{
                  personMessage.sex | sexTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="出生日期">出生日期：</span>
                <span :title="personMessage.birthday">{{
                  personMessage.birthday | YYYYmmDD_Filter
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="参加工作日期">参加工作日期：</span>
                <span :title="personMessage.joinWorkDate">{{
                  personMessage.joinWorkDate | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="户口性质">户口性质：</span>
                <span :title="personMessage.residenceType | residenceType">{{
                  personMessage.residenceType | residenceType
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="年龄">年龄：</span>
                <span :title="personMessage.age">{{
                  personMessage.age || "--"
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="统一社会信用代码">统一社会信用代码：</span>
                <span :title="personMessage.unitCardId">{{
                  personMessage.unitCardId || "--"
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span :title="personMessage.telephone">{{
                  personMessage.telephone
                  }}</span>
              </el-col>
            </el-row>
          </el-carousel>
        </div>

        <!-- 人员标签 idCount - 18-->
        <div v-if="dataType == 'person' && idCount == '180'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="社会保障号">社会保障号：</span>
                <span :title="
                    personMessage.insuranceId || personMessage.insuranceNumber
                  ">{{
                  personMessage.insuranceId || personMessage.insuranceNumber
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="性别">性别：</span>
                <span :title="personMessage.sex | sexTypeFilter">{{
                  personMessage.sex | sexTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="出生日期">出生日期：</span>
                <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                  personMessage.birthday | YYYYmmDD_Filter
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="离退休状态">离退休状态：</span>
                <span :title="personMessage.retireStatus | retireStatus">{{
                  personMessage.retireStatus | retireStatus
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="行政区划">行政区划：</span>
                <span :title="personMessage.regionCode">{{
                  personMessage.regionCode | regionTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系人">联系人：</span>
                <span :title="personMessage.contacterName">{{
                  personMessage.contacterName
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span :title="
                    personMessage.telephone || personMessage.contacterTelephone
                  ">{{
                  personMessage.telephone || personMessage.contacterTelephone
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系手机">联系手机：</span>
                <span :title="
                    personMessage.mobilephone ||
                      personMessage.contacterMobilephone
                  ">{{
                  personMessage.mobilephone ||
                  personMessage.contacterMobilephone
                  }}</span>
              </el-col>
            </el-row>
          </el-carousel>
        </div>
        <!-- 人员标签 idCount - 18-->
        <div v-if="dataType == 'person' && idCount == '181'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="12" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>
            <el-col :span="12" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="12" class="el-list-item">
              <span title="离退休状态">离退休状态:</span>
              <span :title="personMessage.retireStatus | retireStatus">{{
                personMessage.retireStatus | retireStatus
                }}</span>
            </el-col>
            <el-col :span="12" class="el-list-item">
              <span title="参保状态">参保状态：</span>
              <span :title="personMessage.insuredStatus | insuredStatus">{{
                personMessage.insuredStatus | insuredStatus
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 单位标签1（数源）idCount = 1-->
        <div v-if="dataType == 'companyAndPerson' && idCount == '1'">
          <!-- <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight"
                             :autoplay="false">
          <el-carousel-item>-->
          <ep-title>工伤申报信息</ep-title>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="姓名">姓名:</span>
              <span :title="allMessage.name">{{ allMessage.name }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="性别">性别:</span>
              <span :title="allMessage.sex | sexTypeFilter">{{
                allMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="统筹区">统筹区:</span>
              <span :title="allMessage.regionCode">{{
                allMessage.regionCode
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="民族">民族:</span>
              <span :title="allMessage.nation | nationTypeFilter">{{
                allMessage.nation | nationTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="证件类型">证件类型:</span>
              <span :title="allMessage.certType | countryTypeFilter">{{
                allMessage.certType | countryTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="证件号码">证件号码:</span>
              <span :title="allMessage.certNumber">{{
                allMessage.certNumber
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系地址">联系地址:</span>
              <span :title="allMessage.contactAddress">{{
                allMessage.contactAddress
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="手机号码">手机号码:</span>
              <span :title="allMessage.mobilephone">{{
                allMessage.mobilephone
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="邮编">邮编:</span>
              <span :title="allMessage.zipCode">{{ allMessage.zipCode }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="参加工作时间">参加工作时间:</span>
              <span :title="allMessage.joinWorkDate">{{
                allMessage.joinWorkDate
                }}</span>
            </el-col>
          </el-row>
          <ep-title>用人单位信息</ep-title>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span :title="allMessage.unitName || allMessage.companyName">{{
                allMessage.unitName || allMessage.companyName
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码:</span>
              <span :title="allMessage.unitCardId">{{
                allMessage.unitCardId
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系人">联系人:</span>
              <span :title="allMessage.contacterName">{{
                allMessage.contacterName
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系电话">联系电话:</span>
              <span :title="allMessage.mobilephone">{{
                allMessage.mobilephone
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系地址">联系地址:</span>
              <span :title="allMessage.contactAddress">{{
                allMessage.contactAddress
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="邮编">邮编:</span>
              <span :title="allMessage.zipCode">{{ allMessage.zipCode }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="法人代表">法人代表:</span>
              <span :title="allMessage.chiefName">{{
                allMessage.chiefName
                }}</span>
            </el-col>
          </el-row>
          <div v-show="isMore" class="moreInfoBox_panel">
            <ep-title>申请人信息</ep-title>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="申请人主体">申请人主体:</span>
                <span :title="allMessage.applicantAndAuthRelation">{{
                  allMessage.applicantAndAuthRelation | applicantAndAuthRelation
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="申请人姓名">申请人姓名:</span>
                <span :title="allMessage.applicationName">{{
                  allMessage.applicationName
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="申请人证件类型">申请人证件类型:</span>
                <span :title="allMessage.certTypeValue">{{
                  allMessage.certTypeValue
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="申请人证件号码">申请人证件号码:</span>
                <span :title="allMessage.applicantCardNumber">{{
                  allMessage.applicantCardNumber
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="申请人手机号码">申请人手机号码:</span>
                <span :title="allMessage.applicantTel">{{
                  allMessage.applicantTel
                  }}</span>
              </el-col>
            </el-row>
            <ep-title>工伤信息</ep-title>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="工伤类别">工伤类别:</span>
                <span :title="allMessage.jobInjuryType">{{
                  allMessage.jobInjuryTypeValue
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="伤害程度">伤害程度:</span>
                <span :title="allMessage.injuryDegree">{{
                  allMessage.injuryDegree | injuryDegree
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="职业职业、工种或工作岗位">职业、工种或工作岗位:</span>
                <span :title="allMessage.occupationWorkType">{{
                  allMessage.occupationWorkType | occupationWorkType
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="伤害部位1">伤害部位:</span>
                <span :title="allMessage.injurySiteOneValue">{{
                  allMessage.injurySiteOneValue
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="事故类别">事故类别:</span>
                <span :title="allMessage.accidentType | accidentType">{{
                  allMessage.accidentType | accidentType
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="事故地点">事故地点:</span>
                <span :title="allMessage.accidentAddress">{{
                  allMessage.accidentAddress
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="交通事故认定书编号">交通事故认定书编号:</span>
                <span :title="allMessage.trafficCognizanceCompanyID">{{
                  allMessage.trafficCognizanceCompanyID
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="是否涉及第三人">是否涉及第三人:</span>
                <span :title="allMessage.isThirdPerson">{{
                  allMessage.isThirdPerson | isThirdPerson
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="诊断机构">诊断机构:</span>
                <span :title="allMessage.appraisalInstitutionName">{{
                  allMessage.appraisalInstitutionName
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="首诊日期">首诊日期:</span>
                <span :title="allMessage.startDate">{{
                  allMessage.startDate | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="接触职业病危害月数">接触职业病危害月数:</span>
                <span :title="allMessage.diseasesHazardNumbers">{{
                  allMessage.diseasesHazardNumbers
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="职业病名称">职业病名称:</span>
                <span :title="allMessage.diseasesNameOneValue">{{
                  allMessage.diseasesNameOneValue
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="因工死亡（失踪）时间">因工死亡（失踪）时间:</span>
                <span :title="allMessage.workDeathTime">{{
                  allMessage.workDeathTime | startDate
                  }}</span>
              </el-col>
              <el-col :span="16" class="el-list-item">
                <span title="伤害部位描述">伤害部位描述:</span>
                <span :title="allMessage.injurySite">{{
                  allMessage.injurySite
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="24" class="el-list-item">
                <span title="伤害事件情况">伤害事件情况:</span>
                <span :title="allMessage.injuryEvents">{{
                  allMessage.injuryEvents
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="24" class="el-list-item">
                <span title="医疗救治的基本情况和诊断意见">医疗救治的基本情况和诊断意见:</span>
                <span :title="allMessage.medicalDiagnosticOpinion">{{
                  allMessage.medicalDiagnosticOpinion
                  }}</span>
              </el-col>
            </el-row>
          </div>

          <el-row :gutter="20" class="el-list">
            <el-col :span="24" class="searchMore">
              <i class="el-icon-arrow-down" :class="isMore ? 'is-active' : ''" @click="searchMore"></i>
            </el-col>
          </el-row>
          <!-- </el-carousel-item>
          </el-carousel>-->
        </div>
        <!-- 单位标签1（数源）idCount = 1  工伤认定撤消用-->
        <div v-if="dataType == 'companyAndPerson' && idCount == '1011'">
          <!-- <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight"
                             :autoplay="false">
          <el-carousel-item>-->
          <ep-title>工伤申报信息</ep-title>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="姓名">姓名:</span>
              <span :title="allMessage.name">{{ allMessage.name }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="性别">性别:</span>
              <span :title="allMessage.sex | sexTypeFilter">{{
                allMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="统筹区">统筹区:</span>
              <span :title="allMessage.regionCode | regionTypeFilter">{{
                allMessage.regionCode | regionTypeFilter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="民族">民族:</span>
              <span :title="allMessage.nation | nationTypeFilter">{{
                allMessage.nation | nationTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="证件类型">证件类型:</span>
              <span :title="allMessage.certType | countryTypeFilter">{{
                allMessage.certType | countryTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="证件号码">证件号码:</span>
              <span :title="allMessage.certNumber">{{
                allMessage.certNumber
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系地址">联系地址:</span>
              <span :title="allMessage.contactAddress">{{
                allMessage.contactAddress
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="手机号码">手机号码:</span>
              <span :title="allMessage.mobilephone">{{
                allMessage.mobilephone
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="邮编">邮编:</span>
              <span :title="allMessage.zipCode">{{ allMessage.zipCode }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="参加工作时间">参加工作时间:</span>
              <span :title="allMessage.joinWorkDate | YYYYmmDD_Filter">{{
                allMessage.joinWorkDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>
          <ep-title>用人单位信息</ep-title>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span :title="allMessage.unitName || allMessage.companyName">{{
                allMessage.unitName || allMessage.companyName
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码:</span>
              <span :title="allMessage.unitCardId">{{
                allMessage.unitCardId
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系人">联系人:</span>
              <span :title="allMessage.contacterName">{{
                allMessage.contacterName
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系电话">联系电话:</span>
              <span :title="allMessage.mobilephone">{{
                allMessage.mobilephone
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系地址">联系地址:</span>
              <span :title="allMessage.contactAddress">{{
                allMessage.contactAddress
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="邮编">邮编:</span>
              <span :title="allMessage.zipCode">{{ allMessage.zipCode }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="法人代表">法人代表:</span>
              <span :title="allMessage.chiefName">{{
                allMessage.chiefName
                }}</span>
            </el-col>
          </el-row>
          <div v-show="isMore" class="moreInfoBox_panel">
            <ep-title>申请人信息</ep-title>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="申请人主体">申请人主体:</span>
                <span :title="
                    allMessage.applicantAndAuthRelation
                      | applicantAndAuthRelation
                  ">{{
                  allMessage.applicantAndAuthRelation
                  | applicantAndAuthRelation
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="申请人姓名">申请人姓名:</span>
                <span :title="allMessage.applicationName">{{
                  allMessage.applicationName
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="申请人证件类型">申请人证件类型:</span>
                <span :title="allMessage.applicantCardType | countryTypeFilter">{{ allMessage.applicantCardType |
                  countryTypeFilter }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="申请人证件号码">申请人证件号码:</span>
                <span :title="allMessage.applicantCardNumber">{{
                  allMessage.applicantCardNumber
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="申请人手机号码">申请人手机号码:</span>
                <span :title="allMessage.applicantTel">{{
                  allMessage.applicantTel
                  }}</span>
              </el-col>
            </el-row>
            <ep-title>工伤信息</ep-title>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="工伤类别">工伤类别:</span>
                <span :title="allMessage.jobInjuryType | jobInjuryType">{{
                  allMessage.jobInjuryType | jobInjuryType
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="伤害程度">伤害程度:</span>
                <span :title="allMessage.injuryDegree | injuryDegree">{{
                  allMessage.injuryDegree | injuryDegree
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="职业职业、工种或工作岗位">职业、工种或工作岗位:</span>
                <span :title="allMessage.occupationWorkType | occupationWorkType">{{
                  allMessage.occupationWorkType | occupationWorkType
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="伤害部位1">伤害部位:</span>
                <span :title="allMessage.injurySiteOneValue">{{
                  allMessage.injurySiteOneValue
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="事故类别">事故类别:</span>
                <span :title="allMessage.accidentType | accidentType">{{
                  allMessage.accidentType | accidentType
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="事故地点">事故地点:</span>
                <span :title="allMessage.accidentAddress">{{
                  allMessage.accidentAddress
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="交通事故认定书编号">交通事故认定书编号:</span>
                <span :title="allMessage.trafficCognizanceCompanyID">{{
                  allMessage.trafficCognizanceCompanyID
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="是否涉及第三人">是否涉及第三人:</span>
                <span :title="allMessage.isThirdPerson | isThirdPerson">{{
                  allMessage.isThirdPerson | isThirdPerson
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="诊断机构">诊断机构:</span>
                <span :title="allMessage.appraisalInstitutionName">{{
                  allMessage.appraisalInstitutionName
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="首诊日期">首诊日期:</span>
                <span :title="allMessage.createTime | YYYYmmDD_Filter">{{
                  allMessage.createTime | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="接触职业病危害月数">接触职业病危害月数:</span>
                <span :title="allMessage.diseasesHazardNumbers">{{
                  allMessage.diseasesHazardNumbers
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="职业病名称">职业病名称:</span>
                <span :title="allMessage.diseasesNameOneValue">{{
                  allMessage.diseasesNameOneValue
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="因工死亡（失踪）时间">因工死亡（失踪）时间:</span>
                <span :title="allMessage.workDeathTime | YYYYmmDD_Filter">{{
                  allMessage.workDeathTime | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <el-col :span="24" class="el-list-item">
                <span title="伤害部位描述">伤害部位描述:</span>
                <span :title="allMessage.injurySite">{{
                  allMessage.injurySite
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="24" class="el-list-item">
                <span title="伤害事件情况">伤害事件情况:</span>
                <span :title="allMessage.injuryEvents">{{
                  allMessage.injuryEvents
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="24" class="el-list-item">
                <span title="医疗救治的基本情况和诊断意见">医疗救治的基本情况和诊断意见:</span>
                <span :title="allMessage.diagnosticOpinion">{{
                  allMessage.diagnosticOpinion
                  }}</span>
              </el-col>
            </el-row>
            <ep-title>工伤决定信息</ep-title>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="工伤认定结论">工伤认定结论:</span>
                <span :title="
                    allMessage.cognizanceConclusion | cognizanceConclusion
                  ">{{
                  allMessage.cognizanceConclusion | cognizanceConclusion
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="工伤认定依据类别">工伤认定依据类别:</span>
                <span :title="allMessage.cognizanceBasisType | cognizanceBasisType">{{
                  allMessage.cognizanceBasisType | cognizanceBasisType
                  }}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16" class="el-list-item">
                <span title="调查核实情况">调查核实情况:</span>
                <span :title="allMessage.investigationVerifyDesc">{{
                  allMessage.investigationVerifyDesc
                  }}</span>
              </el-col>
            </el-row>
          </div>

          <el-row :gutter="20" class="el-list">
            <el-col :span="24" class="searchMore">
              <i class="el-icon-arrow-down" :class="isMore ? 'is-active' : ''" @click="searchMore"></i>
            </el-col>
          </el-row>

          <!-- </el-carousel-item>
          </el-carousel>-->
        </div>
        <div v-if="dataType == 'companyAndPerson' && idCount == '666'">
          <!-- <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight"
                             :autoplay="false">
          <el-carousel-item>-->
          <ep-title>工伤申报信息</ep-title>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="姓名">姓名:</span>
              <span :title="allMessage.name">{{ allMessage.name }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="性别">性别:</span>
              <span :title="allMessage.sex | sexTypeFilter">{{
                allMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="统筹区">统筹区:</span>
              <span :title="allMessage.regionCode | regionTypeFilter">{{
                allMessage.regionCode | regionTypeFilter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="民族">民族:</span>
              <span :title="allMessage.nation | nationTypeFilter">{{
                allMessage.nation | nationTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="证件类型">证件类型:</span>
              <span :title="allMessage.certType | countryTypeFilter">{{
                allMessage.certType | countryTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="证件号码">证件号码:</span>
              <span :title="allMessage.certNumber">{{
                allMessage.certNumber
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系地址">联系地址:</span>
              <span :title="allMessage.contactAddress">{{
                allMessage.contactAddress
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="手机号码">手机号码:</span>
              <span :title="allMessage.mobilephone">{{
                allMessage.mobilephone
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="邮编">邮编:</span>
              <span :title="allMessage.zipCode">{{ allMessage.zipCode }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="参加工作时间">参加工作时间:</span>
              <span :title="allMessage.joinWorkDate | YYYYmmDD_Filter">{{
                allMessage.joinWorkDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>
          <ep-title>用人单位信息</ep-title>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span :title="allMessage.unitName || allMessage.companyName">{{
                allMessage.unitName || allMessage.companyName
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码:</span>
              <span :title="allMessage.unitCardId">{{
                allMessage.unitCardId
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系人">联系人:</span>
              <span :title="allMessage.contacterName">{{
                allMessage.contacterName
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系电话">联系电话:</span>
              <span :title="allMessage.mobilephone">{{
                allMessage.mobilephone
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系地址">联系地址:</span>
              <span :title="allMessage.contactAddress">{{
                allMessage.contactAddress
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="邮编">邮编:</span>
              <span :title="allMessage.zipCode">{{ allMessage.zipCode }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="法人代表">法人代表:</span>
              <span :title="allMessage.chiefName">{{
                allMessage.chiefName
                }}</span>
            </el-col>
          </el-row>
          <div v-show="isMore" class="moreInfoBox_panel">
            <ep-title>申请人信息</ep-title>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="申请人主体">申请人主体:</span>
                <span :title="
                    allMessage.applicantAndAuthRelation
                      | applicantAndAuthRelation
                  ">{{
                  allMessage.applicantAndAuthRelation
                  | applicantAndAuthRelation
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="申请人姓名">申请人姓名:</span>
                <span :title="allMessage.applicationName">{{
                  allMessage.applicationName
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="申请人证件类型">申请人证件类型:</span>
                <span :title="allMessage.applicantCardType | countryTypeFilter">{{ allMessage.applicantCardType |
                  countryTypeFilter }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="申请人证件号码">申请人证件号码:</span>
                <span :title="allMessage.applicantCardNumber">{{
                  allMessage.applicantCardNumber
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="申请人手机号码">申请人手机号码:</span>
                <span :title="allMessage.applicantTel">{{
                  allMessage.applicantTel
                  }}</span>
              </el-col>
            </el-row>
            <ep-title>工伤信息</ep-title>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="事故类别">事故类别:</span>
                <span :title="allMessage.accidentType | accidentType">{{
                  allMessage.accidentType | accidentType
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="受伤部位">受伤部位:</span>
                <span :title="allMessage.injurySiteOneValue">{{
                  allMessage.injurySiteOneValue
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="事故时间">事故时间:</span>
                <span :title="allMessage.occupationWorkType | occupationWorkType">{{
                  allMessage.occupationWorkType | occupationWorkType
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="事故地点">事故地点:</span>
                <span :title="allMessage.accidentAddress">{{
                  [
                  allMessage.accidentProvince,
                  allMessage.accidentCity,
                  allMessage.accidentRegion
                  ] | unicodeExchange
                  }}{{ allMessage.accidentAddress }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="医疗费用总额(初算)">医疗费用总额（初算）:</span>
                <span :title="allMessage.medicalFeeAmount">{{
                  allMessage.medicalFeeAmount
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="职业（工种）">职业（工种）:</span>
                <span :title="allMessage.injuryOccurrenceTime | startDate">{{
                  allMessage.injuryOccurrenceTime | startDate
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="24" class="el-list-item">
                <span title="伤害事件情况">伤害事件情况:</span>
                <span :title="allMessage.injuryEvents">{{
                  allMessage.injuryEvents
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="24" class="el-list-item">
                <span title="医疗救治的基本情况和诊断意见">医疗救治的基本情况和诊断意见:</span>
                <span :title="allMessage.medicalDiagnosticOpinion">{{
                  allMessage.medicalDiagnosticOpinion
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="诊断机构">诊断机构:</span>
                <span :title="allMessage.appraisalInstitutionName">{{
                  allMessage.appraisalInstitutionName
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="首诊日期">首诊日期:</span>
                <span :title="allMessage.createTime | YYYYmmDD_Filter">{{
                  allMessage.createTime | YYYYmmDD_Filter
                  }}</span>
              </el-col>
            </el-row>
          </div>

          <el-row :gutter="20" class="el-list">
            <el-col :span="24" class="searchMore">
              <i class="el-icon-arrow-down" :class="isMore ? 'is-active' : ''" @click="searchMore"></i>
            </el-col>
          </el-row>

          <!-- </el-carousel-item>
          </el-carousel>-->
        </div>
        <div v-if="dataType == 'injuryPerson' && idCount == '999'">
          <!-- <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight"
                             :autoplay="false">
          <el-carousel-item>-->
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号:</span>
              <span :title="injuryMessage.certNumber">{{
                injuryMessage.certNumber
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="性别">性别:</span>
              <span :title="injuryMessage.sex | sexTypeFilter">{{
                injuryMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期:</span>
              <span :title="injuryMessage.birthday | YYYYmmDD_Filter">{{
                injuryMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="离退休状态">离退休状态:</span>
              <span :title="injuryMessage.retireStatus | retireStatus">{{
                injuryMessage.retireStatus | retireStatus
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="行政区划">行政区划:</span>
              <span :title="injuryMessage.regionCode | regionTypeFilter">{{
                injuryMessage.regionCode | regionTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系人姓名">联系人姓名:</span>
              <span :title="injuryMessage.contacterName">{{
                injuryMessage.contacterName
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系人手机号">联系人手机号:</span>
              <span :title="injuryMessage.contacterMobilephone">{{
                injuryMessage.contacterMobilephone
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系人电话">联系人电话:</span>
              <span :title="injuryMessage.contacterTelephone">{{
                injuryMessage.contacterTelephone
                }}</span>
            </el-col>
          </el-row>
          <ep-title>工伤认定信息</ep-title>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码:</span>
              <span :title="injuryMessage.unitCardId">{{
                injuryMessage.unitCardId
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span :title="injuryMessage.unitName || injuryMessage.companyName">{{ injuryMessage.unitName ||
                injuryMessage.companyName }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="工伤认定书编号">工伤认定书编号:</span>
              <span :title="injuryMessage.injuryCognizanceNumber">{{
                injuryMessage.injuryCognizanceNumber
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="工伤发生时间">工伤发生时间:</span>
              <span :title="injuryMessage.injuryOccurrenceTime">{{
                injuryMessage.injuryOccurrenceTime
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="工伤认定日期">工伤认定日期:</span>
              <span :title="injuryMessage.cognizanceDate">{{
                injuryMessage.cognizanceDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="工伤报告日期">工伤报告日期:</span>
              <span :title="injuryMessage.injuryReportTime">{{
                injuryMessage.injuryReportTime | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="工伤认定申请日期">工伤认定申请日期:</span>
              <span :title="injuryMessage.applicationDate | YYYYmmDD_Filter">{{
                injuryMessage.applicationDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="工伤认定结论">工伤认定结论:</span>
              <span :title="
                  injuryMessage.cognizanceConclusion | cognizanceConclusion
                ">{{
                injuryMessage.cognizanceConclusion | cognizanceConclusion
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="认定依据类别">认定依据类别:</span>
              <span :title="injuryMessage.cognizanceBasisType | cognizanceBasisType">{{
                injuryMessage.cognizanceBasisType | cognizanceBasisType
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="工伤认定单位">工伤认定单位:</span>
              <span :title="injuryMessage.cognizanceInstitution">{{
                injuryMessage.cognizanceInstitution | cognizanceInstitution
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="事故类别">事故类别:</span>
              <span :title="injuryMessage.accidentType | accidentType">{{
                injuryMessage.accidentType | accidentType
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="伤害部位">伤害部位:</span>
              <span :title="injuryMessage.injurySiteOneValue">{{
                injuryMessage.injurySiteOneValue || injuryMessage.injurySiteOne
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="伤害部位描述">伤害部位描述:</span>
              <span :title="injuryMessage.injurySite">{{
                injuryMessage.injurySite
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="职业（工种）">职业（工种）:</span>
              <span :title="injuryMessage.occupationWorkType | occupationWorkType">{{
                injuryMessage.occupationWorkType | occupationWorkType
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="接触职业病危害日期">接触职业病危害日期:</span>
              <span :title="injuryMessage.diseasesHazardDate | YYYYmmDD_Filter">{{ injuryMessage.diseasesHazardDate |
                YYYYmmDD_Filter }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="接触职业病危害月数">接触职业病危害月数:</span>
              <span :title="injuryMessage.diseasesHazardNumbers">{{
                injuryMessage.diseasesHazardNumbers
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="职业病名称">职业病名称:</span>
              <span :title="injuryMessage.diseasesNameOneName">{{
                injuryMessage.diseasesNameOneName
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="因工死亡日期">因工死亡日期:</span>
              <span :title="injuryMessage.workDeathTime | YYYYmmDD_Filter">{{
                injuryMessage.workDeathTime | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="是否第三人">是否第三人:</span>
              <span :title="injuryMessage.isThirdPerson | isThirdPerson">{{
                injuryMessage.isThirdPerson | isThirdPerson
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="24" class="el-list-item">
              <span title="伤害事件情况">伤害事件情况:</span>
              <span :title="injuryMessage.injuryEvents">{{
                injuryMessage.injuryEvents
                }}</span>
            </el-col>
          </el-row>
        </div>

        <div v-if="dataType == 'injuryPerson' && idCount == 'newInjury_person'">
          <!-- <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight"
                             :autoplay="false">
          <el-carousel-item>-->
          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="社会保障号">社会保障号:</span>
              <span :title="injuryMessage.certNumber">{{
                injuryMessage.certNumber
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="性别">性别:</span>
              <span :title="injuryMessage.sex | sexTypeFilter">{{
                injuryMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="出生日期">出生日期:</span>
              <span :title="injuryMessage.birthday | YYYYmmDD_Filter">{{
                injuryMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="离退休状态">离退休状态:</span>
              <span :title="injuryMessage.retireStatus | retireStatus">{{
                injuryMessage.retireStatus | retireStatus
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="统筹区">统筹区:</span>
              <span :title="injuryMessage.regionCode | regionTypeFilter">{{
                injuryMessage.regionCode | regionTypeFilter
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="手机号">手机号:</span>
              <span :title="injuryMessage.contacterMobilephone">{{
                injuryMessage.contacterMobilephone
                }}</span>
            </el-col>
          </el-row>
          <ep-title>工伤认定信息</ep-title>
          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="工伤发生时间">工伤发生时间:</span>
              <span :title="injuryMessage.injuryOccurrenceTime">{{
                injuryMessage.injuryOccurrenceTime
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码:</span>
              <span :title="injuryMessage.unitCardId">{{
                injuryMessage.unitCardId
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="工伤发生单位">工伤发生单位:</span>
              <span :title="injuryMessage.companyName || injuryMessage.unitName">{{ injuryMessage.companyName ||
                injuryMessage.unitName }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="工伤认定书编号">工伤认定书编号:</span>
              <span :title="injuryMessage.injuryCognizanceNumber">{{
                injuryMessage.injuryCognizanceNumber
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="工伤认定日期">工伤认定日期:</span>
              <span :title="injuryMessage.cognizanceDate">{{
                injuryMessage.cognizanceDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="工伤报告日期">工伤报告日期:</span>
              <span :title="injuryMessage.injuryReportTime">{{
                injuryMessage.injuryReportTime | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="工伤认定申请日期">工伤认定申请日期:</span>
              <span :title="injuryMessage.applicationDate | YYYYmmDD_Filter">{{
                injuryMessage.applicationDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="工伤认定结论">工伤认定结论:</span>
              <span :title="
                  injuryMessage.cognizanceConclusion | cognizanceConclusion
                ">{{
                injuryMessage.cognizanceConclusion | cognizanceConclusion
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="认定依据类别">认定依据类别:</span>
              <span :title="injuryMessage.cognizanceBasisType | cognizanceBasisType">{{
                injuryMessage.cognizanceBasisType | cognizanceBasisType
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="工伤认定单位">工伤认定单位:</span>
              <span :title="
                  injuryMessage.cognizanceInstitution | cognizanceInstitution
                ">{{
                injuryMessage.cognizanceInstitution | cognizanceInstitution
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="事故类别">事故类别:</span>
              <span :title="injuryMessage.accidentType | accidentType">{{
                injuryMessage.accidentType | accidentType
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="工伤类别">工伤类别:</span>
              <span :title="injuryMessage.jobInjuryType | jobInjuryType">{{
                injuryMessage.jobInjuryType | jobInjuryType
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="伤害程度">伤害程度:</span>
              <span :title="injuryMessage.injuryDegree | injuryDegree">{{
                injuryMessage.injuryDegree | injuryDegree
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="伤害部位">伤害部位:</span>
              <span :title="injuryMessage.injurySiteOneValue">{{
                injuryMessage.injurySiteOneValue || injuryMessage.injurySiteOne
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="24" class="el-list-item">
              <span title="伤害部位描述">伤害部位描述:</span>
              <span :title="injuryMessage.injurySite">{{
                injuryMessage.injurySite
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="职业（工种）">职业（工种）:</span>
              <span :title="injuryMessage.occupationWorkType | occupationWorkType">{{
                injuryMessage.occupationWorkType | occupationWorkType
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="接触职业病危害日期">接触职业病危害日期:</span>
              <span :title="injuryMessage.diseasesHazardDate | YYYYmmDD_Filter">{{ injuryMessage.diseasesHazardDate |
                YYYYmmDD_Filter }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="接触职业病危害月数">接触职业病危害月数:</span>
              <span :title="injuryMessage.diseasesHazardNumbers">{{
                injuryMessage.diseasesHazardNumbers
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="职业病名称">职业病名称:</span>
              <span :title="injuryMessage.diseasesNameOneName">{{
                injuryMessage.diseasesNameOneName
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="因工死亡日期">因工死亡日期:</span>
              <span :title="injuryMessage.workDeathTime | YYYYmmDD_Filter">{{
                injuryMessage.workDeathTime | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="是否第三人">是否第三人:</span>
              <span :title="injuryMessage.isThirdPerson | isThirdPerson">{{
                injuryMessage.isThirdPerson | isThirdPerson
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="老工伤标识">老工伤标识:</span>
              <span :title="injuryMessage.oldInjuryFlag | oldInjuryFlag">{{
                injuryMessage.oldInjuryFlag | oldInjuryFlag
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="24" class="el-list-item">
              <span title="伤害事件情况">伤害事件情况:</span>
              <span :title="injuryMessage.injuryEvents">{{
                injuryMessage.injuryEvents
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 单位标签2（本系统） idCount = 2-->
        <div v-if="dataType == 'company' && idCount == '2'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="companyMessage.unitCardId">{{
                companyMessage.unitCardId || "--"
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="行政区划">行政区划：</span>
              <span :title="companyMessage.regionCode | regionTypeFilter">{{
                companyMessage.regionCode | regionTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位类型">单位类型：</span>
              <span :title="companyMessage.unitType | unitType">{{
                companyMessage.unitType | unitType
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="经济类型">经济类型：</span>
              <span :title="companyMessage.economyType | economyType">{{
                companyMessage.economyType | economyType
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="隶属关系">隶属关系：</span>
              <span :title="companyMessage.subjectRelation | subjectRelation">{{
                companyMessage.subjectRelation | subjectRelation
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="所属行业">所属行业：</span>
              <span :title="companyMessage.subjectIndustry | subjectIndustry">{{
                companyMessage.subjectIndustry | subjectIndustry
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="行业风险类别">行业风险类别：</span>
              <span :title="companyMessage.subjectRisk | subjectRisk">{{
                companyMessage.subjectRisk | subjectRisk
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="法人姓名">法人姓名：</span>
              <span :title="companyMessage.chiefName">{{
                companyMessage.chiefName || "--"
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系人">联系人：</span>
              <span :title="companyMessage.contacterName">{{
                companyMessage.contacterName || "--"
                }}</span>
            </el-col>
          </el-row>
          <div v-show="isMore" class="moreInfoBox_panel">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span :title="companyMessage.contacterTelephone">{{
                  companyMessage.contacterTelephone || "--"
                  }}</span>
              </el-col>
              <el-col :span="16" class="el-list-item">
                <span title="公司地址">公司地址：</span>
                <span :title="companyMessage.registerAddress">{{
                  companyMessage.registerAddress || "--"
                  }}</span>
              </el-col>
              <el-col :span="16" class="el-list-item" v-if="false">
                <span title="单位编号">单位编号：</span>
                <span :title="companyMessage.unitId">{{
                  companyMessage.unitId || "--"
                  }}</span>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="20" class="el-list">
            <el-col :span="24" class="searchMore">
              <i class="el-icon-arrow-down" :class="isMore ? 'is-active' : ''" @click="searchMore"></i>
            </el-col>
          </el-row>
        </div>
        <!-- 单位缴费回盘到账 idCount = 2133-->
        <div v-if="dataType == 'company' && idCount == '2133'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="companyMessage.unitCardId">{{
                companyMessage.unitCardId || "--"
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="行政区划">行政区划：</span>
              <span :title="companyMessage.regionCode | regionTypeFilter">{{
                companyMessage.regionCode | regionTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位类型">单位类型：</span>
              <span :title="companyMessage.unitType | unitType">{{
                companyMessage.unitType | unitType
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="所属行业">所属行业：</span>
              <span :title="companyMessage.subjectIndustryName">{{
                companyMessage.subjectIndustryName
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="法人姓名">法人姓名：</span>
              <span :title="companyMessage.chiefName">{{
                companyMessage.chiefName || "--"
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系人">联系人：</span>
              <span :title="companyMessage.contacterName">{{
                companyMessage.contacterName || "--"
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系电话">联系电话：</span>
              <span :title="companyMessage.contacterTelephone">{{
                companyMessage.contacterTelephone || "--"
                }}</span>
            </el-col>
            <el-col :span="16" class="el-list-item">
              <span title="公司地址">公司地址：</span>
              <span :title="companyMessage.registerAddress">{{
                companyMessage.registerAddress || "--"
                }}</span>
            </el-col>
          </el-row>
          <div v-show="isMore" class="moreInfoBox_panel">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span :title="companyMessage.contacterTelephone">{{
                  companyMessage.contacterTelephone || "--"
                  }}</span>
              </el-col>
              <el-col :span="16" class="el-list-item">
                <span title="公司地址">公司地址：</span>
                <span :title="companyMessage.registerAddress">{{
                  companyMessage.registerAddress || "--"
                  }}</span>
              </el-col>
              <el-col :span="16" class="el-list-item" v-if="false">
                <span title="单位编号">单位编号：</span>
                <span :title="companyMessage.unitId">{{
                  companyMessage.unitId || "--"
                  }}</span>
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-if="dataType == 'company' && idCount == '3'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="companyMessage.unitCardId">{{
                companyMessage.unitCardId
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位编码">单位编码：</span>
              <span :title="companyMessage.unitId">{{
                companyMessage.unitId
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位状态">单位状态：</span>
              <span :title="companyMessage.unitStatusName">{{
                companyMessage.unitStatusName
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="单位类型">单位类型：</span>
              <span :title="companyMessage.unitTypeName">{{
                companyMessage.unitTypeName
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="隶属关系">隶属关系：</span>
              <span :title="companyMessage.subjectRelationName">{{
                companyMessage.subjectRelationName
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="行政区">行政区：</span>
              <span :title="companyMessage.regionCodeName">{{
                companyMessage.regionCodeName
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="法人证件类型">法人证件类型：</span>
              <span :title="companyMessage.chiefCertType | countryTypeFilter">{{
                companyMessage.chiefCertType | countryTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="法人证件号码">法人证件号码：</span>
              <span :title="companyMessage.chiefCertNumber">{{
                companyMessage.chiefCertNumber
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="法人姓名">法人姓名：</span>
              <span :title="companyMessage.chiefName">{{
                companyMessage.chiefName
                }}</span>
            </el-col>
          </el-row>
        </div>
        <div v-if="dataType == 'company' && idCount == '3396'">

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="companyMessage.unitCardId">{{companyMessage.unitCardId}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位编码">单位编码：</span>
              <span :title="companyMessage.unitId">{{companyMessage.unitId}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位状态">单位状态：</span>
              <span :title="companyMessage.unitStatusName">{{companyMessage.unitStatusName}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="单位类型">单位类型：</span>
              <span :title="companyMessage.unitTypeName">{{companyMessage.unitTypeName}}</span>
            </el-col>
          </el-row>
        </div>
        <div v-if="dataType == 'company' && idCount == '40'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="统一社会信用代码">统一社会信用代码：</span>
                  <span :title="companyMessage.unitCardId">{{
                    companyMessage.unitCardId || "--"
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="单位名称">单位名称：</span>
                  <span :title="
                      companyMessage.unitName ||
                        companyMessage.companyName ||
                        companyMessage.name
                    " class="ep-special2">{{
                    companyMessage.unitName ||
                    companyMessage.companyName ||
                    companyMessage.name
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="单位类型">单位类型：</span>
                  <span :title="companyMessage.unitType | unitType">{{
                    companyMessage.unitType | unitType
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="行政区划">行政区划：</span>
                  <span :title="companyMessage.regionCode | regionTypeFilter">{{
                    companyMessage.regionCode | regionTypeFilter
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="经济类型">经济类型：</span>
                  <span :title="companyMessage.economyType | economyType">{{
                    companyMessage.economyType | economyType
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="隶属关系">隶属关系：</span>
                  <span :title="companyMessage.subjectRelation | subjectRelation">{{
                    companyMessage.subjectRelation | subjectRelation
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="所属行业">所属行业：</span>
                  <span :title="companyMessage.subjectIndustry | subjectIndustry">{{
                    companyMessage.subjectIndustry | subjectIndustry
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="行业风险类别">行业风险类别：</span>
                  <span :title="companyMessage.subjectRisk | subjectRisk">{{
                    companyMessage.subjectRisk | subjectRisk
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="法人姓名">法人姓名：</span>
                  <span :title="companyMessage.chiefName">{{
                    companyMessage.chiefName || "--"
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>

            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="联系人">联系人：</span>
                  <span :title="companyMessage.contacterName">{{
                    companyMessage.contacterName || "--"
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="联系电话">联系电话：</span>
                  <span :title="companyMessage.contacterTelephone">{{
                    companyMessage.contacterTelephone || "--"
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="公司地址">公司地址：</span>
                  <span :title="companyMessage.registerAddress">{{
                    companyMessage.registerAddress || "--"
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list"></el-row>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div v-if="dataType == 'company' && idCount == '41'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <!-- <el-carousel-item> -->
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="统一社会信用代码">统一社会信用代码：</span>
                <span :title="companyMessage.unitCardId">{{
                  companyMessage.unitCardId
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="companyMessage.unitStatusName">单位状态：</span>
                <span>{{ companyMessage.unitStatusName }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="companyMessage.manageId">单位编码：</span>
                <span>{{ companyMessage.manageId }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="单位类型">单位类型：</span>
                <span :title="companyMessage.unitTypeName">{{
                  companyMessage.unitTypeName
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="隶属关系">隶属关系：</span>
                <span :title="companyMessage.subjectRelation | subjectRelation">{{ companyMessage.subjectRelation |
                  subjectRelation }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="行政区划">行政区划：</span>
                <span :title="companyMessage.regionCode | regionTypeFilter">{{
                  companyMessage.regionCode | regionTypeFilter
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="法人证件类型">法人证件类型：</span>
                <span :title="companyMessage.chiefCertTypeName">{{
                  companyMessage.chiefCertTypeName
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="法人证件号码">法人证件号码：</span>
                <span :title="companyMessage.chiefCertNumber">{{
                  companyMessage.chiefCertNumber
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="法人姓名">法人姓名：</span>
                <span :title="companyMessage.chiefName">{{
                  companyMessage.chiefName
                  }}</span>
              </el-col>
            </el-row>
            <!-- </el-carousel-item> -->
          </el-carousel>
        </div>
        <div v-if="dataType == 'company' && idCount == '42'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <!-- <el-carousel-item> -->
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="统一社会信用代码">统一社会信用代码：</span>
                <span :title="companyMessage.unitCardId">{{
                  companyMessage.unitCardId
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="行政区划">行政区划：</span>
                <span>{{ companyMessage.regionCodeName }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="单位类型">单位类型：</span>
                <span :title="companyMessage.unitTypeName">{{
                  companyMessage.unitTypeName
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="所属行业">所属行业：</span>
                <span :title="companyMessage.subjectIndustry | subjectIndustry">{{
                  companyMessage.subjectIndustry | subjectIndustry
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="法人姓名">法人姓名：</span>
                <span :title="companyMessage.chiefName">{{
                  companyMessage.chiefName
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系人">联系人：</span>
                <span :title="companyMessage.contacterName">{{
                  companyMessage.contacterName
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span :title="companyMessage.contacterMobilephone">{{
                  companyMessage.contacterMobilephone
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="公司地址">公司地址：</span>
                <span :title="companyMessage.registerAddress">{{
                  companyMessage.registerAddress
                  }}</span>
              </el-col>


            </el-row>
            <!-- </el-carousel-item> -->
          </el-carousel>
        </div>
        <!-- 工伤待遇追回信息录入 idCount = 10086-->
        <div v-if="dataType == 'person' && idCount == '10086'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.aac002
                ">{{personMessage.aac002 }}</span>
            </el-col>

            <el-col :span="6" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.aac004 | sexTypeFilter">{{
                personMessage.aac004 | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="6" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.aac006">{{
                personMessage.aac006 | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="离退休状态">离退休状态:</span>
              <span :title="personMessage.aac084 | retireStatus">{{
                personMessage.aac084 | retireStatus
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <!-- <span title="首次参保年月">首次参保年月:</span>
              <span :title="personMessage.ylBeginYM">{{personMessage.ylBeginYM}}</span>-->
              <span title="统筹区">统筹区:</span>
              <span :title="personMessage.aaa027 | regionTypeFilter">{{
                personMessage.aaa027 | regionTypeFilter
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="手机号">手机号：</span>
              <span :title="personMessage.aac067">{{
                personMessage.aac067
                }}</span>
            </el-col>
            <!-- <el-col :span="8" class="el-list-item">
              <span title="联系人">联系人：</span>
              <span :title="personMessage.contacterName">{{personMessage.contacterName}}</span>
            </el-col> -->
          </el-row>

          <!-- <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系手机">联系手机：</span>
              <span
                :title="personMessage.contacterMobilephone"
              >{{personMessage.contacterMobilephone}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系电话">联系电话：</span>
              <span :title="personMessage.contacterTelephone">{{personMessage.contacterTelephone}}</span>
            </el-col>
          </el-row> -->
        </div>
        <div v-if="dataType == 'person' && idCount == 'PersonSalaryReview'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span
                :title="personMessage.insuranceId||personMessage.insuranceNumber">{{personMessage.insuranceId||personMessage.insuranceNumber||'--'}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="姓名">姓名：</span>
              <span :title="personMessage.name">{{personMessage.name||'--'}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex|sexTypeFilter">{{personMessage.sex | sexTypeFilter}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday|YYYYmmDD_Filter">{{personMessage.birthday|YYYYmmDD_Filter}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄</span>
              <span :title="personMessage.age">{{personMessage.age||'--'}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate">{{personMessage.joinWorkDate|YYYYmmDD_Filter}}</span>
            </el-col>
          </el-row>
        </div>
        <div v-if="dataType == 'person' && idCount == 'entrySignlePC'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span
                :title="personMessage.insuranceId ||personMessage.insuranceNumber">{{personMessage.insuranceId||personMessage.insuranceNumber||'--'}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="姓名">姓名：</span>
              <span :title="personMessage.name">{{personMessage.name||'--'}}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 精简人员新增单位标签 idCount = 2-->
        <div v-if="dataType == 'company' && idCount == '60'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称：</span>
              <span :title="companyMessage.name">{{
                companyMessage.name
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="companyMessage.unitCardId">{{
                companyMessage.unitCardId
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="税号">税号：</span>
              <span :title="companyMessage.taxId">{{
                companyMessage.taxId
                }}</span>
            </el-col>
            <!-- </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="单位类型">单位类型：</span>
                <span :title="companyMessage.unitType|unitType">{{companyMessage.unitType|unitType}}</span>
                </el-col>-->
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="所属地区">所属地区：</span>
              <span :title="companyMessage.regionCode | regionTypeFilter">{{
                companyMessage.regionCode | regionTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="单位类型">单位类型：</span>
              <span :title="companyMessage.unitType | unitType">{{
                companyMessage.unitType | unitType
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="经济类型">经济类型：</span>
              <span :title="companyMessage.economyType | economyType">{{
                companyMessage.economyType | economyType
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="隶属关系">隶属关系：</span>
              <span :title="companyMessage.subjectRelation | subjectRelation">{{
                companyMessage.subjectRelation | subjectRelation
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="所属行业">所属行业：</span>
              <span :title="companyMessage.subjectIndustry | subjectIndustry">{{
                companyMessage.subjectIndustry | subjectIndustry
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="行业风险类别">行业风险类别：</span>
              <span :title="companyMessage.subjectRisk | subjectRisk">{{
                companyMessage.subjectRisk | subjectRisk
                }}</span>
            </el-col>
          </el-row>
          <div v-show="isMore" class="moreInfoBox_panel">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="法人姓名">法人姓名：</span>
                <span :title="companyMessage.chiefName">{{
                  companyMessage.chiefName
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="主管部门">主管部门：</span>
                <span :title="companyMessage.govDept">{{
                  companyMessage.govDept
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系人">联系人：</span>
                <span :title="companyMessage.contacterName">{{
                  companyMessage.contacterName
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span :title="companyMessage.contacterTelephone">{{
                  companyMessage.contacterTelephone
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="公司地址">公司地址：</span>
                <span :title="companyMessage.registerAddress">{{
                  companyMessage.registerAddress
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item" v-if="false">
                <span title="单位编号">单位编号:</span>
                <span :title="companyMessage.unitId">{{
                  companyMessage.unitId
                  }}</span>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="20" class="el-list">
            <el-col :span="24" class="searchMore">
              <i class="el-icon-arrow-down" :class="isMore ? 'is-active' : ''" @click="searchMore"></i>
            </el-col>
          </el-row>
        </div>
        <!-- 人员标签1（数源） idCount = 1-->
        <div v-if="dataType == 'person' && idCount == '1'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="证件号码">证件号码:</span>
              <span :title="personMessage.aac147">{{
                personMessage.aac147
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别:</span>
              <span :title="personMessage.aac004">{{
                personMessage.aac004
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期:</span>
              <span :title="personMessage.aac006">{{
                personMessage.aac006
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期:</span>
              <span :title="personMessage.aac007">{{
                personMessage.aac007
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄:</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span>
                <a :title="personMessage.aab069">{{ personMessage.aab069 }}</a>
              </span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="单位编号">单位编号:</span>
              <span :title="personMessage.aab001">{{
                personMessage.aab001
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="人员编码">人员编码:</span>
              <span :title="personMessage.aac001">{{
                personMessage.aac001
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 人员标签（本系统） idCount == '36'"-->
        <div v-if="dataType == 'person' && idCount == '36'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="证件类型">证件类型：</span>
              <span :title="personMessage.certType | countryTypeFilter">{{
                personMessage.certType | countryTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="证件号码">证件号码：</span>
              <span :title="personMessage.certNumber">{{
                personMessage.certNumber
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="离退休标识">离退休标识：</span>
              <span :title="personMessage.retireStatus | retireStatus">{{
                personMessage.retireStatus | retireStatus
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="参保状态">参保状态：</span>
              <span :title="personMessage.psInsuredStatus">{{
                personMessage.psInsuredStatus | insuredStatus
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="手机号码">手机号码：</span>
              <span :title="personMessage.contacterMobilephone">{{
                personMessage.contacterMobilephone
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系地址">联系地址：</span>
              <span :title="personMessage.contactAddress">{{
                personMessage.contactAddress
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="所属单位">所属单位：</span>
              <span :title="personMessage.unitName || personMessage.companyName">{{ personMessage.unitName ||
                personMessage.companyName }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 人员标签（本系统） idCount == '110'"-->
        <div v-if="dataType == 'person' && idCount == '110'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="14" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="10" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="12" class="el-list-item" v-if="showAreaCode">
              <span title="统筹区">统筹区：</span>
              <span :title="personMessage.areaCodeName">{{
                personMessage.areaCodeName
                }}</span>
            </el-col>
            <el-col :span="14" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
              <span style="margin-left:20px;display: inline-block;" v-if="personMessage.age"><img height="16px"
                  :src="ageSrc"> {{personMessage.age}}岁</span>
            </el-col>
            <el-col :span="10" class="el-list-item">
              <span title="离退休标志">离退休标志：</span>
              <span :title="personMessage.retireStatus | retireStatus">{{
                personMessage.retireStatus | retireStatus
                }}</span>
            </el-col>
          </el-row>
        </div>

        <!-- 人员标签（本系统） idCount == '111'"-->
        <div v-if="dataType == 'person' && idCount == '111'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="12" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="12" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="12" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
              <span style="margin-left:20px;display: inline-block;" v-if="personMessage.age"><img height="16px"
                  :src="ageSrc"> {{personMessage.age}}岁</span>
            </el-col>
            <el-col :span="12" class="el-list-item">
              <span title="民族">民族：</span>
              <span :title="personMessage.nation | nationTypeFilter">{{
                personMessage.nation | nationTypeFilter
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 特殊资格确认 - 2-->
        <div v-if="
            (dataType == 'person' || dataType == 'specialPerson') &&
              idCount == '246'
          ">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="姓名">姓名：</span>
              <span :title="personMessage.name">{{ personMessage.name }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate">{{
                personMessage.joinWorkDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="离退休日期">离退休日期：</span>
              <span :title="personMessage.retirementDate | startDate">{{
                personMessage.retirementDate | startDate
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="离退休类型">离退休类型:</span>
              <span :title="personMessage.retirementType | retirementType">{{
                personMessage.retirementType | retirementType
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="累计缴费年限">累计缴费年限：</span>
              <span :title="personMessage.totalyears" v-if="personMessage.totalyears">{{ personMessage.totalyears |
                totalyears }}</span>
              <span :title="personMessage.sumPayYear" v-if="personMessage.sumPayYear">{{ personMessage.sumPayYear |
                totalyears }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="结算单位名称">结算单位名称：</span>
              <span :title="personMessage.mainUnitName">{{
                personMessage.mainUnitName
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="基本单位名称">基本单位名称：</span>
              <span :title="personMessage.unitName || personMessage.companyName">{{ personMessage.unitName ||
                personMessage.companyName }}</span>
            </el-col>
          </el-row>
        </div>
        <div v-if="
            (dataType == 'person' || dataType == 'specialPerson') &&
              idCount == '247'
          ">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="姓名">姓名：</span>
              <span :title="personMessage.name">{{ personMessage.name }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">户籍性质：</span>
              <span :title="personMessage.residenceType">{{
                personMessage.residenceType | residenceType
                }}</span>
            </el-col>
          </el-row>
        </div>
        <div v-if="dataType == 'person' && idCount == '2'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId ||
                personMessage.insuranceNumber ||
                "--"
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate">{{
                personMessage.joinWorkDate | YYYYmmDD_Filter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <!-- <span title="首次参保年月">首次参保年月:</span>
              <span :title="personMessage.ylBeginYM">{{personMessage.ylBeginYM}}</span>-->
              <span title="户口性质">户口性质：</span>
              <span :title="personMessage.residenceType | residenceType">{{
                personMessage.residenceType | residenceType
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{
                personMessage.age || "--"
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="personMessage.unitCardId">{{
                personMessage.unitCardId || "--"
                }}</span>
            </el-col>
            <el-col :span="16" class="el-list-item">
              <span title="单位名称">单位名称：</span>
              <span @click="queryCompanyDetail" class="ep-special2"
                :title="personMessage.unitName || personMessage.companyName">{{ personMessage.unitName ||
                personMessage.companyName }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="单位编号">单位编号：</span>
              <span :title="personMessage.unitId">{{
                personMessage.unitId || "--"
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="人员编码">人员编码：</span>
              <span :title="personMessage.individualId">{{
                personMessage.individualId || "--"
                }}</span>
            </el-col>
          </el-row>
        </div>
        <div v-if="dataType == 'person' && idCount == 'LandAcquisition'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.aac002 || personMessage.insuranceNumber
                ">{{
                personMessage.aac002 ||
                personMessage.insuranceNumber ||
                "--"
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.aac004 | sexTypeFilter">{{
                personMessage.aac004 | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.bac006">{{
                personMessage.bac006 | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{
                personMessage.age || "--"
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="所属行政区">所属行政区：</span>
              <span :title="personMessage.aab301_bc17 | regionTypeFilter">{{
                personMessage.aab301_bc17 | regionTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="所属乡镇（街道）">所属乡镇（街道）：</span>
              <span :title="personMessage.aaf031_bc17">{{ personMessage.aaf031_bc17 || "--" }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="所属村（社区）：">所属村（社区）：</span>
              <span :title="personMessage.aaf040_bc17">{{
                personMessage.aaf040_bc17 || "--"
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="被征地时间">被征地时间：</span>
              <span :title="personMessage.bab110">{{
                personMessage.bab110 || "--"
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="所属被征地项目">所属被征地项目：</span>
              <span :title="personMessage.bab107">{{
                personMessage.bab107 || "--"
                }}</span>
            </el-col>
          </el-row>
        </div>
        <div v-if="dataType == 'person' && idCount == 'OneTimeRefund'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="姓名">姓名：</span>
              <span :title="personMessage.name">{{ personMessage.name }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId ||
                personMessage.insuranceNumber ||
                "--"
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>

          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{
                personMessage.age || "--"
                }}</span>
            </el-col>


            <el-col :span="8" class="el-list-item">
              <!-- <span title="首次参保年月">首次参保年月:</span>
              <span :title="personMessage.ylBeginYM">{{personMessage.ylBeginYM}}</span>-->
              <span title="户口性质">户口性质：</span>
              <span :title="personMessage.residenceType | residenceType">{{
                personMessage.residenceType | residenceType
                }}</span>
            </el-col>

          </el-row>
        </div>

        <div v-if="dataType == 'person' && idCount == '38'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="姓名">姓名：</span>
              <span :title="personMessage.name">{{ personMessage.name }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <!-- <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col> -->
            <el-col :span="8" class="el-list-item">
              <!-- <span title="首次参保年月">首次参保年月:</span>
              <span :title="personMessage.ylBeginYM">{{personMessage.ylBeginYM}}</span>-->
              <span title="户口性质">户口性质：</span>
              <span :title="personMessage.residenceType | residenceType">{{
                personMessage.residenceType | residenceType
                }}</span>
            </el-col>
          </el-row>
          <!-- <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate">{{
                personMessage.joinWorkDate | YYYYmmDD_Filter
              }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="personMessage.unitCardId">{{
                personMessage.unitCardId
              }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称：</span>
              <span
                :title="personMessage.unitName || personMessage.companyName"
                >{{ personMessage.unitName || personMessage.companyName }}</span
              >
            </el-col>
          </el-row> -->
        </div>
        <!-- 人员标签2（本系统）单单用于新参保 idCount - 22222-->
        <div v-if="dataType == 'person' && idCount == '22222'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="姓名">姓名：</span>
              <span :title="personMessage.name">{{ personMessage.name }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="户口性质">户口性质:</span>
              <span>{{ personMessage.residenceType | residenceType }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="手机号码">手机号码：</span>
              <span :title="personMessage.contacterMobilephone">{{
                personMessage.contacterMobilephone
                }}</span>
            </el-col>
          </el-row>
        </div>
        <div v-if="dataType == 'person' && idCount == '22224'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="项目名称">项目名称：</span>
              <span :title="personMessage.medicalInstitutionName">{{
                personMessage.medicalInstitutionName
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="项目经理">项目经理：</span>
              <span :title="personMessage.leaderName">{{
                personMessage.leaderName
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="联系电话">联系电话：</span>
              <span :title="personMessage.telephone">{{
                personMessage.telephone
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系人">联系人：</span>
              <span :title="personMessage.contacterName">{{
                personMessage.contacterName
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系人电话">联系人电话：</span>
              <span :title="personMessage.contacterMobilephone">{{
                personMessage.contacterMobilephone
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="建设单位">建设单位：</span>
              <span :title="personMessage.constructUnitName">{{
                personMessage.constructUnitName
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="项目所在地">项目所在地：</span>
              <span :title="personMessage.contactAddress">{{
                personMessage.contactAddress
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="开工日期">开工日期：</span>
              <span :title="personMessage.startDate">{{
                personMessage.startDate
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="竣工日期">竣工日期：</span>
              <span :title="personMessage.finishDate">{{
                personMessage.finishDate
                }}</span>
            </el-col>
          </el-row>
        </div>
        <div v-if="dataType == 'person' && idCount == '22225'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="被征地项目名称">被征地项目名称：</span>
              <span :title="personMessage.bab107">{{
                personMessage.bab107
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="被征地地块">被征地地块：</span>
              <span :title="personMessage.bab108">{{
                personMessage.bab108
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="被征地文号">被征地文号：</span>
              <span :title="personMessage.bab109">{{
                personMessage.bab109
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="指标人数">指标人数：</span>
              <span :title="personMessage.bae331">{{
                personMessage.bae331
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="征地时间">征地时间：</span>
              <span :title="personMessage.bab110">{{
                personMessage.bab110
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="所属行政区">所属行政区：</span>
              <span :title="personMessage.aab301">{{
                personMessage.aab301|regionTypeFilter
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="所属乡镇（街道）">所属乡镇（街道）：</span>
              <span :title="personMessage.aaf013Name">{{
                personMessage.aaf013Name
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="所属村（社区）">所属村（社区）：</span>
              <span :title="personMessage.aaf030Name">{{
                personMessage.aaf030Name
                }}</span>
            </el-col>
          </el-row>
        </div>
        <div v-if="dataType == 'person' && idCount == '22223'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate">{{
                personMessage.joinWorkDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="户口性质">户口性质:</span>
              <span>{{ personMessage.residenceType | residenceType }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="personMessage.unitCardId">{{
                personMessage.unitCardId
                }}</span>
            </el-col>
            <el-col :span="16" class="el-list-item">
              <span title="单位名称">单位名称：</span>
              <span :title="personMessage.unitName || personMessage.companyName">{{ personMessage.unitName ||
                personMessage.companyName }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 人员标签2（本系统） idCount - 2-->
        <div v-if="dataType == 'person' && idCount == '25'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="姓名">姓名</span>
              <span :title="personMessage.name || personMessage.name">{{
                personMessage.name || personMessage.name
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate">{{
                personMessage.joinWorkDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="首次参保年月">首次参保年月：</span>
              <span>
                <a :title="personMessage.ylBeginYM || personMessage.ylBeginYM">{{ personMessage.ylBeginYM ||
                  personMessage.ylBeginYM }}</a>
              </span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称：</span>
              <span>
                <a :title="personMessage.unitName || personMessage.companyName">{{ personMessage.unitName ||
                  personMessage.companyName }}</a>
              </span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="单位编号">单位编号：</span>
              <span :title="personMessage.unitId">{{
                personMessage.unitId
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="人员编码">人员编码：</span>
              <span :title="personMessage.individualId">{{
                personMessage.individualId
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 人员标签19（本系统） idCount = 19-->
        <div v-if="dataType == 'person' && idCount == '19'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="12" class="el-list-item">
              <span title="社会保障号">社会保障号:</span>
              <span :title="personMessage.insuranceId">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="12" class="el-list-item">
              <span title="性别">性别:</span>
              <span>{{ personMessage.sex | sexTypeFilter }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="12" class="el-list-item">
              <span title="出生日期">出生日期:</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday
                }}</span>
            </el-col>
            <el-col :span="12" class="el-list-item">
              <span title="参加工作日期">参加工作日期:</span>
              <span :title="personMessage.joinWorkDate">{{
                personMessage.joinWorkDate
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="12" class="el-list-item">
              <!-- <span title="首次参保年月">首次参保年月:</span>
              <span :title="personMessage.ylBeginYM">{{personMessage.ylBeginYM}}</span>-->
              <span title="户口性质">户口性质:</span>
              <span>{{ personMessage.residenceType | residenceType }}</span>
            </el-col>

            <el-col :span="12" class="el-list-item">
              <span title="年龄">年龄:</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 联系函（本系统） idCount - 16-->
        <div v-if="dataType == 'person' && idCount == '16'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="16" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId ||
                personMessage.insuranceNumber ||
                "--"
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate">{{
                personMessage.joinWorkDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="转移账户类别">转移账户类别：</span>
              <span :title="personMessage.transferAccountType | transferAccountType">{{
                personMessage.transferAccountType | transferAccountType
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="个人编号">个人编号：</span>
              <span :title="personMessage.personalCode">{{
                personMessage.personalCode || "--"
                }}</span>
            </el-col>
            <el-col :span="16" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span class="ep-special2" @click="queryCompanyDetail"
                :title="personMessage.unitName || personMessage.companyName">{{ personMessage.unitName ||
                personMessage.companyName }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="24" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码:</span>
              <span :title="personMessage.unitCardId">{{
                personMessage.unitCardId
                }}</span>
            </el-col>
          </el-row>
        </div>
        <div v-if="dataType == 'person' && idCount == '161'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="个人编号">个人编号：</span>
              <span :title="personMessage.personalCode">{{personMessage.personalCode || '--'}}</span>
            </el-col>
            <el-col :span="16" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span
                :title="personMessage.insuranceId||personMessage.insuranceNumber">{{personMessage.insuranceId||personMessage.insuranceNumber
                || '--'}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday|YYYYmmDD_Filter">{{personMessage.birthday|YYYYmmDD_Filter}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex|sexTypeFilter">{{personMessage.sex | sexTypeFilter}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate">{{personMessage.joinWorkDate|YYYYmmDD_Filter}}</span>
            </el-col>

          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="转移账户类别">转移账户类别：</span>
              <span
                :title="personMessage.transferAccountType|transferAccountType">{{personMessage.transferAccountType|transferAccountType}}</span>
            </el-col>
            <el-col :span="16" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span
                :title="personMessage.unitName||personMessage.companyName">{{personMessage.unitName||personMessage.companyName}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="24" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码:</span>
              <span :title="personMessage.unitCardId">{{personMessage.unitCardId}}</span>
            </el-col>
          </el-row>
        </div>

        <!-- 退休人员标签（本系统） idCount = 3-->
        <div v-if="dataType == 'person' && idCount == '3'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item" v-if="isRretreat">
              <span title="参加工作日期">参加工作日期</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
              }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item" v-else>
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="离退休类别">离退休类别：</span>
              <span>{{ personMessage.retirementType | retirementType }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="离退休日期">离退休日期：</span>
              <span :title="personMessage.retirementData">{{
                personMessage.retirementDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="待遇享受开始年月">待遇享受开始年月：</span>
              <span :title="personMessage.enjoyStartYear">{{
                personMessage.enjoyStartYear | YYYYmm_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item" v-if="isRretreat">
              <span title="统一社会信用代码">统一社会信用代码</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
              }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item" v-else>
              <span title="单位类型">单位类型：</span>
              <span>{{ personMessage.unitType | unitType }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span :title="personMessage.unitName">{{
                personMessage.unitName
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="单位编号">单位编号：</span>
              <span :title="personMessage.unitId">{{
                personMessage.unitId
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="人员编码">人员编码：</span>
              <span :title="personMessage.individualId">{{
                personMessage.individualId
                }}</span>
            </el-col>
          </el-row>
        </div>
        <div v-if="dataType == 'person' && idCount == '33'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate">{{
                personMessage.joinWorkDate
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="户口性质">户口性质</span>
              <span>{{ personMessage.residenceTypeName }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码</span>
              <span :title="personMessage.unitCardId">{{
                personMessage.unitCardId
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="单位类型">单位名称</span>
              <span :title="personMessage.unitName || personMessage.companyName">{{ personMessage.unitName ||
                personMessage.companyName }}</span>
            </el-col>
          </el-row>
        </div>
        <div v-if="dataType == 'person' && idCount == '37'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate | YYYYmmDD_Filter">{{
                personMessage.joinWorkDate | YYYYmmDD_Filter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="户口性质">户口性质：</span>
              <span :title="personMessage.residenceType | residenceType">{{
                personMessage.residenceType | residenceType
                }}</span>
            </el-col>

            <el-col :span="6" class="el-list-item">
              <span title="离退休类别">离退休类别：</span>
              <span>{{ personMessage.retireStatusName }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="personMessage.unitCardId">{{
                personMessage.unitCardId
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称：</span>
              <span :title="personMessage.unitName">{{
                personMessage.unitName
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 金华资格认证 idCount = 3-->
        <div v-if="dataType == 'person' && idCount == '676'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="退休（供养）类型">退休（供养）类型：</span>
              <span :title="personMessage.retirementType">{{
                personMessage.retirementType
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="离退休类别">离退休类别：</span>
              <span>{{ personMessage.retirementType | retirementType }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="待遇享受开始年月">待遇享受开始年月：</span>
              <span :title="personMessage.enjoyStartYear">{{
                personMessage.enjoyStartYear | YYYYmm_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="personMessage.unitCardId">{{
                personMessage.unitCardId
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span :title="personMessage.unitName">{{
                personMessage.unitName
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 离退休死亡 -->
        <div v-if="dataType == 'person' && idCount == '333'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="离退休类别">离退休类别：</span>
              <span>{{ personMessage.retirementType | retirementType }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="离退休日期">离退休日期：</span>
              <span :title="personMessage.retirementData">{{
                personMessage.retirementDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="待遇享受开始年月">待遇享受开始年月：</span>
              <span :title="personMessage.enjoyStartYear">{{
                personMessage.enjoyStartYear | YYYYmm_Filter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="单位类型">单位类型：</span>
              <span>{{ personMessage.unitType | unitType }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span :title="personMessage.unitName">{{
                personMessage.unitName
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="单位编号">单位编号：</span>
              <span :title="personMessage.unitId">{{
                personMessage.unitId
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="人员编码">人员编码：</span>
              <span :title="personMessage.individualId">{{
                personMessage.individualId
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="移交地">移交地：</span>
              <span :title="personMessage.transferRegion">{{
                personMessage.transferRegion
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="移交时间">移交时间：</span>
              <span>{{ personMessage.transferYears | YYYYmmDD_Filter }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="累计缴费年限">累计缴费年限：</span>
              <span :title="personMessage.sumPayYear" v-if="personMessage.sumPayYear">{{ personMessage.sumPayYear |
                totalyears }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 判刑 -->
        <div v-if="dataType == 'person' && idCount == '646'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="6" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="6" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate | YYYYmmDD_Filter">{{
                personMessage.joinWorkDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="户口性质">户口性质：</span>
              <span :title="personMessage.residenceType | residenceType">{{
                personMessage.residenceType | residenceType
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="退休时间">退休时间：</span>
              <span :title="personMessage.retirementData">{{
                personMessage.retirementDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="首次待遇享受时间">首次待遇享受时间：</span>
              <span :title="personMessage.enjoyStartYear">{{
                personMessage.enjoyStartYear | YYYYmm_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="离退休类别">离退休类别：</span>
              <span>{{
                personMessage.retirementType | retirementTypeNew
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="personMessage.unitCardId">{{
                personMessage.unitCardId
                }}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="单位名称">单位名称：</span>
              <span :title="personMessage.unitName">{{
                personMessage.unitName
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 判刑 -->
        <div v-if="dataType == 'person' && idCount == '647'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate | YYYYmmDD_Filter">{{
                personMessage.joinWorkDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="personMessage.unitCardId">{{
                personMessage.unitCardId
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称：</span>
              <span :title="personMessage.unitName">{{
                personMessage.unitName
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 审核中心弹框 idCount = 28-->
        <div v-if="dataType == 'person' && idCount == '28'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="当事人姓名">当事人姓名：</span>
              <span :title="personMessage.name">{{ personMessage.name }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="personMessage.insuranceNumber">{{
                personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="类型">类型：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="业务类型">业务类型：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="提审时间">提审时间：</span>
              <span :title="personMessage.retirementDate">{{
                personMessage.retirementDate | YYYYmmDD_Filter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="提审人员">提审人员：</span>
              <span :title="personMessage.enjoyStartYear">{{
                personMessage.enjoyStartYear | YYYYmm_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="任务状态">任务状态：</span>
              <span>{{ personMessage.retirementType | retirementType }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 退休人员标签（本系统） idCount = 3-->
        <div v-if="dataType == 'person' && idCount == '31'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">姓名：</span>
              <span :title="personMessage.name">{{ personMessage.name }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="personMessage.insuranceNumber">{{
                personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="离退休日期">离退休日期：</span>
              <span :title="personMessage.retirementDate">{{
                personMessage.retirementDate | YYYYmmDD_Filter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="待遇享受开始年月">待遇享受开始年月：</span>
              <span :title="personMessage.enjoyStartYear">{{
                personMessage.enjoyStartYear | YYYYmm_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="退休类型">退休类型：</span>
              <span>{{ personMessage.retirementType | retirementType }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="单位编号">单位编号：</span>
              <span :title="personMessage.unitId">{{
                personMessage.unitId
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位类型">单位类型：</span>
              <span>{{ personMessage.unitType | unitType }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span :title="personMessage.unitName">{{
                personMessage.unitName
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="人员编码">人员编码：</span>
              <span :title="personMessage.individualId">{{
                personMessage.individualId
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 待遇退休核准    idCount = 20 -->
        <div v-if="dataType == 'person' && idCount == '20'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="离退休类别">离退休类别：</span>
              <span :title="personMessage.retirementType | retirementType">{{
                personMessage.retirementType | retirementType
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="离退休日期">离退休日期：</span>
              <span :title="personMessage.retirementDate | YYYYmmDD_Filter">{{
                personMessage.retirementDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span :title="personMessage.unitName">{{
                personMessage.unitName
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="单位编号">单位编号：</span>
              <span :title="personMessage.unitId">{{
                personMessage.unitId
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="人员编码">人员编码：</span>
              <span :title="personMessage.individualId">{{
                personMessage.individualId
                }}</span>
            </el-col>
          </el-row>
          <div v-show="isMore" class="moreInfoBox_panel">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="户口性质">户口性质：</span>
                <span :title="personMessage.residenceType | residenceType">{{
                  personMessage.residenceType | residenceType
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="民族">民族：</span>
                <span :title="personMessage.nation | nationTypeFilter">{{
                  personMessage.nation | nationTypeFilter
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="个人身份">个人身份：</span>
                <span :title="personMessage.identity | identity">{{
                  personMessage.identity | identity
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="用工形式">用工形式：</span>
                <span :title="personMessage.employeeType | employeeType">{{
                  personMessage.employeeType | employeeType
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="参加工作日期">参加工作日期：</span>
                <span :title="personMessage.joinWorkDate | YYYYmmDD_Filter">{{
                  personMessage.joinWorkDate | YYYYmmDD_Filter
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="专业技术职务">专业技术职务：</span>
                <span :title="personMessage.technicalPosition">{{
                  personMessage.technicalPosition
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="军转人员标志">军转人员标志：</span>
                <span>
                  <a :title="personMessage.soldierFlag | soldierFlag">{{
                    personMessage.soldierFlag | soldierFlag
                    }}</a>
                </span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="劳模标志">劳模标志：</span>
                <span :title="personMessage.modelWorker | modelWorker">{{
                  personMessage.modelWorker | modelWorker
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="特殊工种类别">特殊工种类别：</span>
                <span :title="personMessage.specialWorkType | specialWorkType">{{ personMessage.specialWorkType |
                  specialWorkType }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="高级专家标志">高级专家标志：</span>
                <span :title="personMessage.seniorExpert | seniorExpert">{{
                  personMessage.seniorExpert | seniorExpert
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="特殊工种月数">特殊工种月数：</span>
                <span :title="personMessage.specialWorkMonths">{{
                  personMessage.specialWorkMonths
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="工商业者标识">工商业者标识：</span>
                <span :title="
                    personMessage.originalBusinessman | originalBusinessman
                  ">{{
                  personMessage.originalBusinessman | originalBusinessman
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="退役军人类别">退役军人类别：</span>
                <span>
                  <a :title="personMessage.soldierType">{{
                    personMessage.soldierType
                    }}</a>
                </span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="53年前参加工作">53年前参加工作：</span>
                <span :title="personMessage.joinWork93 | joinWork93">{{
                  personMessage.joinWork93 | joinWork93
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="国家职业资格等级">国家职业资格等级：</span>
                <span :title="personMessage.isWork">{{
                  personMessage.isWork
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="行政职务级别">行政职务级别：</span>
                <span>
                  <span :title="
                      personMessage.administrativeLevel | administrativeLevel
                    ">{{
                    personMessage.administrativeLevel | administrativeLevel
                    }}</span>
                </span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="长期生活地">长期生活地：</span>
                <span :title="personMessage.address">{{
                  personMessage.address
                  }}</span>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="20" class="el-list">
            <el-col :span="24" class="searchMore">
              <i class="el-icon-arrow-down" :class="isMore ? 'is-active' : ''" @click="searchMore"></i>
            </el-col>
          </el-row>
        </div>
        <!-- 移交社区人员登记 移交社区人员减少 移交社区人员减少    idCount = 21 -->
        <div v-if="dataType == 'person' && idCount == '21'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="社会保障号">社会保障号:</span>
                  <span :title="personMessage.insuranceId">{{
                    personMessage.insuranceId || personMessage.insuranceNumber
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="性别">性别:</span>
                  <span>{{ personMessage.sex | sexTypeFilter }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="出生日期">出生日期：</span>
                  <span :title="personMessage.birthday">{{
                    personMessage.birthday | YYYYmmDD_Filter
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="退休类型">退休类型:</span>
                  <span :title="personMessage.retirementType | retirementType">{{ personMessage.retirementType |
                    retirementType }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="离退休日期">离退休日期：</span>
                  <span :title="personMessage.retirementDate | YYYYmmDD_Filter">{{ personMessage.retirementDate |
                    YYYYmmDD_Filter }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="待遇享受开始年月">待遇享受开始年月：</span>
                  <span>
                    <span :title="personMessage.enjoyStartYear | YYYYmm_Filter">{{ personMessage.enjoyStartYear |
                      YYYYmm_Filter }}</span>
                  </span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="社区综合补贴">社区综合补贴:</span>
                  <span :title="personMessage.communitySubsidy">{{
                    personMessage.communitySubsidy
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="发放起始时间">发放起始时间:</span>
                  <span :title="personMessage.communitySubsidyBeginDate">{{
                    personMessage.communitySubsidyBeginDate | YYYYmmDD_Filter
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="单位类型">单位类型:</span>
                  <span :title="personMessage.unitType | unitType">{{
                    personMessage.unitType | unitType
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="单位名称">单位名称：</span>
                  <span :title="personMessage.unitName">{{
                    personMessage.unitName
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!--养老待遇 idCount = 35 -->
        <div v-if="dataType == 'person' && idCount == '35'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="社会保障号">社会保障号：</span>
                <span :title="personMessage.insuranceId">{{
                  personMessage.insuranceId || personMessage.insuranceNumber
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="性别">性别：</span>
                <span>{{ personMessage.sex | sexTypeFilter }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="出生日期">出生日期：</span>
                <span :title="personMessage.birthday">{{
                  personMessage.birthday | YYYYmmDD_Filter
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="年龄">年龄：</span>
                <span :title="personMessage.age">{{ personMessage.age }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="参加工作日期">参加工作日期：</span>
                <span :title="personMessage.joinWorkDate | YYYYmmDD_Filter">{{
                  personMessage.joinWorkDate | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="参保状态">参保状态：</span>
                <span :title="personMessage.psInsuredStatus">{{
                  personMessage.psInsuredStatus | insuredStatus
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="离退休状态">离退休状态：</span>
                <span :title="personMessage.retireStatus | retireStatus">{{
                  personMessage.retireStatus | retireStatus
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="统一社会信用代码">统一社会信用代码：</span>
                <span :title="personMessage.unitCardId">{{
                  personMessage.unitCardId
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="单位名称">单位名称：</span>
                <span :title="personMessage.unitName || personMessage.companyName">{{
                  personMessage.unitName || personMessage.companyName
                  }}</span>
              </el-col>
            </el-row>
          </el-carousel>
        </div>
        <!-- 养老精简人员待遇补退    idCount = 100 -->
        <div v-if="dataType == 'person' && idCount == '100'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="姓名">姓名:</span>
                <span>{{ personMessage.name }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="社会保障号">社会保障号:</span>
                <span :title="personMessage.insuranceId">{{
                  personMessage.insuranceId || personMessage.insuranceNumber
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="性别">性别:</span>
                <span>{{ personMessage.sex | sexTypeFilter }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="出生日期">出生日期：</span>
                <span :title="personMessage.birthday">{{
                  personMessage.birthday | YYYYmmDD_Filter
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="民族">民族：</span>
                <span :title="personMessage.nation | nationTypeFilter">{{
                  personMessage.nation | nationTypeFilter
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="待遇享受开始年月">待遇享受开始年月：</span>
                <span :title="personMessage.enjoyStartYear">{{
                  personMessage.enjoyStartYear | YYYYmm_Filter
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="精简人员类别">精简人员类别：</span>
                <span :title="personMessage.streamlineFlag">{{
                  personMessage.streamlineFlag | streamlineFlagFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="统一社会信用代码">统一社会信用代码：</span>
                <span :title="personMessage.unitCardId">{{
                  personMessage.unitCardId
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="单位名称">单位名称：</span>
                <span :title="personMessage.unitName">{{
                  personMessage.unitName
                  }}</span>
              </el-col>
            </el-row>
          </el-carousel>
        </div>
        <!-- 莫名其妙模块思密达    idCount = 22 -->
        <div v-if="dataType == 'person' && idCount == '22'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="证件类型">证件类型：</span>
              <span :title="personMessage.certType | countryTypeFilter">{{
                personMessage.certType | countryTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="证件号码">证件号码：</span>
              <span :title="personMessage.certNumber">{{
                personMessage.certNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="国籍">国籍：</span>
              <span :title="personMessage.country | countryFilter">{{
                personMessage.country | countryFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="户口性质">户口性质：</span>
              <span :title="personMessage.residenceType | residenceType">{{
                personMessage.residenceType | residenceType
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系手机">联系手机：</span>
              <span :title="personMessage.mobilephone">{{
                personMessage.mobilephone
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="联系地址">联系地址：</span>
              <span :title="personMessage.contactAddress">{{
                personMessage.contactAddress
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="所属单位">所属单位：</span>
              <span :title="personMessage.unitName || personMessage.companyName">{{ personMessage.unitName ||
                personMessage.companyName }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 工伤申请 -->
        <div v-if="dataType == 'person' && idCount == '22000'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="证件类型">证件类型：</span>
              <span :title="personMessage.personInfo.certType | countryTypeFilter">{{
                personMessage.personInfo.certType | countryTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="证件号码">证件号码：</span>
              <span :title="personMessage.personInfo.certNumber">{{
                personMessage.personInfo.certNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.personInfo.sex | sexTypeFilter">{{
                personMessage.personInfo.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.personInfo.birthday | YYYYmmDD_Filter">{{ personMessage.personInfo.birthday |
                YYYYmmDD_Filter }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="国籍">国籍：</span>
              <span :title="personMessage.personInfo.country | countryFilter">{{
                personMessage.personInfo.country | countryFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="户口性质">户口性质：</span>
              <span :title="personMessage.personInfo.residenceType | residenceType">{{
                personMessage.personInfo.residenceType | residenceType
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系手机">联系手机：</span>
              <span :title="personMessage.personInfo.mobilephone">{{
                personMessage.personInfo.mobilephone
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="联系地址">联系地址：</span>
              <span :title="personMessage.personInfo.contactAddress">{{
                [
                personMessage.personInfo.contactProvince,
                personMessage.personInfo.contactCity,
                personMessage.personInfo.contactRegion
                ] | unicodeExchange
                }}{{ personMessage.personInfo.contactAddress }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="所属单位">所属单位：</span>
              <span :title="
                  personMessage.personInfo.unitName ||
                    personMessage.personInfo.companyName
                ">{{
                personMessage.personInfo.unitName ||
                personMessage.personInfo.companyName
                }}</span>
            </el-col>
          </el-row>
        </div>

        <!-- 收件管理    idCount = 2200 -->
        <div v-if="dataType == 'person' && idCount == '2200'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="证件类型">证件类型：</span>
              <span :title="personMessage.certType | countryTypeFilter">{{
                personMessage.certType | countryTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="证件号码">证件号码：</span>
              <span :title="personMessage.certNumber">{{
                personMessage.certNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="国籍">国籍：</span>
              <span :title="personMessage.country | countryFilter">{{
                personMessage.country | countryFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="户口性质">户口性质：</span>
              <span :title="personMessage.residenceType | residenceType">{{
                personMessage.residenceType | residenceType
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系手机">手机号码：</span>
              <span :title="
                  personMessage.mobilephone ||
                    personMessage.contacterMobilephone
                ">{{
                personMessage.mobilephone ||
                personMessage.contacterMobilephone
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="联系地址">联系地址：</span>
              <span :title="personMessage.contactAddress">{{
                personMessage.contactAddress
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="所属单位">所属单位：</span>
              <span :title="personMessage.unitName || personMessage.companyName">{{ personMessage.unitName ||
                personMessage.companyName }}</span>
            </el-col>
          </el-row>
        </div>

        <!-- 收件管理    idCount = 2201 -->
        <div v-if="dataType == 'person' && idCount == '2201'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="证件类型">证件类型：</span>
              <span :title="personMessage.certType | countryTypeFilter">{{
                personMessage.certType | countryTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="证件号码">证件号码：</span>
              <span :title="personMessage.certNumber">{{
                personMessage.certNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="国籍">国籍：</span>
              <span :title="personMessage.country | countryFilter">{{
                personMessage.country | countryFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="户口性质">户口性质：</span>
              <span :title="personMessage.residenceType | residenceType">{{
                personMessage.residenceType | residenceType
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="联系手机">联系手机：</span>
              <span :title="personMessage.mobilephone">{{
                personMessage.mobilephone
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="联系地址">联系地址：</span>
              <span :title="personMessage.contactAddress">{{
                personMessage.contactAddress
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="所属单位">所属单位：</span>
              <span :title="personMessage.unitName || personMessage.companyName">{{ personMessage.unitName ||
                personMessage.companyName }}</span>
            </el-col>
          </el-row>
        </div>

        <!-- 莫名其妙模块思密达    idCount = 220 -->
        <div v-if="dataType == 'person' && idCount == '220'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="证件类型">证件类型：</span>
              <span :title="personMessage.certType | countryTypeFilter">{{
                personMessage.certType | countryTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="证件号码">证件号码：</span>
              <span :title="personMessage.certNumber">{{
                personMessage.certNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="国籍">国籍：</span>
              <span :title="personMessage.country | countryFilter">{{
                personMessage.country | countryFilter
                }}</span>
            </el-col>

            <!-- <el-col :span="8" class="el-list-item">
            <span title="参加工作日期">参加工作日期：</span>
            <span
              :title="personMessage.joinWorkDate|YYYYmmDD_Filter"
            >{{personMessage.joinWorkDate|YYYYmmDD_Filter}}</span>
            </el-col>-->
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="手机号码">手机号码：</span>
              <span :title="personMessage.mobilephone || personMessage.telephone">{{
                personMessage.mobilephone || personMessage.telephone
                }}</span>
            </el-col>

            <el-col :span="16" class="el-list-item">
              <span title="联系地址">联系地址：</span>
              <span :title="personMessage.contactAddress">{{
                personMessage.contactAddress
                }}</span>
            </el-col>
          </el-row>
        </div>

        <!-- 莫名其妙模块思密达    idCount = 221 -->
        <div v-if="dataType == 'company' && idCount == '221'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="12" class="el-list-item">
                  <span title="统一社会信用代码">统一社会信用代码：</span>
                  <span :title="companyMessage.unitCardId">{{
                    companyMessage.unitCardId
                    }}</span>
                </el-col>

                <el-col :span="12" class="el-list-item">
                  <span title="单位类型">单位类型：</span>
                  <span :title="companyMessage.unitType | unitType">{{
                    companyMessage.unitType | unitType
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="12" class="el-list-item">
                  <span title="经济类型">经济类型：</span>
                  <span :title="companyMessage.economyType | economyType">{{
                    companyMessage.economyType | economyType
                    }}</span>
                </el-col>

                <el-col :span="12" class="el-list-item">
                  <span title="所属行业">所属行业：</span>
                  <span :title="companyMessage.subjectIndustry | subjectIndustry">{{
                    companyMessage.subjectIndustry | subjectIndustry
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="12" class="el-list-item">
                  <span title="法人姓名">法人姓名：</span>
                  <span :title="companyMessage.chiefName">{{
                    companyMessage.chiefName
                    }}</span>
                </el-col>
                <el-col :span="12" class="el-list-item">
                  <span title="联系人">联系人：</span>
                  <span :title="companyMessage.contacterName">{{
                    companyMessage.contacterName
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>

            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="12" class="el-list-item">
                  <span title="联系电话">联系电话：</span>
                  <span :title="companyMessage.contacterTelephone">{{
                    companyMessage.contacterTelephone
                    }}</span>
                </el-col>
                <el-col :span="16" class="el-list-item">
                  <span title="公司地址">公司地址：</span>
                  <span :title="companyMessage.registerAddress">{{
                    companyMessage.registerAddress
                    }}</span>
                </el-col>
                <el-col :span="16" class="el-list-item" v-if="false">
                  <span title="单位编号">单位编号：</span>
                  <span :title="companyMessage.unitId">{{
                    companyMessage.unitId
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list"></el-row>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div v-if="dataType == 'company' && idCount == 'PayWageEntryBatch'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="统一社会信用代码">统一社会信用代码：</span>
                <span :title="companyMessage.unitCardId">{{
                  companyMessage.unitCardId
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="单位名称">单位名称：</span>
                <span :title="personMessage.unitName || personMessage.companyName">{{
                  personMessage.unitName || personMessage.companyName
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="行政区划">行政区划：</span>
                <span :title="personMessage.regionCode | regionTypeFilter">{{
                  personMessage.regionCode | regionTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="单位类型">单位类型：</span>
                <span :title="companyMessage.unitType | unitType">{{
                  companyMessage.unitType | unitType
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="经济类型">经济类型：</span>
                <span :title="companyMessage.economyType | economyType">{{
                  companyMessage.economyType | economyType
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="隶属关系">隶属关系：</span>
                <span :title="companyMessage.subjectRelation | subjectRelation">{{ companyMessage.subjectRelation |
                  subjectRelation }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="所属行业">所属行业：</span>
                <span :title="companyMessage.subjectIndustry | subjectIndustry">{{ companyMessage.subjectIndustry |
                  subjectIndustry }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="行业风险类别">行业风险类别：</span>
                <span :title="companyMessage.subjectRisk | subjectRisk">{{
                  companyMessage.subjectRisk | subjectRisk
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="法人姓名">法人姓名：</span>
                <span :title="companyMessage.chiefName">{{
                  companyMessage.chiefName
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系人">联系人：</span>
                <span :title="companyMessage.contacterName">{{
                  companyMessage.contacterName
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span :title="companyMessage.contacterTelephone">{{
                  companyMessage.contacterTelephone
                  }}</span>
              </el-col>
            </el-row>
          </el-carousel>
        </div>
        <!-- 莫名其妙模块思密达    idCount = 221 -->
        <div v-if="dataType == 'company' && idCount == '2210'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="12" class="el-list-item">
                <span title="统一社会信用代码">统一社会信用代码：</span>
                <span :title="companyMessage.unitCardId">{{
                  companyMessage.unitCardId
                  }}</span>
              </el-col>

              <el-col :span="12" class="el-list-item">
                <span title="单位类型">单位类型：</span>
                <span :title="companyMessage.unitType | unitType">{{
                  companyMessage.unitType | unitType
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="12" class="el-list-item">
                <span title="法人姓名">法人姓名：</span>
                <span :title="companyMessage.chiefName">{{
                  companyMessage.chiefName
                  }}</span>
              </el-col>
              <el-col :span="12" class="el-list-item">
                <span title="联系人">联系人：</span>
                <span :title="companyMessage.companyContacterName">{{
                  companyMessage.companyContacterName
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="12" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span :title="companyMessage.companyTelephone">{{
                  companyMessage.companyTelephone
                  }}</span>
              </el-col>
              <el-col :span="12" class="el-list-item">
                <span title="公司地址">公司地址：</span>
                <span :title="companyMessage.companyContactAddress">{{
                  companyMessage.companyContactAddress
                  }}</span>
              </el-col>
              <el-col :span="16" class="el-list-item" v-if="false">
                <span title="单位编号">单位编号：</span>
                <span :title="companyMessage.unitId">{{
                  companyMessage.unitId
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list"></el-row>
          </el-carousel>
        </div>
        <!-- 莫名其妙模块思密达    idCount = 222 -->
        <div v-if="dataType == 'company' && idCount == '222'">
          <!-- <el-carousel
                        indicator-position="outside"
                        trigger="click"
                        arrow="never"
                        :height="maHeight"
                        :autoplay="false"
          >-->
          <el-row :gutter="20" class="el-list">
            <el-col :span="12" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="companyMessage.unitCardId">{{
                companyMessage.unitCardId
                }}</span>
            </el-col>

            <!-- <el-col :span="12" class="el-list-item">
                <span title="工伤参保时间">工伤参保时间：</span>
                <span :title="companyMessage.joinWorkDate|YYYYmmDD_Filter">{{companyMessage.joinWorkDate|YYYYmmDD_Filter}}</span>
            </el-col>-->
          </el-row>

          <!-- <el-row :gutter="20" class="el-list">
              <el-col :span="12" class="el-list-item">
                <span title="经济类型">经济类型：</span>
                <span
                  :title="companyMessage.economyType|economyType"
                >{{companyMessage.economyType|economyType}}</span>
              </el-col>

              <el-col :span="12" class="el-list-item">
                <span title="所属行业">所属行业：</span>
                <span
                  :title="companyMessage.subjectIndustry|subjectIndustry"
                >{{companyMessage.subjectIndustry|subjectIndustry}}</span>
              </el-col>
          </el-row>-->

          <el-row :gutter="20" class="el-list">
            <el-col :span="12" class="el-list-item">
              <span title="法人姓名">法人姓名：</span>
              <span :title="companyMessage.chiefName">{{
                companyMessage.chiefName
                }}</span>
            </el-col>
            <el-col :span="12" class="el-list-item">
              <span title="联系人">联系人：</span>
              <span :title="
                  companyMessage.contacterName ||
                    companyMessage.companyContacterName
                ">{{
                companyMessage.contacterName ||
                companyMessage.companyContacterName
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="12" class="el-list-item">
              <span title="联系电话">联系电话：</span>
              <span :title="companyMessage.contacterTelephone">{{
                companyMessage.contacterTelephone
                }}</span>
            </el-col>
            <el-col :span="12" class="el-list-item">
              <span title="联系地址">联系地址：</span>
              <span :title="companyMessage.registerAddress">{{
                companyMessage.registerAddress
                }}</span>
            </el-col>
          </el-row>
          <!-- <el-carousel-item>
            <el-row :gutter="20" class="el-list">
              <el-col :span="12" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span
                  :title="companyMessage.contacterTelephone"
                >{{companyMessage.contacterTelephone}}</span>
              </el-col>
              <el-col :span="16" class="el-list-item">
                <span title="联系地址">联系地址：</span>
                <span :title="companyMessage.registerAddress">{{companyMessage.registerAddress}}</span>
              </el-col>
              <el-col :span="16" class="el-list-item" v-if="false">
                <span title="单位编号">单位编号：</span>
                <span :title="companyMessage.unitId">{{companyMessage.unitId}}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list"></el-row>
          </el-carousel-item>-->
          <!-- </el-carousel> -->
        </div>
        <!-- 莫名其妙模块思密达    idCount = 222 -->
        <div v-if="dataType == 'company' && idCount == '22201'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="12" class="el-list-item">
                <span title="统一社会信用代码">统一社会信用代码：</span>
                <span :title="companyMessage.unitCardId">{{
                  companyMessage.unitCardId
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="12" class="el-list-item">
                <span title="法人姓名">法人姓名：</span>
                <span :title="companyMessage.chiefName">{{
                  companyMessage.chiefName
                  }}</span>
              </el-col>
              <el-col :span="12" class="el-list-item">
                <span title="联系人">联系人：</span>
                <span :title="
                    companyMessage.companyContacterName ||
                      companyMessage.companyContacterName
                  ">{{
                  companyMessage.companyContacterName ||
                  companyMessage.companyContacterName
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="12" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span :title="companyMessage.companyTelephone">{{
                  companyMessage.companyTelephone
                  }}</span>
              </el-col>
              <el-col :span="12" class="el-list-item">
                <span title="联系地址">联系地址：</span>
                <span :title="companyMessage.companyContactAddress">{{
                  companyMessage.companyContactAddress
                  }}</span>
              </el-col>
            </el-row>
            <!-- <el-carousel-item>
            <el-row :gutter="20" class="el-list">
              <el-col :span="12" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span
                  :title="companyMessage.contacterTelephone"
                >{{companyMessage.contacterTelephone}}</span>
              </el-col>
              <el-col :span="16" class="el-list-item">
                <span title="联系地址">联系地址：</span>
                <span :title="companyMessage.registerAddress">{{companyMessage.registerAddress}}</span>
              </el-col>
              <el-col :span="16" class="el-list-item" v-if="false">
                <span title="单位编号">单位编号：</span>
                <span :title="companyMessage.unitId">{{companyMessage.unitId}}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list"></el-row>
            </el-carousel-item>-->
          </el-carousel>
        </div>
        <!--企业养老退休待遇重新计发    idCount = 6 -->
        <div v-if="dataType == 'person' && idCount == '6'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex | sexTypeFilter">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="离退休类别">离退休类别：</span>
              <span :title="personMessage.retirementType | retirementType">{{
                personMessage.retirementType | retirementType
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="离退休日期">离退休日期：</span>
              <span :title="personMessage.retirementDate | YYYYmmDD_Filter">{{
                personMessage.retirementDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="待遇享受开始年月">待遇享受开始年月：</span>
              <span>
                <span :title="personMessage.enjoyStartYear | YYYYmm_Filter">{{
                  personMessage.enjoyStartYear | YYYYmm_Filter
                  }}</span>
              </span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span :title="personMessage.unitName">{{
                personMessage.unitName
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="单位编号">单位编号：</span>
              <span :title="personMessage.unitId">{{
                personMessage.unitId
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="人员编码">人员编码：</span>
              <span :title="personMessage.individualId">{{
                personMessage.individualId
                }}</span>
            </el-col>
          </el-row>
          <div v-show="isMore" class="moreInfoBox_panel">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="户口性质">户口性质：</span>
                <span :title="personMessage.residenceType | residenceType">{{
                  personMessage.residenceType | residenceType
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="民族">民族：</span>
                <span :title="personMessage.nation | nationTypeFilter">{{
                  personMessage.nation | nationTypeFilter
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="个人身份">个人身份：</span>
                <span :title="personMessage.identity | identity">{{
                  personMessage.identity | identity
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="用工形式">用工形式：</span>
                <span :title="personMessage.employeeType | employeeType">{{
                  personMessage.employeeType | employeeType
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="参加工作日期">参加工作日期：</span>
                <span :title="personMessage.joinWorkDate | YYYYmmDD_Filter">{{
                  personMessage.joinWorkDate | YYYYmmDD_Filter
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="专业技术职务">专业技术职务：</span>
                <span :title="personMessage.technicalPosition | proTechnologyJob">{{
                  personMessage.technicalPosition | proTechnologyJob
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="军转人员标志">军转人员标志：</span>
                <span>
                  <a :title="personMessage.soldierFlag">{{
                    personMessage.soldierFlag
                    }}</a>
                </span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="劳模标志">劳模标志：</span>
                <span :title="personMessage.modelWorker | modelWorker">{{
                  personMessage.modelWorker | modelWorker
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="特殊工种类别">特殊工种类别：</span>
                <span :title="personMessage.specialWorkType | specialWorkType">{{ personMessage.specialWorkType |
                  specialWorkType }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="高级专家标志">高级专家标志：</span>
                <span>
                  <a :title="personMessage.seniorExpert | seniorExpert">{{
                    personMessage.seniorExpert | seniorExpert
                    }}</a>
                </span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="特殊工种月数">特殊工种月数：</span>
                <span :title="personMessage.specialWorkMonths">{{
                  personMessage.specialWorkMonths
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="工商业者标识">工商业者标识：</span>
                <span :title="
                    personMessage.originalBusinessman | originalBusinessman
                  ">{{
                  personMessage.originalBusinessman | originalBusinessman
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="退役军人类别">退役军人类别：</span>
                <span>
                  <a :title="personMessage.soldierType">{{
                    personMessage.soldierType
                    }}</a>
                </span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="53年前参加工作">53年前参加工作：</span>
                <span :title="personMessage.joinWork93 | joinWork93">{{
                  personMessage.joinWork93 | joinWork93
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="国家职业资格等级">国家职业资格等级：</span>
                <span :title="personMessage.isWork | notionalLeval">{{
                  personMessage.isWork | notionalLeval
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="行政职务级别">行政职务级别：</span>
                <span>
                  <span :title="
                      personMessage.administrativeLevel | administrativeLevel
                    ">{{
                    personMessage.administrativeLevel | administrativeLevel
                    }}</span>
                </span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="长期生活地">长期生活地：</span>
                <span :title="personMessage.address">{{
                  personMessage.address
                  }}</span>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="20" class="el-list">
            <el-col :span="24" class="searchMore">
              <i class="el-icon-arrow-down" :class="isMore ? 'is-active' : ''" @click="searchMore"></i>
            </el-col>
          </el-row>
        </div>

        <!-- 死亡人员标签（本系统） idCount = 7-->
        <div v-if="dataType == 'person' && idCount == '7'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.insuranceId || personMessage.insuranceNumber
                ">{{
                personMessage.insuranceId || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span>{{ personMessage.sex | sexTypeFilter }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="民族">民族：</span>
              <span>{{ personMessage.nation | nationTypeFilter }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="户口性质">户口性质：</span>
              <span>{{ personMessage.residenceType | residenceType }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="离退休类别">离退休类别：</span>
              <span :title="personMessage.retirementType">{{
                personMessage.retirementType | retirementType
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate">{{
                personMessage.joinWorkDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="死亡时间">死亡时间：</span>
              <span :title="personMessage.deathDate | YYYYmmDD_Filter">{{
                personMessage.deathDate | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>
          <div v-show="isMore" class="moreInfoBox_panel">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="统一社会信用代码">统一社会信用代码：</span>
                <span :title="personMessage.unitCardId">{{
                  personMessage.unitCardId
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="单位名称">单位名称:</span>
                <span :title="personMessage.unitName">{{
                  personMessage.unitName
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="供养单位标志">供养单位标志：</span>
                <span :title="personMessage.supportFlag">{{
                  personMessage.supportFlag | supportFlagFilter
                  }}</span>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="20" class="el-list">
            <el-col :span="24" class="searchMore">
              <i class="el-icon-arrow-down" :class="isMore ? 'is-active' : ''" @click="searchMore"></i>
            </el-col>
          </el-row>
        </div>
        <!-- 网报MilitaryRetired 军人退役基本养老保险关系接续-->
        <div v-if="dataType == 'person' && idCount == 'MilitaryRetired'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span
                :title="personMessage.insuranceId ||personMessage.insuranceNumber">{{personMessage.insuranceId||personMessage.insuranceNumber||'--'}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="姓名">姓名：</span>
              <span :title="personMessage.name">{{personMessage.name||'--'}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex|sexTypeFilter">{{personMessage.sex | sexTypeFilter}}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{personMessage.birthday|YYYYmmDD_Filter}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="参加工作日期">参加工作日期：</span>
              <span :title="personMessage.joinWorkDate">{{personMessage.joinWorkDate|YYYYmmDD_Filter}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="转移账户类别">转移账户类别：</span>
              <span
                :title="personMessage.transferAccountType|transferAccountType">{{personMessage.transferAccountType|transferAccountType}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="个人编号">个人编号：</span>
              <span :title="personMessage.personalCode">{{personMessage.personalCode||'--'}}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 工亡职工供养亲属待遇核准支付事项 死亡人员标签（本系统） idCount = 77-->
        <div v-if="dataType == 'person' && idCount == '77'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span :title="personMessage.name">姓名:</span>
                  <span>{{ personMessage.name }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="性别">性别：</span>
                  <span>{{ personMessage.sex | sexTypeFilter }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="民族">民族：</span>
                  <span>{{ personMessage.nation | nationTypeFilter }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="工亡人员工资">工亡人员工资:</span>
                  <span :title="personMessage.avgSalary">{{
                    personMessage.avgSalary
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="参加工作日期">参加工作日期：</span>
                  <span :title="personMessage.joinWorkDate">{{
                    personMessage.joinWorkDate | YYYYmmDD_Filter
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="联系人手机">联系人手机：</span>
                  <span :title="personMessage.mobilephone">{{
                    personMessage.mobilephone
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="证件类型">证件类型：</span>
                  <span :title="personMessage.certType | countryTypeFilter">{{
                    personMessage.certType | countryTypeFilter
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="证件号码">证件号码：</span>
                  <span :title="personMessage.certNumber">{{
                    personMessage.certNumber
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="邮编">邮编:</span>
                  <span :title="personMessage.zipCode">{{
                    personMessage.zipCode
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>

            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="离退休状态">离退休状态：</span>
                  <span :title="personMessage.retireStatus | retireStatus">{{
                    personMessage.retireStatus | retireStatus
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="参保状态">参保状态:</span>
                  <span>
                    <a :title="personMessage.insuredStatus">{{
                      personMessage.insuredStatus | insuredStatus
                      }}</a>
                  </span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="工伤类别">工伤类别：</span>
                  <span :title="personMessage.jobInjuryTypeName">{{
                    personMessage.jobInjuryTypeName
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="工伤发生时间">工伤发生时间：</span>
                  <span :title="personMessage.injuryOccurrenceTime">{{
                    personMessage.injuryOccurrenceTime
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="工伤认定书编号">工伤认定书编号：</span>
                  <span :title="personMessage.injuryCognizanceNumber">{{
                    personMessage.injuryCognizanceNumber
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="工伤认定日期">工伤认定日期：</span>
                  <span :title="personMessage.cognizanceDate">{{
                    personMessage.cognizanceDate | YYYYmmDD_Filter
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="工伤认定结论">工伤认定结论：</span>
                  <span :title="
                      personMessage.cognizanceConclusion | cognizanceConclusion
                    ">{{
                    personMessage.cognizanceConclusion | cognizanceConclusion
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="因工死亡时间">因工死亡时间：</span>
                  <span :title="personMessage.workDeathTime">{{
                    personMessage.workDeathTime | YYYYmmDD_Filter
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="老工伤标识">老工伤标识：</span>
                  <span :title="personMessage.oldInjuryFlag">{{
                    personMessage.oldInjuryFlag | oldInjuryFlag
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <!-- <el-col :span="8" class="el-list-item">
                <span title="过程文书编号">过程文书编号:</span>
                <span :title="personMessage.blc502">{{personMessage.blc502}}</span>
                </el-col>-->
                <el-col :span="8" class="el-list-item">
                  <span title="联系电话">联系电话：</span>
                  <span :title="personMessage.contacterTelephone">{{
                    personMessage.contacterTelephone
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="联系地址">联系地址：</span>
                  <span :title="personMessage.contactAddress">{{
                    personMessage.contactAddress
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="邮寄地址">邮寄地址:</span>
                  <span :title="personMessage.contactAddress">{{
                    personMessage.contactAddress
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="统一社会信用代码">统一社会信用代码：</span>
                  <span :title="personMessage.unitCardId">{{
                    personMessage.unitCardId
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="单位名称">单位名称：</span>
                  <span :title="personMessage.unitName || personMessage.companyName">{{
                    personMessage.unitName || personMessage.companyName
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="统筹区">统筹区:</span>
                  <span :title="personMessage.regionCodeName">{{
                    personMessage.regionCodeName
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="是否涉及第三人">是否涉及第三人：</span>
                  <span :title="personMessage.isThirdPerson">{{
                    personMessage.isThirdPerson
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>

            <!-- <el-row :gutter="20" class="el-list">
          <el-col :span="8" class="el-list-item" v-if="false">
            <span title="人员编码">人员编码:</span>
            <span :title="personMessage.individualId">{{personMessage.individualId}}</span>
          </el-col>
          <el-col :span="8" class="el-list-item" v-if="false">
              <span title="单位编号">单位编号:</span>
              <span :title="personMessage.unitId">{{personMessage.unitId}}</span>
            </el-col>
            </el-row>-->
          </el-carousel>
        </div>

        <!-- 工伤人员标签（本系统） idCount = 4-->
        <div v-if="dataType == 'person' && idCount == '4'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="personMessage.insuranceNumber">{{
                personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄：</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="工伤发生时间">工伤发生时间：</span>
              <span :title="personMessage.injuryOccurrenceTime">{{
                personMessage.injuryOccurrenceTime
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="工伤类别">工伤类别：</span>
              <span :title="personMessage.jobInjuryType">{{
                personMessage.jobInjuryType | jobInjuryType
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span :title="personMessage.companyName">{{
                personMessage.companyName
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="单位编号">单位编号：</span>
              <span :title="personMessage.unitId">{{
                personMessage.unitId
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="人员编码">人员编码：</span>
              <span :title="personMessage.individualId">{{
                personMessage.individualId
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item" v-if="false">
              <span title="工伤认定ID">工伤认定ID：</span>
              <span :title="personMessage.injuryCognizanceId">{{
                personMessage.injuryCognizanceId
                }}</span>
            </el-col>
          </el-row>
        </div>

        <!-- 零星待遇补退事项  idCount = 101-->
        <div v-if="dataType == 'person' && idCount == '101'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <!-- <el-carousel-item> -->
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="社会保障号">社会保障号：</span>
                <span :title="personMessage.insuranceNumber">{{
                  personMessage.insuranceNumber
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="性别">性别：</span>
                <span :title="personMessage.sex">{{ personMessage.sex }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="出生日期">出生日期：</span>
                <span :title="personMessage.birthday">{{
                  personMessage.birthday | YYYYmmDD_Filter
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="离退休状态">离退休状态：</span>
                <span :title="personMessage.retireStatus | retireStatus">{{
                  personMessage.retireStatus | retireStatus
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="行政区划">行政区划：</span>
                <span :title="personMessage.regionCode | regionTypeFilter">{{
                  personMessage.regionCode | regionTypeFilter
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="老工伤标识">老工伤标识：</span>
                <span :title="personMessage.oldInjuryFlag">{{
                  personMessage.oldInjuryFlag | oldInjuryFlag
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="统一社会信用代码">统一社会信用代码：</span>
                <span :title="personMessage.unitCardId">{{
                  personMessage.unitCardId
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="单位名称">单位名称：</span>
                <span :title="personMessage.unitName || personMessage.companyName">{{
                  personMessage.unitName || personMessage.companyName
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="是否涉及第三人">是否涉及第三人：</span>
                <span :title="personMessage.isThirdPerson">{{
                  personMessage.isThirdPerson | isThirdPerson
                  }}</span>
              </el-col>
            </el-row>
            <!-- </el-carousel-item> -->

            <!-- <el-carousel-item> -->
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="伤残等级">伤残等级：</span>
                <span :title="personMessage.injuryLevel">{{
                  personMessage.injuryLevel | injuryLevel
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="生活自理障碍等级">生活自理障碍等级：</span>
                <span :title="personMessage.selfcareDisorderLevel">{{
                  personMessage.selfcareDisorderLevel | selfcareDisorderLevel
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="工伤发生时间">工伤发生时间：</span>
                <span :title="personMessage.injuryOccurrenceTime">{{
                  personMessage.injuryOccurrenceTime | YYYYmmDD_Filter
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="工伤认定日期">工伤认定日期：</span>
                <span :title="personMessage.cognizanceDate">{{
                  personMessage.cognizanceDate | YYYYmmDD_Filter
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="劳动能力鉴定日期">劳动能力鉴定日期：</span>
                <span :title="personMessage.appraisalDate">{{
                  personMessage.appraisalDate | YYYYmmDD_Filter
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="工伤认定结论">工伤认定结论：</span>
                <span :title="
                    personMessage.cognizanceConclusion | cognizanceConclusion
                  ">{{
                  personMessage.cognizanceConclusion | cognizanceConclusion
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="伤害部位">伤害部位：</span>
                <span :title="personMessage.injurySiteOneValue">{{
                  personMessage.injurySiteOneValue
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="职业病名称">职业病名称：</span>
                <span :title="personMessage.diseasesNameOne">{{
                  personMessage.diseasesNameOne | diseasesNameOne
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="因工死亡时间">因工死亡时间：</span>
                <span :title="personMessage.workDeathTime">{{
                  personMessage.workDeathTime | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <!-- <el-col :span="8" class="el-list-item">
                  <span title="伤害部位2">伤害部位2：</span>
                  <span
                    :title="personMessage.injurySiteTwo|injurySiteOne"
                  >{{personMessage.injurySiteTwo|injurySiteOne}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="伤害部位3">伤害部位3：</span>
                  <span
                    :title="personMessage.injurySiteThree|injurySiteOne"
                  >{{personMessage.injurySiteThree|injurySiteOne}}</span>
                </el-col>-->
            </el-row>
            <!-- </el-carousel-item> -->
            <!-- <el-carousel-item> -->
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="联系人姓名">联系人姓名：</span>
                <span :title="personMessage.contacterName">{{
                  personMessage.contacterName
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span :title="personMessage.telephone">{{
                  personMessage.telephone
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系人手机">联系人手机号：</span>
                <span :title="personMessage.mobilephone">{{
                  personMessage.mobilephone
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list"></el-row>
            <!-- </el-carousel-item> -->
          </el-carousel>
        </div>
        <div v-if="dataType == 'person' && idCount == '10101'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="社会保障号">社会保障号：</span>
                <span :title="personMessage.insuranceNumber">{{
                  personMessage.insuranceNumber
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="性别">性别：</span>
                <span :title="personMessage.sex">{{
                  personMessage.sex | sexTypeFilter
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="出生日期">出生日期：</span>
                <span :title="personMessage.birthday">{{
                  personMessage.birthday | YYYYmmDD_Filter
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="统筹区">统筹区：</span>
                <span :title="personMessage.areaCodeName">{{
                  personMessage.areaCodeName
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="手机号">手机号：</span>
                <span :title="personMessage.phone">{{
                  personMessage.phone
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="工伤发生单位">工伤发生单位：</span>
                <span :title="personMessage.companyName">{{
                  personMessage.companyName
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="统一社会信用代码">统一社会信用代码：</span>
                <span :title="personMessage.unitCardId">{{
                  personMessage.unitCardId
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="项目名称">项目名称：</span>
                <!-- <span :title="personMessage.phone">{{personMessage.phone}}</span> -->
                <span>--</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="工伤认定申请日期">工伤认定申请日期：</span>
                <span :title="personMessage.applicationDate">{{
                  personMessage.applicationDate | YYYYmmDD_Filter
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="工伤认定日期">工伤认定日期：</span>
                <span :title="personMessage.cognizanceDate">{{
                  personMessage.cognizanceDate | YYYYmmDD_Filter
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="工伤认定结论">工伤认定结论：</span>
                <span :title="personMessage.cognizanceConclusion">{{
                  personMessage.cognizanceConclusion | cognizanceConclusion
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="职业病名称">职业病名称：</span>
                <span :title="personMessage.diseasesNameOne">{{
                  personMessage.diseasesNameOne | diseasesNameOne
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="因工死亡时间">因工死亡时间：</span>
                <span :title="personMessage.workDeathTime">{{
                  personMessage.workDeathTime | YYYYmmDD_Filter
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="是否涉及第三人">是否涉及第三人：</span>
                <span :title="personMessage.isThirdPerson">{{
                  personMessage.isThirdPerson | isThirdPerson
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="伤残等级鉴定日期">伤残等级鉴定日期：</span>
                <span :title="personMessage.appraisalDate">{{
                  personMessage.appraisalDate | YYYYmmDD_Filter
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="伤残等级">伤残等级：</span>
                <span :title="personMessage.injuryLevel">{{
                  personMessage.injuryLevel | injuryLevel
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="生活自理障碍鉴定日期">生活自理障碍鉴定日期：</span>
                <span :title="personMessage.appraisalDate">{{
                  personMessage.appraisalDate
                  }}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="生活自理障碍等级：">生活自理障碍等级：</span>
                <span :title="personMessage.selfcareDisorderLevel">{{
                  personMessage.selfcareDisorderLevel | selfcareDisorderLevel
                  }}</span>
              </el-col>
            </el-row>
          </el-carousel>
        </div>
        <!-- 工伤鉴定标签（人员） idCount = 5-->
        <div v-if="dataType == 'person' && idCount == '5'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="证件类型">证件类型:</span>
                  <span :title="personMessage.aac058">{{
                    personMessage.aac058
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="证件号码">证件号码:</span>
                  <span :title="personMessage.aac147">{{
                    personMessage.aac147
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="邮寄地址">邮寄地址:</span>
                  <span :title="personMessage.aae006">{{
                    personMessage.aae006
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="邮编">邮编:</span>
                  <span :title="personMessage.aae007">{{
                    personMessage.aae007
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="手机号码">手机号码:</span>
                  <span :title="personMessage.aac067">{{
                    personMessage.aac067
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="参加工作日期">参加工作日期:</span>
                  <span :title="personMessage.aac007">{{
                    personMessage.aac007
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="性别">性别:</span>
                  <span :title="personMessage.aac004">{{
                    personMessage.aac004
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="民族">民族:</span>
                  <span :title="personMessage.aac005">{{
                    personMessage.aac005
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="退离休状态">退离休状态:</span>
                  <span>
                    <a :title="personMessage.aac084">{{
                      personMessage.aac084
                      }}</a>
                  </span>
                </el-col>
                <el-col :span="8" class="el-list-item" v-if="false">
                  <span title="工伤认定ID">工伤认定ID:</span>
                  <span :title="personMessage.aaz127">{{
                    personMessage.aaz127
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>

            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="参保状态">参保状态:</span>
                  <span>
                    <a :title="personMessage.aac008">{{
                      personMessage.aac008
                      }}</a>
                  </span>
                </el-col>

                <el-col :span="8" class="el-list-item" v-if="false">
                  <span title="人员编码">人员编码:</span>
                  <span :title="personMessage.aac001">{{
                    personMessage.aac001
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 精简人员标签 idCount = 8-->
        <div v-if="dataType == 'person' && idCount == '8'">
          <!-- <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight"
                             :autoplay="false">
          <el-carousel-item>-->
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span :title="personMessage.name">姓名:</span>
              <span>{{ personMessage.name }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号码">社会保障号码：</span>
              <span :title="personMessage.insuranceNumber">{{
                personMessage.insuranceNumber
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.sex">{{
                personMessage.sex | sexTypeFilter
                }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.birthday">{{
                personMessage.birthday | YYYYmmDD_Filter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="民族">民族：</span>
              <span>{{ personMessage.nation | nationTypeFilter }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称：</span>
              <span :title="personMessage.unitName || personMessage.companyName">{{ personMessage.unitName ||
                personMessage.companyName }}</span>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="精简人员类别">精简人员类别：</span>
              <span :title="personMessage.streamlineFlag">{{
                personMessage.streamlineFlag | streamlineFlagFilter
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="personMessage.unitCardId">{{
                personMessage.unitCardId
                }}</span>
            </el-col>
          </el-row>
        </div>

        <!-- 供养遗孀 idCount = 9-->
        <div v-if="dataType == 'person' && idCount == '9'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="社会保障号">社会保障号：</span>
                  <span :title="personMessage.insuranceId">{{
                    personMessage.insuranceId
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="性别">性别：</span>
                  <span>{{ personMessage.sex | sexTypeFilter }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="民族">民族：</span>
                  <span>{{ personMessage.nation | nationTypeFilter }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="出生日期">出生日期：</span>
                  <span :title="personMessage.birthday">{{
                    personMessage.birthday | YYYYmmDD_Filter
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="供养人员类别">供养人员类别：</span>
                  <span>{{
                    personMessage.provideType | provideTypeFilter
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="供养关系">供养关系：</span>
                  <span>{{
                    personMessage.provideRelation | provideRelationFilter
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="待遇享受开始年月">待遇享受开始年月：</span>
                  <span :title="personMessage.enjoyStartYear">{{
                    personMessage.enjoyStartYear | YYYYmm_Filter
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="待遇享受终止年月">待遇享受终止年月：</span>
                  <span>
                    <a :title="personMessage.finishYearMonth">{{
                      personMessage.finishYearMonth | YYYYmm_Filter
                      }}</a>
                  </span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="满18岁年月">满18岁年月：</span>
                  <span>
                    <a :title="personMessage.years18OldYearMonth">{{
                      personMessage.years18OldYearMonth
                      }}</a>
                  </span>
                </el-col>
              </el-row>
            </el-carousel-item>

            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="孤寡标识">孤寡标识：</span>
                  <span :title="personMessage.orphonsFlag">{{
                    personMessage.orphonsFlag
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="是否丧失劳动能力">是否丧失劳动能力：</span>
                  <span>{{ personMessage.incapacity | incapacityFilter }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="联系人姓名">联系人姓名：</span>
                  <span :title="personMessage.contacterName">{{
                    personMessage.contacterName
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="联系电话">联系电话：</span>
                  <span :title="personMessage.telephone">{{
                    personMessage.telephone
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="联系地址">联系地址：</span>
                  <span :title="personMessage.contactAddress">{{
                    personMessage.contactAddress
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 工伤认定和劳动能力鉴定标签（人员） idCount = 10-->
        <div v-if="dataType == 'person' && idCount == '10'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="性别">性别:</span>
                  <span :title="personMessage.aac004">{{
                    personMessage.aac004
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="民族">民族:</span>
                  <span :title="personMessage.aac005">{{
                    personMessage.aac005
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="证件类型">证件类型:</span>
                  <span :title="personMessage.aac058">{{
                    personMessage.aac058
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="证件号码">证件号码:</span>
                  <span :title="personMessage.aac147">{{
                    personMessage.aac147
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="邮寄地址">邮寄地址:</span>
                  <span :title="personMessage.aae006">{{
                    personMessage.aae006
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="工伤类别">工伤类别:</span>
                  <span :title="personMessage.alc027">{{
                    personMessage.alc027
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="邮编">邮编:</span>
                  <span :title="personMessage.aae007">{{
                    personMessage.aae007
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="手机号码">手机号码:</span>
                  <span :title="personMessage.aac067">{{
                    personMessage.aac067
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="参加工作日期">参加工作日期:</span>
                  <span :title="personMessage.aac007">{{
                    personMessage.aac007
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>

            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="离退休状态">离退休状态:</span>
                  <span :title="personMessage.aac084">{{
                    personMessage.aac084
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="参保状态">参保状态:</span>
                  <span :title="personMessage.aac008">{{
                    personMessage.aac008
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="统筹区">统筹区:</span>
                  <span :title="personMessage.aaa027">{{
                    personMessage.aaa027
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="联系地址">联系地址:</span>
                  <span :title="personMessage.aae006">{{
                    personMessage.aae006
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="联系电话">联系电话:</span>
                  <span :title="personMessage.aae005">{{
                    personMessage.aae005
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="工伤认定书编号">工伤认定书编号:</span>
                  <span :title="personMessage.alc011">{{
                    personMessage.alc011
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="过程文书编号">过程文书编号:</span>
                  <span :title="personMessage.blc502">{{
                    personMessage.blc502
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="工伤发生时间">工伤发生时间:</span>
                  <span :title="personMessage.alc020">{{
                    personMessage.alc020
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="因工死亡时间">因工死亡时间:</span>
                  <span :title="personMessage.alc040">{{
                    personMessage.alc040
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>

            <!-- <el-carousel-item>
                <el-row :gutter="20" class="el-list">
                  <el-col :span="8" class="el-list-item" v-if="false">
                    <span>人员编码:</span>
                    <span>{{personMessage.aac001}}</span>
                  </el-col>
                </el-row>
            </el-carousel-item>-->
          </el-carousel>
        </div>
        <!-- 工伤供养亲属标签（人员） idCount = 11-->
        <div v-if="dataType == 'person' && idCount == '11'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="姓名">姓名:</span>
                  <span :title="personMessage.aac003">{{
                    personMessage.aac003
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="性别">性别:</span>
                  <span :title="personMessage.aac004">{{
                    personMessage.aac004
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="民族">民族:</span>
                  <span :title="personMessage.aac005">{{
                    personMessage.aac005
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="出生日期">出生日期:</span>
                  <span :title="personMessage.aac006">{{
                    personMessage.aac006
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="户口性质">户口性质:</span>
                  <span :title="personMessage.aac009">{{
                    personMessage.aac009
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="孤寡标志">孤寡标志:</span>
                  <span :title="personMessage.aac086">{{
                    personMessage.aac086
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="供养关系">供养关系:</span>
                  <span :title="personMessage.aae144">{{
                    personMessage.aae144
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="开始年月">开始年月:</span>
                  <span :title="personMessage.aic160">{{
                    personMessage.aic160
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="终止年月">终止年月:</span>
                  <span :title="personMessage.aic301">{{
                    personMessage.aic301
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>

            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="联系人姓名">联系人姓名:</span>
                  <span :title="personMessage.aae004">{{
                    personMessage.aae004
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="联系人手机">联系人手机:</span>
                  <span :title="personMessage.aae005">{{
                    personMessage.aae005
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="邮政编码">邮政编码:</span>
                  <span :title="personMessage.aae007">{{
                    personMessage.aae007
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 工伤工亡人员标签（人员） idCount = 12-->
        <div v-if="dataType == 'person' && idCount == '12'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="社会保障号码">社会保障号码:</span>
                  <span :title="personMessage.aac002">{{
                    personMessage.aac002
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="姓名">姓名:</span>
                  <span :title="personMessage.aac003">{{
                    personMessage.aac003
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="性别">性别:</span>
                  <span :title="personMessage.aac004">{{
                    personMessage.aac004
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="民族">民族:</span>
                  <span :title="personMessage.aac005">{{
                    personMessage.aac005
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="出生日期">出生日期:</span>
                  <span :title="personMessage.aac006">{{
                    personMessage.aac006
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="行政区划">行政区划:</span>
                  <span :title="personMessage.aab301">{{
                    personMessage.aab301
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="工伤认定书编号">工伤认定书编号:</span>
                  <span :title="personMessage.alc011">{{
                    personMessage.alc011
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="统一社会信用代码">统一社会信用代码:</span>
                  <span :title="personMessage.bab010">{{
                    personMessage.bab010
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="单位名称">单位名称:</span>
                  <span :title="personMessage.aab069">{{
                    personMessage.aab069
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>

            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="工伤发生时间">工伤发生时间:</span>
                  <span :title="personMessage.alc020">{{
                    personMessage.alc020
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="工伤认定日期">工伤认定日期:</span>
                  <span :title="personMessage.alc031">{{
                    personMessage.alc031
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="工伤认定结论">工伤认定结论:</span>
                  <span :title="personMessage.ala015">{{
                    personMessage.ala015
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="因工死亡时间">因工死亡时间:</span>
                  <span :title="personMessage.alc040">{{
                    personMessage.alc040
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="老工伤标识">老工伤标识:</span>
                  <span :title="personMessage.bae476">{{
                    personMessage.bae476
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="本人工资">本人工资:</span>
                  <span :title="personMessage.aac040">{{
                    personMessage.aac040
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 机关事业单位标签（本系统） idCount = 13-->
        <div v-if="dataType == 'company' && idCount == '13'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="单位名称">单位名称:</span>
                  <span :title="companyMessage.aab069">{{
                    companyMessage.aab069
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="统一社会信用代码">统一社会信用代码:</span>
                  <span :title="companyMessage.bab010">{{
                    companyMessage.bab010
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="税号">税号:</span>
                  <span :title="companyMessage.aab030">{{
                    companyMessage.aab030
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="所属地区">所属地区:</span>
                  <span :title="companyMessage.aab301">{{
                    companyMessage.aab301
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="单位类型">单位类型:</span>
                  <span :title="companyMessage.aab019">{{
                    companyMessage.aab019
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="经济类型">经济类型:</span>
                  <span :title="companyMessage.aab020">{{
                    companyMessage.aab020
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="隶属关系">隶属关系:</span>
                  <span :title="companyMessage.aab021">{{
                    companyMessage.aab021
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="所属行业">所属行业:</span>
                  <span :title="companyMessage.aab022">{{
                    companyMessage.aab022
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="行业风险类别">行业风险类别:</span>
                  <span :title="companyMessage.aaa149">{{
                    companyMessage.aaa149
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="法人姓名">法人姓名:</span>
                  <span :title="companyMessage.aab013">{{
                    companyMessage.aab013
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="主管部门">主管部门:</span>
                  <span :title="companyMessage.aab023">{{
                    companyMessage.aab023
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="联系人">联系人:</span>
                  <span :title="companyMessage.aae004">{{
                    companyMessage.aae004
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="联系电话">联系电话:</span>
                  <span :title="companyMessage.aae005">{{
                    companyMessage.aae005
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="公司地址">公司地址:</span>
                  <span :title="companyMessage.aae006">{{
                    companyMessage.aae006
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item" v-show="false">
                  <span title="单位编号">单位编号:</span>
                  <span :title="companyMessage.aab001">{{
                    companyMessage.aab001
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item" v-show="false">
                  <span title="单位管理码">单位管理码:</span>
                  <span :title="companyMessage.aab999">{{
                    companyMessage.aab999
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 税务社保退费（建筑工伤） idCount == '726'-->
        <div v-if="dataType == 'company' && idCount == '726'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码:</span>
              <span :title="personMessage.unitCardId">{{
                companyMessage.unitCardId || "--"
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="项目名称">项目名称：</span>
              <span :title="personMessage.medicalInstitutionName">{{
                companyMessage.medicalInstitutionName
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="项目经理">项目经理：</span>
              <span :title="personMessage.leaderName">{{
                companyMessage.leaderName
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系电话">项目经理电话：</span>
              <span :title="personMessage.telephone">{{
                companyMessage.telephone
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系人">联系人：</span>
              <span :title="personMessage.contacterName">{{
                companyMessage.contacterName
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="联系人电话">联系人电话：</span>
              <span :title="personMessage.contacterMobilephone">{{
                companyMessage.contacterMobilephone
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="建设单位">建设单位：</span>
              <span :title="personMessage.constructUnitName">{{
                companyMessage.constructUnitName
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="项目所在地">项目所在地：</span>
              <span :title="personMessage.contactAddress">{{
                companyMessage.contactAddress
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="开工日期">开工日期：</span>
              <span :title="personMessage.startDate">{{
                companyMessage.startDate
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="竣工日期">竣工日期：</span>
              <span :title="personMessage.finishDate">{{
                companyMessage.finishDate
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 机关事业人员标签（本系统） idCount = 14-->
        <div v-if="dataType == 'person' && idCount == '14'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="姓名">姓名:</span>
                  <span :title="personMessage.aac003">{{
                    personMessage.aac003
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="社会保障号">社会保障号:</span>
                  <span :title="personMessage.aac002">{{
                    personMessage.aac002
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="性别">性别:</span>
                  <span :title="personMessage.aac004">{{
                    personMessage.aac004
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="出生日期">出生日期:</span>
                  <span :title="personMessage.aab301">{{
                    personMessage.aac006
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="参加工作日期">参加工作日期:</span>
                  <span :title="personMessage.aac007">{{
                    personMessage.aac007
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="户口性质">户口性质:</span>
                  <span :title="personMessage.aac009">{{
                    personMessage.aac009
                    }}</span>
                </el-col>
              </el-row>

              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="年龄">年龄:</span>
                  <span :title="personMessage.age">{{
                    personMessage.age
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="编制类型">编制类型:</span>
                  <span :title="personMessage.aaf022">{{
                    personMessage.aaf022
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="报备人员名额">报备人员名额:</span>
                  <span :title="personMessage.bac104">{{
                    personMessage.bac104
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>

            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="单位管理码">单位管理码:</span>
                  <span :title="personMessage.aab999">{{
                    personMessage.aab999
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="单位编号">单位编号:</span>
                  <span :title="personMessage.aab001">{{
                    personMessage.aab001
                    }}</span>
                </el-col>

                <el-col :span="8" class="el-list-item">
                  <span title="人员编号">人员编号:</span>
                  <span :title="personMessage.aac001">{{
                    personMessage.aac001
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="单位名称">单位名称:</span>
                  <span :title="personMessage.aab069">
                    <a>{{ personMessage.aab069 }}</a>
                  </span>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div v-if="dataType == 'person' && idCount == '99'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="社会保障号">社会保障号:</span>
                  <span :title="personMessage.insuranceId">{{
                    personMessage.insuranceId
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="姓名">姓名:</span>
                  <span :title="personMessage.name">{{
                    personMessage.name
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="个人编码">个人编码:</span>
                  <span :title="personMessage.personalCode">{{
                    personMessage.personalCode
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="单位编号">单位编号:</span>
                  <span :title="personMessage.unitId">{{
                    personMessage.unitId
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="单位名称">单位名称:</span>
                  <span :title="personMessage.unitName">
                    <a>{{ personMessage.unitName }}</a>
                  </span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="伤害程度">伤害程度:</span>
                  <span :title="personMessage.injuryDegree">{{
                    personMessage.injuryDegree | injuryDegree
                    }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="生活自理障碍等级">生活自理障碍等级:</span>
                  <span :title="personMessage.selfcareDisorderLevel">{{
                    personMessage.selfcareDisorderLevel | selfcareDisorderLevel
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="待遇开始年月">待遇开始年月:</span>
                  <span :title="personMessage.enjoyStartYear">{{
                    personMessage.enjoyStartYear
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="待遇金额">待遇金额:</span>
                  <span :title="personMessage.avgSalary">{{
                    personMessage.avgSalary
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
            <el-carousel-item>
              <el-row :gutter="20" class="el-list">
                <el-col :span="8" class="el-list-item">
                  <span title="伤残等级">伤残等级:</span>
                  <span :title="personMessage.injuryLevel">{{
                    personMessage.injuryLevel | injuryLevel
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="认定日期">认定日期:</span>
                  <span :title="personMessage.cognizanceDate">{{
                    personMessage.cognizanceDate
                    }}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="认定结论">认定结论:</span>
                  <span :title="
                      personMessage.cognizanceConclusion | cognizanceConclusion
                    ">{{
                    personMessage.cognizanceConclusion | cognizanceConclusion
                    }}</span>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div v-if="dataType == 'person' && idCount == '15'">
          <el-carousel indicator-position="outside" trigger="click" :height="maHeight" arrow="never" :autoplay="false">
            <!-- <el-carousel-item> -->
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="社会保障号">社会保障号：</span>
                <span :title="
                    personMessage.insuranceId || personMessage.insuranceNumber
                  ">{{
                  personMessage.insuranceId || personMessage.insuranceNumber
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="性别">性别：</span>
                <span :title="personMessage.sex | sexTypeFilter">{{
                  personMessage.sex | sexTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="出生日期">出生日期：</span>
                <span :title="personMessage.birthday">{{
                  personMessage.birthday | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <!-- <el-col :span="8" class="el-list-item">
                <span title="工伤认定id">工伤认定id：</span>
                <span :title="personMessage.injuryCognizanceId">{{personMessage.injuryCognizanceId}}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="人员编号">人员编号：</span>
                <span :title="personMessage.individualId">{{personMessage.individualId}}</span>
              </el-col>

              <el-col :span="8" class="el-list-item">
                <span title="单位编码">单位编码：</span>
                <span :title="personMessage.unitId">{{personMessage.unitId}}</span>
                </el-col>-->
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="离退休状态">离退休状态：</span>
                <span :title="personMessage.retireStatus | retireStatus">{{
                  personMessage.retireStatus | retireStatus
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="行政区划">行政区划：</span>
                <span :title="personMessage.regionCode">{{
                  personMessage.regionCode | regionTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="老工伤标识">老工伤标识：</span>
                <span :title="personMessage.oldInjuryFlag">{{
                  personMessage.oldInjuryFlag | oldInjuryFlag
                  }}</span>
              </el-col>

              <!-- <el-col :span="8" class="el-list-item">
                <span title="工伤认定书编号">工伤认定书编号：</span>
                <span
                  :title="personMessage.injuryCognizanceNumber"
                >{{personMessage.injuryCognizanceNumber}}</span>
                </el-col>-->
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="统一社会信用代码">统一社会信用代码：</span>
                <span :title="personMessage.unitCardId">{{
                  personMessage.unitCardId
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="单位名称(工伤职工所在单位的名称)">单位名称：</span>
                <span :title="personMessage.companyName || personMessage.unitName">{{
                  personMessage.companyName || personMessage.unitName
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="是否涉及第三人">是否涉及第三人：</span>
                <span :title="personMessage.isThirdPerson">{{
                  personMessage.isThirdPerson | isThirdPerson
                  }}</span>
              </el-col>
              <!-- <el-col :span="8" class="el-list-item">
                <span title="工伤申请时间">工伤申请时间：</span>
                <span
                  :title="personMessage.applicationDate"
                >{{personMessage.applicationDate|YYYYmmDD_Filter}}</span>
                </el-col>-->
            </el-row>
            <!-- </el-carousel-item>

            <el-carousel-item> -->
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="伤残等级">伤残等级：</span>
                <span :title="personMessage.injuryLevel">{{
                  personMessage.injuryLevel | injuryLevel
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="生活自理障碍等级">生活自理障碍等级：</span>
                <span :title="personMessage.selfcareDisorderLevel">{{
                  personMessage.selfcareDisorderLevel | selfcareDisorderLevel
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="工伤发生时间">工伤发生时间：</span>
                <span :title="personMessage.injuryOccurrenceTime">{{
                  personMessage.injuryOccurrenceTime
                  }}</span>
              </el-col>
              <!-- <el-col :span="8" class="el-list-item">
                <span title="伤害部位">伤害部位：</span>
                <span
                  :title="personMessage.injurySite|injurySiteOne"
                >{{personMessage.injurySite|injurySiteOne}}</span>
                </el-col>-->
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="工伤认定日期">工伤认定日期：</span>
                <span :title="personMessage.cognizanceDate">{{
                  personMessage.cognizanceDate | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="劳动能力鉴定日期">劳动能力鉴定日期：</span>
                <span :title="personMessage.appraisalDate">{{
                  personMessage.appraisalDate | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="工伤认定结论">工伤认定结论：</span>
                <span :title="
                    personMessage.cognizanceConclusion | cognizanceConclusion
                  ">{{
                  personMessage.cognizanceConclusion | cognizanceConclusion
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="伤害部位">伤害部位：</span>
                <span :title="personMessage.injurySiteOne | injurySiteOne">{{
                  personMessage.injurySiteOne | injurySiteOne
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="职业病名称">职业病名称：</span>
                <span :title="personMessage.diseasesNameOne">{{
                  personMessage.diseasesNameOne | diseasesNameOne
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="因工死亡时间">因工死亡日期：</span>
                <span :title="personMessage.workDeathTime">{{
                  personMessage.workDeathTime | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <!-- <el-col :span="8" class="el-list-item">
                  <span title="伤害部位2">伤害部位2：</span>
                  <span
                    :title="personMessage.injurySiteTwo|injurySiteOne"
                  >{{personMessage.injurySiteTwo|injurySiteOne}}</span>
                </el-col>
                <el-col :span="8" class="el-list-item">
                  <span title="伤害部位3">伤害部位3：</span>
                  <span
                    :title="personMessage.injurySiteThree|injurySiteOne"
                  >{{personMessage.injurySiteThree|injurySiteOne}}</span>
                </el-col>-->
              <!-- <el-col :span="8" class="el-list-item">
                <span title="职业病名称2">职业病名称2：</span>
                <span
                  :title="personMessage.diseasesNameTwo"
                >{{personMessage.diseasesNameTwo | diseasesNameOne}}</span>
                </el-col>-->
            </el-row>
            <!-- </el-carousel-item>

            <el-carousel-item> -->
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="联系人姓名">联系人姓名：</span>
                <span :title="personMessage.contacterName">{{
                  personMessage.contacterName
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系电话">联系电话：</span>
                <span :title="personMessage.telephone">{{
                  personMessage.telephone
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系人手机号">联系人手机号：</span>
                <span :title="personMessage.mobilephone">{{
                  personMessage.mobilephone
                  }}</span>
              </el-col>
            </el-row>

            <el-row :gutter="20" class="el-list">
              <!-- <el-col :span="8" class="el-list-item">
                <span title="工伤类别">工伤类别：</span>
                <span
                  :title="personMessage.jobInjuryType"
                >{{personMessage.jobInjuryType|jobInjuryType}}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="事故类别">事故类别：</span>
                <span
                  :title="personMessage.accidentType"
                >{{personMessage.accidentType | accidentType}}</span>
                </el-col>-->
            </el-row>

            <!-- <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="姓名">姓名:</span>
                <span :title="personMessage.name">{{personMessage.name}}</span>
              </el-col>
              </el-row>-->
            <!-- </el-carousel-item> -->
          </el-carousel>
        </div>
        <!-- 退费信息   idCount = refundInformation  -->
        <div v-if="dataType == 'person' && idCount == 'refundInformation'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="姓名">姓名：</span>
                <span :title="personMessage.name">{{
                  personMessage.name || "--"
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="社会保障号">社会保障号：</span>
                <span :title="
                    personMessage.insuranceId || personMessage.insuranceNumber
                  ">{{
                  personMessage.insuranceId ||
                  personMessage.insuranceNumber ||
                  "--"
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="性别">性别：</span>
                <span :title="personMessage.sex | sexTypeFilter">{{
                  personMessage.sex | sexTypeFilter
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="出生日期">出生日期：</span>
                <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                  personMessage.birthday | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="年龄">年龄:</span>
                <span :title="personMessage.age">{{
                  personMessage.age || "--"
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="户口性质">户口性质:</span>
                <span>{{ personMessage.residenceType | residenceType }}</span>
              </el-col>
            </el-row>
          </el-carousel>
        </div>
        <!-- 城乡居民养老   idCount = ResidentPensionInsurance  -->
        <div v-if="dataType == 'person' && idCount == 'ResidentPensionInsurance'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="证件类型">证件类型:</span>
                <span :title="personMessage.certType | countryTypeFilter">{{
                  personMessage.certType | countryTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="证件号码">证件号码:</span>
                <span :title="personMessage.certNumber">{{
                  personMessage.certNumber || "--"
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="性别">性别：</span>
                <span :title="personMessage.sex | sexTypeFilter">{{
                  personMessage.sex | sexTypeFilter
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="出生日期">出生日期：</span>
                <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                  personMessage.birthday | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="民族">民族：</span>
                <span :title="personMessage.nation | nationTypeFilter">{{
                  personMessage.nation | nationTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="所在区域">所在区域：</span>
                <span :title="personMessage.regionCode | regionTypeFilter">{{
                  personMessage.regionCode | regionTypeFilter
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="所在村（社区）">所在村（社区）:</span>
                <span :title="personMessage.villageName">{{
                  personMessage.villageName || "--"
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="联系手机">联系手机：</span>
                <span :title="
                    personMessage.mobilephone ||
                      personMessage.contacterMobilephone
                  ">{{
                  personMessage.mobilephone ||
                  personMessage.contacterMobilephone ||
                  "--"
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="参保状态">参保状态：</span>
                <span :title="personMessage.insuredStatus | insuredStatus">{{
                  personMessage.insuredStatus | insuredStatus
                  }}</span>
              </el-col>
            </el-row>
          </el-carousel>
        </div>
        <!-- 城乡居民养老关系转移   idCount = PensionInsuranceRelation  -->
        <div v-if="dataType == 'person' && idCount == 'PensionInsuranceRelation'">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="证件类型">证件类型:</span>
                <span :title="personMessage.certType | countryTypeFilter">{{
                  personMessage.certType | countryTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="证件号码">证件号码:</span>
                <span :title="personMessage.certNumber">{{
                  personMessage.certNumber || "--"
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="性别">性别：</span>
                <span :title="personMessage.sex | sexTypeFilter">{{
                  personMessage.sex | sexTypeFilter
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="出生日期">出生日期：</span>
                <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                  personMessage.birthday | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="民族">民族：</span>
                <span :title="personMessage.nation | nationTypeFilter">{{
                  personMessage.nation | nationTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="参加工作时间">参加工作时间:</span>
                <span :title="personMessage.joinWorkDate | YYYYmmDD_Filter">{{
                  personMessage.joinWorkDate | YYYYmmDD_Filter
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="联系手机">联系手机：</span>
                <span :title="
                    personMessage.mobilephone ||
                      personMessage.contacterMobilephone
                  ">{{
                  personMessage.mobilephone ||
                  personMessage.contacterMobilephone ||
                  "--"
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="所在区域">所在区域：</span>
                <span :title="personMessage.regionCode | regionTypeFilter">{{
                  personMessage.regionCode | regionTypeFilter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="参保状态">参保状态：</span>
                <span :title="personMessage.insuredStatus | insuredStatus">{{
                  personMessage.insuredStatus | insuredStatus
                  }}</span>
              </el-col>
            </el-row>
          </el-carousel>
        </div>
        <!-- 个人账户重新计算   idCount = PersonnelAccountRecalculation  -->
        <div v-if="
            dataType == 'person' && idCount == 'PersonnelAccountRecalculation'
          ">
          <el-carousel indicator-position="outside" trigger="click" arrow="never" :height="maHeight" :autoplay="false">
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="社会保障号">社会保障号：</span>
                <span :title="
                    personMessage.insuranceId || personMessage.insuranceNumber
                  ">{{
                  personMessage.insuranceId ||
                  personMessage.insuranceNumber ||
                  "--"
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="姓名">姓名：</span>
                <span :title="personMessage.name">{{
                  personMessage.name || "--"
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="性别">性别：</span>
                <span :title="personMessage.sex | sexTypeFilter">{{
                  personMessage.sex | sexTypeFilter
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="出生日期">出生日期：</span>
                <span :title="personMessage.birthday | YYYYmmDD_Filter">{{
                  personMessage.birthday | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <el-col :span="16" class="el-list-item">
                <span title="单位名称">单位名称：</span>
                <span class="ep-special2" @click="queryCompanyDetail"
                  :title="personMessage.unitName || personMessage.companyName">{{
                  personMessage.unitName || personMessage.companyName
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="编制类型">编制类型:</span>
                <span :title="personMessage.unitName">{{
                  personMessage.unitName || "--"
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="缴费状态">缴费状态：</span>
                <span :title="
                    personMessage.mobilephone ||
                      personMessage.contacterMobilephone
                  ">{{
                  personMessage.mobilephone ||
                  personMessage.contacterMobilephone ||
                  "--"
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="退休标志">退休标志：</span>
                <span :title="personMessage.retireStatus | retireStatus">{{
                  personMessage.retireStatus | retireStatus
                  }}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="el-list">
              <el-col :span="8" class="el-list-item">
                <span title="参加工作日期">参加工作日期：</span>
                <span :title="personMessage.joinWorkDate">{{
                  personMessage.joinWorkDate | YYYYmmDD_Filter
                  }}</span>
              </el-col>
              <el-col :span="8" class="el-list-item">
                <span title="是否报备员额">是否报备员额：</span>
                <span :title="
                    personMessage.mobilephone ||
                      personMessage.contacterMobilephone
                  ">{{
                  personMessage.mobilephone ||
                  personMessage.contacterMobilephone ||
                  "--"
                  }}</span>
              </el-col>
            </el-row>
          </el-carousel>
        </div>
        <!-- 测算 -->
        <div v-if="dataType == 'person' && idCount == 'cs'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span :title="
                  personMessage.aac147 || personMessage.insuranceNumber
                ">{{
                personMessage.aac147 || personMessage.insuranceNumber
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.aac004 | sexTypeFilter">{{
                personMessage.aac004 | sexTypeFilter
                }}</span>
            </el-col>

            <el-col :span="8" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.bac006">{{
                personMessage.bac006 | YYYYmmDD_Filter
                }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="年龄">年龄:</span>
              <span :title="personMessage.age">{{ personMessage.age }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="参保状态">参保状态：</span>
              <span :title="personMessage.insuredStatus | insuredStatus">{{
                personMessage.insuredStatus | insuredStatus
                }}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="离退休状态">离退休状态：</span>
              <span :title="personMessage.retireStatus">{{personMessage.retireStatus}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="8" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="personMessage.unitCardId">{{personMessage.unitCardId}}</span>
            </el-col>
            <el-col :span="8" class="el-list-item">
              <span title="单位名称">单位名称:</span>
              <span :title="personMessage.unitName">{{
                personMessage.unitName
                }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 异地就医备案 -->
        <div v-if="dataType == 'person' && idCount == 'yd'">
          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="社会保障号">社会保障号：</span>
              <span
                :title="personMessage.insuranceId || personMessage.aac002">{{personMessage.insuranceId||personMessage.aac002}}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="性别">性别：</span>
              <span :title="personMessage.aac004|sexTypeFilter">{{personMessage.aac004 | sexTypeFilter}}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="出生日期">出生日期：</span>
              <span :title="personMessage.aac006 | YYYYmmDD_Filter">{{personMessage.aac006 | YYYYmmDD_Filter}}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="离退休状态">离退休状态：</span>
              <span :title="personMessage.aac084|retireStatus">{{personMessage.aac084|retireStatus}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="统筹区">统筹区：</span>
              <span :title="personMessage.aaa027 | regionTypeFilter">{{personMessage.aaa027 | regionTypeFilter}}</span>
            </el-col>
            <el-col :span="16" class="el-list-item">
              <span title="手机号码">手机号码：</span>
              <span :title="personMessage.aac067">{{personMessage.aac067}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="工伤发生单位">工伤发生单位：</span>
              <span :title="personMessage.aab004">{{personMessage.aab004}}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="统一社会信用代码">统一社会信用代码：</span>
              <span :title="personMessage.aab998">{{personMessage.aab998}}</span>
            </el-col>
<!--            <el-col :span="6" class="el-list-item">-->
<!--              <span title="项目名称">项目名称：</span>-->
<!--              <span :title="personMessage.bab007">{{personMessage.bab007}}</span>-->
<!--            </el-col>-->
            <el-col :span="6" class="el-list-item">
              <span title="工伤发生时间">工伤发生时间：</span>
              <span :title="personMessage.alc020">{{personMessage.alc020 && personMessage.alc020.length>=8?String(personMessage.alc020).substr(0,8):personMessage.alc020 | YYYYmmDD_Filter}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="职业病名称">职业病名称：</span>
              <span :title="personMessage.ala017Name">{{personMessage.ala017Name}}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="因工死亡时间">因工死亡时间：</span>
              <span :title="personMessage.alc040">{{personMessage.alc040|YYYYmmDD_Filter}}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="是否涉及第三人">是否涉及第三人：</span>
              <span
                :title="personMessage.blc543|isThirdPerson">{{personMessage.blc543|isThirdPerson}}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="老工伤标识">老工伤标识：</span>
              <span
                :title="personMessage.bae476|oldInjuryFlag">{{personMessage.bae476|oldInjuryFlag}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="el-list">
            <el-col :span="6" class="el-list-item">
              <span title="伤残等级鉴定日期">伤残等级鉴定日期：</span>
              <span :title="personMessage.alc034 | YYYYmmDD_Filter">{{personMessage.alc034 | YYYYmmDD_Filter}}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="伤残等级">伤残等级：</span>
              <span :title="personMessage.ala040|injuryLevel">{{personMessage.ala040|injuryLevel}}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="生活自理障碍鉴定日期">生活自理障碍鉴定日期：</span>
              <span :title="personMessage.alc074 | YYYYmmDD_Filter">{{personMessage.alc074 | YYYYmmDD_Filter}}</span>
            </el-col>
            <el-col :span="6" class="el-list-item">
              <span title="生活自理障碍等级">生活自理障碍等级：</span>
              <span
                :title="personMessage.alc060 | selfcareDisorderLevel">{{personMessage.alc060 | selfcareDisorderLevel}}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-dialog title="信息详情" :visible.sync="dialogVisible" width="70%">
        <div class="table">
          <span class="name">统一社会信用代码</span>
          <span class="content">{{ personMessage.unitCardId }}</span>
          <span class="name">单位名称</span>
          <span class="content">{{
            personMessage.companyName || personMessage.unitName
            }}</span>
        </div>
        <div class="table">
          <span class="name">工伤认定书编号</span>
          <span class="content">{{
            personMessage.injuryCognizanceNumber
            }}</span>
          <span class="name">工伤发生时间</span>
          <span class="content">{{ personMessage.injuryOccurrenceTime }}</span>
        </div>
        <div class="table">
          <span class="name">工伤类别</span>
          <span class="content">{{
            personMessage.jobInjuryType | jobInjuryType
            }}</span>
          <span class="name">工伤认定日期</span>
          <span class="content">{{
            personMessage.cognizanceDate | YYYYmmDD_Filter
            }}</span>
        </div>
        <div class="table">
          <span class="name">工伤认定结论</span>
          <span class="content">{{
            personMessage.cognizanceConclusion | cognizanceConclusion
            }}</span>
          <span class="name">伤害部位</span>
          <span class="content">
            <div class="multiple" v-if="
                personMessage.injurySiteOneValue ||
                  personMessage.injurySiteOneName
              ">
              {{
              personMessage.injurySiteOneValue ||
              personMessage.injurySiteOneName
              }}
            </div>
          </span>
        </div>
        <div class="table">
          <span class="name">辅助器具1</span>
          <span class="content">{{
            personMessage.devicesItemOne | devicesItemOne
            }}</span>
          <span class="name">辅助器具2</span>
          <span class="content">{{
            personMessage.devicesItemTwo | devicesItemOne
            }}</span>
        </div>
        <div class="table">
          <span class="name">辅助器具3</span>
          <span class="content">{{
            personMessage.devicesItemThree | devicesItemOne
            }}</span>
          <span class="name">职业病名称</span>
          <span class="content">
            <div class="multiple" v-if="personMessage.diseasesNameOneName">
              {{ personMessage.diseasesNameOneName }}
            </div>
            <div class="multiple" v-if="personMessage.diseasesNameTwoName">
              {{ personMessage.diseasesNameTwoName }}
            </div>
          </span>
        </div>
        <div class="table">
          <span class="name">伤残等级</span>
          <span class="content">{{
            personMessage.injuryLevel | injuryLevel
            }}</span>
          <span class="name">生活自理障碍等级</span>
          <span class="content">{{
            personMessage.selfcareDisorderLevel | selfcareDisorderLevel
            }}</span>
        </div>
        <div class="table">
          <span class="name">因工死亡日期</span>
          <span class="content">{{
            personMessage.workDeathTime | YYYYmmDD_Filter
            }}</span>
          <span class="name">老工伤标识</span>
          <span class="content">{{
            personMessage.oldInjuryFlag | oldInjuryFlag
            }}</span>
        </div>
        <div class="table">
          <span class="name">劳动能力鉴定日期</span>
          <span class="content">{{
            personMessage.appraisalDate | YYYYmmDD_Filter
            }}</span>
          <span class="name">是否涉及第三人</span>
          <span class="content">{{
            personMessage.isThirdPerson | isThirdPerson
            }}</span>
        </div>
      </el-dialog>
      <slot :row="row"></slot>
    </div>
  </div>
</template>
<script type="es6">
export default {
  props: {
    buchong: {
      type: Boolean,
      default: false
    },
    xiugai: {
      type: Boolean,
      default: false
    },
    SelfMessagename: {
      type: String,
      default: ''
    },
    isEdit: {
      type: String,
      default: ''
    },
    isEdit_1: {
      type: String,
      default: ''
    },
    isDetaily: {
      type: Boolean,
      default: false
    },
    isDetaily5: {
      type: Boolean,
      default: false
    },
    isDetaily2: {
      type: Boolean,
      default: false
    },
    isDoc: {
      type: Boolean,
      default: false
    },
    dataType: {
      type: String,
      default: 'person'
    },
    idCount: {
      type: String,
      default: '1'
    },
    functionId: {
      type: String,
      default: 'person'
    },
    panel: {
      type: Object,
      default: function() {
        return null
      }
    },
    isCodeType: {
      type: Boolean,
      default: true
    },
    showAreaCode: {
      type: Boolean,
      default: false
    },
    noName: {
      type: Boolean,
      default: false
    },
    isInsuranceId: {
      type: Boolean,
      default: false
    },
    noRetireMsg: {
      type: Boolean,
      default: false
    },
    isRretreat: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isCollapseControl: false,
      collapseHeight: '130px',
      isCollapse: false,
      dialogVisible: false,
      personMessage: {},
      companyMessage: {},
      allMessage: {},
      injuryMessage: {},
      row: [],
      id: '',
      isMore: false,
      maHeight: '100px',
      ageSrc: ''
    }
  },
  computed: {
    collapseTitle() {
      if (this.isCollapse) { return '展开' } else { return '收起' }
    }
  },
  watch: {
    panel: {
      handler(value) {
        if (this.dataType === 'company') {
          value.injuryOccurrenceTime = value.injuryOccurrenceTime ? String(value.injuryOccurrenceTime.substring(0, 10)) : ''
          this.companyMessage = value
        } else if (
          this.dataType === 'person' ||
          this.dataType === 'specialPerson'
        ) {
          value.injuryOccurrenceTime = value.injuryOccurrenceTime ? String(value.injuryOccurrenceTime.substring(0, 10)) : ''
          this.personMessage = value
        } else if (this.dataType === 'companyAndPerson') {
          value.injuryOccurrenceTime = value.injuryOccurrenceTime ? String(value.injuryOccurrenceTime.substring(0, 10)) : ''
          this.allMessage = value
        } else if (this.dataType === 'injuryPerson') {
          value.injuryOccurrenceTime = value.injuryOccurrenceTime ? String(value.injuryOccurrenceTime.substring(0, 10)) : ''
          this.injuryMessage = this.panel
        }
      },
      deep: true
    }
  },
  created() {
    this.ageSrc = location.port === '9002' ? '/static/img/age.svg' : './static/img/age.svg'
    if (this.dataType === 'company') {
      this.companyMessage = this.panel
    } else if (
      this.dataType === 'person' ||
      this.dataType === 'specialPerson'
    ) {
      this.personMessage = this.panel
    } else if (this.dataType === 'companyAndPerson') {
      this.allMessage = this.panel
    } else if (this.dataType === 'injuryPerson') {
      this.injuryMessage = this.panel
    }
  },
  mounted() {
    if (document.getElementById('collapseControl') == null) {
      this.isCollapseControl = false
      return
    }
    this.isCollapseControl = true
    var height = document.getElementById('collapseControl').offsetHeight + 'px'
    document.getElementById('collapseControl').style.height = height
    this.collapseHeight = height
    document.getElementById('collapseControl').style.transition = 'height 0.3s'
    document.getElementById('collapseControl').style.overflow = 'hidden'
    document.getElementById('collapseControl').style.position = 'relative'
  },
  methods: {
    addMessage() {
      this.$emit('messageAdd')
    },
    searchMore() {
      this.isMore = !this.isMore
    },
    checkdetaily() {
      this.dialogVisible = true
    },
    checkInfo() {
      this.$emit('checkInfo')
    },
    checkInfo5() {
      this.$emit('checkInfo5')
    },
    queryCompanyDetail() {
      this.$emit('queryCompanyDetail')
    },
    collapse() {
      if (this.isCollapse) {
        document.getElementById('collapseControl').style.height = this.collapseHeight
      } else {
        document.getElementById('collapseControl').style.height = '48px'
      }
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="less">
  .userMessageFastPhoto {
    /deep/.el-dialog__body {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .collapseText {
      position: absolute;
      right: 18px;
      top: 12px;

      &:hover {
        color: #1890FF;
        cursor: pointer;
      }
    }

    .table {
      display: flex;
      width: 90%;

      span {
        padding: 2px 3px;
        display: block;
        min-height: 33px;
        text-align: center;
        line-height: 33px;
        border: 1px solid #e1e1e1;
        margin-left: -1px;
        margin-top: -1px;
      }

      .name {
        width: 20%;
        background: #f2f7fd;
        color: #626367;
      }

      .name:nth-child(even) {
        margin-left: -2px;
      }

      .content {
        display: flex;
        text-align: left;
        width: 30%;
        background: #fff;

        .multiple {
          margin-right: 8px;
          width: 100%;
        }
      }

      .content:nth-child(even) {
        margin-left: -2px;
      }
    }

    .ep-message-content {
      display: flex;
      overflow: inherit;
      border-radius: 6px;

      // border: 1px solid red;
      .ep-right {
        min-width: 200px;
        margin-left: 10px;
        display: flex;

        h1 {
          text-align: center;
          font-size: 28px;
          color: #f56c6c;
          margin: 20px 0 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #efefef;
        }

        .ep-right-item {
          margin-bottom: 5px;
          color: #1891ff;
          font-weight: bold;

          span {
            margin-right: 20px;
          }
        }
      }

      .ep-left {
        flex: 1;
      }

      .ep-right,
      .ep-left {
        background: #fff;
        padding: 20px;
        border-radius: 6px;

        // float: left\9;
        // margin-right: 10px\9;
      }

      .ep-card-title {
        font-size: 18px;
        color: #008af0;
        font-weight: bold;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;

        span {
          font-weight: normal;
          font-size: 14px;
          cursor: pointer;
        }
      }

      .el-list {
        .el-list-item {
          display: flex;
          margin-bottom: 20px;

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

            span:first-child {
              text-align: right;
              margin-right: 10px;
            }
          }

          .ep-special {
            color: #008af0;
            border-bottom: 1px solid #008af0;
            cursor: pointer;
          }

          .ep-special2 {
            color: #008af0;
            cursor: pointer;
          }

          div {
            flex: 1;
            overflow: visible;
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
              color: #008af0;
            }
          }

          .is-active {
            transform: rotate(180deg);
          }
        }
      }
    }

    .clearfix:after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
      height: 0;
    }
  }
</style>
