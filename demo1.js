/**
 * Created by jun_xie on 2017/8/4.
 */
//手机类型判断
const BrowserInfo={
	userAgent:navigator.userAgent.toLowerCase(),
	isAndroid:Boolean(navigator.userAgent.match(/android/ig)),
	isIphone:Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
	isIpad:Boolean(navigator.userAgent.match(/ipad/ig)),
	isWeixin:Boolean(navigator.userAgent.match(/MicroMessenger/ig))
};

//返回字符串长度，汉字计数为2
function strLength(str) {
	let a=0;
	for (let i=0;i<str.length;i++){
		if (str.charCodeAt(i)>255){
			a+=2;
		}else {}
		a++;
	}
	return a;
}

//获取url参数
//getUrlPrmt('segmentfault.com/write?draftId=122000011938')
//Object{draftId: "122000011938"}
function getUrlPrmt(url) {
	url=url?url:window.location.href;
	let pa=url.substring(url.indexOf('?')+1),
		arrs=pa.split('&'),
		result={};
	for (let i=0;i<arrs.length;i++){
		let pos=arrs[i].indexOf('=');
		if (pos==-1){
			continue;
		}
		let name=arrs[i].substring(0,pos),
			value=decodeURIComponent(arrs[i].substring(pos+1));
		result[name]=value;
	}
	return result;
}

//设置url参数
//setUrlParme({'a':1,'b':2})
//a=1&b=2
function setUrlParme(obj) {
	let result=[];
	for (let key in obj){
		if (obj[key]){
			result.push(key+'='+obj[key]);
		}
	}
	return result.join('&');
}

//移除事件
function moveBind(objId,eventType,callback) {
	let obj=document.getElementById(objId);
	if(obj.removeEventListener){
		obj.removeEventListener(eventType,callback);
	}else if(obj.detachEvent){
		obj.detachEvent('on'+eventType,callback);
	}else {
		obj['on'+eventType]=null;
	}
}

//去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
function trimString(str,type=1) {
	switch (type){
		case 1:
			return str.replace(/\s+/g,'');
			break;
		case 2:return str.replace(/(^\s*)|(\s*$)/g,'');
			break;
		case 3:
			return str.replace(/(^\s*)/g,'');
			break;
		case 4:
			return str.replace(/(\s*$)/g,'');
			break;
	}
}

/*type
 1:首字母大写
 2：首字母小写
 3：大小写转换
 4：全部大写
 5：全部小写
 * */
