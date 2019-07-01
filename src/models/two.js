import { table1, addremark, deltable1 } from '@/services/two';
import { message, Button } from 'antd';
const TwoModel = {
  namespace: 'two',
  state: {
    tabledata: [],
    visible: false,
  },
  effects: {
    *efftable1({ payload }, { call, put }) {
      const { stauts, data } = yield call(table1, payload);

      if (stauts === 1) {
        yield put({
          type: 'table1',
          payload: data,
        });
      }
    },
    *aeremark({ payload }, { call, put }) {
      const { stauts, data } = yield call(addremark, payload);
      if (stauts === 1) {
        const { stauts, data } = yield call(table1, payload.params);
        if (stauts === 1) {
          yield put({
            type: 'table1',
            payload: data,
          });
        }
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
  },
  reducers: {
    table1(state, action) {
      console.log(action.payload);
      return { ...state, tabledata: action.payload };
    },
    reremark(state, action) {
      console.log(action.payload);
      return { ...state, visible: !!action.payload || false };
    },
  },
};
export default TwoModel;
