$(document).on('ready', function() {
	var AllProjects= [];

	var Project = function(name, priority, budget, task){
		this.name 		= name;
		this.priority 	= priority;
		this.budget 	= budget;
		this.tasks 		= [];
		AllProjects.push(this);
	}

	Project.prototype.create = function(){
		var $projectBlock = $('<div class="row project-block"><div class="col-xs-12 text-block"><div class="col-xs-11 project"><h2 class="proj-title"></h2></div><div class="col-xs-1 collapse-caret"><i class="fa fa-chevron-circle-left"></i></div></div></div>');
		
		this.el = $projectBlock

		return this.el
	}

	var Task = function(){
		this.description = description;
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

		$('input').val('');
		$('.main').last().append(setProject.create());
		$('.proj-title').append(name);

		console.log(setProject);
	})

	$(document).on('click', '.collapse-caret', function(){

		$('i').removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-down');
		$(this).parent('.text-block').append('To Do: ').slideDown() //this isn't functioning correctly
	})

	// --- Shopping List --- //
	$('.shop-list-btn').on('click', function(){
		// console.log('clicked')
		$('.list').slideDown('slow');
	});




});