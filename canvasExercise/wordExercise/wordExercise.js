// 设置画布的大小
var canvasWidth = canvasHeight = Math.min(800, $(window).width() - 20);
// 设置米字格的边框宽度
var gridWidth = 6;
// 存储鼠标的状态
var isMouseDown = false;
// 保存字体的颜色
var wordStrokeStyle = "black";
// 保存鼠标上一次出现的位置
var lastLoc = {x:0,y:0};
// 保存上一次鼠标出现的时间
var lastTimeStamp = 0;
// 保存上一次字体线条的值
var lastWordWidth = -1;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

$(".controller").css("width",canvas.width + "px");

drawGrid();

// 点击清除按钮清除画布
$("#clear-btn").click(function(e) {
	e.preventDefault();
	context.clearRect(0,0,canvas.width,canvas.height);
	drawGrid();
});
// 点击小方块选择下笔的颜色
$(".color-btn").click(function(e) {
	$(".color-btn").removeClass('color-btn-selected');
	$(this).addClass('color-btn-selected');
	wordStrokeStyle = $(this).css('backgroundColor');
});
// PC端鼠标事件
canvas.onmousedown = function(e) {
	e.preventDefault();
	beginStroke({x:e.clientX,y:e.clientY});
	// alert("sss")
};
canvas.onmouseup = function(e) {
	e.preventDefault();
	endStroke();
};
canvas.onmouseout = function(e) {
	e.preventDefault();
	endStroke();
};
canvas.onmousemove = function(e) {
	e.preventDefault();
	if (isMouseDown) {
		wordStroke({x:e.clientX,y:e.clientY});
	};
};
//手机端触控事件
canvas.addEventListener("touchstart",function (e) {
	var touch = e.touches[0];
	beginStroke({x:touch.pageX,y:touch.pageY});
});
canvas.addEventListener("touchmove",function (e) {
	var touch = e.touches[0];
	if (isMouseDown) {
		wordStroke({x:touch.pageX,y:touch.pageY});
	};
});
canvas.addEventListener("touchend",function (e) {
	endStroke();
});

// 开始写字
function beginStroke (point) {
	isMouseDown = true;
	lastLoc = windowToCanvas(point.x,point.y);
	lsatTimeStamp = new Date().getTime(); 
}
function wordStroke (point) {
	var curLoc = windowToCanvas(point.x,point.y);
	var curTimeStamp = new Date().getTime();
	// 计算两次下笔之间的距离
	var s = calcDistance(curLoc,lastLoc);
	// 计算两次下笔之间的时间
	var t = curTimeStamp - lastTimeStamp;
	// 计算两次下笔之间的速度
	var wordWidth = calcSpeed(s,t);

	context.beginPath();
	context.moveTo(lastLoc.x,lastLoc.y);
	context.lineTo(curLoc.x,curLoc.y);
	context.strokeStyle = wordStrokeStyle;
	context.lineWidth = wordWidth;
	context.lineCap = "round";
	context.lineJoin = "round";
	context.stroke();

	lastLoc = curLoc;
	lastTimeStamp = curTimeStamp;
	lastWordWidth = wordWidth; 
}
// 停止写字
function endStroke () {
	isMouseDown = false; 
}

// 绘制米字格
function drawGrid () {
	context.save();

    context.beginPath();
    context.moveTo(gridWidth/2,gridWidth/2);
    context.lineTo(canvas.width-gridWidth/2,gridWidth/2);
    context.lineTo(canvas.width-gridWidth/2,canvas.height-gridWidth/2);
    context.lineTo(gridWidth/2,canvas.height-gridWidth/2);
    context.closePath();

    context.strokeStyle = "#B22222";
    context.lineWidth = gridWidth;
    context.stroke();

    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(canvas.width,canvas.height);

    context.moveTo(canvas.width,0);
    context.lineTo(0,canvas.height);

    context.moveTo(canvas.width/2,0);
    context.lineTo(canvas.width/2,canvas.height);

    context.moveTo(0,canvas.height/2);
    context.lineTo(canvas.width,canvas.height/2);
    context.closePath();
    context.setLineDash([7,10]);
    context.lineWidth = 1;
    context.stroke();

	context.restore(); 
}

//坐标转换函数
function windowToCanvas (x,y) {
	var canvasBox = canvas.getBoundingClientRect();
	return {x:Math.round(x-canvasBox.left),y:Math.round(y-canvasBox.top)}; 
}

// 计算距离
function calcDistance (lastLoc,curLoc) {
	return Math.sqrt((curLoc.x-lastLoc.x)*(curLoc.x-lastLoc.x)+(curLoc.y-curLoc.y)*(curLoc.y-curLoc.y));
}

// 计算速度
var maxSpeed = 10;
var minSpeed = 0.1;
var maxWordWidth = 30;
var minWordWidth = 1;
function calcSpeed (s,t) {
	var v = s/t;
	var resWidth;
	// 速度快的时候笔画细
	if (v >= maxSpeed) {
		resWidth = minWordWidth;
	} else if (v < minSpeed) {
		resWidth = maxWordWidth;
	} else {
		resWidth = maxWordWidth - (v - minSpeed)/(maxSpeed - minSpeed)*(maxWordWidth - minWordWidth);
	};
	// 第一次绘制时的情况
	if (lastWordWidth === -1) {
		return resWidth;
	};
	return lastWordWidth*2/3 + resWidth*1/3;
}