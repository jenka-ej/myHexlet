// Доработайте приложение так, чтобы оно работало с Entity Adapter.
// Чтобы выполнить задание, выполните эти шаги.
// Реализуйте необходимые слайсы:
// 1) *usersSlice.js* — слайс пользователей
// 2) *postsSlice.js* — слайс постов
// 3) *commentsSlice.js* — слайс комментариев

// Добавьте редьюсеры с помощью механизма Entity Adapter:
// 1) Редьюсеры для добавления одного комментария и нескольких комментариев
// 2) Редьюсеры для добавления одного поста, нескольких постов, а также для обновления поста
// 3) Редьюсер для добавления нескольких пользователей
// 4) Добавьте необходимые селекторы

// Сконфигурируйте стор, добавив слайсы.

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: usersAdapter.addMany,
  },
});

export const selectors = usersAdapter.getSelectors((state) => state.users);
export const { actions } = usersSlice;
export default usersSlice.reducer;

/* commentsSlice.js */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState();

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: commentsAdapter.addOne,
    addComments: commentsAdapter.addMany,
  },
});

export const selectors = commentsAdapter.getSelectors((state) => state.comments);
export const { actions } = commentsSlice;
export default commentsSlice.reducer;

/* postsSlice.js */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState();

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: postsAdapter.addOne,
    addPosts: postsAdapter.addMany,
    updatePost: postsAdapter.updateOne,
  },
});

export const selectors = postsAdapter.getSelectors((state) => state.posts);
export const { actions } = postsSlice;
export default postsSlice.reducer;

/* index.js */

import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice.js';
import commentsReducer from './commentsSlice.js';
import usersReducer from './usersSlice.js';

export default configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
});

/* ../components/App.jsx */

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { normalize, schema } from 'normalizr';
import Posts from './Posts.jsx';
import routes from '../routes.js';
import PostForm from './PostForm.jsx';

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

    return normalize(data, [post]);
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

      dispatch(usersActions.addUsers(users));
      dispatch(postsActions.addPosts(posts));
      dispatch(commentsActions.addComments(comments));
    };

    fetchData();
  });

  return (
    <>
      <div className="card">
        <div className="card-header">
          Создать пост
        </div>
        <div className="card-body">
          <PostForm />
        </div>
      </div>
      <div className="mt-5">
        <Posts />
      </div>
    </>
  );
};

export default App;

/* ../components/Comment.jsx */

import React from 'react';
import { useSelector } from 'react-redux';

import { selectors as commentsSelectors } from '../slices/commentsSlice.js';
import { selectors as usersSelectors } from '../slices/usersSlice.js';

