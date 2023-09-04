// В этом упражнении продолжим дорабатывать приложение форума. Теперь нужно добавить сохранение нормализованных данных с помощью normalizr.
// Добавьте сохранение нормализованных данных в postsSlice.js и commentsSlice.js.
// Реализуйте получение постов в хуке useSelector().
// Реализуйте в хуке useSelector() получение автора поста по переданному в компонент посту.
// Реализуйте получение данных с помощью useSelector().
// Используйте переданный идентификатор комментария для извлечения из состояния комментария и пользователя по автору комментария.
// Сохраните автора и комментарий в переменные author и comment соответственно.

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
  entities: {},
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, { payload }) {
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
    },
  },
});

export const { actions } = postsSlice;
export default postsSlice.reducer;

/* usersSlice.js */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
  entities: {},
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, { payload }) {
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
    },
  },
});

export const { actions } = usersSlice;
export default usersSlice.reducer;

/* commentsSlice */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
  entities: {},
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, { payload }) {
      const { entities, ids } = payload;
      state.entities = entities;
      state.ids = ids;
    },
  },
});

export const { actions } = commentsSlice;
export default commentsSlice.reducer;

/* index.js */

import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice.js';
import commentsReducer from './commentsSlice.js';
import usersReducer from './usersSlice.js';

export default configureStore({
  reducer: {
    usersReducer,
    postsReducer,
    commentsReducer,
  },
});

/* ../components/App.jsx */

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { normalize, schema } from 'normalizr';
import Posts from './Posts.jsx';
import routes from '../routes.js';

import { actions as usersActions } from '../slices/usersSlice.js';
import { actions as postsActions } from '../slices/postsSlice.js';
import { actions as commentsActions } from '../slices/commentsSlice.js';

const App = () => {
  const dispatch = useDispatch();

  const getNormalized = (data) => {
    const user = new schema.Entity('users');

    const comment = new schema.Entity('comments', {
      author: user,
    });

    const post = new schema.Entity('posts', {
      author: user,
      comments: [comment],
    });
    const normalizedData = normalize(data, [post]);

    return normalizedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.getData());
      const normalizedData = getNormalized(data);
      const {
        users,
        posts,
        comments,
      } = normalizedData.entities;

      dispatch(usersActions.setUsers({ entities: users, ids: Object.keys(users) }));
      dispatch(postsActions.setPosts({ entities: posts, ids: Object.keys(posts) }));
      dispatch(commentsActions.setComments({ entities: comments, ids: Object.keys(comments) }));
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
  const { author, comment } = useSelector((state) => {
    const commentEntity = state.commentsReducer.entities[commentId];
    const authorId = commentEntity.author;
    const authorEntity = state.usersReducer.entities[authorId];
    return { author: authorEntity, comment: commentEntity };
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
  const author = useSelector((state) => (
    state.usersReducer.entities[post.author]
  ));

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
  const posts = useSelector((state) => {
    return Object.values(state.postsReducer.entities);
  });

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
  const blogPosts = [
    {
      id: 'post1',
      author: { id: 'user1', username: 'user1', name: 'User 1' },
      body: 'Первый пост',
      comments: [
        {
          id: 'comment1',
          author: { id: 'user2', username: 'user2', name: 'User 2' },
          text: 'Первый комментарий',
        },
        {
          id: 'comment2',
          author: { id: 'user3', username: 'user3', name: 'User 3' },
          text: 'Второй комментарий',
        },
      ],
    },
    {
      id: 'post2',
      author: { id: 'user2', username: 'user2', name: 'User 2' },
      body: 'Второй пост',
      comments: [],
    },
  ];
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
  expect(await screen.findByText(`${blogPosts[0].body} - ${blogPosts[0].author.name}`)).toBeInTheDocument();
  expect(await screen.findByText(`${blogPosts[1].body} - ${blogPosts[1].author.name}`)).toBeInTheDocument();

  expect(await screen.findByText(blogPosts[0].comments[0].text)).toBeInTheDocument();
  expect(await screen.findByText(blogPosts[0].comments[0].author.name)).toBeInTheDocument();
  expect(await screen.findByText(blogPosts[0].comments[1].text)).toBeInTheDocument();
  expect(await screen.findByText(blogPosts[0].comments[1].author.name)).toBeInTheDocument();
});
