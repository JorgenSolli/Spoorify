import Ember from 'ember';

export default Ember.Controller.extend({
	searchString: '',
	search: Ember.observer('searchString', function() {
		var searchString = this.get('searchString');

		if (searchString) {
			Ember.$.ajax({
	            url: 'https://api.spotify.com/v1/search?q=' + searchString + '&type=artist',
	            success: function(data) {
	        		$("#res").html("");
	        		$.each(data['artists']['items'], function(index, value) {
	        			var artistName = "";
	        			if (value.name !== undefined) {
	        				artistName  = value.name;
	        			}

	        			var artistLink = "";
	        			if (value.external_urls.spotify.length) {
		        			artistLink  = value.external_urls.spotify;
	        			}

	        			var artistImage = "";
	        			if (value.images.length) {
		        			artistImage = value.images[0].url;
	        			}

	        			var genres = "";
	        			var max = 3;
	        			var i = 1;
	        			$.each(value.genres, function(index, genre) {
	        				if (i < max-1) {
	        					genres += genre + ", ";
	        				} else {
	        					genres += genre;
	        				}
	        				if (i === max) { return false }
	        				i ++;
	        			})

	    				var data = 
						'<div class="card" style="width: 20rem;">' +
						  '<img class="card-img-top" src="' + 
						    artistImage + '" alt="Artist Image">' +
						  '<div class="card-block">' +
						    '<h4 class="card-title">' + 
						      artistName + '</h4>' +
						    '<h6>Genres:</h6>' + 
						    '<p class="card-text">' + genres + '</p>' +
						    '<a href="' +
						       artistLink + 
						       '" target="_blank" class="text-center btn btn-info btn-spotify">' +
						       '<span class="fa fa-spotify fa-lg"></span> Play artist</a>' +
						  '</div>' +
						'</div>';
	        			
	        			$("#res").append('<div class="m-b-md col-sm-4">' + 
	    					data + 
	    					'</div>');
	        		});
	            },
	        });
		} else {
			$("#res").html("");
		}
	}),
});
