var projectBlockHtml = $('#project-block-template').html();
var projectBlockTemplate = Handlebars.compile(projectBlockHtml);  

var taskLineHtml = $('#task-line-template').html();
var taskLineTemplate = Handlebars.compile(taskLineHtml);  


var shopLineHtml = $('#shop-line-template').html();
var shopLineTemplate = Handlebars.compile(shopLineHtml);


$(document).on('ready', function() {
	
	var AllProjects= [];

	var Project = function(name, priority, budget){
		this.name 		= name;
		this.priority 	= priority;
		this.budget 	= budget;
		this.tasks 		= [];
		AllProjects.push(this);
	}

	Project.prototype.create = function(){
		var $projectBlock = projectBlockHtml;
		
		this.el = $projectBlock;

		return this.el
	}



	var Task = function(description){
		this.description = description;
	}

	Task.prototype.create = function(){
		var $taskBlock = taskLineHtml;
		
		this.el = $taskBlock

		return this.el
	}



	$(".dropdown-menu li a").on('click', function(){ // make dropdown button behave like select-dropdown
	  var selText = $(this).text();
	  $(this).parents('.form-group').find('.proj-priority').text(selText);
	  event.preventDefault();
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

	var counter = 1; // this starts at 1 because index 0 is preloaded

	$('.add-task').on('click', function(){
		counter++
		// console.log('counter ', counter);
		var taskInput = '<div class="form-group"><div class="col-sm-offset-2 col-xs-9"><input data-id="' + counter + '" type="text" class="form-control proj-task" placeholder="Task (i.e. Paint, Buy Furniture, Hang Décor, etc.)"></div><div class="col-xs-1"><i class="fa fa-times-circle btn hide-input"></i></div></div>';

		$(this).closest('.form-group').before(taskInput);

	})

	$(document).on('click', '.hide-input', function(){
		$(this).closest('.form-group').slideUp('slow')
	})

	// SUBMIT PROJECT
	$('.submit-project').on('click', function(){
		event.preventDefault();


		var name 		= $('.proj-name').val();
		var priority 	= $('.proj-priority').text();
		var budget 		= $('.proj-budget').val();
		var description	= [this.tasks];

		// new project instance
		var setProject 	= new Project(name, priority, budget);

		var tasks = $( ".proj-task" ).each(function( index ) { // loop over 'task' inputs to grab val() and push to array
			var setTask = new Task( $( this ).val() );
			setProject.tasks.push(setTask);
			console.log(setTask.description);
		});

		$('input').val(''); // clear/reset inputs
		// add some sort of logic here to remove "added" task inputs 
		$('.main').last().append(projectBlockTemplate(setProject));
		$('.tasks').last().append(taskLineTemplate(this.tasks));


		// $('.main').last().append(setProject.create());
		// $('.proj-title').append(name);
		// $('.project').last().append('<p class="proj-sub-info"><strong>Priority Level:</strong> ' + priority + ' <strong>Budget for this Project:</strong> $' + budget + '.00</p><div class="row"><div class="col-xs-12"><h3 class="task-title">Tasks:</h3></div></div><div class="row tasks"></div>');
		// $('.task-line').append(tasks.create());
		// console.log('project: ', name, '\npriority: ', priority, '\nbudget: ', budget, '\ntasks: ', '??????')

		console.log(AllProjects);
	});

	// var displayTasks = function(){
	// 	$('.proj-task').each(function( index ){
	// 		result = $('.project').append(this.tasks)
	// 		return result

	// 	});
	// }

	$(document).on('click', '.collapse-caret', function(){
 
 		$(this).removeClass('fa-chevron-circle-left').addClass('fa-chevron-circle-down');
		$(this).siblings('.project').slideDown('.tasks') 
 	});

	// --- Shopping List --- //
	$('.shop-list-btn').on('click', function(){
		// console.log('clicked')
		$('.list').slideDown('slow');
	});

	$('.edit-item').on('click', function(){
		$(this).replaceWith('<input type="text" class="form-control" value="' + $(this).text() + '"/><input type="submit" style="display:none"/>');
	});

	$(document).on('click', '.add-list-item', function(){
		console.log('click');
		var listInput = '<div class="form-group"><div class="col-xs-offset-1 col-xs-9"><input type="text" class="form-control shop-list-item" placeholder="New list item"></div><div class="col-xs-1"><button class="btn btn-sm save-item">save</button></div></div>';

		$(this).closest('.form-group').before(listInput);

	})

	$(document).on('click', '.save-item', function(){
		$('input').val('');
		var listItem = $('.shop-list-item').val();
		console.log(listItem)
		$('.list-items').last().append(shopLineTemplate(listItem));
	});



});