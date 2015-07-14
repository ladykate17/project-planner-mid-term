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
		// console.log(description)
		var setTask = new Task(description);
		var setProject = new Project(name, priority, budget);

		$('input').val('');
		$('.main').last().append(setProject.create());
		$('.proj-title').append(name);
		console.log('project: ', name, '\npriority: ', priority, '\nbudget: ', budget, '\ntasks: ', description)

	})

	var counter = 1; // this starts at 1 because index 0 is preloaded

	$('.add-task').on('click', function(){
		counter++
		// console.log('counter ', counter);
		var taskInput = '<div class="form-group"><div class="col-sm-offset-2 col-sm-10"><input data-id="' + counter + '" type="text" class="form-control proj-task" placeholder="Task (i.e. Paint, Buy Furniture, Hang Décor, etc.)"></div></div>';

		$(this).closest('.form-group').before(taskInput);

	})	


	$(document).on('click', '.collapse-caret', function(){

		$(this).removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-down');
		$(this).parent('.text-block').append('To Do:') //this isn't functioning correctly
	})
	
	// console.log(AllProjects)

	// // --- Shopping List --- //  I'll come back to this
	// var ListItem = $
	// $('.shop-list-btn').on('click', function(){
	// 	// console.log('clicked')
	// 	$('.list').slideDown('slow');
	// });




});