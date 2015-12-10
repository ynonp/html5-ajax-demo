var express = require('express');
var _ = require('underscore');
var app = express();
var bodyParser = require('body-parser')


app.use(express.static('client'));
app.use(bodyParser.json());

var contacts = [
  { id: 0, name: 'Joe',  email: 'joe@gmail.com' },
  { id: 1, name: 'Jane', email: 'jane@yahoo.com' },
  { id: 2, name: 'Bob',  email: 'bob@gmail.com' },
];

app.get('/contacts', function(req, res) {
  var data = contacts.map(function(item) {
    return _.pick(item, 'name', 'id');
  });

  res.send(data);
});

app.get('/contacts/:id', function(req, res) {
  var id = req.params.id;
  var item = _.findWhere(contacts, { id: Number(id) });
  res.send(item);
});

app.post('/contacts', function(req, res) {
  var name  = req.body.name;
  var email = req.body.email;
  var maxId = _.max(contacts, function(item) { return item.id; });
  var nextId = maxId.id + 1;

  contacts.push({ id: nextId, name: name, email: email });
  res.send('null');
  res.status(201).end();  
});

app.delete('/contacts/:id', function(req, res) {
  var id = req.params.id;
  var idx = _.findIndex(contacts, { id: id });
  if ( idx >= 0 ) {
    contacts.splice(1, 1);
  }
  res.send('null');
  res.status(200).end();
});

var port = process.env.BASKET_APP_PORT || 3030;
app.listen(port);


