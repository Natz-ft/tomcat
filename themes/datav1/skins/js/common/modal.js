$(function () {
	$('.modal_screen').hide();
	$('.modal_datasay').hide();
	$('.datasay_attention').click(function() {
		$('.modal_screen').fadeIn();
		$('.modal_datasay').show();
	});
	$('.modal_screen').click(function() {
		$('.modal_screen').fadeOut();
		$('.modal_datasay').hide();
	});
	$('.modal_datasay .modal_title span').click(function() {
		$('.modal_screen').fadeOut();
		$('.modal_datasay').hide();
	});
})