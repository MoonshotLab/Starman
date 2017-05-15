const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.get('/moonshooter', function (req, res) {
  res.render('moonshooter');
});

app.get('/office-space', function (req, res) {
  res.render('office-space');
});

app.get('/star-twerk', function (req, res) {
  res.render('star-twerk');
});

app.get('*', function (req, res) {
  res.redirect('/moonshooter');
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server running on port ' + port);
});
