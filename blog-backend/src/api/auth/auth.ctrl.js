import Joi from 'joi';
// import { exist } from '../../../node_modules/joi/lib/index';
import User from '../../models/user';

export const register = async ctx =>{
  const schema = Joi.object().keys({
    username: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if(result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const {username, password} = ctx.request.body;
  try {
    // username이 이미 존재하는 지 확인 => 스태틱 메소드 사용
    const exists = await User.findByUsername(username);
    if(exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({
      username,
    });

    await user.setPassword(password); // 비밀번호 설정
    await user.save(); // 데이터 베이스에 저장

    // 응답할 데이터에서 hashedPassword 필드 제거

    ctx.body = user.serialize();
  } catch(e) {
    ctx.throw(500, e);
  }
};


export const login = async ctx =>{
  const {username, password} = ctx.request.body;

  if(!username || !password) {
    ctx.status = 401; //Unauthorized
    return;
  }

  try {
    const user = await User.findByUsername(username);
    // 계정이 존재하지 않으면 에러 처리
    if(!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    if(!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};


export const check = async ctx =>{

}
export const logout = async ctx =>{

}