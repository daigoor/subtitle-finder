var subscene = require('subscene');
var request = require('request');
var cheerio = require('cheerio');
var fs =  require('fs');


var search = window.search = function(tag) {
	//http://subscene.com/subtitle/download?mac=dFFKHNc6GlDb6-Srw2HMulbLF_YeiqKwsB62_ws6DQHMGVyqQ_m8EmyKA4b_xLfP0
	var globalThis = this;
	subscene.searchRelease(tag, function(err, data){
	    globalThis.err = err;
	    globalThis.data = data;
	    index.displaySearchResult(data);
	});	
}

var getUrl = window.getUrl = function (url) {

	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    parseHtml(body);
	  }
	});
}

var parseHtml = function(htmlString) {
	streamFile(cheerio.load(htmlString)('#downloadButton').attr('href'))
}

var streamFile = function(url) {
	request('http://subscene.com'+url).pipe(fs.createWriteStream('./downloads/'+Math.floor(Date.now() / 1000)+'.zip'));
	index.finished();
}