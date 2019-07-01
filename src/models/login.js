import { parse, stringify } from 'qs';
import { routerRedux } from 'dva/router';
import router from 'umi/router';
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
import { queryLogin } from '@/services/user';
import { message } from 'antd';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *logout(_, { put }) {
      const { redirect } = getPageQuery(); // redirect

      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
    *login({ payload }, { call, put }) {
      console.log(11);
      const res = yield call(queryLogin, payload);
      console.log(res);
      if (res.status === 'ok') {
        setAuthority(res.currentAuthority);
        // 登录成功以后更新权限
        reloadAuthorized();
        // 跳转页面
        yield put(
          routerRedux.push({
            pathname: '/',
          }),
        );
        message.success('登录成功');
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
