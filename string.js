/**
 * Created by jun_xie on 2017/8/4.
 * 字符串操作
 */

/**
 * 去除空格
 * @param str
 * @param type 1-所有空格  2-前后空格  3-前空格 4-后空格
 * @returns {void | string | *}
 */
function trimString(str, type = 1) {
  switch (type) {
    case 1:
      return str.replace(/\s+/g, '');
      break;
    case 2:
      return str.replace(/(^\s*)|(\s*$)/g, '');
      break;
    case 3:
      return str.replace(/(^\s*)/g, '');
      break;
    case 4:
      return str.replace(/(\s*$)/g, '');
      break;
  }
}

/**
 * 大小写转换
 * @param str
 * @param type
 * @returns {*}
 */
/**
 type
 1:首字母大写
 2：首字母小写
 3：大小写转换
 4：全部大写
 5：全部小写
 */
function changeCase(str, type) {
  function toggleCase(str) {
    let itemTest = '';
    str.split('').forEach(
      item => {
        if (/^([a-z]+)/.test(item)) {
          itemTest += item.toUpperCase();
        } else if (/(^[A-Z]+)/.test(item)) {
          itemTest += item.toLowerCase();
        } else {
          itemTest += item;
        }
      }
    );
    return itemTest;
  }

  switch (type) {
    case 1:
      return str.replace(/\b\w+\b/, v => {
        return v.substring(0, 1).toUpperCase() + v.substring(1).toLowerCase();
      });
      break;
    case 2:
      return str.replace(/\b\w+\b/, v => {
        return v.substring(0, 1).toLowerCase() + v.substring(1).toUpperCase();
      });
      break;
    case 3:
      return toggleCase(str);
      break;
    case 4:
      return str.toUpperCase();
      break;
    case 5:
      return str.toLowerCase();
      break;
  }
}


/**
 * 字符串循环复制
 * @param str
 * @param count 循环次数
 * @returns {string}
 */
function repeatStr(str, count) {
  let text = '';
  for (let i = 0; i < count; i++) {
    text += str;
  }
  return text
}


/**
 * 字符串替换
 * @param str 原字符串
 * @param findText 要替换的字符或者正则表达式（不要写g）
 * @param repText 替换成的字符串
 * @returns {void | string | *}
 */
function replaceAll(str, findText, repText) {
  let regExp = new RegExp(findText, g);
  return str.replace(regExp, repText);
}


/**
 * 字符替换
 * @param str 原字符串，
 * @param regArr 字符格式 [3,5,3]：3位5位3位分割
 * @param type 替换方式 0：中间*，两边保留
 * @param replaceText 替换的字符（默认*）
 * @returns {void | string | *}
 */
function replaceStr(str, regArr, type, replaceText = '*') {
  let regtext = '', reg = null;
  //replaceStr('18819322663',[3,5,3],0)
  //188*****663
  if (regArr.length === 3 && type === 0) {
    regtext = "(\\w{" + regArr[0] + "})\\w{" + regArr[1] + "}(\\w{" + regArr[2] + "})";
    reg = new RegExp(regtext);
    let replaceCount = repeatStr(replaceText, regArr[1]);
    return str.replace(reg, '$1' + replaceCount + '$2');
  }
  //replaceStr('asdasdasdaa',[3,5,3],1)
  //***asdas***
  else if (regArr.length === 3 && type === 1) {
    regtext = "\\w{" + regArr[0] + "}(\\w{" + regArr[1] + "})\\w{" + regArr[2] + "}";
    reg = new RegExp(regtext);
    let replaceCount1 = repeatStr(replaceText, regArr[0]);
    let replaceCount2 = repeatStr(replaceText, regArr[2]);
    return str.replace(reg, replaceCount1 + '$1' + replaceCount2);
  }
}


/**
 * 检查类型
 * @param str
 * @param type 类型；email，phone，number，english，chinese，lower，lower
 * @returns {boolean}
 *
 * checkType('165226226326','phone')
 * false
 */
function checkType(str, type) {
  switch (type) {
    case 'email':
      return /^(\w)+(\.\w+)*@(\w)+(\.\w+)*/.test(str);
      break;
    case 'phone':
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
      break;
    case 'number':
      return /^[0-9]+$/.test(str);
      break;
    case 'english':
      return /^[a-zA-Z]+$/.test(str);
      break;
    case 'chinese':
      return /^[\u4E00-\u9FA5]+$/.test(str);
      break;
    case 'lower':
      return /^[a-z]+$/.test(str);
      break;
    case 'lower':
      return /^[A-Z]+$/.test(str);
      break;
  }
}


/**
 * 检测密码强度
 * @param str
 * @returns {number}
 *
 * checkPwd('12asdASAD')
 * 3(强度等级为3)
 */
function checkPwd(str) {
  let lv = 0;
  if (str.length < 6) {
    return lv;
  }
  if (/[0-9]/.test(str)) {
    lv++;
  }
  if (/[a-z]/.test(str)) {
    lv++;
  }
  if (/[A-Z]/.test(str)) {
    lv++;
  }
  if (/[\.|_]/.test(str)) {
    lv++;
  }
  return lv;
}

/**
 * 现金额大写转换
 * @param n
 * @returns {string}
 */
function upDigit(n) {
  let fraction = ['角', '分', '厘'];
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  let unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
  let head = n < 0 ? '欠人民币' : '人民币';
  let s = '';
  n = Math.abs(n)
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

/**
 * 找出最长单词的长度
 * @param str
 * @param splitType
 * @returns {number}
 *
 * longestWord('Find the Longest word in a String')
 * 返回：7
 * longestWord('Find|the|Longest|word|in|a|String','|')
 * 返回：7
 */
function longestWord(str, splitType = ' ') {
  let max = 0;
  let strArr = str.split(splitType);
  strArr.forEach(item => {
    if (item.length > max) {
      max = item.length;
    }
  });
  return max;
}

/**
 * 评分
 * @param rate rate是[0,1,2,3,4,5]中的某个值
 * @returns {string}
 */
function setScore(rate) {
  return '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate);
}


/**
 * 获取连续子串的最大和
 * @param str
 * @returns {number}
 */
function getMaxSumOfSubstring(str) {
  let arr = str.split(' ');
  let len = arr.length;
  let newArr = [];
  arr.forEach(item => {
    item = parseInt(item);
    newArr.push(item);
  });
  for (let i = 0; i < len - 1; i++) {
    newArr.push(arr[i]);
    for (let j = i + 1; j < len; j++) {
      let item = 0;
      for (let t = i; t <= j; t++) {
        item += arr[t];
      }
      newArr.push(item);
    }
  }
  return Math.max(...newArr);
}

/**
 * 用newStr替换fullStr中的oldStr
 * @param oldStr 旧字符串
 * @param newStr 新字符串
 * @param fullStr 完整字符串
 * @returns {string}
 */
function replaceString(oldStr, newStr, fullStr) {
  return fullStr.split(oldStr).join(newStr);
}

/**
 * 获取中文长度，中文占用两个字符
 * @returns {number}
 */
String.prototype.charLength = function () {
  let len = 0;
  for (let i = 0; i < this.length; i++) {
    if (this.substr(i, 1).match(/[^\x00-\xff]/ig)) {
      len += 2;
    } else {
      len += 1;
    }
  }
  return len;
};