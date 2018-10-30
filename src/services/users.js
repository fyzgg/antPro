import requist from '@/utils/request';

export async function fecth({ page, filters }) {
  return requist(`/api/users`, {
    method: 'POST',
    body: { page, ...filters },
  });
}
export async function removeByBatch({ ids }) {
  return requist(`/api/users/removeByBatch`, {
    method: 'POST',
    body: { ids },
  });
}
export async function remove({ id }) {
  return requist(`/api/users/remove`, {
    method: 'POST',
    body: { id },
  });
}
export async function getDept() {
  return requist(`/api/getDept`);
}
export async function create({ data }) {
  return requist(`/api/users/create`, {
    method: 'POST',
    body: { ...data },
  });
}
export async function update({ data }) {
  console.log({ data });
  return requist(`/api/users/update`, {
    method: 'POST',
    body: { ...data },
  });
}
