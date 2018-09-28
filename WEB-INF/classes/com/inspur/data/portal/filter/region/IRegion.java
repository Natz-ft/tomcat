package com.inspur.data.portal.filter.region;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public interface IRegion {
	/**
	 * 加载用户所在站点信息
	 * <br/>
	 * @Title: getRegionCode
	 * @author haowenxiang@inspur.com
	 * @param site_code
	 * @param site_abbr
	 * @param session
	 * @return 
	 * @see
	 * boolean 
	 * @throws
	 */
	public String getRegionCode(String site_abbr_cookie,String site_abbr,HttpSession session,HttpServletResponse response);
	/**
	 * 加载默认地市
	 * @Title: loadDefaultRegion
	 * @Description: TODO(这里用一句话描述这个方法的作用)
	 * @return    设定文件
	 * String    返回类型
	 * @throws
	 */
	public String loadDefaultRegion(String default_domain_key,HttpSession session);
	/**
	 * 清理session中的记录
	 * <br/>
	 * @Title: clearRegion
	 * @author haowenxiang@inspur.com
	 * @param session
	 * @return 
	 * @see
	 * boolean 
	 * @throws
	 */
	public boolean clearRegion(HttpSession session);
}
