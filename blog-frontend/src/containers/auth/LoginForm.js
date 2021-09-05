import React, {useEffect} from "react";
import { useDispatch, userSelector } from "react-redux";
import { changeField, initializeForm } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";

const LoginForm=()=>{
  const dispatch = useDispatch();
  const {form} = userSelector(({auth})=>({
    form: auth.login
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const {value, name} = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value
      })
    );
  };

  const onSubmit = e =>{
    // 새로 고침 방지
    e.preventDefault();
    // 구현 예정
  };

  useEffect(()=>{
    dispatch(initializeForm('login'));
  }, [dispatch]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;