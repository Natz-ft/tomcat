var Header = function() {

	var handleLogout = function() {
		$('#logout').click(function(){
    		$.ajax({
				type : "get",
				dataType : "json",
				url : getRootPath()+"/login.do?method=Logout",
				data : {
				},
				dataType : 'json',
				success : function(data) {
					if (data.result == '0') {
						location.href = getRootPath()+"/login.htm";
					} else {
						
					}
				}
			});
    	});
	}

	return {
		init : function() {
			handleLogout();
		}
	};

}();