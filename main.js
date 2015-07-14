$(document).on('ready', function() {
	var AllProjects= [];

	var Project = function(name, priority, budget, tasks){
		this.name = name;
		this.priority = priority;
		this.budget = budget;
		this.tasks = [];
		AllProjects.push(this);
	}

	Project.prototype.create = function(){
		var $projectBlock = $('<div class="row project-block"><div class="col-xs-12 text-block"><div class="col-xs-11 project"><h2 class="proj-title"></h2></div><div class="col-xs-1 collapse-caret"><i class="fa fa-chevron-circle-left"></i></div></div></div>');
		
		this.el = $projectBlock

		return this.el
	}


	var Task = function(description){
		this.description = description;
	}

	Task.prototype.create = function(){
		var $taskRow = $('<div class="row task-block"><div class="offset-2 col-xs-10 text-block">' + this.description + '</div></div>');

		this.el = $taskRow

		return this.el
 
	}


	$(".dropdown-menu li a").click(function(){ // make dropdown button behave like select-dropdown
		var selText = $(this).text();
		$(this).parents('.form-group').find('.proj-priority').text(selText);
	});



	// --- Projects --- //
	$('.add-project-btn').on('click', function(){
		$('.new-project-form').slideDown('slow')
	})

	$('.submit-project').on('click', function(){
		var name = $('.proj-name').val();
		var priority = $('.proj-priority').text();
		var budget = $('.proj-budget').val();
		var description = $('.proj-task').val();
		var tasks = description.toString()

		// console.log(description)
		// var newTask = new Task(description);
		// console.log(newTask);

		var newProject = new Project(name, priority, budget, tasks);
		console.log(newProject);

		$('input').val('');
		$('.main').last().append(newProject.create());
		$('.proj-title').last().append(name);
		$('.project').last().append('<p class="proj-sub-info"><strong>Priority Level:</strong> ' + priority + ' <strong>Budget for this Project:</strong> $' + budget + '.00</p>');
		// console.log('project: ', name, '\npriority: ', priority, '\nbudget: ', budget, '\ntasks: ', description)
		console.log(AllProjects)
	})

	var counter = 1; // this starts at 1 because index 0 is preloaded

	$('.add-task').on('click', function(){
		counter++
		// console.log('counter ', counter);
		var taskInput = '<div class="form-group"><div class="col-sm-offset-2 col-sm-9"><input data-id="' + counter + '" type="text" class="form-control proj-task" placeholder="Task (i.e. Paint, Buy Furniture, Hang Décor, etc.)"></div><div class="col-sm-1"><i class="fa fa-times-circle x-out chkbx"></i></div></div>';

		$(this).closest('.form-group').before(taskInput);

	})	


	$(document).on('click', '.collapse-caret', function(){

		$(this).removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-down');
		$(this).siblings('.project').append('<h3>Tasks:</h3>' + AllProjects[0].tasks) //newTask is out of scope - this isn't functioning correctly
	})
	

	// // --- Shopping List --- //  I'll come back to this
	// var ListItem = $
	// $('.shop-list-btn').on('click', function(){
	// 	// console.log('clicked')
	// 	$('.list').slideDown('slow');
	// });




});