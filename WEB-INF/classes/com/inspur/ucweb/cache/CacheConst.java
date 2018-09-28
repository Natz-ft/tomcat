
package com.inspur.ucweb.cache;

//-----------用户中心缓存使用说明-----------------
//user_basic_uid_  根据uid获取用户基本信息，对应表 uc_users
//user_sec_pass_uid_ 根据uid获取用户密码保护设置信息，对应表 uc_security_password
//user_sec_notify_uid_ 根据uid获取用户安全提醒设置信息，对应表 uc_security_notify
//user_person_uid_ 根据uid获取用户关联的自然人信息，对应表 uc_person
//user_organ_uid_ 根据uid获取用户关联的法人信息，对应表 uc_organ 
//user_login_info_uid_ 根据uid获取用户的登录信息，对应表 uc_login_info 

//follow_group_uid_ 根据uid获取该用户创建的所有关注分组
//follow_list_uid_  获取我关注的用户列表
//follow_count_uid_ 获取我关注的用户数量
//followers_in_follow_group_id_ 根据‘关注分组’id，获取该分组下的用户信息
//followers_count_in_follow_group_id_ 根据‘关注分组’id，获取该分组下的用户数量
//followers_not_in_follow_group_uid_ 根据uid，获取该用户关注的、尚未分组的用户信息
//followers_count_not_in_follow_group_uid_ 根据uid，获取该用户关注的、尚未分组的用户数量

//fans_uid_ 根据uid获取该用户的所有粉丝
//fans_count_uid_  获取指定用户的粉丝数量
//black_list_uid_ 根据uid获取该用户的黑名单信息

//user_extend_uid_  获取用户扩展信息
//user_ca_uid_  获取用户关联的ca信息
//cert_uid_ 获取用户的证件类型信息

//group_info_groupid_ 获取指定group_id的群组信息
//group_member_uid_ 根据成员uid获取成员所在群
//my_manage_group_uid_ 获取用户uid管理（创建的和管理）的社区的groupIdList
//my_create_group_uid_ 根据uid获取该用户创建的所有群
//organ_uid_district_ 获取指定所属区域district的uid
public interface CacheConst {

	public static final String USER_BASIC_UID_ = "user_basic_uid_";
	public static final String USER_BASIC_INFO_UID_ = "user_basic_info_uid_";
	public static final String USER_SEC_PASS_UID_ = "user_sec_pass_uid_";
	public static final String USER_SEC_NOTIFY_UID_ = "user_sec_notify_uid_";
	public static final String USER_PERSON_UID_ = "user_person_uid_";
	public static final String USER_ORGAN_UID_ = "user_organ_uid_";
	public static final String USER_LOGIN_INFO_UID_ = "user_login_info_uid_";
	
	public static final String FOLLOW_GROUP_UID_ = "follow_group_uid_";
	public static final String FOLLOWERS_IN_FOLLOW_GROUP_ID_ = "followers_in_follow_group_id_";
	public static final String FOLLOWERS_NOT_IN_FOLLOW_GROUP_UID_="followers_not_in_follow_group_uid_";
	
	public static final String FOLLOWERS_COUNT_IN_FOLLOW_GROUP_ID_ = "followers_count_in_follow_group_id_";
	public static final String FOLLOWERS_COUNT_NOT_IN_FOLLOW_GROUP_UID_="followers_count_not_in_follow_group_uid_";
	
	public static final String FANS_UID_ = "fans_uid_";
	public static final String BLACK_LIST_UID_ = "black_list_uid_";
	
	public static final String FANS_COUNT_UID_ = "fans_count_uid_";
	public static final String FOLLOW_COUNT_UID_ = "follow_count_uid_";
	public static final String FOLLOW_LIST_UID_ = "follow_list_uid_";
	
	public static final String USER_EXTEND_UID_ = "user_extend_uid_";
	public static final String USER_CA_UID_ = "user_ca_uid_";
	public static final String CERT_UID_ = "cert_uid_";

	public static final String  GROUP_INFO_GROUPID_="group_info_groupid_";
	public static final String  GROUP_MEMBER_UID_= "group_member_uid_";
	public static final String  MY_MANAGE_GROUP_UID_="my_manage_group_uid_";
	public static final String MY_CREATE_GROUP_UID_ = "my_create_group_uid_";
	
	public static final String ORGAN_UID_DISTRICT_="organ_uid_district_";
	
	//在线用户数
	public static final String ONLINE_COUNT="online_count";
	//系统访问量统计
	public static final String LOGIN_STATISTICS="login_statistics";
	//千度访问量统计
	public static final String QIANDU_STATISTICS="qiandu_statistics";

	//所有已开通的站点
	public static final String ALL_OPEN_SITE_WITH_STRU = "all_open_site_with_stru";
	//所有站点（包含开通和未开通）
	public static final String ALL_SITE_WITH_STRU = "all_site_with_stru";
	//按照站点名称首字母a-z排序
	public static final String ALL_SITE_ORDER_BY_A2Z = "all_site_order_by_a2z";
	
	//用户类型
	public static final String USER_TYPE_MAP = "user_type_map";
}

