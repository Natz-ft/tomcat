$(function() {
	/* 查看更多事件 */
	$(".viewmore_event").click(function(event) {
		$(this).toggleClass('item_viewless');
		$(this).next("ul").toggleClass('item_heightauto');
	});
	$('.catalog_checked').children().hide();
	$(".checked_item").hide();
	$('.item_themelist').hide();
	$('.item_departlist').hide();
	$('.theme_secondlevel').hide();
	var departobj;
	$('.item_departlist li').live("click", function(event) {
		$('.catalog_checked').children('.checked_default').show();
		if (departobj != null) {
			departobj.removeClass('item_current');
		}
		$(this).addClass('item_current');
		departobj = $(this);
		var departname = $(this).text();
		$(".depart_checked").show();
		$('.depart_checked em').text(departname);
		$('.depart_checked em').attr("title", "orgId");
	});
	var tagobj;
	$('.tag_list li').each(function() {
		$(this).live("click", function(event) {
			if (tagobj != null) {
				tagobj.removeClass('item_current');
			}
			$(this).addClass('item_current');
			tagobj = $(this);
			var tagname = $.trim($(this).text());
			if (tagname == '不限') {
				$(".tag_checked").hide();
				$('.tag_checked em').text('');
			}
			if (tagname != '不限') {
				$('.catalog_checked').children('.checked_default').show();
				$(".tag_checked").show();
				$('.tag_checked em').text(tagname);
				$('.tag_checked em').attr("title", "tag");
			}
			$(this).siblings().removeClass('item_current');
		});
		$('.tag_list li').eq(0).click();
	});
	var formatobj;

	$('.format_list li').each(function() {
		$(this).click(function() {
			if (formatobj != null) {
				formatobj.removeClass('item_current');
			}
			$(this).addClass('item_current');
			formatobj = $(this);
			var formatname = $.trim($(this).text());
			if (formatname == '不限') {
				$('.format_checked em').text('');
				$(".format_checked").hide();
			} else if (formatname != '不限') {
				$('.catalog_checked').children('.checked_default').show();
				$(".format_checked").show();
				$('.format_checked em').text(formatname);
				$('.format_checked em').attr("title", "fileType");
			}
			$(this).siblings().removeClass('item_current');
		});
		$('.format_list li').eq(0).click();
	})
	var gradeobj;
	$('.grade_list li').each(function() {
		$(this).click(function() {
			if (gradeobj != null) {
				gradeobj.removeClass('item_current');
			}
			$(this).addClass('item_current');
			gradeobj = $(this);
			var gradename = $.trim($(this).text());
			if (gradename == '不限') {
				$(".grade_checked").hide();
				$('.grade_checked em').text('');
			}
			if (gradename != '不限') {
				$('.catalog_checked').children('.checked_default').show();
				$(".grade_checked").show();
				$('.grade_checked em').text(gradename);
				$('.grade_checked em').attr("title", "score");
			}
			$(this).siblings().removeClass('item_current');
		});
		$('.grade_list li').eq(0).click();
	});
	var priceobj;
	$('.price_list li').each(function() {
		$(this).click(function() {
			if (priceobj != null) {
				priceobj.removeClass('item_current');
			}
			$(this).addClass('item_current');
			priceobj = $(this);
			var pricename = $.trim($(this).text());
			if (pricename == '不限') {
				$(".price_checked").hide();
				$('.price_checked em').text('');
			}
			if (pricename != '不限') {
				$('.catalog_checked').children('.checked_default').show();
				$(".price_checked").show();
				$('.price_checked em').text(pricename);
			}
			$(this).siblings().removeClass('item_current');
		});
		$('.price_list li').eq(0).click();
	});

	/* 返回一级主题目录 */
	$('.theme_title span').click(function(event) {
		$('.theme_secondlevel').hide();
		$('.theme_firstlevel').show();
		$('.theme_viewmore').show();
	});
	/* 排序点击选中 */
	var sortobj;
	$('.sort_cate li').each(function() {
		$(this).click(function() {
			if (sortobj != null) {
				sortobj.removeClass('sort_current');
			}
			$(this).addClass('sort_current');
			sortobj = $(this);
		});
		$('.sort_cate li').eq(0).click();
	});

	/* 判断是否显示已选内容 */
	$('.catalog_screen').click(function() {
		var countobj = 0;
		$('.checked_item').each(function() {
			var displayobj = $(this).css('display');
			if (displayobj != 'none') {
				countobj++;
			}

		});
		//console.log(countobj);
		if (countobj == 0) {
			$('.catalog_checked').children().hide();
		}
	});

	/* 筛选收缩展开效果 */
	var togglebtn = 0;
	$('.item_togglebtn').click(
			function(event) {
				$(this).toggleClass('togglebtnup');
				if (togglebtn == 0) {
					$('.item_main').eq(0).css('border-bottom', 'none');
					$('.item_main').eq(0).children('.item_body').children(
							'.item_content').css('border-bottom', 'none');
					$('.item_main').eq(1).slideUp();
					$('.item_main').eq(2).slideUp();
					$('.item_main').eq(3).slideUp();
					$('.item_main').eq(4).slideUp();
					togglebtn = 1;
				} else {
					$('.item_main').eq(0)
							.css('border-bottom', '1px solid #fff');
					$('.item_main').eq(0).children('.item_body').children(
							'.item_content').css('border-bottom',
							'1px solid #e9e5e5');
					$('.item_main').eq(1).slideDown();
					$('.item_main').eq(2).slideDown();
					$('.item_main').eq(3).slideDown();
					$('.item_main').eq(4).slideDown();
					togglebtn = 0;
				}
			});
	/* 点击右侧对比 */
	$('.contrast_ico').click(function(event) {
		if ($(".contrast_body").is(":hidden")) {
			$('.contrast_body').show();
		} else {
			$('.contrast_body').hide();
		}
	});

	/* 关联分析操作 */
	$('.contrast_body').hide();
	var contracount = 0;
	var contrids = "";
	// $('.cata_contrast').each(function(){
	$('.cata_contrast').live(
			"click",
			function(event) {
				if (contracount < 5) {
					$('.contrast_body').show();
					var contratitle = $(this).parents('.cata_body').prev()
							.children('.cata_title').text();
					var id = $(this).next().attr('rel');
					if (contrids.indexOf(id) < 0) {
						$('.contrast_body ul').append(
								"<li><a rel='" + id + "'>" + contratitle
										+ "</a><i></i></li>");
						if (contrids != '') {
							contrids = contrids + "," + id;
						} else {
							contrids = id;
						}
						contracount++;
					} else {
						easyDialog.open({
							container : {
								content : '不能选择相同数据集'
							},
							autoClose : 2000
						});
					}
				} else {
					easyDialog.open({
						container : {
							content : '超出最大范围！'
						},
						autoClose : 2000
					});
				}
			});
	// $('.contrast_body ul li i').each(function(){
	$('.contrast_body ul li i').live("click", function(event) {

		contracount--;
		if (contracount == 0) {
			$('.contrast_body ul').find('li').remove();
			$('.contrast_body').hide();
		}
		var id = $(this).parent().find('a').attr('rel');
		if (contrids.indexOf(',' + id) > 0) {
			contrids = contrids.replace(',' + id, '');
		} else {
			contrids = contrids.replace(id, '');
		}
		$(this).parent().remove();
	});
	// });
	$('.contrast_remove').click(function(event) {
		$('.contrast_body ul li').remove();
		$('.contrast_body').hide();
		contracount = 0;
		contrids = '';
	});
	$('.contrast_submit').click(
			function(event) {
				if (contracount != 1) {
					window.open(getRootPath() + '/analysis/?ids=' + contrids,
							'_blank');
				} else {
					easyDialog.open({
						container : {
							content : '请至少选择两个数据集！'
						},
						autoClose : 2000
					});
				}

			});
	/* 图谱操作 */
	$(".cata_relnet").live(
			"click",
			function() {
				window.open(getRootPath() + "/relnet/?cata_id="
						+ $(this).attr("rel"), '_blank');
			});
$('.count-ico').each(function(){
	console.log($(this).text());
	if($(this).text()<=3){
		$(this).addClass('ico-red');
	}
	else{
		$(this).addClass('ico-grey');
	}
});
});
// })
