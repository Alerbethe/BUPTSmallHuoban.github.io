//	生成随机数的动画
function showNumberWithAnimation (i,j,randNumber) {
	var numberCell = $("#number-cell-" + i + "-" + j);

	// 改变这个格子的样式
	numberCell.css({
		backgroundColor: getNumberBackgroundColor(randNumber),
		color: getNumberColor(randNumber),
	});
	numberCell.text(randNumber);

	// 动画实现
	numberCell.animate({
		width: cellSideLength, 
		height: cellSideLength,
		top: getPosTop(i,j),
		left: getPosLeft(i,j)
	}, 50);
};
// 移动数字的动画
function showMoveAnimation (fromx,fromy,tox,toy) {
	var numberCell = $('#number-cell-' + fromx + '-' + fromy);
	numberCell.animate({
		top: getPosTop(tox,toy), 
		left: getPosLeft(tox,toy)
	}, 200);
};
// 显示分数
function updateScore (score) {
	$('#score').text(score); 
}