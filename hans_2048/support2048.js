var documentWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * documentWidth;
var cellSideLength = 0.18 * documentWidth;
var cellSpace = 0.04 * documentWidth; 
// 获得当前格子距离上边界的高度
function getPosTop(i,j) {
	return cellSpace + i*(cellSpace + cellSideLength);
}
// 获得当前格子距离左边界的高度
function getPosLeft(i,j) {
	return cellSpace + j*(cellSpace + cellSideLength);
}
// 设置number-cell的背景色
function getNumberBackgroundColor (number) {
	switch (number) {
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#ede0c8";
			break;
		case 8:
			return "#f2b179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64:
			return "#f65e3b";
			break;
		case 128:
			return "#edcf72";
			break;
		case 256:
			return "#edcc61";
			break;
		case 512:
			return "#9c0";
			break;
		case 1024:
			return "#33b5e5";
			break;
		case 2048:
			return "#09c";
			break;
		case 4096:
			return "#a6c";
			break;
		case 8192:
			return "#93c";
			break;
		default:
			break;
	};

	return "black";
};

// 设置number-cell的数字颜色
function getNumberColor(number) {
	if (number <= 8) {	
		return "#776e65";
	} else if (number <= 64) {
		return "#e7615f";
	} else if (number <= 512) {
		return "#e85fe3";
	} else if (number <= 8192) {
		return "white";
	};
};

// 判断棋盘是否还有剩余空间
function nospace (board) {
	for (var i=0; i<4; i++) {
		for (var j=0; j<4; j++) {
			// 如果还有空间，则返回false
			if (board[i][j] == 0) {
				return false;
			}
		};
	}; 
	// 棋盘格被占满，则返回true
	return true;
};
// 是否可以左移
function canMoveLeft (board) {
	for (var i=0; i<4; i++) {
		for (var j=1; j<4; j++) {
			if (board[i][j] != 0) {
				if (board[i][j-1] == 0 || board[i][j-1] == board[i][j]) {
					return true;
				};
			};
		};
	}; 
	return false;
};
// 水平移动的过程中是否有障碍物
function noBlockHorizontal (row,col1,col2,board) {
	for (var i=col1 + 1; i<col2; i++) {
		if (board[row][i] != 0) {
			return false;
		};
	};
	return true;
}
// 是否可以上移
function canMoveUp (board) {
	for (var i=1; i<4; i++) {
		for (var j=0; j<4; j++) {
			if (board[i][j] != 0) {
				if (board[i-1][j] == 0 || board[i-1][j] == board[i][j]) {
					return true;
				};
			};
		};
	}; 
	return false; 
};
// 上下移动的过程中是否有障碍物
function noBlockVertical (row1,row2,col,board) {
	for (var i=row1+1; i<row2; i++) {
		if (board[i][col] != 0) {
			return false;
		};
	};
	return true;
};
// 是否可以右移
function canMoveRight (board) {
	for (var i=0; i<4; i++) {
		for (var j=0; j<3; j++) {
			if (board[i][j] != 0) {
				if (board[i][j+1] == 0 || board[i][j+1] == board[i][j]) {
					return true;
				};
			};
		};
	}; 
	return false;  
};
// 是否可以下移
function canMoveDown (board) {
	for (var i=0; i<3; i++) {
		for (var j=0; j<4; j++) {
			if (board[i][j] != 0) {
				if (board[i+1][j] == 0 || board[i+1][j] == board[i][j]) {
					return true;
				};
			};
		};
	}; 
	return false;  
};
function nomove (board) {
	if (canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board)) {
		return false;	
	};
	return true;
}