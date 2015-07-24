
// localStorage.clear();
// var pageState = function(){
// 	setTimeout(function(){
// 	$('.main').html(JSON.parse(localStorage["contents"]));
// 	}, 500);
// };

// pageState();

var projectBlockHtml = $('#project-block-temp').html();
var projectBlockTemplate = Handlebars.compile(projectBlockHtml);  

var taskLineHtml = $('#task-line-temp').html();
var taskLineTemplate = Handlebars.compile(taskLineHtml);  

var taskInputHtml = $('#task-input-temp').html();
var taskInputTemplate = Handlebars.compile(taskInputHtml);

var taskSubInputHtml = $('#addl-task-input-temp').html();
var taskSubInputTemplate = Handlebars.compile(taskSubInputHtml);

var taskSingleLineHtml = $('#single-line-task-temp').html();
var taskSingleLineTemplate = Handlebars.compile(taskSingleLineHtml);

var shopBlockHtml = $('#list-block-temp').html();
var shopBlockTemplate = Handlebars.compile(shopBlockHtml);

var shopItemHtml = $('#item-line-temp').html();
var shopItemTemplate = Handlebars.compile(shopItemHtml);

var shopInputHtml = $('#item-input-temp').html();
var shopInputTemplate = Handlebars.compile(shopInputHtml);

var shopSubInputHtml = $('#addl-item-input-temp').html();
var shopSubInputTemplate = Handlebars.compile(shopSubInputHtml);

var shopSingleLineHtml = $('#single-list-line-temp').html();
var shopSingleLineTemplate = Handlebars.compile(shopSingleLineHtml);


