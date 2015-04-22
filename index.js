var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var yiff = require('yahoo-finance');
var FIELDS = ['a','b','v','c','c1','p2','p','o'];

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.post('/quote', function(request, response) {
  var symbol = request.body.item.message.message.split(' ')[1];
  yiff.snapshot({
    fields: FIELDS,
    symbol: symbol
  }).then(function (snapshot){
    var message = '$' + symbol + ': $' + snapshot.ask.toFixed(2) + '  ( $' + snapshot.change.toFixed(2) + ' / ' + snapshot.changeInPercent.toFixed(2) + '% )';
    response.header('Content-Type', 'application/json');
    response.send(JSON.stringify({
      color: 'gray',
      message: message,
      notify: false,
      message_format: 'text'
    }));
  });
});



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
