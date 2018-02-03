# nodejs 를 사용한 simple board


- [node-simple-board](https://github.com/qkrrudtjr954/node-notice-board)
- nodejs를 사용하여 간단하게 글을 작성할 수 있는 어플리케이션


## Dev Environment

- Language : javascript
- DataBase : File
- Framework : Nodejs, express
- Template Engine : pug




## Introduce Program

- Nodejs를 사용한 게시판 어플리케이션
- 템플렛 엔진은 pug 사용
- 글을 작성하면 제목을 이름으로 한 파일로 /data 하위에 .txt로 저장된다.



```javascript
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
    // redirect 는 다시 url을 태운다.
    res.redirect('/topic/'+title);
  });
});
```
    - title을 파일 이름으로 한 txt파일을 생성한다.
    - ```/topic/title``` 로 redirection한다.


- 글 목록은 /data 하위의 모든 파일의 제목을 불러온다.

```javascript
fs.readdir('data', function (err, files) {
  if(err){
    console.log(err);
    res.status(500).send('Internal server error');
  }
  res.render('new', { files : files });
});
```

    - data폴더 하위에 있는 파일의 목록을 가져온다.
    - 파일 목록과 함께 ```new.pug```로 랜더링시킨다.



## Todo

- file로 저장되는 글을 DataBase에 저장되도록 이전시킨다.
- ui를 수정한다.