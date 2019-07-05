import React, { Component, useState } from 'react';
import {
  Table,
  Divider,
  Tag,
  Input,
  Button,
  InputNumber,
  Modal,
  Form,
  Icon,
  Popconfirm,
  Card,
} from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
const { Search } = Input;

import { Tabs } from 'antd';

const { TabPane } = Tabs;

const Froms = Form.create()(props => {
  const { modelShow, form, handleModalVisible, editvalue } = props;
  useState();
  console.log(111);
  const fromsOk = e => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      editvalue(fieldsValue);
      handleModalVisible(false);
    });
  };
  const cancel = () => {
    handleModalVisible();
  };
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
  const usernameError = isFieldTouched('username') && getFieldError('username');
  const ageError = isFieldTouched('age') && getFieldError('age');
  return (
    <Modal title="Basic Modal" visible={modelShow} onOk={fromsOk} onCancel={cancel}>
      <Form.Item validateStatus={usernameError ? 'error' : 'success'} help={usernameError || ''}>
        {getFieldDecorator('username', {
          rules: [
            { required: true, message: 'Please input your username!' },
            { max: 10, message: '10!' },
          ],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item validateStatus={ageError ? 'error' : ''} help={ageError || ''}>
        {getFieldDecorator('age', {
          rules: [{ required: true, message: 'Please input your age!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="age"
          />,
        )}
      </Form.Item>
    </Modal>
  );
});
class Twoau extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      search: {},
      activekey: '0',
      bzvalue: '',
      confirmLoading: false,
      currentData: null,
      selectedRowKeys: [],
      modelShow: false,
      columns: [
        {
          title: 'NUM',
          dataIndex: 'key',
          key: 'key',
          render: text => <a href="javascript:;">{text}</a>,
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          filters: [
            {
              text: 'Joe',
              value: 'Joe',
            },
            {
              text: 'Jim',
              value: 'Jim',
            },
            {
              text: 'Submenu',
              value: 'Submenu',
              children: [
                {
                  text: 'Green',
                  value: 'Green',
                },
                {
                  text: 'Black',
                  value: 'Black',
                },
              ],
            },
          ],
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          onFilter: (value, record) => record.name.indexOf(value) === 0,
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['ascend', 'descend'],
          render: text => <a href="javascript:;">{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <span>
              {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </span>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button type="primary" onClick={this.onEdit.bind(this, record.key)}>
                编辑 {record.name}
              </Button>
              <Divider type="vertical" />

              <Popconfirm
                title="Are you sure delete this task?"
                onConfirm={() => this.onDel(record)}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger">Delete</Button>
              </Popconfirm>
              <Divider type="vertical" />
              <Button type="danger" onClick={this.onbeizhu.bind(this, record)}>
                备注
              </Button>
              <Divider type="vertical" />
              <Button type="primary" onClick={this.onxiugai.bind(this, record)}>
                修改
              </Button>
            </span>
          ),
        },
        {
          title: 'Des',
          key: 'des',
          render: (text, record) => (
            <div>
              <span>des:</span>
              <div>wstatus: {record.wstatus}</div>
              <div>age: {record.age}</div>
              <div>name: {record.name}</div>
              <div>page: {record.page}</div>
            </div>
          ),
        },
        {
          title: '备注',
          dataIndex: 'bz',
          key: 'bz',
          render: (text, record) => <div>{text}</div>,
        },
      ],
    };
    this.handleModalVisible = this.handleModalVisible.bind(this);
    this.editvalue = this.editvalue.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // 父组件重传props时就会调用这个方法
    if (!nextProps.visible) {
      this.setState({ bzvalue: '' });
    }
  }
  onEdit(key, e) {
    console.log(key);
    const path = {
      pathname: '/two/apply/detail',
      query: { key },
    };
    router.push(path);
  }
  onxiugai(record, e) {
    this.setState({
      currentData: record,
    });
    this.handleModalVisible(true);
  }
  onbeizhu(record, e) {
    this.setState({
      currentData: record,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'two/reremark',
      payload: true,
    });
  }
  onDel(record, e) {
    const { dispatch } = this.props;
    const { currentData, search, activekey, pageNumber } = this.state;
    const params = { page: pageNumber, ...search, wstatus: activekey };

    dispatch({
      type: 'two/deltable1',
      payload: { key: record.key, params: { ...params } },
    });
  }
  componentWillMount() {
    this.setState(
      {
        pageNumber: 1,
      },
      this.initData(),
    );
  }
  initData = () => {
    const { dispatch } = this.props;
    const { search, activekey, pageNumber } = this.state;

    dispatch({
      type: 'two/efftable1',
      payload: { page: pageNumber, ...search, wstatus: activekey },
    });
  };
  onChange = pageNumber => {
    console.log(pageNumber);
    this.setState(
      {
        pageNumber: pageNumber,
      },
      this.initData,
    );
  };
  onChangeName = e => {
    const { value } = e.target;
    this.setState({
      search: {
        ...this.state.search,
        name: value ? value : null,
      },
    });
  };
  onChangeAge = value => {
    this.setState({
      search: {
        ...this.state.search,
        age: value,
      },
    });
  };

  onSearch = () => {
    this.initData();
  };
  changeTab = key => {
    this.setState(
      {
        activekey: key,
      },
      this.initData,
    );
  };
  handleOk() {
    const { dispatch } = this.props;
    const { currentData, bzvalue, search, activekey, pageNumber } = this.state;
    const params = { page: pageNumber, ...search, wstatus: activekey };

    dispatch({
      type: 'two/aeremark',
      payload: { key: currentData.key, remark: bzvalue, params: { ...params } },
    });
  }
  colseModel() {
    const { dispatch } = this.props;
    dispatch({
      type: 'two/reremark',
      payload: false,
    });
  }
  handleCancel() {
    this.colseModel();
  }
  onCBeizhu(e) {
    const { value } = e.target;
    this.setState({
      bzvalue: value,
    });
  }
  initBzvalue() {
    this.setState({
      bzvalue: '',
    });
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  handleModalVisible(flag) {
    this.setState({
      modelShow: !!flag,
    });
  }
  editvalue(value) {
    console.log(value);
    const { currentData } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'two/edittable1',
      payload: { ...currentData, ...value },
    });
  }
  render() {
    const { tabledata, total, size, location, loading, visible, modelloading } = this.props;
    const pagination = {
      defaultCurrent: 1,
      pageSize: size,
      total: total,
      onChange: this.onChange,
    };
    const tablists = [
      {
        key: '0',
        name: 'tab1',
      },
      {
        key: '1',
        name: 'tab2',
      },
      {
        key: '2',
        name: 'tab3',
      },
    ];

    const { activekey, columns, confirmLoading, selectedRowKeys, bzvalue, modelShow } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const fromstion = {
      handleModalVisible: this.handleModalVisible,
      editvalue: this.editvalue,
    };
    return (
      <PageHeaderWrapper title="adminuser" tabActiveKey={location.pathname} content="adminuser">
        <Card>
          <Input placeholder="name" onChange={this.onChangeName} />
          <InputNumber size="large" min={1} max={100000} onChange={this.onChangeAge} />
          <Button type="primary" onClick={this.onSearch.bind(this)}>
            搜索
          </Button>
          <Tabs defaultActiveKey={activekey} onChange={this.changeTab}>
            {tablists.map(item => {
              return <TabPane tab={item.name} key={item.key}></TabPane>;
            })}
          </Tabs>

          <Table
            rowSelection={rowSelection}
            loading={loading}
            columns={columns}
            dataSource={tabledata}
            pagination={pagination}
          />
        </Card>

        {/* 备注 */}
        <Modal
          title="备注"
          visible={visible}
          onOk={this.handleOk.bind(this)}
          confirmLoading={modelloading}
          onCancel={this.handleCancel.bind(this)}
        >
          <Input placeholder="备注" value={bzvalue} onChange={this.onCBeizhu.bind(this)} />
        </Modal>
        <Froms {...fromstion} modelShow={modelShow}></Froms>
      </PageHeaderWrapper>
    );
  }
}
const mapStateToProps = ({ two, loading }) => {
  return {
    visible: two.visible,
    tabledata: two.tabledata.data,
    total: two.tabledata.total,
    size: two.tabledata.size,
    loading: loading.effects['two/efftable1'],
    modelloading: loading.effects['two/aeremark'],
  };
};
export default connect(mapStateToProps)(Twoau);
