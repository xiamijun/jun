/**
 * Created by jun_xie on 2017/8/4.
 * DOM和BOM操作
 */

/**
 * 浏览器类型判断
 */
const browser = {
  info: (function () {
    let u = navigator.userAgent,
      p = navigator.platform;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信
      webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
      UCB: u.match(/UCBrowser/i) === "UCBrowser",
      QQB: u.match(/MQQBrowser/i) === "MQQBrowser",
      win: p.indexOf('Win') > -1, //判断是否是WIN操作系统
      mac: p.indexOf('Mac') > -1 //判断是否是Mac操作系统
    };
  })()
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
  return {
    top: top,
    left: left,
    width: this.offsetWidth,
    height: this.offsetHeight
  };
};

/**
 * 根据URL下载文件
 * @param url
 * @returns {boolean}
 */
function download(url) {
  let isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  let isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;

  if (isChrome || isSafari) {
    let link = document.createElement('a');
    link.href = url;

    if (link.download !== undefined) {
      let fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
      link.download = fileName;
    }

    if (document.createEvent) {
      let e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }

  if (url.indexOf('?') === -1) {
    url += '?download';
  }

  window.open(url, '_self');
  return true;
}
