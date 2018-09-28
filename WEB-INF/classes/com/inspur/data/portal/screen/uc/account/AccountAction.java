package com.inspur.data.portal.screen.uc.account;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.loushang.internet.context.ContextHolder;
import org.loushang.internet.util.JsonUtils;
import org.loushang.internet.util.el.Function;
import org.loushang.internet.view.ViewHandler;

import com.inspur.ucweb.utils.ConfUtil;
import com.inspur.ucweb.utils.UCUtil;
import com.inspur.utils.UserUtils;

public class AccountAction implements ViewHandler {

	public void execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	}
	
	public void doUpdateAccount(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
			PrintWriter out = response.getWriter();
			//0"登录密码填写有误，未登录";、、1-成功、、-1失败
			int result = 0;
			HttpSession session = request.getSession();
			if(session.getAttribute("uid") != null 
					&& !session.getAttribute("uid").toString().isEmpty() 
					&& Integer.parseInt(session.getAttribute("uid").toString())>0){
				int uid = Integer.parseInt(session.getAttribute("uid").toString());
				String pwd = "";
				if(request.getParameter("password") != null && !request.getParameter("password").isEmpty()){
					pwd = request.getParameter("password");
				}
				if(!pwd.isEmpty()){
					//校验密码
			 		boolean macth = UserUtils.getUserDomain().isMatch(uid,pwd);
			 		if(macth){
			 			String newNick = request.getParameter("newNick");
			 			Map<String,Object> param = new HashMap<String,Object>();
			 			param.put("nick_name", newNick);
			 			param.put("uid", uid);
			 			boolean res = UserUtils.getUserDomain().updateAccount(param);
			 			if(res){
			 				result = 1;
			 				String cookieDomain = UCUtil.getCookieDomain();
			 				UCUtil.setCookie("uc_nick_name", newNick, -1, "/", cookieDomain, response);
			 			}else{
			 				result = -1;
			 			}
			 		}
				}
		}
		out.write(JsonUtils.convertToString(String.valueOf(result)));
	}
	
	public void doUpdateAccountPhone(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
			PrintWriter out = response.getWriter();
			//-2:登录密码错误或未登录//-1、验证码与当前用户不匹配；// 0、验证码已失效// 2、非预期系统错误；// 1、绑定成功；
			int result = -2;
			HttpSession session = request.getSession();
			if(session.getAttribute("uid") != null 
					&& !session.getAttribute("uid").toString().isEmpty() 
					&& Integer.parseInt(session.getAttribute("uid").toString())>0){
				int uid = Integer.parseInt(session.getAttribute("uid").toString());
				String pwd = "";
				if(request.getParameter("password") != null && !request.getParameter("password").isEmpty()){
					pwd = request.getParameter("password");
				}
				if(pwd != null){
					//校验密码
					boolean macth = UserUtils.getUserDomain().isMatch(uid,pwd);
					if(macth){
						
						//接收前台提交的  手机验证码，和session中的手机号
						String vcode = "";
						if(request.getParameter("vcode") != null && !request.getParameter("vcode").isEmpty()){
							vcode = request.getParameter("vcode");
						}
						String loginPhone = "";
						/*if(session.getAttribute("tempLoginPhone")!=null){
							loginPhone = session.getAttribute("tempLoginPhone").toString();
						}*/
						loginPhone = request.getParameter("phoneNum_input");
						if(loginPhone.isEmpty()){
							result = 0;
						}else{
							result = UserUtils.getUserDomain().bindLoginPhone(uid, vcode, loginPhone);
							if(1==result){
								//青岛主题
								String theme = ConfUtil.getFrameValue("frame.theme");
								if("qingdao".equals(theme)){
									//设置安全手机 已绑定
									Map<String,Object> secParam = new HashMap<String,Object>();
									secParam.put("uid", uid);
									secParam.put("security_phone", loginPhone);
									secParam.put("security_phone_status", 2);
									UserUtils.getSecurityPasswordDomain().update(secParam);
								}
							}
						}
					}
				}
			}
			out.write(JsonUtils.convertToString(String.valueOf(result)));
	}
	public void doUpdateAccountEmail(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		 // -2:登录密码错误 或未登录// -1、验证码与当前用户不匹配；// 0、验证码已失效// 2、非预期系统错误；// 1、绑定成功；
		int result = -2;
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") != null 
				&& !session.getAttribute("uid").toString().isEmpty() 
				&& Integer.parseInt(session.getAttribute("uid").toString())>0){
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			String pwd = "";
			if(request.getParameter("password") != null && !request.getParameter("password").isEmpty()){
				pwd = request.getParameter("password");
			}
			if(!pwd.isEmpty()){
				//校验密码
				boolean macth = UserUtils.getUserDomain().isMatch(uid,pwd);
				if(macth){
					//接收前台提交的  手机验证码，和session中的手机号
					String vcode = "";
					if(request.getParameter("vcode") != null && !request.getParameter("vcode").isEmpty()){
						vcode = request.getParameter("vcode");
					}
					String loginEmail = "";
					/*if(session.getAttribute("tempLoginEmail")!=null){
						loginEmail = session.getAttribute("tempLoginEmail").toString();
					}*/
					loginEmail = request.getParameter("newLogin_email")==null?"":request.getParameter("newLogin_email");
					if(loginEmail.isEmpty()){
						result = 0;
					}else{
						result = UserUtils.getUserDomain().bindLoginEmail(uid, vcode, loginEmail);
//						if(1==result){
//							//青岛主题
//							String theme = ConfUtil.getFrameValue("frame.theme");
//							if("qingdao".equals(theme)){
//								Map<String,Object> secParam = new HashMap<String,Object>();
//								secParam.put("uid", uid);
//								secParam.put("security_email", loginEmail);
//								secParam.put("security_email_status", 2);
//								ServiceConst.getUC_ISecurityPasswordDomain().update(secParam);
//							}
//						}
					}
				}
			}
		}
		out.write(JsonUtils.convertToString(String.valueOf(result)));
	}
		
			
	public void doVerifyPhone(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		//0:尚未登录或参数错误、四位随机码：不支持手机短信，并且生成验证码成功、1：支持手机短信，并且生成验证码成功-1：生成验证码出错
		String result = "0";
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") != null 
				&& !session.getAttribute("uid").toString().isEmpty() 
				&& Integer.parseInt(session.getAttribute("uid").toString())>0){
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			String mobile = "";
			if(request.getParameter("mobile") != null && !request.getParameter("mobile").isEmpty()){
				mobile = request.getParameter("mobile");
				String code = UserUtils.getUserDomain().sendLoginPhoneRandomCode(uid, mobile);
				if(code != null && !code.isEmpty() && (code.length()==4 ||code.length()==1)){
					result = code;
					session.setAttribute("tempLoginPhone", mobile);
				}else{
					result = "-1";
				}
				
			}
		}
		out.write(JsonUtils.convertToString(result));
	}
	public void doDelFileById(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		//0:error 1:success
		int result = 0;
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") != null 
				&& !session.getAttribute("uid").toString().isEmpty() 
				&& Integer.parseInt(session.getAttribute("uid").toString())>0){
			if(request.getParameter("id")!=null && !request.getParameter("id").isEmpty()){
				int fileId = Integer.parseInt(request.getParameter("id"));
				result = UserUtils.getFileDomain().delFileById(fileId);
			}
		}
		out.write(JsonUtils.convertToString(result));
	}
	
	public String getFileTypeByName(String suffix){
		String fileType = "";
		if(suffix!=null && !suffix.isEmpty()){
			if("jpg".equals(suffix) || "jpeg".equals(suffix) || "png".equals(suffix) || "gif".equals(suffix)){
				fileType = "img";
			}
			if("doc".equals(suffix) || "docx".equals(suffix)){
				fileType = "doc";
			}
			if("xls".equals(suffix) || "xlsx".equals(suffix)){
				fileType = "xls";
			}
		}
		return fileType;
	}
	
	public void doVerifyEmail(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		 // 0：尚未登录或参数错误// 1：邮箱验证码发送成功，四位随机码// -1：系统错误，生成验证码失败
		PrintWriter out = response.getWriter();
		int result = 0;
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") != null 
				&& !session.getAttribute("uid").toString().isEmpty() 
				&& Integer.parseInt(session.getAttribute("uid").toString())>0){
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			String email = "";
			if(request.getParameter("email")!=null && !request.getParameter("email").isEmpty()){
				email = request.getParameter("email");
			}
			if(!email.isEmpty()){
				//获取邮箱随机验证码
				String code = UserUtils.getUserDomain().sendLoginEmailRandomCode(uid,email);
				if("1".equals(code)){
					session.setAttribute("tempLoginEmail", email);
					result = 1;
				}else{
					result = -1;
				}
			}
		}
		out.write(JsonUtils.convertToString(String.valueOf(result)));
	}
	public void doAddSubAccount(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		int result = 0;
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") != null 
				&& !session.getAttribute("uid").toString().isEmpty() 
				&& Integer.parseInt(session.getAttribute("uid").toString())>0){
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			
			Map userBasic = UCUtil.getUserBasic(uid);
			String user_type = String.valueOf(userBasic.get("user_type"));
			String subUserType = "31";
			if ("41".equals(user_type)) {
			    subUserType = "61";
			}
			Map param = new HashMap();
			param.put("cur_uid", uid);
			param.put("dept_uid", request.getParameter("dept_uid_hidden"));
			//注意判断是否uid 与 dept_uid 是上下级关系，uid可以等于dept_uid   ???? 
			param.put("user_id", request.getParameter("login_name"));
			param.put("user_type", subUserType);
			param.put("password_strength", request.getParameter("passwordStrength"));
			param.put("login_email", request.getParameter("login_email"));
			param.put("password", request.getParameter("password"));
			param.put("nick_name", request.getParameter("nickname"));
			
			result = UserUtils.getUserDomain().addSubAccount(param);
		}
		out.write(JsonUtils.convertToString(String.valueOf(result)));
	}
	public void doDelSubAccount(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		int result = 0;
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") != null 
				&& !session.getAttribute("uid").toString().isEmpty() 
				&& Integer.parseInt(session.getAttribute("uid").toString())>0){
			
			if(request.getParameter("sub_account") != null){
				int operator = Integer.parseInt(session.getAttribute("uid").toString());
				int subAccount = Integer.parseInt(request.getParameter("sub_account"));
				result = UserUtils.getRelationDomain().delSubAccount(subAccount, operator);
			}
		}
		out.write(JsonUtils.convertToString(String.valueOf(result)));
	}
	public void doEditSubAccount(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		int result = 0;
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") != null 
				&& !session.getAttribute("uid").toString().isEmpty() 
				&& Integer.parseInt(session.getAttribute("uid").toString())>0){
			// 使用存储的子账号uid， 避免从前台获取uid
			if(session.getAttribute("subAccountUid") != null && Integer.parseInt(session.getAttribute("subAccountUid").toString())>0){
				
				Map param = new HashMap();
				param.put("uid", session.getAttribute("subAccountUid"));
				param.put("user_id", request.getParameter("user_id"));
				param.put("password_strength", request.getParameter("passwordStrength"));
				param.put("login_email", request.getParameter("login_email"));
				param.put("password", request.getParameter("password"));
				param.put("login_phone", request.getParameter("login_phone"));
				param.put("nick_name", request.getParameter("nick_name"));
				boolean res = UserUtils.getUserDomain().update(param);
				if(res){
					result = 1;
				}
			}
		}
		out.write(JsonUtils.convertToString(String.valueOf(result)));
	}
	
	public void doSaveMyPhotoURL(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		int result = 0;
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") != null 
				&& !session.getAttribute("uid").toString().isEmpty() 
				&& Integer.parseInt(session.getAttribute("uid").toString())>0){
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			String photoId = "";
			if(request.getParameter("photo_id")!=null && !request.getParameter("photo_id").isEmpty()){
				photoId = request.getParameter("photo_id");
			}
			if(!photoId.isEmpty()){
				boolean res = UserUtils.getUserDomain().updateAvatar(uid, Integer.parseInt(photoId));
				if(res){
					//更新session中头像信息
					session.setAttribute("userInfo", UCUtil.getUserBasic(uid));
					result = 1;
				}else{
					result = -1;
				}
			}
		}
		out.write(JsonUtils.convertToString(String.valueOf(result)));
	}
	public void doOrgSubmit(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		int result = -1;
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") != null 
				&& !session.getAttribute("uid").toString().isEmpty() 
				&& Integer.parseInt(session.getAttribute("uid").toString())>0){
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			boolean is_organ = UserUtils.getUserDomain().isOrganByUid(uid);
			if(is_organ){
				String [] fields = {"org_name","org_type","legal_person","address",
						"zip_code","district","industry_type1","industry_type2",
						"org_kind","org_code","business_license","tax_register_no",
						"state","contact_name","contact_phone","contact_email",
						"found_time","business_address","business_scope","enrol_fund",
						"open_bank","bank_account","org_website","org_intro",
						"lat","lng","gov_affairs_weibo","org_info"};
				Map orgParam = new HashMap();
				orgParam.put("uid", uid);
				for(String tempStr:fields){
					if(request.getParameter(tempStr) != null){
						orgParam.put(tempStr, request.getParameter(tempStr));
					}
				}
				if(orgParam.get("enrol_fund")!= null && orgParam.get("enrol_fund").toString().isEmpty()){
					orgParam.put("enrol_fund", 0);
				}
				if(request.getParameter("is_downgrade") != null){
					orgParam.put("is_downgrade",request.getParameter("is_downgrade"));
				}
				boolean res = UserUtils.getOrganDomain().modifyOrganByUid(orgParam);
				result = res?1:0;
			}
		}
		out.write(JsonUtils.convertToString(String.valueOf(result)));
	}
	
	public void doPersonSubmit(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		int result = -1;
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") != null 
				&& !session.getAttribute("uid").toString().isEmpty() 
				&& Integer.parseInt(session.getAttribute("uid").toString())>0){
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			boolean is_organ = UserUtils.getUserDomain().isOrganByUid(uid);
			if(! is_organ){
				String [] fields = {"uname","sex","nationality","nation",
						"birthday","native_place","cert_type","cert_num",
						"address","district","zip_code","phone",
						"fax","qq"};
				Map perParam = new HashMap();
				perParam.put("uid", uid);
				for(String tempStr:fields){
					if(request.getParameter(tempStr) != null){
						perParam.put(tempStr, request.getParameter(tempStr));
					}
				}
				if(request.getParameter("is_downgrade") != null){
					perParam.put("is_downgrade",request.getParameter("is_downgrade"));
				}
				boolean res = UserUtils.getPersonDomain().modifyPersonByUid(perParam);
				result = res?1:0;
			}
		}
		out.write(JsonUtils.convertToString(String.valueOf(result)));
	}
	public void doUnbind(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		int result = 0;
		HttpSession session = request.getSession();
		if(session.getAttribute("uid") != null 
				&& !session.getAttribute("uid").toString().isEmpty() 
				&& Integer.parseInt(session.getAttribute("uid").toString())>0){
			int uid = Integer.parseInt(session.getAttribute("uid").toString());
			String type = "";
			if(request.getParameter("type") != null){
				type = request.getParameter("type");
			}

			if(!type.isEmpty()){
				boolean res = UserUtils.getOutBindDomain().deleteBindByType(uid, type);
				if(res){
					ContextHolder.sendRedirect(Function.getLink("account/accountBind.jsp"));
				}
			}
		}
	}
}
