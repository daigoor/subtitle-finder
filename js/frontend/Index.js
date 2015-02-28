var index = {
	init: function () {
		$('#do-search').click(function() {
			index.searchAction($('#search-value').val());
		});
	}, 
	searchAction: function (tag){
		$.blockUI({ 
            message: '<div class="loading-container">'+
            '    <div class="loading"></div>'+
            '    <div id="loading-text">loading</div>'+
            '</div>', 
            css: { 
                border: 'none', 
                padding: '15px', 
                backgroundColor: '#000', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: .5, 
                color: '#fff' 
                } 
            }); 


		search(tag);
	}, 
	displaySearchResult : function (results) {
		var htmlString="";
		for(var i = 0 ; i < results.length ; i++) {
			htmlString = htmlString + '<input class="result-item btn btn-default form-control" type="button" value="'+results[i].comment+'" data-url="'+results[i].url+'"/>'
		}
		$('.modal-body').html(htmlString);
		$('#myModal').modal('show');

		$('.result-item').click(function() {
			index.downloadSubtitle($(this).data('url'));
		});

		$.unblockUI();

	}, 
	downloadSubtitle : function (url) {
		$('#myModal').modal('hide');

		$.blockUI({ 
            message: '<div class="loading-container">'+
            '    <div class="loading"></div>'+
            '    <div id="loading-text">loading</div>'+
            '</div>', 
            css: { 
                border: 'none', 
                padding: '15px', 
                backgroundColor: '#000', 
                '-webkit-border-radius': '10px', 
                '-moz-border-radius': '10px', 
                opacity: .5, 
                color: '#fff' 
                } 
            }); 

		getUrl(url);
	}, 
	finished : function() {
 
         setTimeout(function() { 
            $.unblockUI({ 
                onUnblock: function(){ $('#myModal').modal('show'); } 
            }); 
        }, 4000); 

     
	}
}
$(function(){
	index.init();
});