/**
 * Created by jun_xie on 2017/8/4.
 * 日期时间处理
 */

/**
 * 到某一个时间的倒计时
 * @param endTime
 * @returns {string}
 *
 * countTime('2017/7/22 16:0:0')
 * 返回："剩余时间6天 2小时 28 分钟20 秒"
 */
function countTime(endTime) {
  let startDate = new Date();
  let endDate = new Date(endTime);
  let totalSecs = (endDate.getTime() - startDate.getTime()) / 1000;
  if (totalSecs >= 0) {
    let d = Math.floor(totalSecs / (24 * 60 * 60)),
      lefTime = Math.floor(totalSecs % (24 * 60 * 60));
    let h = Math.floor(lefTime / (60 * 60)),
      leftTime2 = Math.floor(lefTime % (60 * 60));
    let m = Math.floor(leftTime2 / 60),
      s = Math.floor(leftTime2 % 60);
    return '剩余时间：' + d + '天' + h + '小时' + m + '分' + s + '秒';
  } else {
    return '时间已过期';
  }
}

/**
 * 日期格式化 yyyy-MM-dd hh:mm:ss
 * @param format
 * @returns {*}
 */
Date.prototype.format = function (format) {
  let o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};