$(document).on('ready', function() {
	
	var AllProjects= [];

	var Project = function(name, priority, priorityID, budget){
		this.name 		= name;
		this.priority 	= priority;
		this.priorityID	= priorityID || 4;
		this.budget 	= budget || 0;
		this.tasks 		= [];
		AllProjects.push(this);
	};

	Project.prototype.create = function(){
		var $projectBlock = projectBlockTemplate();
		
		this.el = $projectBlock;

		return this.el
	};



	var Task = function(description){
		this.description = description;
	};

	// Task.prototype.create = function(){
	// 	var $taskBlock = taskLineTemplate();
		
	// 	this.el = $taskBlock

	// 	return this.el
	// };

	var AllShopLists = [];

	var ShopList = function(store){
		this.store = store;
		this.listItems = [];
		AllShopLists.push(this);

	}

	var ListItem = function(description){
		this.description = description;
	};





	$(".dropdown-menu li a").on('click', function(){ // make dropdown button behave like select-dropdown for forms
	  var selText = $(this).text();
	  $(this).parents('.form-group').find('.proj-priority').text(selText);
	  event.preventDefault();
	});



	// --- Projects --- //
	$(document).on('click', '.add-project-icon', function(){
		$('#projects').slideDown('slow');
		$('#shopping').slideUp('slow')
	});

	$(document).on('click', '.add-project-btn.btn', function(){
		$('.navi').slideDown('slow');

		$('html, body').animate({
        	scrollTop: $("#navi").offset().top
    	}, 2000);

		$('#projects').slideDown('slow');
	});

	$('.projects-btn').on('click', function(){
		$('#shopping').slideUp('slow');
		$('#projects').slideDown('slow');
		// console.log('clicked')
	});

	$(document).on('click', '.hide-form', function(){
		$(this).parent().slideUp('slow')
	});


	var counter = 1; // this starts at 1 because index 0 is preloaded

	$('.add-task').on('click', function(){ // add another task input 
		counter++
		// console.log('counter ', counter);
		var taskInput = taskInputTemplate();

		$(this).closest('.form-group').before(taskInput);

	});

	$(document).on('click', '.sub-add-task', function(){ // add additional input
		var taskInput = taskSubInputTemplate();
		$(this).closest('.form-group').before(taskInput);
	});

	// sub add task
	$(document).on('click', '.add-task', function(){
		event.preventDefault();
		$('#addl-task')[0].reset();

		// console.log('click');
		var setNewTask = new Task( $( this ).parent().closest('.add-list-input').find('.list-item').val() );
		console.log(setNewTask)
		$('.addl-task').after(taskSingleLineTemplate(setNewTask));

		$('#addl-task').remove();
	});

	// SUBMIT PROJECT
	$('.submit-project').on('click', function(){
		event.preventDefault();


		var name 		= $('.proj-name').val();
		var priority 	= $('.proj-priority').text();
		var budget 		= $('.proj-budget').val();
		var description	= [this.tasks];

			if (priority === "Select One") {
				priority = "No Priority Set";
				var priorityID = 0;
			};

			if (priority === "Low Priority") {
				var priorityID = 3;
			};

			if (priority === "Medium Priority") {
				var priorityID = 2;
			};

			if (priority === "High Priority") {
				var priorityID = 1;
			};

		// new project instance
		var setProject 	= new Project(name, priority, priorityID, budget);

		var tasks = $( ".proj-task" ).each(function( index ) { // loop over 'task' inputs to grab val() and push to array
			var setTask = new Task( $( this ).val() );
			setProject.tasks.push(setTask);
			console.log(setTask.description);
		});

		// Working on sorting and rendering by priority
		// var sort = _.sortBy(AllProjects, 'priorityID');
		// console.log(this.projectID)
		// console.log(AllProjects[AllProjects.length - 1].priorityID)
		// if (setProject.priorityID < AllProjects[AllProjects.length - 1].priorityID) {
		// 	$('.projects-containter').append(projectBlockTemplate(setProject));
		// 	$('.tasks').last().append(taskLineTemplate(setProject));
		// }
		// else{
		// 	$('.projects-containter').prepend(projectBlockTemplate(setProject));
		// 	$('.tasks').last().prepend(taskLineTemplate(setProject));
	
		// }

		$('#project-form')[0].reset();
		$('.btn-group button').removeClass('active');
		$('div').remove('.addl-task-input')
		$('.dropdown-menu').val(0);
		$('.projects-containter').append(projectBlockTemplate(setProject));
		$('.tasks').last().append(taskLineTemplate(setProject));

		// add some sort of logic here to remove "added" task inputs 
		$('.items-block').hide()


	}); // End Project Submit Click Event


	$(document).on('click', '.collapse-caret', function(){
		if ( $(this).find('.fa-chevron-circle-left').hasClass('rotated') === true ){
			$(this).find('.fa-chevron-circle-left').removeClass('rotated');
			$(this).siblings('.text-block').find('.items-block').toggle()
		}
		else {
	 		$(this).find('.fa-chevron-circle-left').addClass('rotated');
	 		$(this).siblings('.text-block').find('.items-block').toggle()
			
		}


 	});

	// --- Shopping List --- //
	$('.shop-list-btn').on('click', function(){
		$('#projects').slideUp('slow');
		// console.log('clicked')
		$('#shopping').slideDown('slow');
	});

	$(document).on('click', '.add-list-item', function(){ // add additional input
		console.log('click');
		var listInput = shopInputTemplate();
		$(this).closest('.form-group').before(listInput);
	});


	$('.submit-list').on('click', function(){
		event.preventDefault();

		var store = $('.store-name').val();

		var setList = new ShopList(store);

		var listItems = $( ".list-item" ).each(function( index ) { // loop over 'task' inputs to grab val() and push to array
			var setListItem = new ListItem( $( this ).val() );
			setList.listItems.push(setListItem);
			// console.log(setListItem.description);
		});
		console.log(AllShopLists);


		$('#list-form')[0].reset();
		$('div').remove('.addl-shop-input');
		$('.btn-group button').removeClass('active');
		$('.lists-containter').append(shopBlockTemplate(setList));
		$('.lists').append(shopItemTemplate(setList));
		$('.items-block').hide()

	});

	$(document).on('click', '.sub-add-list-item', function(){ // add additional input
		var listInput = shopSubInputTemplate();
		$(this).closest('.form-group').before(listInput);
	});

	// sub add item
	$(document).on('click', '.add-item', function(){
		// console.log('click');
		var setNewListItem = new ListItem( $( this ).parent().closest('.add-list-input').find('.list-item').val() );
		console.log(setNewListItem)
		$('.addl-list').before(shopSingleLineTemplate(setNewListItem));

	})

	$(document).on('click', '.remove-item', function(){
		console.log('clicked')
		$(this).closest('.task-line').fadeOut();
		setTimeout(function(){ 
			$(this).closest('.task-line').remove();
		}, 500);
	})

	$(document).on('click', '.remove-item2', function(){
		console.log('clicked')
		$(this).closest('.list-line').fadeOut();
		setTimeout(function(){ 
			$(this).closest('.list-line').remove();
		}, 500);
	})
	// localStorage["contents"] = JSON.stringify($('.main').html()); // working on local strage here

});