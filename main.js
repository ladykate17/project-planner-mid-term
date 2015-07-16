var projectBlockHtml = $('#project-block-temp').html();
var projectBlockTemplate = Handlebars.compile(projectBlockHtml);  

var taskLineHtml = $('#task-line-temp').html();
var taskLineTemplate = Handlebars.compile(taskLineHtml);  

var taskInputHtml = $('#task-input-temp').html();
var taskInputTemplate = Handlebars.compile(taskInputHtml);

var shopBlockHtml = $('#list-block-temp').html();
var shopBlockTemplate = Handlebars.compile(shopBlockHtml);

var shopItemHtml = $('#item-line-temp').html();
var shopItemTemplate = Handlebars.compile(shopItemHtml);

var shopInputHtml = $('#item-input-temp').html();
var shopInputTemplate = Handlebars.compile(shopInputHtml);



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
	});

	$(document).on('click', '.add-project-btn.btn', function(){
		$('.navi').slideDown('slow');

		$('html, body').animate({
        	scrollTop: $("#navi").offset().top
    	}, 2000);

		$('.new-project-form').slideDown('slow');
	});

	var counter = 1; // this starts at 1 because index 0 is preloaded

	$('.add-task').on('click', function(){ // add another task input 
		counter++
		// console.log('counter ', counter);
		var taskInput = taskInputTemplate();

		$(this).closest('.form-group').before(taskInput);

	});

	$(document).on('click', '.hide-input', function(){
		$(this).closest('.form-group').slideUp('slow')
	});

	// SUBMIT PROJECT
	$('.submit-project').on('click', function(){
		event.preventDefault();


		var name 		= $('.proj-name').val();
		var priority 	= $('.proj-priority').text();
		var budget 		= $('.proj-budget').val();
		var description	= [this.tasks];

		// $('form')[0].reset(); // clear/reset inputs
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

		// console.log(budget);

		// new project instance
		var setProject 	= new Project(name, priority, priorityID, budget);

		var tasks = $( ".proj-task" ).each(function( index ) { // loop over 'task' inputs to grab val() and push to array
			var setTask = new Task( $( this ).val() );
			setProject.tasks.push(setTask);
			console.log(setTask.description);
		});
		console.log(AllProjects);



		$('#project-form')[0].reset();
		$('.btn-group button').removeClass('active');
		$('div').remove('.addl-task-input')
		$('.dropdown-menu').val(0);
		// add some sort of logic here to remove "added" task inputs 
		$('.projects-containter').append(projectBlockTemplate(setProject));
		$('.tasks').last().append(taskLineTemplate(setProject));
		$('.items-block').hide()

		// SORT BY PRIORITY
		_.indexBy(AllProjects, 'priorityID');
		// var sortProjects = $( ".project-block" ).each(function( index ) { 
		// 	var result = AllProjects.sort(function(a, b) { // sort the object in order of priority - high to low
		// 		return b.priorityID - a.priorityID
		// 		console.log(AllProjects);
		// 	});
		// });


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
		// console.log('clicked')
		$('.new-list-form').slideDown('slow');
		$('.new-project-form').slideUp('slow');
		$('.projects-containter').slideUp('slow');
	});

	// I may come back to this if time
	// $('.edit-item').on('click', function(){
	// 	$(this).replaceWith('<input type="text" class="form-control" value="' + $(this).text() + '"/><input type="submit" style="display:none"/>');
	// });

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

				// var setItem = "";

				// var listItems = $( ".store-item" ).each(function( index ) { // loop over 'task' inputs to grab val() and push to array
				// 	var newlistItem = new ShopList( $( this ).val() );
				// 	setItem+= shopItemTemplate(newlistItem);
				// 	console.log(newlistItem);
				// 	setList.listItems.push(newlistItem);
				// });
		// var newlistItem = $('.shop-list-item').val();
		// $('.main').last().append(shopBlockTemplate(---));
		// $('.list').last().append(shopLineTemplate(---));

		$('#list-form')[0].reset();
		$('.btn-group button').removeClass('active');
		$('.lists-containter').append(shopBlockTemplate(setList));
		$('.lists').append(shopItemTemplate(setList));
		$('.items-block').hide()

	});



});