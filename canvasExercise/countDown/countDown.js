//设置画布的大小的全局变量
var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
// 声明小圆的半径
var RADIUS = 8;
// 所有数字距离画布上边的距离
var MARGIN_TOP = 60;
// 第一个数字距离画布左边的距离
var MARGIN_LEFT = 30;
// 设置一个截止时间
// 改时间不能超过99*3600*1000
const lastTime = 3600*1000;
var endTime = new Date();
endTime.setTime(endTime.getTime() + lastTime);
// 设置一个变量记录当前所剩的秒数
var curShowTimeSeconds = 0;
// 设置一个变量存储彩色小球
var colorBalls = [];
// 创建颜色常量
const ballColors = ["#378ed8","#388f9e","#a7d839","#c82ad9","#FFCC00","#d82ca7","#b2b7ca","#c7a8d9","#8ddcbd","#CC0000","#78f8a7","#67c8da","#FF6A6A","#FF8C00","#FF69B4","#FFD700","#7FFF00"];



window.onload = function () {
	WINDOW_WIDTH = document.documentElement.clientWidth;
	WINDOW_HEIGHT = document.documentElement.clientHeight;
	MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
	RADIUS = Math.round(WINDOW_WIDTH*4/5/108) - 1;
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);

	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");

	// 使画布自适应屏幕
	// 整个计时器占屏幕的五分之四
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;


	//获取时间
	curShowTimeSeconds = getCurrentShowTimeSeconds();
	//实现动画效果
	setInterval(function () {
		//绘制画布
	    render(context);
	    //更新时间
	    update();
	}, 50);
}

// 获取倒计时时间
function getCurrentShowTimeSeconds () {
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	// 将时间转换为秒
	ret = Math.round(ret/1000);

	return ret>=0? ret : 0;
}

// 更新时间并产生彩色小球
function update () {
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();

	var nextHour = parseInt(nextShowTimeSeconds / 3600);
	var nextMinute = parseInt((nextShowTimeSeconds - nextHour*3600)/60);
	var nextSecond = nextShowTimeSeconds % 60;

	var curHour = parseInt(curShowTimeSeconds / 3600);
	var curMinute = parseInt((curShowTimeSeconds - curHour*3600)/60);
	var curSecond = curShowTimeSeconds % 60;

	if(nextSecond !== curSecond) {
		// 每次时间变化时产生这些小球
		// 时针
		if (parseInt(curHour/10) != parseInt(nextHour/10)) {
			addBalls(MARGIN_LEFT + 0,MARGIN_TOP,parseInt(curHour/10));
		};
		if (parseInt(curHour%10) != parseInt(nextHour%10)) {
			addBalls(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(curHour%10));
		};
		// 分针
		if (parseInt(curMinute/10) != parseInt(nextMinute/10)) {
			addBalls(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(curMinute/10));
		};
		if (parseInt(curMinute%10) != parseInt(nextMinute%10)) {
			addBalls(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(curMinute%10));
		};
		// 秒针
		if (parseInt(curSecond/10) != parseInt(nextSecond/10)) {
			addBalls(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(curSecond/10));
		};
		if (parseInt(curSecond%10) != parseInt(nextSecond%10)) {
			addBalls(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(curSecond%10));
		};
		// 更新时间
		curShowTimeSeconds = nextShowTimeSeconds;
	}
	// 小球开始运动
	updateBalls();
}

