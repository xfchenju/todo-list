;(function () {
	'use strict';
	$(document).ready(()=>{
		$('#submit').on('click', (e)=>{
			e.preventDefault();
			var time = new Date().getTime()
			var data = {
				'content': $('#add_task_input').val(),
				'time': time
			}
			if(!data.content) return;
			addTask(data)
		})
		$('#task-list').on('click', (e)=>{
			var $items = e.target
			var isDeleteTag = $($items).hasClass('item-delete')
			var isDetailTag = $($items).hasClass('item-detail')
			if(isDeleteTag) {				
				delTask($($items))			
			}else if(isDetailTag) {
				showTask($($items))
			}	
		})
		renderTaskList()
	})
	/*数据*/
	var taskList = JSON.parse(window.localStorage.getItem('task-list')) || []

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
		var $taskDeatil = $('.task-detail')
		var time = $(item).parent().parent().attr('data-time')
		var detail = taskList.find(n => n.time == time)
		var $detail = renderTaskDetail(detail)
		$taskDeatil.html('')
		$taskDeatil.append($detail)
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
		var m = "0" + (date.getMonth()+1);
		var d = "0" + date.getDate(); 
		var dateFormat = y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
		var taskDeatilTpl = 
		'<div class="content">' + data.content + '</div>' + 
		'<div class="remark">' + 
			'<textarea placeholder="请输入备注"></textarea>' + 
		'</div>' + 
		'<div class="date">' + 
			'<input type="date" name="" value="' + dateFormat + '">' + 
		'</div>' + 
		'<div class="detail-btns clearfloat">' + 
			'<button class="detail-btn fl">提交</button>' + 
			'<button class="detail-btn fr">取消</button>' + 
		'</div>'; 
		return $(taskDeatilTpl)
	}
})();