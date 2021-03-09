import request from '@/utils/request'

// 主机列表查询
export function safeNum() {
  return request({
    url: '/api1/DcsWin/safeNum',
    method: 'post'
  })
}

// 启动RPA
export function RpaStart(param) {
  return request({
    url: '/api1/mq/RpaStart',
    method: 'post',
    data: param
  })
}
// 关闭RPA
export function RpaStop(param) {
  return request({
    url: '/api1/mq/RpaStop',
    method: 'post',
    data: param
  })
}

// 报警列表
export function allDcsAlarm(param) {
  return request([{
    url: '/api1/DcsWin/allDcsAlarm',
    method: 'post',
    data: param
  }])
}

// 安全系数
export function currentSafeNum(param) {
  return request({
    url: '/api1/DcsWin/currentSafeNum',
    method: 'post',
    data: param
  })
}

// 修改状态
export function updateStateByID(param) {
  return request({
    url: '/api1/dcsAlarmRecord/updateStateByID',
    method: 'post',
    data: param
  })
}
// 获取播放地址
export function getCameraVideoPath(param) {
  return request({
    url: '/api6/api/getCameraVideoPath',
    method: 'get',
    data: param
  })
}
