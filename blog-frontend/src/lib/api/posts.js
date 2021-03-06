import client from './client';

export const writePost = ({title, body, tags})=>{
  return (
    client.post('/api/posts', {title, body, tags})
  );
};

export const readPost = id => client.get(`/api/posts/${id}`);