import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";

const RegisterForm=()=>{
  const dispatch = useDispatch();
  const {form} = useSelector(({auth})=>({
    form: auth.Register
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const {value, name} = e.target;
    dispatch(
      changeField({
        form: 'register',
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
    dispatch(initializeForm('register'));
  }, [dispatch]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;