require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const {PORT, MONGO_URI} = process.env;

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useFindAndModify: false})
.then(()=>{
  console.log('Connected to MongoDB');
})
.catch(e=>{
  console.error(e);
});

const api = require('./api');

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());


/* 
router.get('/', ctx=>{
  ctx.body = '홈';
});

router.get('/about/:name?', ctx=>{
  const {name} = ctx.params;
  ctx.body = name ? `${name}의 소개` : '소개';
});

router.get('/posts', ctx=>{
  const {id} = ctx.query;
  ctx.body = id ? `포스트 #${id}`: '포스트 아이디가 없습니다.';
}); 
*/


/* 
app.use(async (ctx, next)=>{
  console.log(ctx.url);
  console.log(1);
  if (ctx.query.authorized !=='1'){
    ctx.status = 401; //Unauthorized
    return;
  }

  await next();
  console.log('End');
});

app.use((ctx, next)=>{
  console.log(2);
  next();
});

app.use(ctx => {
  ctx.body = 'hello world';
}); */

// PORT가 지정되어 있지 않다면 4000을 사용
const port = PORT || 4000;

app.listen(port, () =>{
  console.log('Listening to port 4000');
});