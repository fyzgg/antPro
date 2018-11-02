import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryRoutes() {
  console.log('/api/menuData')
  return request('/api/menuData');
}
