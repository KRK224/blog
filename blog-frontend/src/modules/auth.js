import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { createRequestActionTypes } from '../lib/createRequestSaga';

// action type 정의

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER',);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN',);
/* 수동 액션 타입 정의
const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'; 
*/

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
        draft[form][key] = value;
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