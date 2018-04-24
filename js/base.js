;(function () {
	//'use strict';
	$(document).ready(()=>{
		$('#submit').on('click', (e)=>{
			e.preventDefault();
			var data = {
				'content': $('#add_task_input').val()
			}
			if(!data) return;
			addTask(data)
		})
		$('#task-list').on('click', (e)=>{
			var $items = e
			console.log($items)
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
	function delTask(data) {
		var index = taskList.findIndex(n => n.content == data.content)
		if(index > -1){
			taskList.splice(index, 1)
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
		'<li class="task-item">'+
			'<span><input type="checkbox" name=""></span>'+
			'<span class="task-content">' + data.content + '</span>'+
			'<span>删除</span>'+
			'<span>详情</span>'+
		'</li>';
		return $(listItemTpl);
	}
})();