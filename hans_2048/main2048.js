// 游戏数据
var board = new Array();
// 游戏分数
var score = 0;
// 设置一个变量避免冲突
var hasConflicted = new Array();

// 移动端触控事件
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

// 开始游戏
$(document).ready(function () {
	// 为移动端做准备
	prepareForMobile();
	newgame(); 
});


// 
function prepareForMobile () {
	// 适应PC端
	if (documentWidth > 500) {
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	};
	// 适应移动端
	$("#grid-container").css('width', gridContainerWidth - 2*cellSpace);
	$("#grid-container").css('height', gridContainerWidth - 2*cellSpace);
	$("#grid-container").css('padding', cellSpace);
	$("#grid-container").css('border-radius', 0.02*gridContainerWidth);

	$(".grid-cell").css('width', cellSideLength);
	$(".grid-cell").css('height', cellSideLength);
	$(".grid-cell").css('border-radius', 0.02*cellSideLength);
};

// 开启新游戏
function newgame () {
	//	初始化整个区域
	init(); 
	// 在随机的两个格子里生成数字
	generateOneNumber();
	generateOneNumber();
};

// 初始化游戏空间
function init () {
	// 生成棋盘格
	for (var i=0;i<4;i++) {
		for (var j=0; j<4; j++) {
			var gridCell = $("#grid-cell-" +i+ "-" + j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		};
	};
	// 初始化游戏数据数组
	for (var i=0; i<4; i++) {
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for (var j=0; j<4; j++) {
			board[i][j] = 0;
			// 初始化冲突数组
			hasConflicted[i][j] = false;
		};
	};
	// 
	updateBoardView();
	score = 0;
	$("#score").text(score);
};

// 
function updateBoardView() {
	// 清除已有的数据
	$('.number-cell').remove();
	for (var i=0; i<4; i++) {
		for (var j=0; j<4; j++) {
			// 为每一个grid添加一个number-cell
			$('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
			// 获取当前的number-cell
			var theNumberCell = $('#number-cell-' + i + '-' + j);
			// 设置样式
			if( board[i][j] == 0 ){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + cellSideLength/2 );
                theNumberCell.css('left',getPosLeft(i,j) + cellSideLength/2 );
            }
            else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );
                theNumberCell.css('color',getNumberColor( board[i][j] ) );
                theNumberCell.text( board[i][j] );
            };
            hasConflicted[i][j] = false;
		};
		$(".number-cell").css('line-height', cellSideLength + "px");
		$(".number-cell").css('font-size', 0.6*cellSideLength);
	};
};

// 随机的在一个空闲的格子里生成一个数字
function generateOneNumber () {
	if (nospace(board)) {
	 	return false;
	};
	// 随机找到一个位置
	 	var randx = parseInt(Math.floor(Math.random() * 4));
	 	var randy = parseInt(Math.floor(Math.random() * 4));
	 	
	 	var times = 0;
	 	while (times < 50) {
	 		// 判断新生成的这个位置是否可用
	 		if (board[randx][randy] == 0) {
	 			break;
	 		};
	 		randx = parseInt(Math.floor(Math.random() * 4));
	 		randy = parseInt(Math.floor(Math.random() * 4));

	 		times++;
	 	};
	 	if (times == 50) {
	 		for (var i=0; i<4; i++) {
	 			for (var j=0; j<4; j++) {
	 				if (board[i][j] == 0) {
	 					randx = i;
	 					randy = j;
	 				};
	 			};
	 		};
	 	};
	 	// 随机产生一个数字
	 	// 分别以50%的概率生成2或者4
	 	var randNumber = Math.random() < 0.5 ? 2: 4;
	 	// 在指定的位置显示生成的数字
	 	board[randx][randy] = randNumber;
	 	// 展示这个数字的动画
	 	showNumberWithAnimation(randx,randy,randNumber);

	return true; 
}

// 玩家响应
$(document).keydown(function(event) {
	switch (event.keyCode) {
		case 37:
			// 阻止页面跟随滚动条一起运动
			event.preventDefault();
			// left
			if (moveLeft()) {
				// 左移成功之后，产生新的数字
				setTimeout("generateOneNumber()", 210);
				// 判断游戏是否结束
				setTimeout("isGameover()", 300);
			};
			break;
		case 38:
			// 阻止页面跟随滚动条一起运动
			event.preventDefault();
			// up
			if (moveUp()) {
				// 上移成功之后，产生新的数字
				setTimeout("generateOneNumber()", 210);
				// 判断游戏是否结束
				setTimeout("isGameover()", 300);
			};
			break;
		case 39:
			// 阻止页面跟随滚动条一起运动
			event.preventDefault();
			// right
			if (moveRight()) {
				// 右移成功之后，产生新的数字
				setTimeout("generateOneNumber()", 210);
				// 判断游戏是否结束
				setTimeout("isGameover()", 300);
			};
			break;
		case 40:
			// 阻止页面跟随滚动条一起运动
			event.preventDefault();
			// down
			if (moveDown()) {
				// 下移成功之后，产生新的数字
				setTimeout("generateOneNumber()", 210);
				// 判断游戏是否结束
				setTimeout("isGameover()", 300);
			};
			break;
		default:
			// statements_def
			break;
	}
});

