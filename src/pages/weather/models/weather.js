import { getWeather } from '@/services/weather';

export default{
  namespace:'weather',
  state:{
    weatherinfo:{}
  },
  effects:{
    *fetch({payload:{city}},{call,put}){
      const { weatherinfo } = yield call(getWeather,{city});
      console.log('757575')
      if (response) {
        yield put({
          type:'save',
          payload:{ weatherinfo }
        })
      }
    }
  },
  reducers:{
    save({payload:{ weatherinfo }}){
      return { weatherinfo };
    }
  }
}