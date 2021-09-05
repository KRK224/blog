import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// action type 정의

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

// action 생성 함수
export const changeField = createAction(
  CHANGE_FIELD,
  ({form, key, value}) =>({
    form, // register, login
    key, // uername, password, passwordConfirm
    value, // 실제 바꾸려는 값
  }),
);

export const initializeForm = createAction(
  INITIALIZE_FORM, form => form 
); // register or login

// 초기값 설정
const initialState = {
  register: {
    username:'',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  }
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, {payload: {form, key, value}})=> {
      return produce(state,draft=>{
        draft[form][key] = values;
      })
    },
    [INITIALIZE_FORM]: (state, {payload: form})=>{
      return({
        ...state,
        [form]: initialState[form],
      });
    },
  },
  initialState
)

export default auth;