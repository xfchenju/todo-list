;(function () {
	'use strict';
	$(document).ready(()=>{
		//添加任务
		$('#submit').on('click', (e)=>{
			e.preventDefault();
			var time = new Date().getTime()
			var data = {
				'content': $('#add_task_input').val(),
				'time': time,
				'remark': ''
			}
			if(!data.content) return;
			addTask(data)
		})
		// 事件委托 删除、详情按钮
		$('#task-list').on('click', (e)=>{
			e.preventDefault();
			var $items = e.target
			var isDeleteTag = $($items).hasClass('item-delete')
			var isDetailTag = $($items).hasClass('item-detail')
			if(isDeleteTag) {				
				delTask($($items))			
			}else if(isDetailTag) {
				showTask($($items))
			}	
		})
		// 事件委托 确定、取消按钮
		$('.task-detail-wrap').on('click', (e)=>{
			e.preventDefault();
			var $detail = e.target
			var sure = $($detail).hasClass('detail-sure')
			var cancle = $($detail).hasClass('detail-cancle')
			if(sure) {
				changeTaskDetail($($detail))
			}else if(cancle) {
				$($detail).parent().parent().parent().hide()
			}
		})
		// 事件委托 内容双击
		$('.task-detail-wrap').on('dblclick', (e)=>{
			e.preventDefault();
			var $dbldetail = e.target
			var content = $($dbldetail).hasClass('content')
			var contentTag = $($dbldetail)[0].tagName.toLowerCase()
			console.log(contentTag)
			if(content && contentTag == 'div') {
				var inputTag = changeDivToInput($($dbldetail))
				inputTag.insertAfter($('.task-detail .content'))
				$(inputTag).focus().select()
				$($dbldetail).remove()
			}
		})
		// 初始化渲染列表
		renderTaskList()
		test()
	})
	/*数据*/
	var taskList = JSON.parse(window.localStorage.getItem('task-list')) || []

	var a = 100;
	function test(){
	    console.log(a);
	    var a = 10;
	    console.log(a);
	}

	function addTask(data) {
		var $taskList = $('#task-list')
		taskList.push(data)
		window.localStorage.setItem('task-list', JSON.stringify(taskList))
		var $taskItem = renderTaskItem(data)
		$taskList.append($taskItem)
		$('#add_task_input').val("")
	}
	function delTask(item) {
		var tmp = confirm('是否删除？')
		if(!tmp) return
		var time = $(item).parent().parent().attr('data-time')
		var index = taskList.findIndex(n => n.time == time)
		if(index > -1){
			taskList.splice(index, 1)
			window.localStorage.setItem('task-list', JSON.stringify(taskList))
			$(item).parent().parent().remove()
		}
	}
	function showTask(item) {
		var $taskDeatil = $('.task-detail-wrap')
		var time = $(item).parent().parent().attr('data-time')
		var detail = taskList.find(n => n.time == time)
		var $detail = renderTaskDetail(detail)
		$taskDeatil.html('')
		$taskDeatil.append($detail)
		$taskDeatil.show()
	}
	function changeTaskDetail(detail) {
		var content = detail.parent().prevAll('.content').val() || detail.parent().prevAll('.content').html() || null
		var remark = detail.parent().prevAll('.remark').children('textarea').val() || ''
		var time = detail.parent().parent().attr('data-time')
		console.log(detail.parent().parent())
		var index = taskList.findIndex(n => n.time == time)
		if(index > -1){
			var data = {
				content: content,
				time: parseInt(time),
				remark: remark ? remark : ''
			}
			taskList.splice(index, 1, data)
			var $taskItem = renderTaskItem(data)
			var $beforeTaskItem = $('#task-list').find('.task-item[data-time="'+time+'"]')
			$('#task-list').append($taskItem)
			$($taskItem).insertAfter($($beforeTaskItem))
			$($beforeTaskItem).remove()
			detail.parent().parent().parent().hide()
			window.localStorage.setItem('task-list', JSON.stringify(taskList))
		}
	}
	function renderTaskList() {
		var $taskList = $('#task-list')
		if(taskList) {
			for(var i in taskList) {
				var $taskItem = renderTaskItem(taskList[i])
				$taskList.append($taskItem)
			}
		}
	}
	function renderTaskItem(data) {
		var listItemTpl = 
		'<div class="task-item clearfloat" data-time="' + data.time + '">' + 
			'<div class="item-content">' + 
				'<input class="item-checkbox" type="checkbox" name="" />' + 
				'<span class="item-text">' + data.content + '</span>' + 
			'</div>' + 
			'<span class="item-operation">' + 
				'<span class="item-btn item-delete">删除</span>' + 
				'<span class="item-btn item-detail">详情</span>' + 
			'</span>' + 
		'</div>';
		return $(listItemTpl);
	}
	function renderTaskDetail(data) {
		var date = new Date(data.time)
		var y = 1900 + date.getYear();
		var m = "0" + (date.getMonth() + 1);
		var d = "0" + date.getDate(); 
		var dateFormat = y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
		var taskDeatilTpl = 
		'<div class="task-detail" data-time="' + data.time + '">' + 
			'<div class="content">' + data.content + '</div>' + 
			'<div class="remark">' + 
				'<textarea placeholder="请输入备注">' + (data.remark ? data.remark : '') + '</textarea>' + 
			'</div>' + 
			'<div class="date">' + 
				'<input type="date" name="" value="' + dateFormat + '">' + 
			'</div>' + 
			'<div class="detail-btns clearfloat">' + 
				'<button class="detail-btn fl detail-sure">提交</button>' + 
				'<button class="detail-btn fr detail-cancle">取消</button>' + 
			'</div>' + 
		'</div>';
		return $(taskDeatilTpl)
	}
	function changeDivToInput(obj) {
		var inputTpl = '<input type="text" class="' + obj.attr('class') + ' ' + obj.attr('class') + '-input" value="' + obj.html() + '" placeholder="请输入"/>'
		return $(inputTpl)
	}
})();