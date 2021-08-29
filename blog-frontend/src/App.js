import React from 'react';
import {Route} from 'react-router-dom';
import PostListPage from './pages/PostListpage';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/RegisterPage';
import PostPage from './pages/PostPage';
import WritePage from './pages/WritePage';

const App = () => {
  return (
    <>
      <Route component={PostListPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:username/:postId" />
    </>
  );
};

export default App;