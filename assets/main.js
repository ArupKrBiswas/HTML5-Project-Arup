$(document).ready(function()
{
	$('#order-item').on('submit',function(e){
		addTask(e);
	});


	$('#modify-item').on('submit',function(e){
		updateOrder(e);
	});

	//remove item
	$('#task-table').on('click','#remove-task',	function()
	{	
		id = $(this).data('id');
		removeTask(id);
	});

	//clear all items
	$('#clear-order').on('click', function()
	{
		clearAllItems();
	});


	displayOrders();

	function displayOrders()
	{
		var orderlist = JSON.parse(localStorage.getItem('orders'));

		if(orderlist != null){
			orderlist = orderlist.sort(sortByTime);
		}


		//var i = 0;

		if(localStorage.getItem('orders') != null)
		{

			$.each(orderlist, function(key,value){
				$('#task-table').append('<tr id="'+ value.id +'">' +
							'<td>' + value.id + '</td>' +
							'<td>' + value.buy + '</td>' +
							'<td>' + value.board_name + '</td>' +
							'<td>' + value.order_date + '</td>' +
							'<td>' + value.order_time + '</td>' +
							'<td><a href="modify.html?id='+ value.id +'">Edit</a> | <a href="#" id="remove-task" data-id="'+ value.id +'">Remove</a></td>' +
							'</tr>');

				//$('#task-table').remove();

			})	
		}
	}


	// Function to sort tasks
	function sortByTime(a, b){
		var aTime = a.order_time;
		var bTime = b.order_time;
		return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
	}


	//Function to add task
	function addTask(e)
	{
		//Add a unique id
		var newDate = new Date();
		id = newDate.getTime();
 
		var buy = $('#buyer').val();
		var board_name = $('#boards').val();
		var order_date = 'Entry' + newDate.getDate() + '/' + (newDate.getMonth()+1) + '/' + newDate.getFullYear(); 
		//$('#date').val();
		var order_time = newDate.getHours() + ':'  
                + newDate.getMinutes() + ':' 
                + newDate.getSeconds();

		//$('#time').val();

		//varification
		if(buy == '')
		{
			alert('Please enter the name of the buyer');
			e.preventDefault();
		}
		else if(board_name == '')
		{
			alert('Please enter the board name');
			e.preventDefault();
		}
		else if(order_date == '')
		{
			alert('Please enter the date of order');
			e.preventDefault();
		}
		else if(order_time == '')
		{
			alert('Please enter the time of order');
			e.preventDefault();
		}
		else
		{
			orders = JSON.parse(localStorage.getItem('orders'));


			//check orders
			if(orders == null)
			{
				orders = [];
			}
			
			var orderlist = JSON.parse(localStorage.getItem('orders'));			

			var new_order = 
			{
				"id" : id,
				"buy" : buy,
				"board_name" : board_name,
				"order_date" : order_date,
				"order_time" : order_time
			}

			orders.push(new_order);
			localStorage.setItem('orders', JSON.stringify(orders));	
		}

	}

	function updateOrder(e)
	{
		var id = $('#order_id').val();

		var currentdate = new Date(); 

		var buy = $('#buyer').val();
		var board_name = $('#boards').val();
		var order_date = 'Modified ' + currentdate.getDate() + '/'
                + (currentdate.getMonth()+1)  + '/'
                + currentdate.getFullYear();

		//$('#date').val();

		var order_time = currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

		//$('#time').val();

		orderlist = JSON.parse(localStorage.getItem('orders'));

		for(var i=0; i < orderlist.length; i++){
			if(orderlist[i].id == id){
				orderlist.splice(i,1)
			}
			localStorage.setItem('orders', JSON.stringify(orderlist));
		}



		//varification
		if(buy == '')
		{
			alert('Please enter the name of the buyer');
			e.preventDefault();
		}
		else if(board_name == '')
		{
			alert('Please enter the board name');
			e.preventDefault();
		}
		else if(order_date == '')
		{
			alert('Please enter the date of order');
			e.preventDefault();
		}
		else if(order_time == '')
		{
			alert('Please enter the time of order');
			e.preventDefault();
		}
		else
		{
			orders = JSON.parse(localStorage.getItem('orders'));


			//check orders
			if(orders == null)
			{
				orders = [];
			}
			
			var orderlist = JSON.parse(localStorage.getItem('orders'));			

			var new_order = 
			{
				"id" : id,
				"buy" : buy,
				"board_name" : board_name,
				"order_date" : order_date,
				"order_time" : order_time
			}

			orders.push(new_order);
			localStorage.setItem('orders', JSON.stringify(orders));	
		}

	}

	function removeTask(id)
	{
		if(confirm('are you sure to delete the order'))
		{
			var orderlist = JSON.parse(localStorage.getItem('orders'));
			for(var i=0; i < orderlist.length; i++){
			if(orderlist[i].id == id){
				orderlist.splice(i,1)
				}
				localStorage.setItem('orders', JSON.stringify(orderlist));
			}

			location.reload();
		}
	} 

	function clearAllItems()
	{
		if (confirm('Do you want to clear your inventory')) 
		{
			localStorage.clear();
			location.reload();
		}
	}

});


// Function for getting single task
function getTask(){
	var $_GET = getQueryParams(document.location.search);
	id = $_GET['id'];

	var orderlist = JSON.parse(localStorage.getItem('orders'));

	for(var i=0; i < orderlist.length; i++){
		if(orderlist[i].id == id){
			$('#modify-item #order_id').val(orderlist[i].id);
			$('#modify-item #buyer').val(orderlist[i].buy);
			$('#modify-item #boards').val(orderlist[i].board_name);
			$('#modify-item #date').val(orderlist[i].order_date);
			$('#modify-item #time').val(orderlist[i].order_time);
		}
	}
}


// Function to Get HTTP GET Requests
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}