const Comment = ({ commentId }) => {
  const { author, comment } = useSelector((state) => {
    const currentComment = commentsSelectors.selectById(state, commentId);
    if (!currentComment) {
      return {};
    }
    const currentAuthor = usersSelectors.selectById(state, currentComment.author);
    return { author: currentAuthor, comment: currentComment };
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

/* ../components/CommentForm.jsx */

import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Row } from 'react-bootstrap';
import _ from 'lodash';

import { selectors } from '../slices/usersSlice.js';

const CommentForm = ({ addComment }) => {
  const users = useSelector(selectors.selectAll);

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const comment = {
      text: data.get('text'),
      author: data.get('author'),
      id: _.uniqueId(),
    };
    addComment(comment);
  };

  return (
    <div className="m-3">
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row}>
          <Form.Label htmlFor="text">Комментарий</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="text"
            id="text"
          />
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label htmlFor="author" column sm="2">
            Автор комментария
          </Form.Label>
          <Form.Control
            as="select"
            name="author"
            id="author"
          >
            <option value="">{null}</option>
            {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mt-3" as={Row}>
          <Button variant="primary" type="submit">
            Создать комментарий
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CommentForm;

/* ../components/Post.jsx */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment.jsx';
import CommentForm from './CommentForm.jsx';
import { actions as postsActions } from '../slices/postsSlice.js';
import { actions as commentsActions } from '../slices/commentsSlice.js';
import { selectors } from '../slices/usersSlice.js';

const Post = ({ post }) => {
  const author = useSelector((state) => selectors.selectById(state, post.author));
  const dispatch = useDispatch();

  const addComment = (comment) => {
    dispatch(postsActions.updatePost({
      id: post.id,
      changes: {
        comments: [...post.comments, comment.id],
      },
    }));
    dispatch(commentsActions.addComment(comment));
  };

  return (
    <div className="card mb-5">
      <div className="card-header">
        {`${post.body} - ${author.name}`}
      </div>
      <div className="card-body">
        {post.comments.map((commentId) => <Comment key={commentId} commentId={commentId} />)}
        <hr />
        <CommentForm addComment={addComment} />
      </div>

    </div>
  );
};

export default Post;

/* ../components/PostForm.jsx */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Button,
  Row,
} from 'react-bootstrap';
import _ from 'lodash';

import { selectors } from '../slices/usersSlice.js';
import { actions } from '../slices/postsSlice.js';

const PostForm = () => {
  const users = useSelector(selectors.selectAll);
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const post = {
      body: data.get('body'),
      author: data.get('author'),
      id: _.uniqueId(),
      comments: [],
    };
    dispatch(actions.addPost(post));
  };

  return (
    <div className="m-3">
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row}>
          <Form.Label htmlFor="body">Текст</Form.Label>
          <Form.Control name="body" id="body" as="textarea" rows={3} />
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label htmlFor="postAuthor" column sm="2">
            Автор поста
          </Form.Label>
          <Form.Control name="author" id="postAuthor" as="select">
            <option value="">{null}</option>
            {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mt-3" as={Row}>
          <Button variant="primary" type="submit">
            Создать пост
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default PostForm;

/* ../components/Posts.jsx */

import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post.jsx';

import { selectors } from '../slices/postsSlice.js';

const Posts = () => {
  const posts = useSelector(selectors.selectAll);

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
import userEvent from '@testing-library/user-event';

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

  const { asFragment } = render(vdom);
  expect(await screen.findByText(`${blogPosts[0].body} - ${blogPosts[0].author.name}`)).toBeInTheDocument();
  expect(await screen.findByText(`${blogPosts[1].body} - ${blogPosts[1].author.name}`)).toBeInTheDocument();

  expect(await screen.findAllByText(blogPosts[0].author.name)).toHaveLength(3);
  expect(await screen.findByText(blogPosts[0].comments[0].text)).toBeInTheDocument();
  expect(await screen.findAllByText(blogPosts[0].comments[0].author.name)).toHaveLength(4);
  expect(await screen.findByText(blogPosts[0].comments[1].text)).toBeInTheDocument();
  expect(await screen.findAllByText(blogPosts[0].comments[1].author.name)).toHaveLength(4);

  await userEvent.type(screen.getByLabelText(/текст/i), 'Третий пост');
  await userEvent.selectOptions(screen.getByLabelText('Автор поста'), [blogPosts[0].author.name]);
  await userEvent.click(screen.getByRole('button', { name: /создать пост/i }));
  expect(await screen.findByText(`Третий пост - ${blogPosts[0].author.name}`)).toBeInTheDocument();
  expect(await screen.findAllByText(blogPosts[0].author.name)).toHaveLength(4);

  await userEvent.type(screen.getAllByLabelText(/комментарий/i)[0], 'Комментарий к 3 посту');
  await userEvent.selectOptions(screen.getAllByLabelText('Автор комментария')[0], [blogPosts[0].author.name]);
  await userEvent.click(screen.getAllByRole('button', { name: /создать комментарий/i })[0]);

  expect(screen.getByText('Комментарий к 3 посту')).toBeInTheDocument();
  expect(await screen.findAllByText(blogPosts[0].author.name)).toHaveLength(5);

  expect(asFragment()).toMatchSnapshot();
});
