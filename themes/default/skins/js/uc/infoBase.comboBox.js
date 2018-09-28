//国籍
var nationalityList = {
		"nationality":[
		               {"id":1, "name":"中国"},
		               {"id":2, "name":"美国"},
		               {"id":3, "name":"英国"},
		               {"id":4, "name":"法国"}
		               ]
}
//民族
var nationList = {
		"nation":[
		               {"id":1, "name":"汉族"},
		               {"id":2, "name":"回族"},
		               {"id":3, "name":"维吾尔族"},
		               {"id":4, "name":"蒙古族c族"}
		               ]
}
//地区
var area = {"qingdao":[
                       {"id":1, "name":"市辖区"},
                       {"id":2, "name":"市南区"},
                       {"id":3, "name":"市北区"},
                       {"id":4, "name":"四方区"},
                       {"id":5, "name":"黄岛区"},
                       {"id":6, "name":"崂山区"},
                       {"id":7, "name":"李沧区"},
                       {"id":8, "name":"城阳区"},
                       {"id":9, "name":"胶州市"},
                       {"id":10, "name":"即墨市"},
                       {"id":11, "name":"平度市"},
                       {"id":12, "name":"胶南市"},
                       {"id":13, "name":"莱西市"}
                       ]
		
}
//机构类型
var org_typeList={"org_type":[
						{"id":1, "value":"GovDept","name":"机关"},
						{"id":2, "value":"Institutions","name":"事业单位"},
						{"id":3, "value":"Enterprise","name":"企业"},
						{"id":4, "value":"SocialOrg","name":"社会团体"}
                              ]
};
//证件类型
var cert_typeList={"cert_type":[{"id":1,"name":"身份证"},
                                {"id":2,"name":"护照"}
                                ]
};

//经济性质
var org_kindList={"org_kind":[
					{"id":1, "name":"国有"},
					{"id":2, "name":"集体"},
					{"id":3, "name":"私营"},
					{"id":4, "name":"个体"},
					{"id":5, "name":"外商独资"},
					{"id":6, "name":"中外合资"}
                      ]
};
//机构状态
var stateList={"state":[
      						{"id":1, "value":"Register","name":"设立"},
      						{"id":2, "value":"Change","name":"变更"},
      						{"id":3, "value":"Deregister","name":"退出"},
      						{"id":4, "value":"Revoke","name":"吊销"}
                         ]
      };

