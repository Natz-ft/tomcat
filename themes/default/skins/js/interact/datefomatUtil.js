/**
 * 返回 “9月4日 14:45” 这种格式的日期
 * @param time
 * @returns {String}
 */
function getDateString(time){
	var myDate = new Date(time);
	return myDate.getMonth()+1 + "月" + myDate.getDate() + "日  " + myDate.getHours() + ":" + myDate.getMinutes();
//	return myDate.toLocaleDateString();
}

/**
 * 返回 “14:45” 这种格式的时间
 * @param time
 * @returns {String}
 */
function getTimeString(time){
	var myDate = new Date(time);
	return  myDate.getHours() + ":" + myDate.getMinutes();
}

/**
 * 返回“201494”这种格式的日期
 * @param time
 * @returns {String}
 */
function getDateString2(time){
	var myDate = new Date(time);
	return myDate.getFullYear() + "" + (myDate.getMonth()+1) + "" + myDate.getDate();
}

/**
 * 返回不带时间的日期，格式“9.4”
 * @returns {String}
 */
function getDateString3(time){
	var myDate = new Date(time);
	return myDate.getMonth()+1 + "." + myDate.getDate();
}