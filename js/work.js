// JavaScript Document

$(document).ready(function() {
	// $("header").load("header.html");
	// $("footer").load("footer.html");
	get_con('js/list.json');

	function get_con(file_name){
		$.getJSON(file_name, function(data){
			$("section").empty();

			$.each(data, function(index, en){
				var html ='<div class="col-3">';
				html += '<a href="' + en['meme'] + '">';
				html += '<div class="box">';
				html += '<div class="imgbox">';
				html += '<img src="' + en['pic'] + '">';
				html += '</div>';
				html += '<h3>' + en['title'] + '</h3>';
				html += '</div>';
				html += '</a>';
				html += '</div>'

				$("section").append(html);

			});
		});
		return false;
	}
});
