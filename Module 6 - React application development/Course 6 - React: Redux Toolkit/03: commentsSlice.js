// В этом упражнении нужно доработать приложение имитирующее форум. На данном этапе происходит только отрисовка полученных данных с сервера.
// В приложении уже добавлено отображение пользователей и постов, осталось доработать работу с комментариями.
// Вам предстоит создать слайс для комментариев и доработать компоненты, в которых используется этот слайс.
// Реализуйте слайс для комментариев. Принципиально работа с комментариями ничем не отличается от работы с постами или пользователями.
// В этом задании достаточно реализовать только добавление комментариев.
// Подключите редьюсеры слайса комментариев в стор, по аналогии, как это сделано с редьюсерами других слайсов
// Добавьте сохранение данных комментариев в стор, по аналогии, как это сделано с данными о пользователях и постах
// Добавьте извлечение комментария и автора комментария. Используйте для этого хук useSelector. Проанализируйте как он используется в других компонентах.
// Для нахождения комментария используйте переданный в компонент идентификатор комментария.
// Получите в первую очередь комментарий, а потом, по идентификатору автора, найдите самого автора. Помните, что в хуке доступно состояние из всех слайсов.
// Сохраните автора и комментарий в переменные author и comment.

// Пример как выглядят данные:
// const users = [
//   { id: 'user1', username: 'user1', name: 'User 1' },
//   { id: 'user2', username: 'user2', name: 'User 2' },
//   { id: 'user3', username: 'user3', name: 'User 3' },
// ];
 
// const posts = [
//   {
//     id: 'post1',
//     author: 'user1',
//     body: 'Первый пост',
//     comments: ['comment1', 'comment2'],
//   },
//   {
//     id: 'post2',
//     author: 'user2',
//     body: 'Второй пост',
//     comments: [],
//   },
// ];
 
// const comments = [
//   {
//     id: 'comment1',
//     author: 'user2',
//     text: 'Первый комментарий',
//   },
//   {
//     id: 'comment2',
//     author: 'user3',
//     text: 'Второй комментарий',
//   },
// ];

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, { payload }) {
      state.comments = payload;
    },
  },
});

export const { actions } = commentsSlice;
export default commentsSlice.reducer;

/* index.js */

import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice.js';
import usersReducer from './usersSlice.js';
import commentsReducer from './commentsSlice.js';

export default configureStore({
  reducer: {
    usersReducer,
    postsReducer,
    commentsReducer,
  },
});

/* postsSlice.js */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, { payload }) {
      state.posts = payload;
    },
  },
});

export const { actions } = postsSlice;
export default postsSlice.reducer;

/* usersSlice.js */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, { payload }) {
      state.users = payload;
    },
  },
});

export const { actions } = usersSlice;
export default usersSlice.reducer;

/* ../components/App.jsx */

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Posts from './Posts.jsx';
import routes from '../routes.js';

import { actions as usersActions } from '../slices/usersSlice.js';
import { actions as postsActions } from '../slices/postsSlice.js';
import { actions as commentsActions } from '../slices/commentsSlice.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.getData());
      const {
        users,
        posts,
        comments,
      } = data;

      dispatch(usersActions.setUsers(users));
      dispatch(postsActions.setPosts(posts));
      dispatch(commentsActions.setComments(comments));
    };

    fetchData();
  });

  return (
    <div className="col-5">
      <Posts />
    </div>
  );
};

export default App;

/* ../components/Comment.jsx */

import React from 'react';
import { useSelector } from 'react-redux';

const Comment = ({ commentId }) => {
  const comment = useSelector((state) => {
    const currentComment = state.commentsReducer.comments.find(({ id }) => id === commentId);
    return currentComment;
  });
  const author = useSelector((state) => {
    const currentAuthor = state.usersReducer.users.find(({ username }) => (
      username === comment.author
    ));
    return currentAuthor;
  });

  if (!author || !comment) {
    return null;
  }

  return (
    <>
      <h5 className="card-title">{ author.name }</h5>
      <p className="card-text">{ comment.text }</p>
    </>
  );
};

export default Comment;

/* ../components/Post.jsx */

import React from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment.jsx';

const Post = ({ post }) => {
  const author = useSelector((state) => {
    const currentAuthor = state.usersReducer.users.find(({ id }) => id === post.author);
    return currentAuthor;
  });

  return (
    <div className="card">
      <div className="card-header">
        {`${post.body} - ${author.name}`}
      </div>
      <div className="card-body">
        {post.comments.map((commentId) => <Comment key={commentId} commentId={commentId} />)}
      </div>
    </div>
  );
};

export default Post;

/* ../components/Posts.jsx */

import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post.jsx';

const Posts = () => {
  const { posts } = useSelector((state) => state.postsReducer);

  return (
    <div className="mt-3">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;

/* ../index.jsx */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import store from './slices/index.js';

const mountNode = document.getElementById('container');
const root = ReactDOM.createRoot(mountNode);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

/* ../routes.js */

const routes = {
  getData: () => '/api/data',
};

export default routes;

/* __tests__ */

import '@testing-library/jest-dom';

import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../src/components/App.jsx';
import store from '../src/slices/index.js';

test('Work 1', async () => {
  const users = [
    { id: 'user1', username: 'user1', name: 'User 1' },
    { id: 'user2', username: 'user2', name: 'User 2' },
    { id: 'user3', username: 'user3', name: 'User 3' },
  ];
  const posts = [
    {
      id: 'post1',
      author: 'user1',
      body: 'Первый пост',
      comments: ['comment1', 'comment2'],
    },
    {
      id: 'post2',
      author: 'user2',
      body: 'Второй пост',
      comments: [],
    },
  ];
  const comments = [
    {
      id: 'comment1',
      author: 'user2',
      text: 'Первый комментарий',
    },
    {
      id: 'comment2',
      author: 'user3',
      text: 'Второй комментарий',
    },
  ];
  const blogPosts = {
    users,
    posts,
    comments,
  };
  const server = setupServer(
    rest.get('/api/data', (req, res, ctx) => res(ctx.json(blogPosts))),
  );

  server.listen({
    onUnhandledRequest(req) {
      // eslint-disable-next-line
      console.warn(
        'Found an unhandled %s request to %s',
        req.method,
        req.url.href,
      );
    },
  });

  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  render(vdom);
  expect(await screen.findByText('Первый пост - User 1')).toBeInTheDocument();
  expect(await screen.findByText('Второй пост - User 2')).toBeInTheDocument();

  expect(await screen.findByText('Первый комментарий')).toBeInTheDocument();
  expect(await screen.findByText('User 2')).toBeInTheDocument();
  expect(await screen.findByText('Второй комментарий')).toBeInTheDocument();
  expect(await screen.findByText('User 3')).toBeInTheDocument();
});