// 监听触控事件
document.addEventListener("touchstart", function (event) {
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY; 
});
// 阻止安卓上的一个bug
document.addEventListener("touchemove", function (event) {
	event.preventDefault(); 
})
document.addEventListener("touchend", function (event) {
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	// 判断是向哪里滑动
	var deltax = endx - startx;
	var deltay = endy - starty;

	// 这里避免用户点触屏幕时也会发生移动操作 
	if (Math.abs(deltax) < 0.3*documentWidth && Math.abs(deltay) < 0.3*documentWidth) {
		return;
	};

	if (Math.abs(deltax) >= Math.abs(deltay)) {
		// x轴
		if (deltax > 0) {
			// 右移
			if (moveRight()) {
				// 右移成功之后，产生新的数字
				setTimeout("generateOneNumber()", 210);
				// 判断游戏是否结束
				setTimeout("isGameover()", 300);
			};
		} else {
			// 左移
			if (moveLeft()) {
				// 左移成功之后，产生新的数字
				setTimeout("generateOneNumber()", 210);
				// 判断游戏是否结束
				setTimeout("isGameover()", 300);
			};
		};
	} else {
		// y轴
		if (deltay > 0) {
			// 下移
			if (moveDown()) {
				// 下移成功之后，产生新的数字
				setTimeout("generateOneNumber()", 210);
				// 判断游戏是否结束
				setTimeout("isGameover()", 300);
			};
		} else {
			// 上移
			if (moveUp()) {
				// 上移成功之后，产生新的数字
				setTimeout("generateOneNumber()", 210);
				// 判断游戏是否结束
				setTimeout("isGameover()", 300);
			};
		};
	};
});

// 判断游戏是否结束
function isGameover () {
	if (nospace(board) && nomove(board)) {
		gameover();
	};	 
};
// 游戏结束
function gameover () {
	alert("gameover!");
	//	这里还可以进行拓展的 
	// 具体来说就是可以把这个先展示这个对话框，然后在动关闭它再初始化游戏
}

// 左移操作
function moveLeft () {
	if (!canMoveLeft(board)) {
		return false;
	};

	for (var i=0; i<4; i++) {
		for (var j=1; j<4; j++) {
			if (board[i][j] != 0) {
				for (var k=0; k<j; k++) {
					if (board[i][k] == 0 && noBlockHorizontal(i,k,j,board)) {
						// 移动
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]) {
						// 移动
						showMoveAnimation(i,j,i,k);
						// 叠加
						board[i][k] += board[i][j];
						board[i][j] = 0;
						// 添加分数
						score += board[i][k];
						updateScore(score);
						// 记录叠加，保证每一次操作在相同的位置只有一次叠加
						hasConflicted[i][k] = true;
						continue;
					};
				};	
			};
		};
	};

	setTimeout("updateBoardView()", 200);
	return true;
};
// 上移操作
function moveUp () {
	if (!canMoveUp(board)) {
		return false;
	};

	for (var i=1; i<4; i++) {
		for (var j=0; j<4; j++) {
			if (board[i][j] != 0) {
				for (var k=0; k<i; k++) {
					if (board[k][j] == 0 && noBlockVertical(k,i,j,board)) {
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[k][j] == board[i][j] && noBlockVertical(k,i,j,board) && !hasConflicted[k][j]) {
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						// 添加分数
						score += board[k][j];
						updateScore(score);

						hasConflicted[k][j] = true;
						continue;
					};
				};	
			};
		};
	};

	setTimeout("updateBoardView()", 200);
	return true; 
};
// 右移操作
function moveRight () {
	if (!canMoveRight(board)) {
		return false;
	};

	for (var i=0; i<4; i++) {
		for (var j=0; j<3; j++) {
			if (board[i][j] != 0) {
				for (var k=j+1; k<4; k++) {
					if (board[i][k] == 0 && noBlockHorizontal(i,j,k,board)) {
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k]) {
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						// 添加分数
						score += board[i][k];
						updateScore(score);

						hasConflicted[i][k] = true;
						continue;
					};
				};	
			};
		};
	};

	setTimeout("updateBoardView()", 200);
	return true;	 
};
// 下移操作
function moveDown () {
	if (!canMoveDown(board)) {
		return false;
	}; 

	for (var i=0; i<3; i++) {
		for (var j=0; j<4; j++) {
			if (board[i][j] != 0) {
				for (var k=i+1; k<4; k++) {
					if (board[k][j] == 0 && noBlockVertical(i,k,j,board)) {
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if (board[k][j] == board[i][j] && noBlockVertical(i,k,j,board) && !hasConflicted[k][j]) {
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						// 添加分数
						score += board[k][j];
						updateScore(score);

						hasConflicted[k][j] = true;
						continue;
					};
				};	
			};
		};
	};

	setTimeout("updateBoardView()", 200);
	return true;
}