// В этом уроке мы продолжим добавлять функционал в наше приложение имитирующее форум.
// Удаление любой сущности влечёт за собой побочные эффекты. Например, в нашем приложении есть авторы.
// Если автора удалить, то все посты и комментарии, которые он написал, останутся без привязки к пользователю.
// В реальных приложениях обычно удаления из базы данных не происходит, а сущность просто помечается как удалённая, таким образом связи не теряются.
// Мы же для практики будем удалять все привязанные данные, для этого можно использовать Extra Reducers.

// Реализуйте удаление привязанных сущностей. При удалении пользователя должен удаляться весь контент, автором которого является этот пользователь.
// При удалении постов, должны удаляться все комментарии, привязанные к этому посту.
// Для удобства тестирования на форму выведены таблицы со всем контентом, сгруппированные по пользователям.
// Реализуйте необходимые дополнительные редьюсеры, которые будут удалять из стора комментарии при удалении пользователя или поста.
// Добавьте дополнительный редьюсер, который будет удалять посты при удалении пользователя.

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as usersActions } from './usersSlice.js';

const postsAdapter = createEntityAdapter();

const initialState = postsAdapter.getInitialState();

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: postsAdapter.addMany,
    addPost: postsAdapter.addOne,
    updatePost: postsAdapter.updateOne,
    // При удалении поста передается весь пост
    removePost: (state, { payload }) => postsAdapter.removeOne(state, payload.id),
  },
  extraReducers: (builder) => {
    builder
    .addCase(usersActions.removeUser, (state, action) => {
      const id = action.payload;
      const restEntities = Object.values(state.entities).filter(({ author }) => author !== id);
      postsAdapter.setAll(state, restEntities);
    });
  },
});

export const { actions } = postsSlice;
export const selectors = postsAdapter.getSelectors((state) => state.posts);
export default postsSlice.reducer;

/* commentsSlice.js */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as usersActions } from './usersSlice.js';
import { actions as postsActions } from './postsSlice.js';

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState();

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComments: commentsAdapter.addMany,
    addComment: commentsAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
    .addCase(usersActions.removeUser, (state, action) => {
      const id = action.payload;
      const restEntities = Object.values(state.entities).filter(({ author }) => author !== id);
      commentsAdapter.setAll(state, restEntities);
    })
    .addCase(postsActions.removePost, (state, action) => {
      const { comments } = action.payload;
      const restEntities = Object.values(state.entities).filter(({ id }) => !comments.includes(id));
      commentsAdapter.setAll(state, restEntities);
    });
  },
});

export const { actions } = commentsSlice;
export const selectors = commentsAdapter.getSelectors((state) => state.comments);
export default commentsSlice.reducer;

/* usersSlice.js */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: usersAdapter.addMany,
    removeUser: usersAdapter.removeOne,
  },
});

export const { actions } = usersSlice;
export const selectors = usersAdapter.getSelectors((state) => state.users);
export default usersSlice.reducer;

/* index.js */

import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice.js';
import commentsReducer from './commentsSlice.js';
import usersReducer from './usersSlice.js';

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
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
import Users from './Users.jsx';

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
        <Users />
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

  return (
    <>
      <h5 className="card-title">{ author ? author.name : '' }</h5>
      <p className="card-text">{ comment ? comment.text : '' }</p>
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

  const removePost = () => {
    // При удалении поста передается весь пост
    dispatch(postsActions.removePost(post));
  };

  return (
    <div className="card mb-5">
      <div className="card-header">
        {`${post.body} - ${author.name}`}
        <button type="button" className="close" aria-label="Close" onClick={removePost}>
          <span aria-hidden="true">&times;</span>
        </button>
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

/* ../components/User.jsx */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { actions as usersActions } from '../slices/usersSlice.js';

const User = ({ user }) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => {
    if (!state.posts) {
      return [];
    }
    const allPosts = Object.values(state.posts.entities);
    const result = allPosts.filter((item) => item.author === user.id);
    return result;
  });

  const comments = useSelector((state) => {
    if (!state.comments) {
      return [];
    }
    const allComments = Object.values(state.comments.entities);
    const result = allComments.filter((item) => item.author === user.id);
    return result;
  });

  const removeUser = () => {
    dispatch(usersActions.removeUser(user.id));
  };

  return (
    <div className="mt-3">
      {user.name}
      <Button variant="primary" className="ml-3" onClick={removeUser}>
        Удалить
      </Button>
      <div className="d-flex flex-row">
        <ul className="list-group m-3 col-3">
          <li className="list-group-item active">Посты</li>
          {posts?.map((post) => (<li key={post.id} className="list-group-item">{post.body}</li>))}
        </ul>
        <ul className="list-group m-3 col-3">
          <li className="list-group-item active">Комментарии</li>
          {comments?.map((comment) => (<li key={comment.id} className="list-group-item">{comment.text}</li>))}
        </ul>
      </div>
      <hr />
    </div>
  );
};

export default User;

/* ../components/Users.jsx */

import React from 'react';
import { useSelector } from 'react-redux';
import User from './User.jsx';

import { selectors } from '../slices/usersSlice.js';

const Users = () => {
  const users = useSelector(selectors.selectAll);

  return (
    <div className="mt-3">
      <div className="card mb-5">
        <div className="card-header">
          Список пользователей
        </div>
        <div className="card-body">
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;

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
import {
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../src/components/App.jsx';
import store from '../src/slices/index.js';

describe('Work 1', () => {
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
      author: {
        id: 'user2',
        username: 'user2',
        name: 'User 2',
      },
      body: 'Второй пост',
      comments: [
        {
          id: 'comment3',
          author: {
            id: 'user1',
            username: 'user1',
            name: 'User 1',
          },
          text: 'Третий комментарий',
        }, {
          id: 'comment4',
          author: {
            id: 'user2',
            username: 'user2',
            name: 'User 2',
          },
          text: 'Четвертый комментарий',
        },
      ],
    },
  ];

  beforeEach(() => {
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
  });

  test('Remove user', async () => {
    expect(await screen.findByText(`${blogPosts[0].body} - ${blogPosts[0].author.name}`)).toBeInTheDocument();

    userEvent.click(screen.getAllByRole('button', { name: /удалить/i })[0]);
    await waitFor(async () => {
      expect(await screen.queryByText(`${blogPosts[0].body} - ${blogPosts[0].author.name}`)).not.toBeInTheDocument();
      expect(await screen.queryByText(blogPosts[1].comments[0].text)).not.toBeInTheDocument();
    });
  });

  test('Remove post', async () => {
    const postEl = await screen.findByText(`${blogPosts[0].body} - ${blogPosts[0].author.name}`);

    userEvent.click(within(postEl).getAllByRole('button', { name: /close/i })[0]);
    await waitFor(async () => {
      expect(await screen.queryByText(`${blogPosts[0].body} - ${blogPosts[0].author.name}`)).not.toBeInTheDocument();
      expect(await screen.queryByText(blogPosts[0].comments[0].text)).not.toBeInTheDocument();
      expect(await screen.queryByText(blogPosts[0].comments[1].text)).not.toBeInTheDocument();
      expect(await screen.queryByText(blogPosts[1].comments[0].text, { selector: 'p' })).toBeInTheDocument();
    });
  });
});
