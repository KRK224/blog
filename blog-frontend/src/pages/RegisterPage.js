import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';

const RegisterPage = ()=>{
  return(
    <AuthTemplate>
      <AuthForm type="register"></AuthForm>
    </AuthTemplate>
  );
};

export default RegisterPage;