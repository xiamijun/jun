/**
 * Created by jun_xie on 2017/8/4.
 * 数组、对象操作
 */
/**
 * 数组去重
 * @param arr
 * @returns {any[]}
 */
function removeRepeatArray(arr) {
  return Array.from(new Set(arr));
}

/**
 * 数组去重2
 * @param arr
 * @returns {any[]}
 */
function removeRepeatArray2(arr) {
  return [...new Set(arr)];
}


/**
 * 数组顺序打乱
 * @param arr
 * @returns {void | *}
 */
function shuffleArray(arr) {
  return arr.sort(
    () => Math.random() - 0.5
  )
}


/**
 * 求数组最大值
 * @param arr
 * @returns {number}
 */
function maxArray(arr) {
  // return Math.max.apply(null,arr);
  return Math.max(...arr);
}

/**
 * 求数组最小值
 * @param arr
 * @returns {number}
 */
function minArray(arr) {
  // return Math.min.apply(null,arr);
  return Math.min(...arr);
}


/**
 * 数组求和
 * @param arr
 * @returns {*}
 */
function sumArr(arr) {
  return arr.reduce((pre, cur) => {
      return pre + cur;
    }
  );
}


/**
 * 数组元素乘积
 * 等同php中的array_product
 * @param arr
 * @returns {*}
 */
export function array_product(arr) {
  return arr.reduce((pre, cur) => {
      return pre * cur;
    }
  );
}


/**
 * 创建范围为low至high的连续数组
 * range(1,10)等同于php中的range方法 => [1,2,3,4,5,6,7,8,9,10]
 * @param low
 * @param high
 * @returns {Array}
 */
export function range(low, high) {
  let arr = [];
  while (low <= high) {
    arr.push(low++);
  }
  return arr;
}

/**
 * 从数组中随机取元素
 * @param arr
 * @returns {*}
 */
function randomOneOfArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


/**
 * 数组（字符串）一个元素出现的次数
 * @param obj
 * @param ele
 * @returns {number}
 */
function getEleCount(obj, ele) {
  let num = 0;
  obj.forEach(item => {
    if (item === ele) {
      num++;
    }
  });
  return num;
}


/**
 * 统计数组中所有元素出现的次数
 * 等同于php中的array_count_values，但返回的是对象
 * @param arr
 */
function array_count_values(arr) {
  let map = {};
  arr.forEach(item => {
    if (!map[item]) {
      map[item] = 1;
    } else {
      map[item]++;
    }
  });
  return map;
}


/**
 * 统计数组中所有元素出现的次数，方法二
 * @param arr
 * @returns {*}
 */
function array_count_values2(arr) {
  return arr.reduce((pre, cur) => {
    pre[cur] ? pre[cur]++ : pre[cur] = 1;
    return pre;
  }, {})
}


/**
 * 返回数组(对象)中部分的或所有的键名
 * 等同于php中的array_keys
 * @param obj
 * @param search_value
 * @returns {*}
 */
function array_keys(obj, search_value) {
  if (!search_value) {
    return Object.keys(obj);
  } else {
    let indices = [];
    let idx = obj.indexOf(search_value);
    while (idx != -1) {
      indices.push(idx);
      idx = obj.indexOf(search_value, idx + 1);
    }
    return indices;
  }
}

/**
 * 对象的值转为数组
 * @param obj
 * @returns {Array}
 */
function objToArray(obj) {
  let arr = [];
  for (let i in obj) {
    arr.push(obj[i]);
  }
  return arr;
}

/**
 * 筛选数组，删除值为'val'的数组元素
 * @param arr 原数组
 * @param val 删除的值
 * @param type %：带有'val'的都删除。为空：数组元素的值全等于'val'才被删除
 *
 * removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
 * 返回：["aaa"]   带有'test'的都删除
 * removeArrayForValue(['test','test1','test2','test','aaa'],'test')
 * 返回：["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
 */
function removeValueInArray(arr, val, type) {
  arr.filter(item => {
      return type === '%' ? item.indexOf(val) !== -1 : item !== val;
    }
  );
}

