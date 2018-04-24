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
			var clickTag = $($items).attr('class')
			if(clickTag == 'delete') {
				var time = $($items).parent().attr('data-time')
				delTask(time)
				$($items).parent().remove()
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
	function delTask(time) {
		var index = taskList.findIndex(n => n.time == time)
		console.log(index)
		if(index > -1){
			taskList.splice(index, 1)
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
		'<li class="task-item" data-time="' + data.time + '">'+
			'<span><input type="checkbox" name=""></span>'+
			'<span class="task-content">' + data.content + '</span>'+
			'<span class="delete">删除</span>'+
			'<span class="detail">详情</span>'+
		'</li>';
		return $(listItemTpl);
	}
})();