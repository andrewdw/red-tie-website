var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set all incoming requests to use https
app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https')
    return res.redirect([
      'https://',
      req.get('Host'),
      req.url
    ].join(''));
  else
    next() /* Continue to other routes if we're not redirecting */
})

// set the home page route
app.get('/', function(req, res) {
  // ejs render automatically looks in the views folder
  res.render('index');
});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});