import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';

const RegisterPage = ()=>{
  return(
    <AuthTemplate>
      <AuthForm></AuthForm>
    </AuthTemplate>
  );
};

export default RegisterPage;