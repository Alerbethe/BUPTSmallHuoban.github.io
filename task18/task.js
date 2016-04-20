// 存储数组
var arrNum = [];
// 存储队列长度
var numLength = 0;
// 获得需要展示的区域
var numArea = document.getElementById("num-area");
// 获得文本输入框
var numHome = document.getElementById("num-home");
// 获取四个按钮
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");

// 跨浏览器的事件监听函数
function addEventHandler (element,event,handler) {
	if (element.addEventListener) {
		element.addEventListener(event, handler,false);
	} else if (element.attachEvent){
		element.attachEvent("on" + event, handler);
	} else {
		element["on" + event] = handler;
	}
}
// 生成随机数
function getRandomNumber () {
	for (var i = 0; i < 10; i++) {
		arrNum.push(Math.floor(Math.random()*100));
	};
}
// 将生成的随机数展示到页面中
function displayNum (arr) {
	for (var i = 0; i < arr.length; i++) {
		var aNode = document.createElement("a");
		aNode.innerHTML = arr[i];
		numArea.appendChild(aNode);
	};
}

// 左侧进入
addEventHandler(btn1,"click",function () {
	numHome.value = arrNum.join(",")
})
// 左侧出
addEventHandler(btn2,"click",function () {
	var inputVal = numHome.value;
	if(inputVal) {
		var outArr = inputVal.split(",");
		for (var i = 0; i < outArr.length; i++) {
			alert(outArr[i]);
		};
	} else {
		alert("没有可以弹出的数值！");
	}
})
// 右侧进入
addEventHandler(btn3,"click",function() {
	// 由于reverse()方法修改了原有的数组,因此会造成bug
	// numHome.value = arrNum.reverse().join(",");

	var arrReverse = [];
	for (var i = 0; i < arrNum.length; i++) {
		arrReverse[arrNum.length -1 - i] = arrNum[i];
	};
	numHome.value = arrReverse;
})
// 右侧出
addEventHandler(btn4,"click",function () {
	var inputVal = numHome.value;
	if(inputVal) {
		var outArr = inputVal.split(",").reverse();
		for (var i = 0; i < outArr.length; i++) {
			alert(outArr[i]);
		};
	} else {
		alert("没有可以弹出的数值！");
	}
})
function init () {
	getRandomNumber();
	displayNum(arrNum);
}

init();