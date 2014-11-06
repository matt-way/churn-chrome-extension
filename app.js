
/**
 * Module dependencies.
 */

var express = require('express'),
	path = require('path'),
	less = require('less-middleware'),
	serveStatic = require('serve-static');

var app = express();
var pub = path.join(__dirname, 'public');

// less
app.use(less(pub));

// static resource folder
app.use(serveStatic(pub));

var port = 3000;
app.listen(port, function(){
  console.log('Churn chrome extension server listening on port ' + port);
});
