;(function(){

	$.fn.myPlugin = function(item ='item', time = 320, moveTime = 2000) {
		var dots = $(this).children().eq(1).attr('class')
		var width = parseInt($(this).width())
		time = parseInt(time)
		moveTime = parseInt(moveTime)
		// 初始化各个item的left值
		initItemsLeft()
		// 定时器
		var auto = setInterval(timer,moveTime)
		// 监听dots的点击事件 并切换对应页签
		$('.' + dots).on('click', (e)=>{
			e.preventDefault()
			var $dot = e.target
			var isDot = $($dot).parent().hasClass(dots)
			var clickIndex = $($dot).index()
			var oldActiveIndex = $('.' + dots).find('.active').index()
			if(isDot && clickIndex != oldActiveIndex) {
				clearInterval(auto)
				addActiveClass($dot)
				var activeIndex = $($dot).index()
				moveItem(activeIndex)
				auto = setInterval(timer,moveTime)
			}
		})

		// 初始化各个item的left值
		function initItemsLeft() {
			$('.' + item).each(function(){
				var index = $(this).index()
				var length = width * index
				$(this).css({'left': length + 'px'})
			})
		}
		// 为item添加active
		function addActiveClass(dot) {
			$(dot).parent().find('.active').removeClass('active')
			$(dot).addClass('active')
		}
		// 定时器 用于自动切换
		function timer() {
			var $dots = $('.' + dots)
			var autoActiveIndex = $dots.find('.active').index() + 1
			var totalIndex = $dots.children().length
			autoActiveIndex = (autoActiveIndex >= totalIndex) ? 0 : autoActiveIndex
			var $dot = $dots.children().eq(autoActiveIndex)
			addActiveClass($dot)
			/*$('.dot')[autoActiveIndex].click()*/
			moveItem(autoActiveIndex)
		}
		// 切换操作
		function moveItem(activeIndex) {
			$('.' + item).each(function() {
				var index = $(this).index()
				var targetLeft = (index - activeIndex) * width + 'px'
				$(this).animate({left: targetLeft}, time)
			})		
		}
	}
})();