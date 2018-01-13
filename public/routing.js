$(document).ready(function(){
	$('.button-collapse').sideNav();
	$('.delete-recipe-favorites').click(function(e){
		e.preventDefault();
		$.ajax({
			url: $(this).attr('href'),
			method: 'DELETE'
		}).success(function(data){
			window.location.href = '/recipes/wishlist';
		});
	});
	$('.delete-my-recipe').click(function(e){
		e.preventDefault();
		$.ajax({
			url: $(this).attr('href'),
			method: 'DELETE'
		}).success(function(data){
			window.location.href = '/recipes/myrecipes';
		});
	});
	$('.edit-recipe').click(function(e){
		e.preventDefault();
		$.ajax({
			url: $(this).attr('action'),
			method: 'PUT',
			data: {
				id: $('#recipe-id').val(),
				title: $('#new-title').val(),
				ingredients: $('#new-ingredients').val(),
				img_url: $('#img-url').val()
			}
		}).success(function(data){
			window.location.href='/recipes/wishlist';
		});
	});
	$('.edit-my-recipe').click(function(e){
		e.preventDefault();
		$.ajax({
			url: $(this).attr('action'),
			method: 'PUT',
			data: {
				id: $('#recipe-id').val(),
				title: $('#new-title').val(),
				ingredients: $('#new-ingredients').val(),
				img_url: $('#img-url').val(),
				directions: $('#new-directions').val(),
				notes: $('#new-notes').val()
			}
		}).success(function(data){
			window.location.href='/recipes/myrecipes';
		});
	});
});
