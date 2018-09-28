<%@ page trimDirectiveWhitespaces="true"%> 
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" buffer="none"%>
<%@ taglib uri="/tags/website" prefix="website"%>
<%@ taglib uri="/tags/website-function" prefix="fn"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<website:style href="css/dev/form.css"/>
<website:style href="css-open/dev/app-detail.css"/>

<website:style href="css/dev/form.css"/>
<website:style href="css-open/dev/app-detail.css"/>
<script type="text/html" id="appMobileTpl" >
			<div class="cont-title-bold clearfix">
				<span class="title">应用名称：<?=app.app_alias?></span>
				<div class="opt">
					<a class="btn-add-version" style="color:#fff;" href="#mobile/create">添加新版本</a>
				</div>
			</div>
			<ul class="app-versions">
				<? if(list != null && list.length > 0){?>
				<? for(var i =0; i< list.length; i++){ ?>
				<li class="app-version" id="version_<?=list[i]['feature_id']?>">
					
						<?if(list[i]['feature_id'] == curVersion['feature_id']){?> <!--当前版本-->
							<h3 class="version-title hclear current" >
							<span class="version_name"><?=list[i]['version_name']?></span>
							<span class="btn-drop" style="cursor:pointer">[收&ensp;缩]</span>

							<span class="platform_type">
								<?if(list[i]['platform_type'] == 'android'){?>
									<i class="icon-android-black"></i>Android客户端
								<?}?>
								<?if(list[i]['platform_type'] == 'ios'){?>
									<i class="icon-iphone-black"></i>IOS客户端
								<?}?>
								
								<?if(list[i]['platform_type'] == 'mobile_web'){?>
									<i class="icon-create"></i>移动网站
								<?}?>
							</span>
							
							<?if(list[i]['app_status'] == 1){?>
								<span class="app_status status-warning"><i class="icon"></i>已提交</span>
							<?}else if(list[i]['app_status'] == 2){?>
								<span class="app_status status-success"><i class="icon"></i>已上线</span>
							<?}else if(list[i]['app_status'] == 0){?>
								<span class="app_status status-unsubmit"><i class="icon"></i>未提交</span>
							<?}else if(list[i]['app_status'] == 3){?>
								<span class="app_status status-warning"><i class="icon"></i>已下线</span>
							<?}else if(list[i]['app_status'] == 4){?>
								<span class="app_status status-error"><i class="icon"></i>被驳回</span>
							<?}?>

							<?if(list[i]['app_status'] == 0 || list[i]['app_status'] == 3 || list[i]['app_status'] == 4 ){?>
								<a class="app_status" __deleteVersionBtn="true" __version_id="<?=list[i]['feature_id']?>" style="margin-right:80px;cursor:pointer;">删除版本</a>
							<?}?>
							
							</h3>
						<?}else{?>
							<h3 class="version-title hclear">
							<span class="version_name"><?=list[i]['version_name']?></span>
							
							<a class="btn-drop" href="#mobile!version=<?=list[i]['feature_id']?>">[查&ensp;看]</a>
						
							<span class="platform_type">
								<?if(list[i]['platform_type'] == 'android'){?>
									<i class="icon-android-black"></i>Android客户端
								<?}?>
								<?if(list[i]['platform_type'] == 'ios'){?>
									<i class="icon-iphone-black"></i>IOS客户端
								<?}?>
								
								<?if(list[i]['platform_type'] == 'mobile_web'){?>
									<i class="icon-create"></i>移动网站
								<?}?>
							</span>

							<?if(list[i]['app_status'] == 1){?>
								<span class="app_status status-warning"><i class="icon"></i>已提交</span>
							<?}else if(list[i]['app_status'] == 2){?>
								<span class="app_status status-success"><i class="icon"></i>已上线</span>
							<?}else if(list[i]['app_status'] == 0){?>
								<span class="app_status status-unsubmit"><i class="icon"></i>未提交</span>
							<?}else if(list[i]['app_status'] == 3){?>
								<span class="app_status status-warning"><i class="icon"></i>已下线</span>
							<?}else if(list[i]['app_status'] == 4){?>
								<span class="app_status status-error"><i class="icon"></i>被驳回</span>
							<?}?>
							<?if(list[i]['app_status'] == 0 || list[i]['app_status'] == 3 || list[i]['app_status'] == 4 ){?>
								<a class="app_status" __deleteVersionBtn="true" __version_id="<?=list[i]['feature_id']?>" style="margin-right:80px;cursor:pointer;">删除版本</a>
							<?}?>
							</h3>
						<?}?>
					</h3>
					<!--展示当前版本-->
					<?if(list[i]['feature_id'] == curVersion['feature_id']){?>
					<div class="drop-detail form-body" id="form_body_<?=curVersion['feature_id']?>">
												<dl class="clearfix">
							<dt>当前状态：</dt>
							<dd>
								<div class="op_app_progress op_app_progress_3 n5 p<?=(curVersion['plevel'])?>">
									<ul class="step">
									<li class="no4 last"><span>上线</span></li>
										<li class="no2"><span>审核</span></li>
										<li class="no1"><span>创建</span></li>
									</ul>
								</div>
								
							</dd>
							<?if(curVersion['plevel'] == 1){?>
							<dd>
								<a class="file-up-btn" href="javascript:void(0)" __submitVersionBtn="true" __version_id="<?=curVersion['feature_id']?>" style="display:block;margin:6px 0px 0px 38px;" id="submitVersionBtn_<?=curVersion['feature_id']?>">提交审核</a>
							</dd>
							<?}else{?>
							<dd>
								<span class="file-up-btn" href="javascript:void(0)" __submitVersionBtn="true" __version_id="<?=curVersion['feature_id']?>" style="display:block;background:gray;margin:6px 0px 0px 38px;" >提交审核</span>
							</dd>
							<?}?>
						</dl>
						
						<dl style="height: 10px; overflow:hidden;">
							<dt></dt>
							<dd></dd>
						</dl>
					
						<dl class="clearfix">
							<dt>应用信息：</dt>
							<dd>
								
								<ul class="drop-detail-cates">
									<li class="drop-detail-cate drop-detail-cate-basic">
										<div class="cate-head <?if(light_one){?>on<?}?>" title="展开编辑详细描述信息">
											<span class="icons cate-icon" id="cate_title_info_<?=curVersion['feature_id']?>"></span>
											<div class="cate-title">
												<p class="txt" style="cursor:pointer">基本信息</p>
												<p class="tip">请填写应用分类、简介等说明，简介中请不要包含应用无关或者涉嫌违法的信息</p>
											</div>
										</div>
										<div class="cate-body">
											
											<dl class="clearfix">
												<dt><em class="required">*</em>版本名称：</dt>
												<dd>
													<input class="input" name="version_name" value="<?=curVersion['version_name']?>" type="text"  id="version_name_<?=curVersion['feature_id']?>"  style="height:25px"/>
													<p class="form-common-tip">
														该名称也用于来源显示，不超过15个字符（中英文、数字或下划线）
													</p>
												</dd>
											</dl>
											
											<dl class="clearfix">
												<dt><em class="required">*</em>版本号：</dt>
												<dd>
													<input class="input" name="version_number" value="<?=curVersion['version_number']?>" type="text"  id="version_number_<?=curVersion['feature_id']?>"  style="height:25px"/>
													<p class="form-common-tip">
														当前的版本号,支持整数、小数
													</p>
												</dd>
											</dl>
											
											<!--隐藏feature_type-->
											<input type="hidden" name="platform_type_<?=curVersion['feature_id']?>" value="<?=curVersion['platform_type']?>"/>
											<!--填写应用访问地址-->
											<dl name="feature_type_acess" <?if(curVersion['platform_type'] == 'ios' || curVersion['platform_type'] == 'mobile_web'){?>style="display:block;"<?}else{?>style="display:none;"<?}?> id="feature_mobile_web_<?=curVersion['feature_id']?>" >
												<dt><em class="required">*</em><?if(curVersion['platform_type'] =='mobile_web'){?>访问地址<?}else{?>下载地址<?}?>：</dt>
												<dd>
													<p style="height:36px; display:block; position:relative">
													<input class="input" name="app_url_<?=curVersion['feature_id']?>" value="<?=curVersion['app_url']?>" type="text"  id="app_url_<?=curVersion['feature_id']?>"/>
													</p>
													<p class="form-common-tip">
														请填写移动网站的地址，以http://开头
													</p>
												</dd>
											</dl>
											<!--上传应用安装包-->
											<dl name="feature_type_acess" <?if(curVersion['platform_type'] == 'android' || curVersion['platform_type'] == 'window'){?>style="display:block;"<?}else{?>style="display:none;"<?}?>  id="feature_install_pg_<?=curVersion['feature_id']?>" >
												<dt><em class="required">*</em>安装包：</dt>
												<dd style="width:400px;">
													<p style="height:36px; display:block; position:relative">
														<span style="position:absolute;display:block; z-index:1;"><b id="upload_apk_btn_txt_<?=curVersion['feature_id']?>"></b></span>
														<a class="file-up-btn apk-up-btn"  href="javascript:void(0)" id="upload_apk_btn_txt_<?=curVersion['feature_id']?>">
															<? if(curVersion['file_path']) {?>
																已上传
															<?}else{?>
																上传
															<?}?>
														</a>
														<input type="hidden" name="upload_apk_filename" id="upload_apk_filename_<?=curVersion['feature_id']?>" value="<?=curVersion['file_name']?>"/>
														<input type="hidden" name="upload_apk_filepath" id="upload_apk_filepath_<?=curVersion['feature_id']?>" value="<?=curVersion['file_path']?>"/>
														<input type="hidden" name="upload_apk_filesize" id="upload_apk_filesize_<?=curVersion['feature_id']?>" value="<?=curVersion['file_size']?>"/>
													</p>
													<p class="form-common-tip">
															<span id="upload_apk_status_<?=curVersion['feature_id']?>">
															<? if(curVersion['file_path']) {?>
																文件名: <?=curVersion['file_name']?>
															<?}else{?>
																请上传应用安装包apk文件
															<?}?>
															</span>
															
															<span id="upload_apk_size_<?=curVersion['feature_id']?>"><?if(curVersion['file_size']){?>文件大小：<?=curVersion['file_size']?>B<?}?></span>
													</p>
												</dd>
											</dl>
											<dl class="clearfix">
												<dt>升级说明：</dt>
												<dd>
													<textarea class="textarea" name="upgrade_instru" id="upgrade_instru_<?=curVersion['feature_id']?>"><?=curVersion['upgrade_instru']?></textarea>
													<p class="form-common-tip">
														简述此次版本升级的功能简介，bug修复等，不超过500字
													</p>
												</dd>
											</dl>
											
											<dl class="clearfix">
												<dt></dt>
												<dd>
													<a class="file-up-btn" href="javascript:void(0)" __submitInfoBtn="true" __version_id="<?=curVersion['feature_id']?>">保存</a>
												</dd>
											</dl>
											
										</div>
									</li>
									
									<li class="drop-detail-cate  drop-detail-cate-pic">
										<div class="cate-head <?if(light_two){?>on<?}?>" title="展开编辑应用设置信息">
											<span class="icons cate-icon" id="cate_title_icon_<?=curVersion['feature_id']?>"></span>
											<div class="cate-title">
												<p class="txt" style="cursor:pointer">图标设置</p>
												<p class="tip">上传应用以及应用图标、截图等内容，重点宣传截图请优先上传</p>
											</div>
										</div>
										<div class="cate-body">
										<%--	<dl class="clearfix">
												<dt><em class="required">*</em>应用图标：</dt>
												<dd class="form-upimg">
								
												<p class="form-common-tip">
												支持PNG、JPG,JPEG,GIF格式，上传后自动生成16*16，64*64，120*120(px)尺寸图片。用于在“最新应用”、“热门应用”、“月排行榜”、“应用明细”等显示，大小不超过4M
												</p>
					
												</dd>
												
												<dd class="upload-container" style="width:70%;height:auto;" id="upload_icons_container_<?=curVersion['feature_id']?>" >
													<div class=" <?if('pic_info' in curVersion && 'icon' in curVersion['pic_info'] && 0 in curVersion['pic_info']['icon']){?>upload-done<?}else{?>upload-before<?}?>" id="upload_icons_status_<?=curVersion['feature_id']?>">
														<div class="up-pic-btn">
															<b style="color:#fff;text-align:center;padding-left:20px;" id="upload_icons_btn_<?=curVersion['feature_id']?>">上传图片</b>
														</div>
														<?if('pic_info' in curVersion && 'icon' in curVersion['pic_info'] && 0 in curVersion['pic_info']['icon']){?>
														<div id="show_icons_<?=curVersion['feature_id']?>" style="border:1px dashed #ccc;width:400px;height:130px;margin-top:15px;">
															<img src="<?=rcservice_url?><?=curVersion['pic_info']['icon'][0]?>&type=thumbnail&size=16" width=16 height=16 style="margin:30px 25px;" />
															<img src="<?=rcservice_url?><?=curVersion['pic_info']['icon'][0]?>&type=thumbnail&size=64" width=64 height=64  style="margin:10px 25px;"/>
															<img src="<?=rcservice_url?><?=curVersion['pic_info']['icon'][0]?>&type=thumbnail&size=120" width=120 height=120 style="margin:2px 25px;"/>
														</div>
														<input type="hidden" class="hiddenInput_<?=curVersion['feature_id']?>"  name="little_con_<?=curVersion['feature_id']?>" id="upload_little_img_value_<?=curVersion['feature_id']?>" value="<?if('pic_info' in curVersion && 'icon' in curVersion['pic_info'] && 0 in curVersion['pic_info']['icon']){?><?=curVersion['pic_info']['icon'][0]?><?}?>"/>
														<input type="hidden" class="hiddenInput_<?=curVersion['feature_id']?>"  name="large_con_<?=curVersion['feature_id']?>" id="upload_large_img_value_<?=curVersion['feature_id']?>" value="<?if('pic_info' in curVersion && 'large_icon' in curVersion['pic_info'] && 0 in curVersion['pic_info']['large_icon']){?><?=curVersion['pic_info']['large_icon'][0]?><?}?>"/>
														<input type="hidden" class="hiddenInput_<?=curVersion['feature_id']?>" name="advise_con_<?=curVersion['feature_id']?>" id="upload_advise_img_value_<?=curVersion['feature_id']?>" value="<?if('pic_info' in curVersion && 'recommend' in curVersion['pic_info'] && 0 in curVersion['pic_info']['recommend']){?><?=curVersion['pic_info']['recommend'][0]?><?}?>"/>
														<?}else{?>
															<div id="show_icons_<?=curVersion['feature_id']?>" style="border:1px dashed #ccc;width:400px;margin-top:15px;display:none;">
															</div>
														<input type="hidden" class="hiddenInput_<?=curVersion['feature_id']?>"  name="little_con_<?=curVersion['feature_id']?>" id="upload_little_img_value_<?=curVersion['feature_id']?>" value=""/>
														<input type="hidden" class="hiddenInput_<?=curVersion['feature_id']?>"  name="large_con_<?=curVersion['feature_id']?>" id="upload_large_img_value_<?=curVersion['feature_id']?>" value=""/>
														<input type="hidden" class="hiddenInput_<?=curVersion['feature_id']?>" name="advise_con_<?=curVersion['feature_id']?>" id="upload_advise_img_value_<?=curVersion['feature_id']?>" value=""/>
														
														<?}?>
													</div>
												</dd>
												
											</dl>   --%>
											
											<dl class="clearfix">
												<dt><em class="required">*</em>应用预览图片：</dt>
												<dd class="form-upimg">
									
													<p class="form-common-tip">
														尺寸为(350px~750px)*280px，大小50k以内，支持PNG、JPG，显示在“应用明细”页的推荐栏（最多上传五张）
													</p>
													
												</dd>
												
												<?for(var j=0; j<5; j++){?>
												<dd class="upload-container" id="upload_preview_container_<?=curVersion['feature_id']?>_<?=j?>"  <?if(j==0){?>style="padding-left:130px;"<?}else{?>style="padding-left:10px;"<?}?> >
													<div class="upload <?if('pic_info' in curVersion && 'preview' in curVersion['pic_info'] &&  j in curVersion['pic_info']['preview']){?>upload-done<?}else{?>upload-before<?}?>" id="upload_preview_status_<?=curVersion['feature_id']?>_<?=j?>">
														<div class="upload-box">
															<div class="upload-box-out">
																<div class="upload-box-inner">
																	<div class="upload-box-inner-icon"></div>
																	<div class="upload-box-inner-num" id="upload_preview_percent_<?=curVersion['feature_id']?>_<?=j?>"></div>
																</div>
															</div>
														</div>
														<div class="upload-border">
															<div class="upload-border-inner"></div>
														</div>
														<i class="upload-edit"></i>
														<div class="upload-img">
															<div class="upload-img-out" id="upload_preview_img_box_<?=curVersion['feature_id']?>_<?=j?>">
																<?if('pic_info' in curVersion && 'preview' in curVersion['pic_info'] &&  j in curVersion['pic_info']['preview']){?>
																<img src="<?=rcservice_url?><?=curVersion['pic_info']['preview'][j]?>" style="width: auto; height: 64px;">
																<?}?>
															</div>
															<input type="hidden" name="preview_con_<?=curVersion['feature_id']?>" id="upload_preview_img_value_<?=curVersion['feature_id']?>_<?=j?>" value="<?if('pic_info' in curVersion && 'preview' in curVersion['pic_info'] &&  j in curVersion['pic_info']['preview']){?><?=curVersion['pic_info']['preview'][j]?><?}?>"/>
														</div>
														<b id="upload_preview_btn_<?=curVersion['feature_id']?>_<?=j?>"></b>
														<div class="upload-delete"><a href="javascript:;" __upload_img_delete="true" __version_id="<?=curVersion['feature_id']?>" __fortype="preview" __forimg="upload_preview_img_value_<?=curVersion['feature_id']?>_<?=j?>" __forbox="upload_preview_status_<?=curVersion['feature_id']?>_<?=j?>">删除</a></div>
													</div>
												</dd>
												<?}?>
											</dl>
											
											<dl class="clearfix">
												<dt></dt>
												<dd>
													<a class="file-up-btn" href="javascript:void(0)" __submitIconBtn="true" __version_id="<?=curVersion['feature_id']?>">保存</a>
												</dd>
											</dl>
										</div>
									</li>
									
									<li class="drop-detail-cate  drop-detail-cate-detail">
										<div class="cate-head <?if(light_three){?>on<?}?>" title="详细信息">
											<span class="icons cate-icon" id="cate_title_detail_<?=curVersion['feature_id']?>"></span>
											<div class="cate-title">
												<p class="txt" style="cursor:pointer">详细信息</p>
												<p class="tip">请填写简介等说明，简介中请不要包含应用无关或者涉嫌违法的信息</p>
											</div>
										</div>
										<div class="cate-body">
											
											<dl class="clearfix">
												<dt><em class="required">*</em>应用描述：</dt>
												<dd>
													<textarea class="textarea" name="version_desc" id="version_desc_<?=curVersion['feature_id']?>"><?=curVersion['description']?></textarea>
													<p class="form-common-tip">
														简述应用的作用、使用方法等信息，将显示在应用广场中，不超过500字
													</p>
												</dd>
											</dl>
											<dl class="clearfix">
												<dt>应用使用说明：</dt>
												<dd>
													<textarea class="" name="version_intruction" id="version_intruction_<?=curVersion['feature_id']?>"><?=curVersion['app_instructions']?></textarea>
													<p class="form-common-tip">
														关于使用该应用相关功能的一些规则性和引导性说明
													</p>
												</dd>
											</dl>
											<dl class="clearfix">
												<dt>常见问题说明：</dt>
												<dd>
													<textarea class="" name="version_problems" id="version_problems_<?=curVersion['feature_id']?>"><?=curVersion['app_problems']?></textarea>
													<p class="form-common-tip">
														在使用该应用过程中可能遇到的常见问题的说明
													</p>
												</dd>
											</dl>
											<dl class="clearfix">
												<dt></dt>
												<dd>
													<a class="file-up-btn" href="javascript:void(0)" __submitDetailBtn="true" __version_id="<?=curVersion['feature_id']?>">保存</a>
												</dd>
											</dl>
										</div>
									</li>

									<li class="drop-detail-cate drop-detail-cate-attach" id="li_individual_info_<?=curVersion['feature_id']?>">
									</li>
									
								</ul>
							</dd>
						</dl>
						<dl class="clearfix">
							<dt>当前操作：</dt>
							<dd>
								<? if(curVersion['plevel']==2){?>
									<a class="btn_sgray" href="javascript:void(0)" __cancelSubmitVersionBtn="true" __version_id="<?=list[i]['feature_id']?>">取消提交审核</a>
								<? }?>
							    <? if(curVersion['plevel']!=1){?>
									<a class="btn_sgray" href="javascript:void(0)" __copyVersionBtn="true" __version_id="<?=list[i]['feature_id']?>">复&emsp;制</a>
								<? }else{?>
									<a class="btn_sgray" href="javascript:void(0)" __submitversionbtn="true"  __version_id="<?=list[i]['feature_id']?>">提交审核</a>
								<? }?>
							</dd>
						</dl>
						
					</div>
					
					<?}?>
					<!--当前版本结束-->
					
				
				<?}?>
				<?}else{?>
				<ul class="service-list">
					<li class="service-item" style="text-align:center;">
					<a href="#mobile/create" style="color:#23B3DA;">还没有创建任何版本,赶紧去创建一个</a>
					</li>
				</ul>
				<?}?>
			</ul>
		</div>
</script>
<website:widget path="dev/open/app/individualInfoTplforMobile.jsp" />
