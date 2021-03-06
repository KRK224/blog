import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';

const {ObjectId} = mongoose.Types;

export const getPostById = async (ctx, next) => {
  const {id} = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; //Bad Request
    return;
  }
  try {
    const post = await Post.findById(id);
    if(!post){
      ctx.status = 404; //Not Found
      return;
    }

    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
  return next();
};

export const write = async ctx => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array()
    .items(Joi.string())
    .required(),
  });

  const result = schema.validate(ctx.request.body);
  if(result.error){
    ctx.status = 400; //Bad Request
    ctx.body = result.error;
    return;
  }
  
  const {title, body, tags} = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
    user: ctx.state.user,
  });

  // console.log(post);
  
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const list = async ctx =>{

  const page = parseInt(ctx.query.page || '1', 10);

  if (page <1) {
    ctx.status = 400;
    return;
  }
  // tag 및 username으로 목록 불러오기

  const {tag, username} = ctx.query;

  const query = {
    ...(username? {'user.username': username}: {}),
    ...(tag? {tags:tag}: {}),
  };

  try{
    const posts = await Post.find(query)
    .sort({_id: -1})
    .limit(10)
    .skip((page-1)*10)
    .exec();
    const postCount = await Post.countDocuments().exec();
    // ctx.remove('Last-Page');
    console.log(postCount);
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts
    .map(post => post.toJSON())
    .map(post => ({
      ...post,
      body:
      post.body.length < 200? post.body: `${post.body.slice(0,200)}...`
    }));
  } catch (e) {
    ctx.throw(500, e);
  } 

};

export const read = async ctx =>{

  try {
    ctx.body = ctx.state.post;
  } catch(e) {
    ctx.throw(500, e);
  }
};

export const remove = async ctx =>{
  const {id} = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터는 없음)
  } catch(e) {
    ctx.throw(500,e);
  }
};

export const update = async ctx =>{
  const {id} = ctx.params;
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(ctx.request.body);
  if(reslut.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if(!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  }catch (e) {
    ctx.throw(500,e);
  }
  
};

export const checkOwnPost = (ctx,next) =>{
  const {user, post} = ctx.state;
  if (post.user._id.toString() !==user._id){
    ctx.status = 403;
    return;
  }

  return next();
}


// /* 포스트 작성
// Post /api/posts
// { title, body} 
// */

// export const write = ctx =>{
//   // REST API의 Request Body는 ctx.request.body에서 조회할 수 있습니다.
//   const {title, body} = ctx.request.body;
//   postId += 1; //기존의 postId 값에 1을 더함
//   const post = {id: postId, title, body};
//   posts.push(post);
//   ctx.body = post;
// };

// /* 포스트 목록 조회
// Get /api/posts
// */

// export const list = ctx => {
//   ctx.body = posts;
// };

// /* 특정 포스트 조회
// Get /api/posts/:id
//  */
// export const read = ctx =>{
//   const {id} = ctx.params;
//   // 주어진 id 값으로 포스트를 찾습니다.
//   // 파라미터로 받아 온 값은 문자열 형식이므로 파라미터를 숫자로 변환하거나
//   //  비교할 p.id 값을 문자열로 변경

//   const post = posts.find(p=> p.id.toString() === id);
//   // 포스트가 없으면 오류를 반환
//   if(!post) {
//     ctx.status = 404;
//     ctx.body = {
//       message: '포스트가 존재하지 않습니다.',
//     };
//     return;
//   }
//   ctx.body = post;
// };

// /* 특정 포스트 제거
//   DELETE /api/posts/:id
// */
// export const remove = ctx =>{
//   const {id} = ctx.params;
//   // 해당 id를 가진 post가 몇 번째인지 확인
//   const index = posts.findIndex(p => p.id.toString() === id);
//   // 포스트가 없으면 오류를 반환
//   if(index ===-1) {
//     ctx.status = 404;
//     ctx.body = {
//       message: '포스트가 존재하지 않습니다.',
//     };

//     return;
//   };

//   // index번째 아이템 제거
//   posts.splice(index,1);
//   ctx.status = 204; // No Content
// };

// /* 포스트 수정(교체)
//   PUT /api/posts/:id
//   {title, body}
// */
// export const replace = ctx =>{
//   // PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용
//   const  {id} = ctx.params;
//   // 해당 id를 가진 post가 몇 번째인지 확인
//   const index = posts.findIndex(p=> p.id.toString() === id);

//   // 포스트가 없으면 오류 반환
//   if(index ===-1){
//     ctx.status = 404;
//     ctx.body ={
//       message: '포스트가 존재하지 않습니다.',
//     };
//     return;
//   } 

//   // 전체 객체를 덮어 씌웁니다.
//   // 따라서 id를 제외한 기존 정보를 날리고, 객체를 새로 만듬?

//   posts[index] = {
//     id,
//     ...ctx.request.body,
//   };
//   ctx.body = posts[index];
// };

// /* 포스트 수정 (특정 필드 변경)
// PATCH /api/posts/:id
// {title, body}
//  */

// export const update = ctx =>{
//   const {id} = ctx.params;
//   const index = posts.findIndex(p=> p.id.toString()===id);

//   if(index ===-1) {
//     ctx.status = 404;
//     ctx.body ={
//       message: '포스트가 존재하지 않습니다.',
//     };
//     return;
//   }
//   // 기존 값에 정보를 덮어씌운다.
//   posts[index] = {
//     ...posts[index],
//     ...ctx.request.body,
//   };
//   ctx.body = posts[index];
// };

