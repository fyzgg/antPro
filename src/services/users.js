import request from '@/utils/request';

export async function fecth({ page, filters }) {
  return request(`/api/users`, {
    method: 'POST',
    body: { page, ...filters },
  });
}
export async function removeByBatch({ ids }) {
  return request(`/api/users/removeByBatch`, {
    method: 'POST',
    body: { ids },
  });
}
export async function remove({ id }) {
  return request(`/api/users/remove`, {
    method: 'POST',
    body: { id },
  });
}
export async function getDept() {
  return request(`/api/getDept`);
}
export async function create({ data }) {
  return request(`/api/users/create`, {
    method: 'POST',
    body: { ...data },
  });
}
export async function update({ data }) {
  console.log({ data });
  return request(`/api/users/update`, {
    method: 'POST',
    body: { ...data },
  });
}
