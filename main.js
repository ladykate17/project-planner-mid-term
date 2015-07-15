$(document).on('ready', function() {
	var AllProjects= [];

<<<<<<< HEAD
	var Project = function(name, priority, budget, task){
		this.name 		= name;
		this.priority 	= priority;
		this.budget 	= budget;
		this.tasks 		= [];
=======
	var Project = function(name, priority, budget, tasks){
		this.name = name;
		this.priority = priority;
		this.budget = budget;
		this.tasks = [];
>>>>>>> a99058ddc5adf09cdb46d6f536c3e14b6178f428
		AllProjects.push(this);
	}

	Project.prototype.create = function(){
		var $projectBlock = $('<div class="row project-block"><div class="col-xs-12 text-block"><div class="col-xs-11 project"><h2 class="proj-title"></h2></div><div class="col-xs-1 collapse-caret"><i class="fa fa-chevron-circle-left"></i></div></div></div>');
		
		this.el = $projectBlock

		return this.el
	}

<<<<<<< HEAD
	var Task = function(){
=======

	var Task = function(description){
>>>>>>> a99058ddc5adf09cdb46d6f536c3e14b6178f428
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
	$(document).on('click', '.add-project-icon', function(){
		console.log('click')
		$('.new-project-form').slideDown('slow'); // Not working!!!! Need to reset display to visible?
	});

	$(document).on('click', '.hide-form', function(){
		$(this).parent().slideUp('slow')
	})

<<<<<<< HEAD
	$(document).on('click', '.add-project-btn.btn', function(){
		$('.navi').slideDown('slow');

		$('html, body').animate({
        	scrollTop: $("#navi").offset().top
    	}, 2000);

		$('.new-project-form').slideDown('slow');
	});



	$('.submit-project').on('click', function(){
		var name 		= $('.proj-name').val();
		var priority 	= $('.proj-priority').text();
		var budget 		= $('.proj-budget').val();
		var description	= $('.proj-task').val(); 
		// console.log(description)
		var setTask = new Task(description);
		var setProject = new Project(name, priority, budget);
=======
	$('.submit-project').on('click', function(){
		var name = $('.proj-name').val();
		var priority = $('.proj-priority').text();
		var budget = $('.proj-budget').val();
		var description = $('.proj-task').val();
		var tasks = description.toString()

		// console.log(description)
		// var newTask = new Task(description);
		// console.log(newTask);
>>>>>>> a99058ddc5adf09cdb46d6f536c3e14b6178f428

		var newProject = new Project(name, priority, budget, tasks);
		console.log(newProject);

<<<<<<< HEAD
		console.log(setProject);
=======
		$('input').val('');
		$('.main').last().append(newProject.create());
		$('.proj-title').last().append(name);
		$('.project').last().append('<p class="proj-sub-info"><strong>Priority Level:</strong> ' + priority + ' <strong>Budget for this Project:</strong> $' + budget + '.00</p>');
		// console.log('project: ', name, '\npriority: ', priority, '\nbudget: ', budget, '\ntasks: ', description)
		console.log(AllProjects)
>>>>>>> a99058ddc5adf09cdb46d6f536c3e14b6178f428
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
<<<<<<< HEAD

	// --- Shopping List --- //
	$('.shop-list-btn').on('click', function(){
		// console.log('clicked')
		$('.list').slideDown('slow');
	});
=======
	

	// // --- Shopping List --- //  I'll come back to this
	// var ListItem = $
	// $('.shop-list-btn').on('click', function(){
	// 	// console.log('clicked')
	// 	$('.list').slideDown('slow');
	// });
>>>>>>> a99058ddc5adf09cdb46d6f536c3e14b6178f428




});