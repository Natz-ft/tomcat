package com.inspur.ucweb.utils;
public enum ModelType {
	CATALOG{
		public String getName(){return "数据目录";}
	},METADATA{
		public String getName(){return "元数据";}
	},GATHER{
		public String getName(){return "数据采集";}
	},DATASERVICE{
		public String getName(){return "数据服务";}
	},QUALITY{
		public String getName(){return "数据质量";}
	},OAM{
		public String getName(){return "开放服务";}
	},NEWS{
		public String getName(){return "新闻资讯";}
	},NEWSCOLUMN{
		public String getName(){return "栏目管理";}
	},ADVLOCATION{
		public String getName(){return "广告位";}
	},ADV{
		public String getName(){return "广告";}
	},USER{
		public String getName(){return "用户管理";}
	},USER_AUTHORITY{
		public String getName(){return "用户权限";};
	},USER_ROLE{
		public String getName(){return "用户角色";};
	},OPERATORLOG{
		public String getName(){return "审计日志";}
	},SYSEXCEPTION{
		public String getName(){return "系统异常";}
	},SYSITEMS{
		public String getName(){return "系统字典";}
	},SENSITIVEWORD{
		public String getName(){return "敏感词";}
	},SYSCONFIG{
		public String getName(){return "系统配置参数";}
	},SYSTAG{
		public String getName(){return "标签词库";}
	},OPERATOR{
		public String getName(){return "系统账号";}
	},ORGANIZATION{
		public String getName(){return "组织机构";}
	},PERMISSION{
		public String getName(){return "系统权限";}
	},ROLE{
		public String getName(){return "系统角色";}
	},LOGIN{
		public String getName(){return "登录";}
	},APPLICATION{
		public String getName(){return "应用中心";}
	},DATASOURCE{
		public String getName(){return "数据源";}
	},DATADIC{
		public String getName(){return "数据字典";}
	},WORKFLOW{
		public String getName(){return "工作流";}
	};
	public abstract String getName();
}
