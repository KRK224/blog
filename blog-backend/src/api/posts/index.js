import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

/* const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');
 */
const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);
posts.get('/:id', postsCtrl.getPostById, postsCtrl.read);
posts.delete('/:id', postsCtrl.getPostById, checkLoggedIn, postsCtrl.checkOwnPost,postsCtrl.remove);
// posts.put('/:id', postsCtrl.replace);
posts.patch('/:id', postsCtrl.getPostById, checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);


// module.exports = posts;

export default posts;
