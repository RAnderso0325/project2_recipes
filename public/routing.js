$('.delete-recipe-favorites').click(function(e){
	e.preventDefault();
	$.ajax({
		url: $(this).attr('href'),
		method: 'DELETE'
	}).success(function(data){
		window.location.href = '/recipes/favorites';
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
		window.location.href='/recipes/favorites';
	});
});