//绘制函数
function render(cont) {
	//对画布进行刷新,避免新的画布将旧的画布覆盖
	cont.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	//时分秒
	var hour = parseInt(curShowTimeSeconds / 3600);
	var minute = parseInt((curShowTimeSeconds - hour*3600)/60);
	var second = curShowTimeSeconds % 60;

	// 绘制小时的两位数字
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),cont);
	renderDigit(MARGIN_LEFT + 15*(RADIUS+1),MARGIN_TOP,parseInt(hour%10),cont);
	// 绘制：符号
	renderDigit(MARGIN_LEFT + 30*(RADIUS+1),MARGIN_TOP,10,cont);

	// 绘制分钟的两位数字
	renderDigit(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(minute/10),cont);
	renderDigit(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(minute%10),cont);
	renderDigit(MARGIN_LEFT + 69*(RADIUS+1),MARGIN_TOP,10,cont);

	// 绘制秒针的两位数字
	renderDigit(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(second/10),cont);
	renderDigit(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(second%10),cont);

	// 绘制彩色小球
	for (var i = 0; i < colorBalls.length; i++) {
		cont.fillStyle = colorBalls[i].color;
		cont.beginPath();
		cont.arc(colorBalls[i].x,colorBalls[i].y,RADIUS,0,2*Math.PI,true);
		cont.closePath();

		cont.fill();
	};
}

//绘制每一个数字
function renderDigit(x,y,num,cont) {
	cont.fillStyle = "blue";

	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if (digit[num][i][j] === 1) {
				cont.beginPath();
				cont.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cont.closePath();

				cont.fill();
			}
		};
	};
}

//创建每一个彩色小球
function addBalls (x,y,num) {
	for (var i = 0; i < digit[num].length; i++) {
	    for (var j = 0; j < digit[num][i].length; j++) {
	 		if (digit[num][i][j] === 1) {
	 			// 创建小球
	 			var aBall = {
	 				x:x+j*2*(RADIUS+1)+(RADIUS+1),
	 				y:y+j*2*(RADIUS+1)+(RADIUS+1),
	 				g:1.5*Math.random(),
	 				vx:Math.pow(-1,Math.ceil(Math.random()*1000))*(Math.ceil(Math.random()*10)),
	 				vy:Math.pow(-1,Math.ceil(Math.random()*1000))*(Math.ceil(Math.random()*10)),
	 				color:ballColors[Math.floor(Math.random()*ballColors.length)]
	 			};
	 			// 存储小球
	 			colorBalls.push(aBall);
	 		}
	 	};
	};
}

//为每一个彩色小球添加动画
function updateBalls () {
	for (var i = 0; i < colorBalls.length; i++) {
	 	colorBalls[i].x += colorBalls[i].vx;
	 	colorBalls[i].y += colorBalls[i].vy;
	 	colorBalls[i].vy += colorBalls[i].g;
        //碰撞检测，防止小球运动到画布的外面
        // 避免小球掉出去
        if(colorBalls[i].y > WINDOW_HEIGHT - RADIUS) {
        	colorBalls[i].y = WINDOW_HEIGHT - RADIUS;
        	colorBalls[i].vy = -colorBalls[i].vy*0.75;
        }
        // } else if (colorBalls[i].y <= RADIUS) {
        // 	colorBalls[i].y = RADIUS;
        // 	colorBalls[i].vy = -colorBalls[i].vy*0.65;
        // }//y轴
        // if (colorBalls[i].x >= WINDOW_WIDTH - RADIUS) {
        // 	colorBalls[i].x = WINDOW_WIDTH - RADIUS;
        // 	colorBalls[i].vx = -colorBalls[i].vx*0.80;
        // } else if (colorBalls[i].x <= RADIUS) {
        // 	colorBalls[i].x = RADIUS;
        // 	colorBalls[i].vx = -colorBalls[i].vx*0.70;
        // }//x轴
	}; 
	// 控制小球的个数，保证存储的小球都是在画布中的
	var curBalls = 0;
	for (var i = 0; i < colorBalls.length; i++) {
		// 判断小球仍在画布中的条件
		if (colorBalls[i].x + RADIUS>0 && colorBalls[i].x -RADIUS < WINDOW_WIDTH) {
			// 若小球在画布中，则将其位置提前
			colorBalls[curBalls++] = colorBalls[i];
		}
	};
	// 删掉已经跑出画布的小球
	while (colorBalls.length > curBalls) {
		colorBalls.pop();
	}
}