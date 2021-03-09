<template>
  <div class="app-container">
    <el-row>
      <el-col :md="{ span: 6 }" :xs="{ span: 24 }">
        <el-row>
          <el-col>
            <div class="chart_panel">
              <el-row style="text-align:center">
                <el-col :md="{ span: 1 }" :xs="{ span: 1 }">
                  <i class="iconfont iconsafetycertificate" />
                </el-col>
                <el-col
                  :md="{ span: 13 }"
                  :xs="{ span: 13 }"
                  style="color:#6c6c6c;font-size:18px;"
                >{{ $t('form.safetyIndex') }}</el-col>
                <el-col
                  :md="{ span: 10 }"
                  :xs="{ span: 10 }"
                  style="color:#6c6c6c;font-size:12px;"
                >Prime score ™</el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div
                    style="text-align:center;front-size:25px"
                    :class="safety_index"
                  >{{ safetyIndex }}</div>
                </el-col>
                <el-col
                  style="position:absolute;right:0;bottom:0;color:#6c6c6c;"
                  :md="{ span: 5 }"
                  :xs="{ span: 5 }"
                >({{ $t('form.newest') }})</el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div style="height:2rem" />
                </el-col>
              </el-row>
              <el-row>
                <el-col :md="{ span: 12 }" :xs="{ span: 12 }">
                  <div class="percent1">{{ $t("message.YoY") }}：{{ percent1 }}</div>
                </el-col>
                <el-col :md="{ span: 12 }" :xs="{ span: 12 }">
                  <div class="percent1">{{ $t("message.MoM") }}：{{ percent2 }}</div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div class="panel-container" style="height:35rem">
              <el-row class="alarm_title">
                <el-col
                  style="color:#6c6c6c;font-size:16px;text-align:left;"
                  :md="{ span: 4 }"
                  :xs="{ span: 4 }"
                >
                  <svg-icon icon-class="lists" style="margin-left: 5px;" />
                </el-col>
                <el-col
                  style="color:#6c6c6c;font-size:16px;text-align:left;"
                  :md="{ span: 20 }"
                  :xs="{ span: 20 }"
                >{{ $t("listTitle.hostList") }}</el-col>
              </el-row>
              <el-row style="width:100%">
                <el-col>
                  <div style="height:10rem;width:100%;">
                    <el-table
                      class="elTable"
                      :data="listDate"
                      style="width: 100%;text-align:center;"
                      :row-style="{height:'5px'}"
                      :cell-style="{padding:'5px'}"
                      highlight-current-row
                      @current-change="handleCurrentChange"
                    >
                      <el-table-column :label="$t('form.DCSHost')">
                        <template slot-scope="scope">{{ scope.row.dcsName }}</template>
                      </el-table-column>
                      <el-table-column :label="$t('form.explain')">
                        <template slot-scope="scope">{{ scope.row.dceDesc }}</template>
                      </el-table-column>
                      <el-table-column :label="$t('form.RoboState')">
                        <template slot-scope="scope">{{ scope.row.robotstatus }}</template>
                      </el-table-column>
                      <el-pagination layout="prev, pager, next" :total="totals" />
                    </el-table>
                  </div>
                </el-col>
              </el-row>
              <el-row style="margin-top:6%;text-align:right">
                <el-col>
                  <span @click="ltPage">
                    <a style="color:#00ff00">&lt;</a>
                  </span>
                  {{ page }}
                  <span @click="gtPage">
                    <a style="color:#00ff00">&gt;</a>
                  </span>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div class="panel-container" style="height:100px">
                    <el-row>
                      <el-col>
                        <button
                          class="butRobot"
                          style="background-color: forestgreen;color:#fff"
                          @click="startRobot"
                        >{{ $t('form.startRobot') }}</button>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <button
                          class="butRobot"
                          style="background-color: #fff;color:red;"
                          @click="stopRobot"
                        >{{ $t('form.stopRobot') }}</button>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :md="{ span: 18 }" :xs="{ span: 24 }">
        <el-row>
          <el-col>
            <div id="div1" ref="div" class="camera_view">
              <camera-video-player v-if="loadSurvey" :csrc="cameraScr" />
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-left:1rem">
          <el-col>
            <div class="divTable">
              <el-table :data="alarmDate" class="elTable" style="width: 100%;text-align:center;">
                <el-table-column :label="$t('form.alarmSource')" width="110">
                  <template slot-scope="scope">{{ scope.row.alarmsource }}</template>
                </el-table-column>
                <el-table-column :label="$t('form.alarmDescribe')" width="230">
                  <template slot-scope="scope">{{ scope.row.dcsAlarmDesc }}</template>
                </el-table-column>
                <el-table-column :label="$t('form.alarmTime')">
                  <template slot-scope="scope">{{ scope.row.alarmTime }}</template>
                </el-table-column>
                <el-table-column :label="$t('form.DCSHost')">
                  <template slot-scope="scope">{{ scope.row.hostName }}</template>
                </el-table-column>
                <el-table-column :label="$t('form.sensor')">
                  <template slot-scope="scope">{{ scope.row.sensorid }}</template>
                </el-table-column>
                <el-table-column :label="$t('form.alarmLevel')">
                  <template slot-scope="scope">{{ scope.row.alarmLever }}</template>
                </el-table-column>
                <el-table-column :label="$t('form.alarmStatus')">
                  <template slot-scope="scope">
                    <span v-if="!scope.row.show">{{ scope.row.dcsAlarmState1 }}</span>
                    <el-select v-if="scope.row.show" v-model="scope.row.dcsAlarmState">
                      <el-option
                        v-for="status in statuss"
                        :key="status.id"
                        :value="status.id"
                        :label="status.name"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="CCTV">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      icon="el-icon-video-play"
                      @click="previewVideo(scope.$index,scope.row.alarmVideo,scope.row.id)"
                    >{{ $t("table.play") }}</el-button>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('form.dispose')">
                  <template slot-scope="scope">
                    <el-button v-if="!scope.row.show" type="text" icon="el-icon-edit" @click.native.prevent="editData(scope.$index)">{{ $t('table.edit') }}</el-button>
                    <el-button v-if="scope.row.show" type="text" icon="el-icon-check" @click.native.prevent="saveEdit(scope.$index)">{{ $t('table.save') }}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div style="background-color:#fff;text-align:right">
              <el-pagination
                background
                :page-sizes="[10, 20, 30, 40]"
                :page-size="next"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange1"
              />
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  safeNum, // 主机列表查询
  RpaStart, // 启动RPA,带参数
  RpaStop, // 关闭RPA,带参数
  allDcsAlarm, // 报警列表,带参数
  currentSafeNum, // 安全系数,
  updateStateByID, // 修改状态,带参数
  getCameraVideoPath // 视频播放地址
} from '@/api/DSCAlarm'
import CameraVideoPlayer from '@/components/CameraVideoPlayer'
export default {
  name: 'DCSAlarm',
  components: {
    CameraVideoPlayer
  },
  data() {
    return {
      loadSurvey: true, // 视频显示
      // cameraScr: [],
      cameraScr: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', // 选择视频
      next: 5, // 每页数量
      pager: 1, // 页数
      prev: 1, // 起始位置
      sizes: 10, // 字体大小
      total: 0, //
      totals: 0, //
      alarmDate: [], // 报警记录数据
      alarmPage: 1, // 报警记录页数
      alarmSize: 4, // 报警记录每页数量
      currentRow: '', // 选择主机
      safetyIndex: 100, // 安全指数
      tableDate: [], // 主机列表数据
      index: 0, // 起始位置
      page: 1, // 页数
      num: 6, // 每页数量
      percent1: '', // 同比
      percent2: '', // 环比
      statuss: [
        { id: 1, name: this.$t('select.untreated') },
        { id: 2, name: this.$t('select.processed') },
        { id: 3, name: this.$t('select.Misjudgment') }
      ]
    }
  },
  computed: {
    // 安全指数颜色
    safety_index() {
      let colorSafety = ''
      if (this.safetyIndex >= 80) {
        colorSafety = 'safety_index'
      } else if (this.safetyIndex >= 60) {
        colorSafety = 'safety_index2'
      } else {
        colorSafety = 'safety_index3'
      }
      return colorSafety
    },
    listDate() {
      const list = []
      let i = 0
      for (i; i < this.num; i++) {
        if (this.index + i < this.tableDate.length) {
          list.push(this.tableDate[this.index + i])
        }
      }
      return list
    }
  },
  mounted() {
  },
  created() {
    this.querySafe()
    this.allDcsAlarmQuery()
    this.dateFormat()
  },
  methods: {
    // 编辑数据
    editData(val) {
      const let1 = this.alarmDate[val]
      let1.show = true
      this.alarmDate.splice(val, 1, let1)
    },
    // 保存数据
    saveEdit(val) {
      const let1 = this.alarmDate[val]
      let1.show = false
      this.alarmDate.splice(val, 1, let1)
      this.updateState({ id: this.alarmDate[val].id, state: this.alarmDate[val].dcsAlarmState })
    },
    // 修改状态
    updateState(val) {
      updateStateByID(val).then(response => {
        this.allDcsAlarmQuery()
      })
    },
    // 播放点击事件
    previewVideo(index, url, id) {
      const userId = this.$store.getters.user.id
      this.lookCameraVideoPath({
        cameraId: id,
        accountId: userId
      })
      this.isVideo = true
    },
    // 安全系数
    async queryCurrentSafeNum(data) {
      const val = await currentSafeNum(data)
      this.safetyIndex = val.data.data.safetyIndex
      this.percent1 = val.data.data.YoY
      this.percent2 = val.data.data.Chain
    },
    // 视频播放地址
    async lookCameraVideoPath(param) {
      const val = await getCameraVideoPath(param)
      this.cameraScr = val
    },
    // 查询报警记录
    allDcsAlarmQuery() {
      allDcsAlarm({ page: this.alarmPage, size: this.alarmSize }).then(
        (item) => {
          // this.alarmDate = [
          //   {
          //     id: 1,
          //     dcsAlarmState: 1,
          //     alarmsource: '2',
          //     dcsAlarmDesc: '2',
          //     alarmTime: '2',
          //     hostName: '2',
          //     sensorid: '2',
          //     alarmLever: '2'
          //   },
          //   {
          //     id: 2,
          //     dcsAlarmState: 2,
          //     alarmsource: '2',
          //     dcsAlarmDesc: '2',
          //     alarmTime: '2',
          //     hostName: '2',
          //     sensorid: '2',
          //     alarmLever: '2'
          //   },
          //   {
          //     id: 3,
          //     dcsAlarmState: 3,
          //     alarmsource: '2',
          //     dcsAlarmDesc: '2',
          //     alarmTime: '2',
          //     hostName: '2',
          //     sensorid: '2',
          //     alarmLever: '2'
          //   }
          // ]
          // this.total = this.alarmDate.length
          this.total = item.data.data.totalNum
          this.alarmDate = item.data.data.list
          this.alarmDate.forEach((element) => {
            element.show = false
            if (element.dcsAlarmState === 2) {
              element.dcsAlarmState1 = '已处理'
            } else if (element.dcsAlarmState === 3) {
              element.dcsAlarmState1 = '误判'
            } else {
              element.dcsAlarmState1 = '未处理'
            }
          })
        }
      )
    },
    // 上一页主机列表
    ltPage() {
      if (this.page !== 1) {
        this.page -= 1
        this.index -= this.num
      }
    },
    // 下一页主机列表
    gtPage() {
      if (this.page * this.num < this.tableDate.length) {
        this.index += this.num
        this.page += 1
      }
    },
    // 查询主机列表
    async querySafe() {
      const item = await safeNum()
      this.tableDate = item.data
      this.totals = this.tableDate.length
    },
    // 主机选择行
    handleCurrentChange(val) {
      this.currentRow = val
    },
    handleCurrentChange1(val) {
      this.pager = val
      this.allDcsAlarmQuery()
    },
    handleSizeChange(val) {
      this.next = val
    },
    // 启动robot
    startRobot() {
      if (this.currentRow === '') {
        this.$message({
          message: '请选择要开启的主机!',
          type: 'warning'
        })
      } else {
        if (this.currentRow.robotstatus === 'start') {
          this.$message({
            message: '该主机已经开启!',
            type: 'warning'
          })
        } else {
          RpaStart({ ip: this.currentRow.ip }).then((item) => {
            this.$message({
              message: '开启成功!',
              type: 'success'
            })
          })
        }
      }
    },
    // 时间格式化函数，此处仅针对yyyy-MM-dd hh:mm:ss 的格式进行格式化
    dateFormat() {
      var date = new Date()
      var year = date.getFullYear()
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      // 拼接
      const time = year + '-' + month + '-' + day
      this.queryCurrentSafeNum({
        startTime: time,
        endTime: time
      })
    },
    // 关闭robot
    stopRobot() {
      if (this.currentRow === '') {
        this.$message({
          message: '请选择要关闭的主机!',
          type: 'warning'
        })
      } else {
        if (this.currentRow.robotstatus === 'stop') {
          this.$message({
            message: '该主机关闭!',
            type: 'warning'
          })
        } else {
          RpaStop({ ip: this.currentRow.ip }).then((item) => {
            this.$message({
              message: '关闭成功!',
              type: 'success'
            })
          })
        }
      }
    }
  }
}
</script>
<style scoped>
.percent1 {
  color: forestgreen;
  text-align: center;
}
.butRobot {
  margin-top: 1rem;
  width: 100%;
  height: 5rem;
  border-color: red;
}
.butRobot:hover {
  color: silver;
  border-color: silver;
  cursor: pointer;
}
.divTable {
  height: 10rem;
  overflow-y: auto;
  overflow-x: auto;
}
</style>
