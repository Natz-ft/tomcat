package com.inspur.data.portal.screen.uc.index;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.loushang.internet.view.ViewHandler;

import com.inspur.data.common.web.PaginationList;
import com.inspur.uc.api.organization.RegionInfo;
import com.inspur.utils.JsonUtils;
import com.inspur.utils.UserUtils;

public class SignUpReal implements ViewHandler {
    private static Logger log = Logger.getLogger(SignUpReal.class);

    /**
     * 进入注册页面
     */
    public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	request.setAttribute("meta_title", "用户注册");
        request.setAttribute("title", "用户注册");
    	PaginationList<RegionInfo> list = new PaginationList<RegionInfo>();
		try {
			//获得一级省份
			list = UserUtils.getRegionInfoService().queryRegionInfoByPage(null, "1", "0", null, 1, 100);
			request.setAttribute("provinceList",list.getRecords());
		} catch (Exception e) {
			log.error(e.getMessage(),e);
		}
    }
    /**
     * 获取短信验证码
     */
    public void doVerifyPhone(HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter out = response.getWriter();
		//0:尚未登录或参数错误、四位随机码：不支持手机短信，并且生成验证码成功、1：支持手机短信，并且生成验证码成功-1：生成验证码出错
		String result = "0";
		HttpSession session = request.getSession();
		String mobile = "";
		if (request.getParameter("mobile") != null
				&& !request.getParameter("mobile").isEmpty()) {
			mobile = request.getParameter("mobile");
			
			boolean mobileExist = UserUtils.getUserDomain().isPhoneExist(mobile);
			if(!mobileExist){
				boolean flag = UserUtils.getUserDomain().sendRegCodeToPhone(mobile);
				if (flag) {
					result = "1";
					session.setAttribute("tempLoginPhone", mobile);
				} else {
					result = "-1";
				}
			}else{
				result = "手机号码已被占用";
			}
		}
		out.write(JsonUtils.convertToString(result));
		
    }
    public void doclearPhonenum(HttpServletRequest request, HttpServletResponse response) {
		HttpSession session = request.getSession();
		session.removeAttribute("CertNum");
	}

   
    /**
     * 个人真实信息注册保存（手机）
     */
    public void doPhoneSignUp(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int result = 1;
        try {
        	String user_id = request.getParameter("login_person_name");
            String login_phone = request.getParameter("login_phone");
            String vcode = request.getParameter("vcode");
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("user_id", user_id);
            param.put("password", request.getParameter("password"));
            param.put("password_strength", request.getParameter("passwordStrength"));//密码强度
            param.put("login_phone", login_phone);
            param.put("nick_name", user_id);
            param.put("code", vcode);//手机验证码
            param.put("is_internal_user", 0);
            param.put("uname", request.getParameter("uname"));//真实姓名
            param.put("sex", request.getParameter("sex"));//称呼
            param.put("prov_code", request.getParameter("prov_code"));//省级代码
            param.put("city_code", request.getParameter("city_code"));//市级代码
            param.put("district", request.getParameter("district"));//区县级代码
            param.put("profession", request.getParameter("profession"));//职业
            param.put("application", request.getParameter("application"));//用途
            param.put("industry", request.getParameter("industry"));//所属行业
            param.put("user_type", request.getParameter("user_type"));
            result = UserUtils.getUserDomain().addRealUserInfo(param);
            
            if (result > 0) {
            	Map<String, Object> user = UserUtils.getUserDomain().getUserByUserId(user_id);
            	if(user != null && user.get("uid") != null) {
            		int uid = Integer.parseInt(user.get("uid").toString());
            		Map<String, Object> authenParam = new HashMap<String, Object>();
            		authenParam.put("uid", uid);
            		authenParam.put("security_phone", login_phone);
            		authenParam.put("security_phone_status", 2);
            		UserUtils.getSecurityPasswordDomain().add(authenParam);
            	}
            }
        } catch (Exception e) {
            log.error(e, e);
        }
        response.getWriter().write(result + "");
    }

    /**
     * 单位真实信息注册
     */
    public void doOrgSignUp(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	int result = 1;
        try {
        	/*user_id:登录名
        	password:登录密码
        	org_name:企业名称
        	contact_name:企业联系人
        	contact_phone:企业联系人电话
        	org_code:统一社会信用码
        	prov_code:省级代码
        	city_code:市级代码
        	district:区县级代码
        	industry_type1:所属行业*/
            Map<String, Object> param = new HashMap<String, Object>();
        	String user_id = request.getParameter("login_org_name");
            param.put("user_id", user_id);
            param.put("nick_name", user_id);
            param.put("password", request.getParameter("password"));
            param.put("password_strength", request.getParameter("passwordStrength"));
            param.put("is_internal_user", 0);
            param.put("authen_level", 0);
            param.put("org_name", request.getParameter("org_name"));
            param.put("contact_name", request.getParameter("contact_name"));
            param.put("contact_phone", request.getParameter("contact_phone"));
            param.put("org_code", request.getParameter("org_code"));
            param.put("prov_code", request.getParameter("prov_code"));
            param.put("city_code", request.getParameter("city_code"));
            param.put("district", request.getParameter("district"));
            param.put("industry_type1", request.getParameter("industry_type1"));
            param.put("user_type", request.getParameter("user_type"));
            result = UserUtils.getUserDomain().addRealOrganInfo(param);
        } catch (Exception e) {
        	log.error(e, e);
        }
        response.getWriter().write(result + "");
    }
    
    /**
     * 根据传参获取相应的行政区划信息，用于省、市、区级联查询
     * <br>
     * <p>Description: 
     * <br>
     * chen_lei<br>
     * <p>Date: 2018年5月4日 下午6:49:58<br/>
     * <p>
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException   
     * @see void
     */
    public void doGetRegionList(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	PaginationList<RegionInfo> resultList = new PaginationList<RegionInfo>();
    	try {
    		String parent_code = request.getParameter("parent_code");//父级行政区划代码
    		resultList = UserUtils.getRegionInfoService().queryRegionInfoByPage(null, "1", parent_code, null, 1, 100);
    	} catch (Exception e) {
    		log.error(e, e);
    	}
    	response.getWriter().write(JsonUtils.convertToString(resultList.getRecords()));
    }
    
}
