// 存储数组
var arrNum = [];
// 获得需要展示的区域
var numArea = document.getElementById("num-area");
// 获得文本输入框
var numHome = document.getElementById("num-home");
// 获得队列长度输入框
var numInput = document.getElementById("num-input");
// 存储队列长度
var arrLength = 0;
// 标志位
var flag = true;
// 获取六个按钮
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");
var btn5 = document.getElementById("btn5");
var btn6 = document.getElementById("btn6");

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
// 获取队列的长度
function getLength () {
	var numInputVal = parseInt(numInput.value.trim());
	if (numInputVal) {
		if (typeof(numInputVal) !== "number") {
			console.log(typeof(numInputVal))
			alert("不得输入除数字外其他类型的字符！");
		} else {
			if (numInputVal < 10 || numInputVal > 100) {
				alert("请输入有效范围10～100之间的数字！");
			} else {
				arrLength = numInputVal;
			}
		}
	} else {
		alert("输入不能为空！")
	}
}
// 生成随机数
function getRandomNumber (length) {
	for (var i = 0; i < length; i++) {
		arrNum.push(Math.floor(Math.random()*100));
	};
}
// 将生成的随机数展示到页面中
function displayNum (arr) {
	numArea.innerHTML = "";
	for (var i = 0; i < arr.length; i++) {
		var aNode = document.createElement("a");
		aNode.innerHTML = arr[i];
		numArea.appendChild(aNode);
	};
}
// 冒泡排序
function bubbleSort (arr) {
	var p = 0;
	for (var i = 0; i < arr.length - 1; i++) {
		for (var j = i+1; j < arr.length; j++) {
			if (arr[i] >= arr[j]) {
				p = arr[i];
				arr[i] = arr[j];
				arr[j] = p;
			}
		};
	};
	return arr;
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
// 生成随机数
addEventHandler(btn5,"click",function () {
	if (flag) {
		getLength();
		getRandomNumber(arrLength);
		displayNum(arrNum);
		flag = false;
	}
});
// 排序
addEventHandler(btn6,"click",function () {
	var arrNew = bubbleSort(arrNum);
	displayNum(arrNew);
});