function changeCase(str,type) {
	function toggleCase(str) {
		let itemTest='';
		str.split('').forEach(
			item=>{
				if(/^([a-z]+)/.test(item)){
					itemTest+=item.toUpperCase();
				}else if (/(^[A-Z]+)/.test(item)){
					itemTest+=item.toLowerCase();
				}else {
					itemTest+=item;
				}
			}
		);
		return itemTest;
	}
	switch(type){
		case 1:
			return str.replace(/\b\w+\b/,v=>{
				return v.substring(0,1).toUpperCase()+v.substring(1).toLowerCase();
			});
			break;
		case 2:
			return str.replace(/\b\w+\b/,v=>{
				return v.substring(0,1).toLowerCase()+v.substring(1).toUpperCase();
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

//字符串循环复制
//repeatStr('123',3)
//"123123123"
function repeatStr(str,count) {
	let text='';
	for (let i=0;i<count;i++){
		text+=str;
	}
	return text
}

//字符串替换(字符串,要替换的字符或者正则表达式（不要写g）,替换成什么)
function replaceAll(str,aFindText,aRepText) {
	aRegExp=new RegExp(aFindText,g);
	return str.replace(aRegExp,aRepText);
}

//字符替换
//replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
function replaceStr(str,regArr,type,replaceText='*') {
	let regtext='',reg=null;
	//replaceStr('18819322663',[3,5,3],0)
	//188*****663
	if (regArr.length==3&&type==0){
		regtext="(\\w{"+regArr[0]+"})\\w{"+regArr[1]+"}(\\w{"+regArr[2]+"})";
		reg=new RegExp(regtext);
		let replaceCount=repeatStr(replaceText,regArr[1]);
		return str.replace(reg,'$1'+replaceCount+'$2');
	}
	//replaceStr('asdasdasdaa',[3,5,3],1)
	//***asdas***
	else if (regArr.length==3&&type==1){
		regtext="\\w{"+regArr[0]+"}(\\w{"+regArr[1]+"})\\w{"+regArr[2]+"}";
		reg=new RegExp(regtext);
		let replaceCount1=repeatStr(replaceText,regArr[0]);
		let replaceCount2=repeatStr(replaceText,regArr[2]);
		return str.replace(reg,replaceCount1+'$1'+replaceCount2);
	}
}

//checkType('165226226326','phone')
//false
function checkType(str,type) {
	switch (type){
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
		case 'upper':
			return /^[A-Z]+$/.test(str);
			break;
	}
}

//检测密码强度
//checkPwd('12asdASAD')
//3(强度等级为3)
function checkPwd(str) {
	let lv=0;
	if (str.length<6){
		return lv;
	}
	if (/[0-9]/.test(str)){
		lv++;
	}
	if (/[a-z]/.test(str)){
		lv++;
	}
	if (/[A-Z]/.test(str)){
		lv++;
	}
	if (/[\.|_]/.test(str)){
		lv++;
	}
	return lv;
}

//随机码
//count取值范围0-36
//randomWord(10)
//"2584316588472575"
//randomWord(36)
//"83vhdx10rmjkyb9"
function randomString(count) {
	return Math.random().toString(count).substring(2);
}

//数组去重
function removeRepeatArray(arr) {
	return Array.from(new Set(arr));
}

//数组顺序打乱
function shuffleArray(arr) {
	return arr.sort(
		()=>Math.random()-0.5
	)
}

//求数组最大最小值
function maxArray(arr) {
	// return Math.max.apply(null,arr);
	return Math.max(...arr);
}
function minArray(arr) {
	// return Math.min.apply(null,arr);
	return Math.min(...arr);
}

//数组求和
function sumArr(arr) {
	return arr.reduce(
		(pre,cur)=>{return pre+cur;}
	);
}

//数组元素乘积
//等同php中的array_product
function array_product(arr) {
	return arr.reduce(
		(pre,cur)=>{return pre*cur;}
	);
}

//从数组中随机取元素
function randomOneOfArray(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

//数组（字符串）一个元素出现的次数
function getEleCount(obj,ele) {
	let num=0;
	for(let i=0;i<obj.length;i++){
		if (obj[i]==ele){
			num++;
		}
	}
	return num;
}

//统计数组（字符串）所有元素出现的次数
//等同于php中的array_count_values，但返回的是对象
function array_count_values(arr) {
	let map={};
	for (let i=0;i<arr.length;i++){
		if (!map[arr[i]]){
			map[arr[i]]=1;
		}else {
			map[arr[i]]++;
		}
	}
	return map;
}

//返回数组(对象)中部分的或所有的键名
//等同于php中的array_keys
function array_keys(obj,search_value) {
	if (!search_value){
		return Object.keys(obj);
	}else {
		indices=[];
		let idx=obj.indexOf(search_value);
		while (idx!=-1){
			indices.push(idx);
			idx=obj.indexOf(search_value,idx+1);
		}
		return indices;
	}
}

//对象的值转为数组
function objToArray(obj) {
    let arr=[];
    for(let i in obj){
        arr.push(obj[i]);
    }
    return arr;
}

//筛选数组
//删除值为'val'的数组元素
//removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
//["aaa"]   带有'test'的都删除
//removeArrayForValue(['test','test1','test2','test','aaa'],'test')
//["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
function removeValueInArray(arr,val,type) {
	arr.filter(
		item=>{
			return type==='%'?item.indexOf(val)!=-1:item!=val;
		}
	);
}

//检测对象是否有哪个类名
function hasClass(obj,classStr) {
	if (obj.className){
        let arr=obj.class.split(/\s+/);
        return arr.indexOf(classStr)==-1?false:true;
	}else {
		return false;
	}

}

//添加类名
function addClass(obj,classStr) {
	if (isType(obj,'array')||isType(obj,'elements')&&obj.length>=1){
		for(let i=0;i<obj.length;i++){
			if (!hasClass(obj,classStr)){
				obj[i].className+=' '+classStr;
			}
		}
	}else {
        if (!hasClass(obj,classStr)){
            obj.className+=' '+classStr;
        }
	}
}

//删除类名
function removeClass(obj,classStr) {
	if(isType(obj,'array')||isType(obj,'elements')&&obj.length>1){
		for (let i=0;i<obj.length;i++){
			if (hasClass(obj,classStr)){
				let reg=new RegExp('\\s|^'+classStr+'\\s|$');
				obj[i].className=obj.className.replace(reg,'');
			}
		}
	}else {
        if(hasClass(obj,classStr)){
            let reg=new RegExp("(^|\\s)"+classStr+"\\s|$");
            obj.className=obj.className.replace(reg,'');
        }
	}
}

//获取兄弟节点
function siblings(obj) {
	let a=[];//定义一个数组，用来存obj的兄弟元素
	//先取obj的哥哥们
	let p=obj.previousSibling;
	while (p){
		if (p.nodeType==1){
			a.push(p);
		}
		p=p.previousSibling;
	}
	a.reverse();//把顺序反转一下 这样元素的顺序就是按先后的了
	let n=obj.nextSibling;//再取obj的弟弟
	while (n){
		if (n.nodeType==1){
			a.push(n);
		}
		n=n.nextSibling;
	}
}

//现金额大写转换
function upDigit(n) {
	let fraction=['角','分','厘'];
	let digit=['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	let unit=[['元', '万', '亿'], ['', '拾', '佰', '仟']];
	let head=n<0?'欠人民币':'人民币';
	let s='';
	n=Math.abs(n)
	for(let i=0;i<fraction.length;i++){
		s+=(digit[Math.floor(n*10*Math.pow(10,i))%10]+fraction[i]).replace(/零./,'');
	}
	s=s||'整';
	n=Math.floor(n);
	for(let i=0;i<unit[0].length&&n>0;i++){
		let p='';
		for (let j=0;j<unit[1].length&&n>0;j++){
			p=digit[n%10]+unit[1][j]+p;
			n=Math.floor(n/10);
		}
		s=p.replace(/(零.)*零$/,'').replace(/^$/,'零')+unit[0][i]+s;
	}
	return head+s.replace(/(零.)*零元/,'元').replace(/(零.)+/g,'零').replace(/^整$/,'零元整');
}

//随机返回一个范围内的随机数
//无参数时返回0-255
function randomNumber(n1,n2) {
	if (arguments.length==2){
		return Math.round(n1+Math.random()*(n2-n1));
	}else if (arguments.length==1){
		return Math.round(Math.random()*n1);
	}else {
		return Math.round(Math.random()*255);
	}
}

//随机产生颜色
function randomColor() {
	// return 'rgb('+randomNumber(255)+','+randomNumber(255)+','+randomNumber(255)+')';
	return '#'+Math.random().toString(16).substr(2,3)
}

//到某一个时间的倒计时
//getEndTime('2017/7/22 16:0:0')
//"剩余时间6天 2小时 28 分钟20 秒"
function getEndTime(endTime) {
	let startDate=new Date();
	let endDate=new Date(endTime);
	let t=endDate.getTime()-startDate.getTime();
	let d=0,h=0,m=0,s=0;
	if (t>=0){
		d=Math.floor(t/1000/60/60/24);
		h=Math.floor(t/1000/60/60%24);
		m=Math.floor(t/1000/60%60);
		s=Math.floor(t/1000%60);
        return '剩余时间：'+d+'天'+d+'小时'+m+'分'+s+'秒';
	}else {
		return '时间已过期'
	}
}

//清除对象中值为空的属性
//filterParams({a:"",b:null,c:"010",d:123})
//Object {c: "010", d: 123}
function filterParams(obj) {
	let newPar={};
	for (let key in obj){
		if (obj[key]&&obj[key]!==null&&obj[key]!==undefined){
			newPar[key]=obj[key];
		}
	}
	return newPar;
}

//设置cookie
function setCookie(name,value,iDay) {
	let oDate=new Date();
	oDate.setDate(oDate.getDate()+iDay);
	document.cookie=name+'='+value+';expires='+oDate;
}

//获取cookie
function getCookie(name) {
	let arr=document.cookie.split(';');
	for (let i=0;i<arr.length;i++){
		let arr2=arr[i].split('=');
		if (arr2[0]==name){
			return arr2[1];
		}
	}
	return '';
}

//删除cookie
function removeCookie(name) {
	setCookie(name,1,-1);
}

//数据类型判断
//isType([],'array')
//true
//isType([])
//'[object Array]'
function isType(o,type) {
	if (type){
        let _type=type.toLowerCase();
        switch (_type){
            case 'string':
                return Object.prototype.toString.call(o)==='[object String]';
                break;
            case 'number':
                return Object.prototype.toString.call(o)==='[object Number]';
                break;
            case 'boolean':
                return Object.prototype.toString.call(o)==='[object Boolean]';
                break;
            case 'undefined':
                return Object.prototype.toString.call(o)==='[object Undefined]';
                break;
            case 'null':
                return Object.prototype.toString.call(o)==='[object Null]';
                break;
            case 'function':
                return Object.prototype.toString.call(o)==='[object Function]';
                break;
            case 'array':
                return Object.prototype.toString.call(o)==='[object Array]';
                break;
            case 'object':
                return Object.prototype.toString.call(o)==='[object Object]';
                break;
            case 'nan':
                return isNaN(o);
                break;
            case 'elements':
                return Object.prototype.toString.call(o).indexOf('HTML')!==-1;
                break;
            default:
                return Object.prototype.toString.call(o);
                break;
        }
	}else {
        return Object.prototype.toString.call(o);
	}
}

//设置样式
function css(obj,json) {
	for (let attr in json){
		obj.style[attr]=json[attr];
	}
}

/* 封装ajax函数
     * @param {string}obj.type http连接的方式，包括POST和GET两种方式
     * @param {string}obj.url 发送请求的url
     * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
     * @param {object}obj.data 发送的参数，格式为对象类型
     * @param {function}obj.success ajax发送并接收成功调用的回调函数
     * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
     */
//  ajax({
//  	type:'get',
//  	url:'xxx',
//  	data:{
//  		id:'111'
//  	},
//  	success:function(res){
//  		console.log(res)
//  	}
//  })
function ajax(obj) {
	obj=obj||{};
	obj.type=obj.type.toUpperCase()||'POST';
	obj.url=obj.url||'';
	obj.async=obj.anync||true;
	obj.data=obj.data||null;
	obj.success=obj.success||function () {};
    obj.error=obj.error||function () {};
    let xmlHttp=null;
    if (XMLHttpRequest){
    	xmlHttp=new XMLHttpRequest();
	}else {
    	xmlHttp=new ActiveXObject('Microsoft.XMLHTTP');
	}
	let params=[];
    for (let key in obj.data){
    	params.push(key+'+'+obj.data[key]);
	}
	let postData=params.join('&');
	if(obj.type.toUpperCase()==='POST'){
		xmlHttp.open(obj.type,obj.url,obj.async);
		xmlHttp.setRequestHeader('Content-type','application/x-www-from-urlencoded;charset=utf-8');
		xmlHttp.send(postData);
	}else if (obj.type.toUpperCase()==='GET'){
		xmlHttp.open(obj.type,obj.url+'?'+postData,obj.async);
		xmlHttp.send(null);
	}
	xmlHttp.onreadystatechange=function () {
		if (xmlHttp.readyState==4&&xmlHttp.status==200){
			obj.success(xmlHttp.responseText);
		}else {
			obj.error(xmlHttp.responseText);
		}
    }
}

//获取对象数组某些项
//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//getOptionArray(arr,'a,c')
//[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
//getOptionArray(arr,'a',1)
//getOptionArray(arr,'b',1)
//[2, 3, 9, 2, 5]
function getOptionArray(arr,keys,type) {
	let newArr=[];
	if (!keys){
		return arr;
	}
    //是否只是需要获取某一项的值
	if (type===1){
		for (let i=0;i<arr.length;i++){
			newArr.push(arr[i][keys]);
		}
		return newArr;
	}
	let _keys=keys.split(',');
	let newArrOne={};
	for (let i=0;i<arr.length;i++){
		newArrOne={};
		for (j=0;j<_keys.length;j++){
			newArrOne[_keys[j]]=arr[i][_keys[j]];
		}
		newArr.push(newArrOne);
	}
	return newArr;
}

//排除数组某些项
//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//filterOptionArray(arr,'a')
//[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
//filterOptionArray(arr,'a,c')
//[{b:2},{b:3},{b:9},{b:2},{b:5}]
function filterOptionArray(arr,keys) {
	let newArr=[];
	let _keys=keys.split(',');
	let newArrOne={};
	for (let i=0;i<arr.length;i++){
		newArrOne={};
		for (let content in arr[i]){
			if (_keys.indexOf(content)===-1){
				newArrOne[content]=arr[i][content];
			}
		}
		newArr.push(newArrOne);
	}
	return newArr;
}

//对象数组的排序
//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
//arraySort(arr,'a,b')  a是第一排序条件，b是第二排序条件
function arraySort(arr,sortText) {
	if (!sortText){
		return arr;
	}
	let _sortText=sortText.split(',').reverse();
	let _arr=arr;
	for(let i=0;i<_sortText.length;i++){
		_arr.sort((n1,n2)=>{
			return n1[_sortText[i]]-n2[_sortText[i]];
		})
	}
	return _arr;
}

//找出最长单词 (Find the Longest word in a String)
//longestWord('Find the Longest word in a String')
//7
//longestWord('Find|the|Longest|word|in|a|String','|')
//7
function longestWord(str,splitType=' ') {
	let max=0;
	let strArr=str.split(splitType);
	strArr.forEach(item=>{
		if (item.length>max){
			max=item.length;
		}
	});
	return max;
}

//rate是1到5的值
//取星级
function star(rate) {
    return '★★★★★☆☆☆☆☆'.slice(5-rate,10-rate);
}

//金钱格式化：1234567890 --> 1,234,567,890
function formatCash(str) {
	return str.split('').reverse().reduce((prev,next,index)=>{
		return ((index%3)?next:(next+','))+prev;
	})
}

//获取连续子串的最大和
function getMaxSumOfSubstring(str) {
    let arr=str.split(' ');
    let len=arr.length;
    let newArr=[];
    for(let i=0;i<len;i++){
        arr[i]=parseInt(arr[i]);
        newArr.push(arr[i]);
    }
    for(let i=0;i<len-1;i++){
        newArr.push(arr[i]);
        for(let j=i+1;j<len;j++){
            let item=0;
            for(let t=i;t<=j;t++){
                item+=arr[t];
            }
            newArr.push(item);
        }
    }
    return Math.max(...newArr);
}