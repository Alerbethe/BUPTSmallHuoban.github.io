/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	// 获取输入并去除两端的空格
	var aqiCityInputValue = document.getElementById("aqi-city-input").value.trim();
	var aqiDataInputValue = document.getElementById("aqi-value-input").value.trim();
	// 定义正则表达式
	var cityPattern = /^[A-Za-z\u4e00-\u9fa5]+$/;
	var valuePattern = /^\d+$/;
	var spacePattern = /\s+/g;
	// 去掉用户输入中的空格,其实用这个方法可以去掉所有的空格
	aqiCityInputValue.replace(spacePattern, "");
	aqiDataInputValue.replace(spacePattern, "");
	// 判断输入是否符合要求
	if (!aqiCityInputValue.match(cityPattern)) {
		alert("城市名必须为中英文字符！")
		return;
	};
	if (!aqiDataInputValue.match(valuePattern)) {
		alert("空气质量指数必须为整数！")
		return;
	};
	// 向aqiData中添加数据
	aqiData[aqiCityInputValue] = aqiDataInputValue;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	// 避免重复添加
	table.innerHTML = "";
	for (var city in aqiData) {
		// 首次添加时先添加表头
		if (table.children.length === 0) {
			table.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
		};
		var tr = document.createElement("tr");

		var td1 = document.createElement("td");
		td1.innerHTML = city;
		var td2 = document.createElement("td");
		td2.innerHTML = aqiData[city];
		var td3 = document.createElement("td");
		td3.innerHTML = "<button class='del-btn'>删除</button>";

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		table.appendChild(tr);
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {		
	addAqiData();
	renderAqiList(); 	
}
/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
	// do sth.
	var tr = target.parentElement.parentElement;
	var thisCity = tr.firstChild.innerHTML;
	delete(aqiData[thisCity]);
	renderAqiList();
}

function init() {

	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var addBtn = document.getElementById("add-btn");
	// 注意这里函数的赋值不能为addBtnHandle();
	addBtn.onclick = addBtnHandle;
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	var table = document.getElementById("aqi-table");
	table.addEventListener("click", function (e) {
		// 节点的名称为大写的标签名
		if (e.target && e.target.nodeName === "BUTTON") {
			delBtnHandle(e.target);
		};
	});

}

init();