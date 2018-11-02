import { query as queryUsers, queryCurrent, queryRoutes } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    routes:[]
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchRoutes({ payload },{ call, put }){
      const response = yield call(queryRoutes);
      yield put({
        type:'saveMenuData',
        payload: response.data
      })
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
    saveMenuData(state,action){
      console.log(
        {
        ...state,
        routes:action.payload || {}
      })
      return {
        ...state,
        routes:action.payload || {}
      }
    }
  },
};
