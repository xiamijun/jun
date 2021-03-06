/**
 * Created by jun_xie on 2017/8/4.
 * 数字处理
 */


/**
 * 随机码
 * @param count 进制 取值范围0-36进制
 * @returns {string}
 *
 * randomWord(10)
 * "2584316588472575"
 * randomWord(36)
 * "83vhdx10rmjkyb9"
 */
function randomString(count) {
  return Math.random().toString(count).substring(2);
}

/**
 * 阶乘
 * @param n
 * @returns {*}
 */
import {
  array_product,
  range
} from './array_object'

function factorial(n) {
  return array_product(range(1, n));
}

/**
 * 排列数
 * @param n
 * @param m
 * @returns {number}
 */
function A(n, m) {
  return factorial(n) / factorial(n - m);
}


/**
 * 组合数
 * @param n
 * @param m
 * @returns {number}
 */
function C(n, m) {
  return A(n, m) / factorial(m);
}

/**
 * 随机返回一个范围内的随机数，无参数时返回0-255
 * @param n1 起始范围
 * @param n2 结束范围
 * @returns {number}
 */
function randomNumber(n1, n2) {
  if (arguments.length === 2) {
    return Math.round(n1 + Math.random() * (n2 - n1));
  } else if (arguments.length === 1) {
    return Math.round(Math.random() * n1);
  } else {
    return Math.round(Math.random() * 255);
  }
}

/**
 * 金钱格式化
 * @param str
 * @returns {T}
 *
 * 1234567890 --> 1,234,567,890
 */
function formatCash(str) {
  // return str.split('').reverse().reduce((prev, next, index) => {
  //   return ((index % 3) ? next : (next + ',')) + prev;
  // })

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

/**
 * 生成6位数字验证码
 * @returns {string}
 */
function getVCodeOfXix() {
  return Math.random().toString().slice(-6);
}

/**
 * 判断是否为质数
 * @param n
 * @returns {boolean}
 */
function isPrime(n) {
  return !(/^.?$|^(..+?)\1+$/).test('1'.repeat(n))
}

/**
 * 浮点数四舍五入  v表示要保存小数位
 * @param num
 * @param v
 * @returns {number}
 */
function decimal(num, v) {
  let vv = Math.pow(10, v);
  return Math.round(num * vv) / vv;
}

/**
 * 小数转百分比
 * @param {Number} point 小数
 * @param {Number} fixed 保留小数位数
 */
export const toPercent = (point, fixed) => {
  let str = Number(point * 100).toFixed(fixed);
  str += '%';
  return str;
};

// 补零
// const num = FillZero(169, 5);
// num => "00169"
function fillZero(num, len) {
  return num.toString().padStart(len, "0");
}

// 精确到几位小数
// const num = RoundNum(1.69, 1);
// num => 1.7
function roundNum(num, decimal) {
  return Math.round(num * 10 ** decimal) / 10 ** decimal
}

/**
 * 数组乱序重排，从最后一个元素开始，从数组中随机选出一个位置，交换，直到第一个元素。
 * @param {Array} arr 
 */
export function disorder(arr) {
  let length = arr.length
  let current = length - 1
  let random
  while (current > -1) {
    random = Math.floor(Math.random() * length)[arr[current], arr[random]] = [arr[random], arr[current]]
    current--
  }
  return arr
}