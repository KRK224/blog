const Koa = require('koa');
const Router = require('koa-router');

const api = require('./api');

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

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

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

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

app.listen(4000, () =>{
  console.log('Listening to port 4000');
});