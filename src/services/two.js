import request from '@/utils/request';
export async function table1(value) {
  return request('/api/table1', { method: 'post', body: { ...value } });
}
export async function addremark(value) {
  return request('/api/addremark', { method: 'post', body: { ...value } });
}

export async function deltable1(value) {
  return request('/api/deltable1', { method: 'post', body: { ...value } });
}
export async function getdetail(value) {
  return request('/api/getdetail', { method: 'post', body: { ...value } });
}
