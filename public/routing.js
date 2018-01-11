$('#delete-recipe-favorites').click(function(e){
	e.preventDefault();
	$.ajax({
		url: $(this).attr('href'),
		method: 'DELETE'
	}).success(function(data){
		window.location.href = '/recipes/favorites';
	});
});