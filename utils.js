/**
 * Created by jun_xie on 2017/8/4.
 * 工具函数
 */

/**
 * 数据类型判断
 * @param o
 * @param type
 * @returns {*}
 *
 * isType([],'array')
 * 返回：true
 * isType([])
 * 返回：'[object Array]'
 */
function isType(o, type) {
  if (type) {
    let _type = type.toLowerCase();
    switch (_type) {
      case 'string':
        return Object.prototype.toString.call(o) === '[object String]';
        break;
      case 'number':
        return Object.prototype.toString.call(o) === '[object Number]';
        break;
      case 'boolean':
        return Object.prototype.toString.call(o) === '[object Boolean]';
        break;
      case 'undefined':
        return Object.prototype.toString.call(o) === '[object Undefined]';
        break;
      case 'null':
        return Object.prototype.toString.call(o) === '[object Null]';
        break;
      case 'function':
        return Object.prototype.toString.call(o) === '[object Function]';
        break;
      case 'array':
        return Object.prototype.toString.call(o) === '[object Array]';
        break;
      case 'object':
        return Object.prototype.toString.call(o) === '[object Object]';
        break;
      case 'nan':
        return isNaN(o);
        break;
      case 'elements':
        return Object.prototype.toString.call(o).indexOf('HTML') !== -1;
        break;
      default:
        return Object.prototype.toString.call(o);
        break;
    }
  } else {
    return Object.prototype.toString.call(o);
  }
}

/**
 * 返回数据类型
 * @param item
 * @returns {string}
 */
function gettype(item) {
  return Object.prototype.toString.call(item);
}

/** 封装ajax函数
 * @param {string}obj.type http连接的方式，包括POST和GET两种方式
 * @param {string}obj.url 发送请求的url
 * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}obj.data 发送的参数，格式为对象类型
 * @param {function}obj.success ajax发送并接收成功调用的回调函数
 * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
 */

/**
 * ajax({
 	type:'get',
 	url:'xxx',
 	data:{
 		id:'111'
 	},
 	success:function(res){
 		console.log(res)
 	}
 })
 */
function ajax(obj) {
  obj = obj || {};
  obj.type = obj.type.toUpperCase() || 'POST';
  obj.url = obj.url || '';
  obj.async = obj.anync || true;
  obj.data = obj.data || null;
  obj.success = obj.success || function () {
  };
  obj.error = obj.error || function () {
  };
  let xmlHttp = null;
  if (XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  } else {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  let params = [];
  for (let key in obj.data) {
    params.push(key + '+' + obj.data[key]);
  }
  let postData = params.join('&');
  if (obj.type.toUpperCase() === 'POST') {
    xmlHttp.open(obj.type, obj.url, obj.async);
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-from-urlencoded;charset=utf-8');
    xmlHttp.send(postData);
  } else if (obj.type.toUpperCase() === 'GET') {
    xmlHttp.open(obj.type, obj.url + '?' + postData, obj.async);
    xmlHttp.send(null);
  }
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      obj.success(xmlHttp.responseText);
    } else {
      obj.error(xmlHttp.responseText);
    }
  }
}

/**
 * 防抖
 * @param fn
 * @param wait
 * @returns {Function}
 */
export function debounce(fn, wait) {
  var timer = null;
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, wait)
  }
}

/**
 * 节流
 * @param fn
 * @param wait
 * @param time
 * @returns {Function}
 */
export function throttle(fn, wait, time) {
  let previous = null; //记录上一次运行的时间
  let timer = null;

  return function () {
    let now = +new Date();

    if (!previous) previous = now;
    //当上一次执行的时间与当前的时间差大于设置的执行间隔时长的话，就主动执行一次
    if (now - previous > time) {
      clearTimeout(timer);
      fn();
      previous = now;// 执行函数后，马上记录当前时间
    } else {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn();
      }, wait);
    }
  }
}

/**
 * 转义HTML字符串，防止xss攻击
 * @param {String} str 
 */
export const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
    ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    } [tag] || tag)
  );