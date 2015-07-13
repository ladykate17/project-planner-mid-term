$(document).on('ready', function() {
	var AllProjects= [];

	var Project = function(name, priority, budget, task){
		this.name = name;
		this.priority = priority;
		this.budget = budget;
		this.task = task;
		AllProjects.push(this);
	}

	Project.prototype.create = function(){
		var $projectBlock = $('<div class="row project-block"><div class="col-xs-12 text-block"><div class="col-xs-11 project"><h2 class="proj-title"></h2></div><div class="col-xs-1 collapse-caret"><i class="fa fa-chevron-circle-left"></i></div></div></div>');
		
		this.el = $projectBlock

		return this.el
	}

	var Task = function(){
		// this.description = description;
		this.projectID = projectID;
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
		var name = $('.proj-name').val()
		var priority = $('.proj-priority').text()
		var budget = $('.proj-budget').val()
		var task = $('.proj-task').val() // could need more than one of these so...?

		var setProject = new Project(name, priority, budget, task);
		// var setTask = new Task(description)

		$('input').val('');
		$('.main').last().append(setProject.create());
		$('.proj-title').append(name);

	})

	$(document).on('click', '.collapse-caret', function(){

		$('i').removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-down');
		$(this).parent('.text-block').append('To Do: ').slideDown() //this isn't functioning correctly
	})
		console.log(AllProjects)

	// --- Shopping List --- //
	$('.shop-list-btn').on('click', function(){
		// console.log('clicked')
		$('.list').slideDown('slow');
	});




});