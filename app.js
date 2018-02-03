var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fs = require('fs');

app.locals.pretty = true;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



// template engine pug
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/topic/new', function(req, res) {
  res.render('new');
});

app.get('/topic', function (req, res) {
  fs.readdir('data', function (err, files) {
    if(err){
      console.log(err);
      res.status(500).send('Internal server error');
    }
    res.render('view', { files : files });
  });
});

app.post('/topic', function(req, res){
  var title = req.body.title;
  var content = req.body.content;

  // 글을 파일에 저장
  fs.writeFile('data/'+title, content, (err)=>{
    if(err){
      // 500 error 로 내부 서버 에러가 발생하면 출력된다.
      console.log(err);
      res.status(500).send('Internal server error');
    }
    res.send('Success');
  });
});

app.get('/topic/:filename', function (req, res) {
  var filename = req.params.filename;
  fs.readdir('data', function (err, files) {
    if(err){
      console.log(err);
      res.status(500).send('Internal server error');
    }
    fs.readFile('data/'+filename, 'utf8', (err, data) => {
      if (err){
        console.log(err);
        res.status(500).send('Internal server error');
      }
      res.render('view', {title : filename, data : data, files : files});
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
