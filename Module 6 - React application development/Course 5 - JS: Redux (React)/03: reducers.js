// Реализуйте в Store следующую структуру состояния:
// {
//   comments: {
//     1: { id: 1, taskId: 1, body: 'comment 1' },
//     2: { id: 2, taskId: 1, body: 'comment 2' },
//     5: { id: 5, taskId: 2, body: 'another comment' },
//   },
//   tasks: {
//     1: { id: 1, name: 'first task' },
//     2: { id: 2, name: 'second task' },
//   },
// }

// Store должен уметь обрабатывать перечисленные в файле actions.js действия
// При удалении task, должны удаляться комментарии с таким же taskId, как id у этого task

import _ from 'lodash';
import { combineReducers } from 'redux';

const comments = (state = {}, action) => {
  switch (action.type) {
    case 'TASK_REMOVE': {
      const { id } = action.payload;
      return _.omitBy(state, (property) => property.taskId === id);
    }
    case 'TASK_COMMENT_ADD': {
      const { comment } = action.payload;
      const newComment = { [comment.id]: comment };
      return { ...state, ...newComment };
    }
    case 'TASK_COMMENT_REMOVE': {
      const { id } = action.payload;
      return _.omitBy(state, (property) => property.id === id);
    }
    default:
      return state;
  }
};

const tasks = (state = {}, action) => {
  switch (action.type) {
    case 'TASK_ADD': {
      const { task } = action.payload;
      const newTask = { [task.id]: task };
      return { ...state, ...newTask };
    }
    case 'TASK_REMOVE': {
      const { id } = action.payload;
      return _.omitBy(state, (property) => property.id === id);
    }
    default:
      return state;
  }
};

export default combineReducers({
  comments,
  tasks,
});

/* actions.js */

export const addTask = (task) => ({
  type: 'TASK_ADD',
  payload: {
    task,
  },
});

export const removeTask = (id) => ({
  type: 'TASK_REMOVE',
  payload: {
    id,
  },
});

export const addTaskComment = (comment) => ({
  type: 'TASK_COMMENT_ADD',
  payload: {
    comment,
  },
});

export const removeTaskComment = (id) => ({
  type: 'TASK_COMMENT_REMOVE',
  payload: {
    id,
  },
});

/* __tests__ */

import { configureStore } from '@reduxjs/toolkit';
import reducers from '../reducers.js';
import {
  addTask, removeTask, addTaskComment, removeTaskComment,
} from '../actions.js';

const buildTask = (id, name) => ({ id, name });
const buildComment = (id, task, body) => ({ id, taskId: task.id, body });

test('Store', () => {
  const store = configureStore({ reducer: reducers });
  expect(store.getState()).toEqual({
    comments: {},
    tasks: {},
  });

  store.dispatch(removeTask(1));
  expect(store.getState()).toEqual({
    comments: {},
    tasks: {},
  });

  const task1 = buildTask(1, 'task1');
  store.dispatch(addTask(task1));
  expect(store.getState()).toEqual({
    comments: {},
    tasks: { 1: task1 },
  });

  const task2 = buildTask(2, 'task2');
  store.dispatch(addTask(task2));
  expect(store.getState()).toEqual({
    comments: {},
    tasks: { 1: task1, 2: task2 },
  });

  const comment1 = buildComment(1, task1, 'comment1');
  store.dispatch(addTaskComment(comment1));
  expect(store.getState()).toEqual({
    comments: {
      1: comment1,
    },
    tasks: {
      1: task1,
      2: task2,
    },
  });

  const comment2 = buildComment(2, task2, 'comment2');
  store.dispatch(addTaskComment(comment2));
  expect(store.getState()).toEqual({
    comments: {
      1: comment1,
      2: comment2,
    },
    tasks: {
      1: task1,
      2: task2,
    },
  });

  const comment3 = buildComment(3, task2, 'comment3');
  store.dispatch(addTaskComment(comment3));
  expect(store.getState()).toEqual({
    comments: {
      1: comment1,
      2: comment2,
      3: comment3,
    },
    tasks: {
      1: task1,
      2: task2,
    },
  });

  store.dispatch(removeTask(task2.id));
  expect(store.getState()).toEqual({
    comments: { 1: comment1 },
    tasks: { 1: task1 },
  });

  const comment4 = buildComment(4, task1, 'comment4');
  store.dispatch(addTaskComment(comment4));

  store.dispatch(removeTaskComment(comment1.id));
  expect(store.getState()).toEqual({
    comments: {
      4: comment4,
    },
    tasks: { 1: task1 },
  });
});
