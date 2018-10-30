import * as usersServices from '@/services/users';
import { message } from 'antd';

export default {
  namespace: 'users',

  state: {
    list: [],
    total: 0,
    loading: true,
    current: 1,
    residences: [],
  },

  effects: {
    *fetch(
      {
        payload: { page, filters },
      },
      { call, put }
    ) {
      const response = yield call(usersServices.fecth, { page, filters });
      if (response) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    *remove(
      {
        payload: { id, filters },
      },
      { call, put }
    ) {
      const { status, success, message } = yield call(usersServices.remove, { id });
      if (status) {
        if (success) {
          message.success(message);
          yield put({
            type: 'reload',
            payload: { filters },
          });
        } else {
          message.error(message);
        }
      } else {
        message.error('通信异常，请稍后重试！');
      }
    },
    *removeByBatch(
      {
        payload: { ids, filters },
        callback,
      },
      { call, put }
    ) {
      const { status, success, message } = yield call(usersServices.removeByBatch, { ids });
      if (status) {
        if (success) {
          message.success(message);
          yield put({
            type: 'reload',
          });
        } else {
          message.error(message);
        }
      } else {
        message.error('通信异常，请稍后重试！');
      }
      if (callback) callback();
    },
    *reload(
      {
        payload: { filters },
      },
      { select, put }
    ) {
      const page = yield select(state => state.users.current);
      if (page) {
        yield put({
          type: 'fetch',
          payload: { page, filters },
        });
      }
    },
    *getDept({ payload }, { call, put }) {
      const response = yield call(usersServices.getDept);
      if (response.status) {
        yield put({
          type: 'save',
          payload: response,
        });
      }
    },
    *update(
      {
        payload: { data, filters },
        callback,
      },
      { call, put }
    ) {
      const response = yield call(usersServices.update, { data });
      if (callback) callback(response);
      yield put({
        type: 'reload',
        payload: { filters },
      });
    },
    *create(
      {
        payload: { data, filters },
        callback,
      },
      { call, put }
    ) {
      const response = yield call(usersServices.create, { data });
      if (callback) callback(response);
      yield put({
        type: 'reload',
        payload: { filters },
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
  },
};