/**
 * 清除对象中值为空的属性
 * @param obj
 *
 * filterParams({a:"",b:null,c:"010",d:123})
 * 返回：Object {c: "010", d: 123}
 */
function filterParams(obj) {
  let newPar = {};
  for (let key in obj) {
    if (obj[key] && obj[key] !== null && obj[key] !== undefined) {
      newPar[key] = obj[key];
    }
  }
  return newPar;
}

/**
 * 获取对象数组某些项
 * @param arr 原数组
 * @param keys 获取的key
 * @param type 1：只需要获取某一项的值
 * @returns {*}
 *
 * var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
 * getOptionArray(arr,'a,c')
 * 返回：[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
 * getOptionArray(arr,'b',1)
 * 返回：[2, 3, 9, 2, 5]
 */
function getOptionArray(arr, keys, type) {
  let newArr = [];
  if (!keys) {
    return arr;
  }
  //是否只是需要获取某一项的值
  if (type === 1) {
    arr.forEach(item => {
      newArr.push(item[keys]);
    });
    return newArr;
  }
  let _keys = keys.split(',');
  let newArrOne = {};
  for (let i = 0; i < arr.length; i++) {
    newArrOne = {};
    for (j = 0; j < _keys.length; j++) {
      newArrOne[_keys[j]] = arr[i][_keys[j]];
    }
    newArr.push(newArrOne);
  }
  return newArr;
}

/**
 * 排除数组某些项
 * @param arr 原数组
 * @param keys 需删除的key值
 * @returns {Array}
 *
 * var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
 * filterOptionArray(arr,'a')
 * 返回：[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
 * filterOptionArray(arr,'a,c')
 * 返回：[{b:2},{b:3},{b:9},{b:2},{b:5}]
 */
function filterOptionArray(arr, keys) {
  let newArr = [];
  let _keys = keys.split(',');
  let newArrOne = {};
  for (let i = 0; i < arr.length; i++) {
    arr.forEach(item => {
      newArrOne = {};
      for (let content in item) {
        if (_keys.indexOf(content) === -1) {
          newArrOne[content] = arr[i][content];
        }
      }
      newArr.push(newArrOne);
    })
  }
  return newArr;
}

/**
 * 对象数组的排序
 * @param arr
 * @param sortText 排序条件
 * @returns {*}
 *
 * var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
 * arraySort(arr,'a,b')  a是第一排序条件，b是第二排序条件
 */
function arraySort(arr, sortText) {
  if (!sortText) {
    return arr;
  }
  let _sortText = sortText.split(',').reverse();
  let _arr = arr;
  for (let i = 0; i < _sortText.length; i++) {
    _arr.sort((n1, n2) => {
      return n1[_sortText[i]] - n2[_sortText[i]];
    })
  }
  return _arr;
}

/**
 * 二维数组扁平化
 * @param arr
 * @returns {*}
 */
function flatArr(arr) {
  return arr.reduce((a, b) => {
    a.concat(b);
  });
}

/**
 * 深拷贝
 * @param value
 * @returns {*}
 */
function deepClone(value) {
  let copy;
  if (typeof value !== 'object') {
    return value;
  }
  if (value instanceof Array) {
    copy = [];
    value.forEach(item => {
      copy[i] = deepClone(item);
    });
    return copy;
  }
  if (value instanceof Object) {
    copy = {};
    for (let key in value) {
      copy[key] = deepClone(value[key]);
    }
  }
  return copy;
}


/**
 * 判断空数组，null,undefined,空字符串,空对象
 * @param obj
 * @returns {boolean}
 */
export function isEmpty(obj) {
  //基础数据类型，是非空值
  if (typeof obj === 'boolean' || typeof obj === 'number') {
    return false
  }
  if (obj === '' || obj === null || obj === undefined || (obj && Array.isArray(obj) && !obj.length) || (obj && Object.keys(obj).length === 0)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 生成一个长度为m且值都n的数组
 * @param m
 * @param n
 * @returns {any[]}
 */
function setArray(m, n) {
  return Array(m).fill(n);
}