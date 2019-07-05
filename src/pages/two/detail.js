import React, { useState } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Form, Icon, Input, Button, Skeleton, Spin, Card } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
const CreatFrom = Form.create()(props => {
  const { form } = props;
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      console.log(values);
    });
  };
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
  const usernameError = isFieldTouched('username') && getFieldError('username');
  return (
    <Form layout="vertical" onSubmit={handleSubmit}>
      <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
});
const Detail = props => {
  const {
    location: {
      query: { key },
    },
    dispatch,
    detaildata: { name, age, address },
    loading,
  } = props;
  console.log({ key });
  useState(() => {
    if (dispatch) {
      dispatch({
        type: 'two/getdetail',
        payload: { key },
      });
    }
  });
  return (
    <div>
      <PageHeaderWrapper>
        <Card>
          <Skeleton loading={loading} active={true}>
            <div>{name}</div>
            <div>{age}</div>
            <div>{address}</div>

            <CreatFrom></CreatFrom>
          </Skeleton>
        </Card>
      </PageHeaderWrapper>
    </div>
  );
};
const mapStateToProps = ({ two, loading }) => {
  return {
    detaildata: two.detail,
    loading: loading.effects['two/getdetail'],
  };
};
export default connect(mapStateToProps)(Detail);
