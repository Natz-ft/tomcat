var hisHeight = 0;
function heightAdapt() {
	var objHeight = parseInt(document.body.offsetHeight) + 30;
	if (objHeight == 30 || objHeight < 340) {
		objHeight = 340;
	}
	
	if (hisHeight != objHeight) {
			var divObj = document.createElement("DIV");
			divObj.setAttribute("id", "appDiv");
			divObj.style.display = "none";
			var frameObj = document.createElement("IFRAME");
			frameObj.setAttribute("id", "appFrame");
			frameObj.setAttribute("name", "appFrame");
			frameObj.setAttribute("src", "http://opendata.inspur.com/data/appcenter/appIframe.htm#" + objHeight);
			divObj.appendChild(frameObj);
			document.body.appendChild(divObj);
		}
		
		hisHeight = objHeight;
}
if (document.readyState == "complete") {
	heightAdapt();
	setInterval("heightAdapt()", 1000);
} else {
	document.onreadystatechange = function() {
		if (document.readyState == "complete") {
			heightAdapt();
			setInterval("heightAdapt()", 1000);
		}
	}
}