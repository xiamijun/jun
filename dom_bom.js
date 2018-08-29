/**
 * Created by jun_xie on 2017/8/4.
 * DOM和BOM操作
 */

/**
 * 手机类型判断
 */
const BrowserInfo = {
  userAgent: navigator.userAgent.toLowerCase(),
  isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
  isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
  isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
  isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig))
};

/**
 * 获取url参数
 * @param url
 *
 * getUrlPrmt('segmentfault.com/write?draftId=122000011938')
 * Object{draftId: "122000011938"}
 */
function getUtlPram(url) {
  url = url ? url : window.location.href;
  let str = url.substring(url.indexOf('?') + 1);
  let arrs = str.split('&');
  let result = {};
  arrs.forEach(item => {
    let keyArr = item.split('=');
    let name = keyArr[0];
    let value = keyArr[1];
    result[name] = value;
  });
  return result;
}

/**
 * 设置url参数
 * @param obj 如{'a':1,'b':2}
 * @returns {string}
 *
 * setUrlParme({'a':1,'b':2})
 * a=1&b=2
 */
function setParm(obj) {
  let arr = [];
  for (let key in obj) {
    arr.push(`${key}=${obj[key]}`);
  }
  return arr.join('&');
}

/**
 * 绑定事件
 * @type {Function}
 */
let addHandler = document.body.addEventListener ? function (target, eventType, handler) {
  target.addEventListener(eventType, handler, false);
} : function (target, eventType, handler) {
  target.attachEvent('on' + eventType, handler);
}


/**
 * 移除事件
 * @type {Function}
 */
let removeHandler = document.body.removeEventListener() ? function (target, eventType, handler) {
  target.removeEventListener(eventType, handler, false);
} : function (target, eventType, handler) {
  target.detachEvent('on' + eventType, handler);
};

/**
 * 检测DOM元素 是否有哪个类名
 * @param element
 * @param classStr
 * @returns {boolean}
 */
function hasClass(element, classStr) {
  if (element.className) {
    let arr = element.class.split(/\s+/);
    return arr.indexOf(classStr) !== -1;
  } else {
    return false;
  }
}

/**
 * 检测DOM元素 是否有哪个类名，方法二
 * @param element
 * @param classStr
 * @returns {boolean}
 */
function hasClass2(element, classStr) {
  return (new RegExp('\\s|^' + classStr + '\\s|$')).test(element.className);
}

/**
 * 添加DOM元素的类名
 * @param element
 * @param classStr
 */
function addClass(element, classStr) {
  if (!hasClass(element, classStr)) {
    element.className += ' ' + classStr;
  }
}

/**
 * 删除DOM元素的类名
 * @param element
 * @param classStr
 */
function removeClass(element, classStr) {
  if (hasClass(element, classStr)) {
    let reg = new RegExp("(^|\\s)" + classStr + "\\s|$");
    element.className = element.className.replace(reg, '');
  }
}

/**
 * 随机产生颜色
 * @returns {string}
 */
function randomColor() {
  // return 'rgb('+randomNumber(255)+','+randomNumber(255)+','+randomNumber(255)+')';
  return '#' + Math.random().toString(16).substr(2, 3)
}

/**
 * 设置cookie
 * @param name
 * @param value
 * @param days 过期时间
 */
function setCookie(name, value, days) {
  let date = new Date();
  date.setDate(date.getDate() + days);
  document.cookie = `${name}=${value};expires=${date}`;
}

/**
 * 根据name获取cookie
 * @param name
 * @returns {string}
 */
function getCookie(name) {
  let arr = document.cookie.split(';');
  arr.forEach(item => {
    let arr2 = item.split('=');
    if (arr2[0] === name) {
      return decodeURIComponent(arr2[1]);
    }
  });
  return '';
}

/**
 * 根据name删除cookie
 * @param name
 */
function removeCookie(name) {
  setCookie(name, 1, -1);
}

/**
 * 设置样式
 * @param obj
 * @param json
 */
function css(obj, json) {
  for (let attr in json) {
    obj.style[attr] = json[attr];
  }
}

/**
 * 取页面中所有的checkbox
 * @returns {Array}
 */
function getAllCheckbox() {
  let inputList = document.getElementsByTagName('input'),
    checkList = [],
    len = inputList.length;
  while (len--) {
    if (inputList[len].type === 'checkbox') {
      checkList.push(inputList[len]);
    }
  }
  return checkList;
}

/**
 * 获取滚动条距顶部的距离
 * @returns {number}
 */
function getScrollTop() {
  return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}

/**
 * 获取一个元素的距离文档(document)的位置
 * @param {HTMLElement} element
 * @returns {{left: number, top: number}}
 */
function offset(element) {
  let pos = {
    left: 0,
    top: 0
  };
  while (element) {
    pos.left += element.offsetLeft;
    pos.top += element.offsetTop;
    element = element.offsetParent;
  }
  return pos;
}

/**
 * 获取一个元素的距离文档(document)的位置
 * @param stopSelectorElement
 * @returns {{top: number, left: number, width: number, height: number}}
 */
HTMLElement.prototype.getOffset = function (stopSelectorElement) {
  let offsetParent = this.offsetParent;
  let top = this.offsetTop,
    left = this.offsetLeft;
  while (offsetParent) {
    top += offsetParent.offsetTop;
    left += offsetParent.offsetLeft;
    offsetParent = offsetParent.offsetParent;
    if (stopSelectorElement && offsetParent === stopSelectorElement) {
      break;
    }
  }
  return {top: top, left: left, width: this.offsetWidth, height: this.offsetHeight};
};