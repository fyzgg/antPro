import request from '@/utils/request';

export async function getWeather({city}) {
  return request(`http://www.weather.com.cn/data/sk/${city}.html`,{
    mode: 'no-cors',
    headers:{
      "Content-Type": "text/html;charset=UTF-8",
    }
  });
}