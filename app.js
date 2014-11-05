
/**
 * Module dependencies.
 */

var express = require('express'),
	path = require('path'),
	serveStatic = require('serve-static');

var app = express();

// static resource folder
app.use(serveStatic(path.join(__dirname, 'public')));

var port = 3000;
app.listen(port, function(){
  console.log('Churn chrome extension server listening on port ' + port);
});