//出生年
var birthYearList={"birthYear":[
                                    {"id":1, "value":"1903"},
                                    {"id":2, "value":"1904"},
                                    {"id":3, "value":"1905"},
                                    {"id":4, "value":"1906"},
                                    {"id":5, "value":"1907"},
                                    {"id":6, "value":"1908"},
                                    {"id":7, "value":"1909"},
                                    {"id":8, "value":"1910"},
                                    {"id":9, "value":"1911"},
                                    {"id":10, "value":"1912"},
                                    {"id":11, "value":"1913"},
                                    {"id":12, "value":"1914"},
                                    {"id":13, "value":"1915"},
                                    {"id":14, "value":"1916"},
                                    {"id":15, "value":"1917"},
                                    {"id":16, "value":"1918"},
                                    {"id":17, "value":"1919"},
                                    {"id":18, "value":"1920"},
                                    {"id":19, "value":"1921"},
                                    {"id":20, "value":"1922"},
                                    {"id":21, "value":"1923"},
                                    {"id":22, "value":"1924"},
                                    {"id":23, "value":"1925"},
                                    {"id":24, "value":"1926"},
                                    {"id":25, "value":"1927"},
                                    {"id":26, "value":"1928"},
                                    {"id":27, "value":"1929"},
                                    {"id":28, "value":"1930"},
                                    {"id":29, "value":"1931"},
                                    {"id":30, "value":"1932"},
                                    {"id":31, "value":"1933"},
                                    {"id":32, "value":"1934"},
                                    {"id":33, "value":"1935"},
                                    {"id":34, "value":"1936"},
                                    {"id":35, "value":"1937"},
                                    {"id":36, "value":"1938"},
                                    {"id":37, "value":"1939"},
                                    {"id":38, "value":"1940"},
                                    {"id":39, "value":"1941"},
                                    {"id":40, "value":"1942"},
                                    {"id":41, "value":"1943"},
                                    {"id":42, "value":"1944"},
                                    {"id":43, "value":"1945"},
                                    {"id":44, "value":"1946"},
                                    {"id":45, "value":"1947"},
                                    {"id":46, "value":"1948"},
                                    {"id":47, "value":"1949"},
                                    {"id":48, "value":"1950"},
                                    {"id":49, "value":"1951"},
                                    {"id":50, "value":"1952"},
                                    {"id":51, "value":"1953"},
                                    {"id":52, "value":"1954"},
                                    {"id":53, "value":"1955"},
                                    {"id":54, "value":"1956"},
                                    {"id":55, "value":"1957"},
                                    {"id":56, "value":"1958"},
                                    {"id":57, "value":"1959"},
                                    {"id":58, "value":"1960"},
                                    {"id":59, "value":"1961"},
                                    {"id":60, "value":"1962"},
                                    {"id":61, "value":"1963"},
                                    {"id":62, "value":"1964"},
                                    {"id":63, "value":"1965"},
                                    {"id":64, "value":"1966"},
                                    {"id":65, "value":"1967"},
                                    {"id":66, "value":"1968"},
                                    {"id":67, "value":"1969"},
                                    {"id":68, "value":"1970"},
                                    {"id":69, "value":"1971"},
                                    {"id":70, "value":"1972"},
                                    {"id":71, "value":"1973"},
                                    {"id":72, "value":"1974"},
                                    {"id":73, "value":"1975"},
                                    {"id":74, "value":"1976"},
                                    {"id":75, "value":"1977"},
                                    {"id":76, "value":"1978"},
                                    {"id":77, "value":"1979"},
                                    {"id":78, "value":"1980"},
                                    {"id":79, "value":"1981"},
                                    {"id":80, "value":"1982"},
                                    {"id":81, "value":"1983"},
                                    {"id":82, "value":"1984"},
                                    {"id":83, "value":"1985"},
                                    {"id":84, "value":"1986"},
                                    {"id":85, "value":"1987"},
                                    {"id":86, "value":"1988"},
                                    {"id":87, "value":"1989"},
                                    {"id":88, "value":"1990"},
                                    {"id":89, "value":"1991"},
                                    {"id":90, "value":"1992"},
                                    {"id":91, "value":"1993"},
                                    {"id":92, "value":"1994"},
                                    {"id":93, "value":"1995"},
                                    {"id":94, "value":"1996"},
                                    {"id":95, "value":"1997"},
                                    {"id":96, "value":"1998"},
                                    {"id":97, "value":"1999"},
                                    {"id":98, "value":"2000"},
                                    {"id":99, "value":"2001"},
                                    {"id":100, "value":"2002"},
                                    {"id":101, "value":"2003"},
                                    {"id":102, "value":"2004"},
                                    {"id":103, "value":"2005"},
                                    {"id":104, "value":"2006"},
                                    {"id":105, "value":"2007"},
                                    {"id":106, "value":"2008"},
                                    {"id":107, "value":"2009"},
                                    {"id":108, "value":"2010"},
                                    {"id":109, "value":"2011"},
                                    {"id":110, "value":"2012"},
                                    {"id":111, "value":"2013"},
                                    {"id":112, "value":"2014"},
                                    {"id":113, "value":"2015"},
                                    {"id":114, "value":"2016"},
                                    {"id":115, "value":"2017"},
                                    {"id":116, "value":"2018"},
                                    {"id":117, "value":"2019"}
                                    ]
};

//月
var birthMonthList={"birthMonth":[{"id":1,"value":"01"},
                                  {"id":2,"value":"02"},
                                  {"id":3,"value":"03"},
                                  {"id":4,"value":"04"},
                                  {"id":5,"value":"05"},
                                  {"id":6,"value":"06"},
                                  {"id":7,"value":"07"},
                                  {"id":8,"value":"08"},
                                  {"id":9,"value":"09"},
                                  {"id":10,"value":"10"},
                                  {"id":11,"value":"11"},
                                  {"id":12,"value":"12"}
                                  ]
};
//日
var birthDayList={"birthDay":[{"id":1,"value":"01"},
                              {"id":2,"value":"02"},
                              {"id":3,"value":"03"},
                              {"id":4,"value":"04"},
                              {"id":5,"value":"05"},
                              {"id":6,"value":"06"},
                              {"id":7,"value":"07"},
                              {"id":8,"value":"08"},
                              {"id":9,"value":"09"},
                              {"id":10,"value":"10"},
                              {"id":11,"value":"11"},
                              {"id":12,"value":"12"},
                              {"id":13,"value":"13"},
                              {"id":14,"value":"14"},
                              {"id":15,"value":"15"},
                              {"id":16,"value":"16"},
                              {"id":17,"value":"17"},
                              {"id":18,"value":"18"},
                              {"id":19,"value":"19"},
                              {"id":20,"value":"20"},
                              {"id":21,"value":"21"},
                              {"id":22,"value":"22"},
                              {"id":23,"value":"23"},
                              {"id":24,"value":"24"},
                              {"id":25,"value":"25"},
                              {"id":26,"value":"26"},
                              {"id":27,"value":"27"},
                              {"id":28,"value":"28"},
                              {"id":29,"value":"29"},
                              {"id":30,"value":"30"},
                              {"id":31,"value":"31"},
                             ]
};



                                    
                                   

