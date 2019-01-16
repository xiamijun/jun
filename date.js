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

/**
 * 取昨天
 */
function yesterday() {
  return new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1);
}

/**
 * 判断两个时间间隔是否超过一个月
 * @param {Date} startTime 
 * @param {Date} endTime 
 */
function isBeyondMonth(startTime, endTime) {
  let sDate = new Date(startTime);
  let eDate = new Date(endTime);

  if (eDate.getFullYear() - sDate.getFullYear() > 1) {
    //先比较年
    return true;
  } else if (eDate.getMonth() - sDate.getMonth() > 1) {
    //再比较月
    return true;
  } else if (eDate.getMonth() - sDate.getMonth() == 1) {
    if (eDate.getDate() - sDate.getDate() >= 1) {
      return true;
    }
  } else if (eDate.getFullYear() - sDate.getFullYear() == 1) {
    if (eDate.getMonth() + 12 - sDate.getMonth() > 1) {
      return true;
    } else if (eDate.getDate() - sDate.getDate() >= 1) {
      return true;
    }
  }
  return false;
}

/**
 * 获取周次
 * @param {Date} z 
 */
function getweek(z) {
  //参数z是"2018-05-07 15:12:36"或者"2018/05/07 15:12:36"
  let day = Date.parse(z);
  let day11 = new Date(day);
  day11.setMonth(0);
  day11.setDate(1);
  day11.setHours(0);
  day11.setMinutes(0);
  day11.setSeconds(0); //到这里就得到该年的一月一日

  let day11mill = day11.getTime();
  let ori_day = day11.getDay(); //该年的一月一日是星期几
  let fill1 = 0; //与星期日相隔的毫秒数
  if (ori_day !== 0) {
    fill1 = ori_day * 60 * 60 * 24 * 1000;
  }

  let now = Date.parse(z);
  now = new Date(now);
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  let nowmill = now.getTime();
  let now_day = now.getDay();
  let fill2 = 0;
  if (now_day !== 0) {
    fill2 = (7 - now_day) * 60 * 60 * 24 * 1000;
  }

  let cha2 = (nowmill - day11mill + fill1 + fill2) / (60 * 60 * 24 * 1000);
  let week = Math.ceil(cha2 / 7);
  if (week < 10) {
    week = '0' + week;
  }
  let year = now.getFullYear().toString();
  year = year.substring(2);
  return week;
}