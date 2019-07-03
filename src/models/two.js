import { table1, addremark, deltable1, getdetail } from '@/services/two';
import { message, Button } from 'antd';
const TwoModel = {
  namespace: 'two',
  state: {
    tabledata: [],
    visible: false,
    detail: {},
  },
  effects: {
    *getdetail({ payload }, { call, put }) {
      const { stauts, data } = yield call(getdetail, payload);
      if (stauts === 1) {
        yield put({
          type: 'acdetail',
          payload: data,
        });
      }
    },
    *efftable1({ payload }, { call, put }) {
      const { stauts, data } = yield call(table1, payload);

      if (stauts === 1) {
        yield put({
          type: 'table1',
          payload: data,
        });
      }
    },
    *aeremark({ payload }, { call, put, select }) {
      const tabledata = yield select(state => state.two.tabledata);
      console.log(tabledata);
      const { stauts, data } = yield call(addremark, payload);
      if (stauts === 1) {
        // const { stauts, data } = yield call(table1, payload.params);
        // if (stauts === 1) {
        //   yield put({
        //     type: 'table1',
        //     payload: data,
        //   });
        // }
        let newdata = tabledata;
        newdata.data = newdata.data.map(item => {
          item.bz = item.key === payload.key ? payload.remark : item.bz;
          return item;
        });
        yield put({
          type: 'table1',
          payload: newdata,
        });
        yield put({
          type: 'reremark',
          payload: false,
        });

        message.success('添加成功');
      } else {
        message.error('修改失败，请重试');
      }
    },
    *deltable1({ payload }, { call, put }) {
      const { stauts, data } = yield call(deltable1, payload);
      if (stauts === 1) {
        yield put({
          type: 'table1',
          payload: data,
        });

        message.success('删除成功');
      } else {
        message.error('删除失败，请重试');
      }
    },
    *edittable1({ payload }, { call, put, select }) {
      console.log(payload);
      const tabledata = yield select(state => state.two.tabledata);
      const { key, username, age } = payload;
      let newdata = tabledata;
      newdata.data = newdata.data.map(item => {
        item.name = item.key === key ? username : item.name;
        item.age = item.key === key ? age : item.age;
        return item;
      });
      yield put({
        type: 'table1',
        payload: newdata,
      });
      message.success('修改成功');
    },
  },
  reducers: {
    table1(state, action) {
      return { ...state, tabledata: action.payload };
    },
    acdetail(state, action) {
      return { ...state, detail: action.payload };
    },
    reremark(state, action) {
      return { ...state, visible: !!action.payload || false };
    },
  },
};
export default TwoModel;
