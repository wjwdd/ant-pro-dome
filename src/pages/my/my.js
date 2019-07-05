import React, { useState } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Row, Col, Card, Avatar, Tag } from 'antd';
import styles from './my.less';
import List from './List';
const tabListNoTitle = [
  {
    key: 'article',
    tab: 'article',
  },
  {
    key: 'app',
    tab: 'app',
  },
  {
    key: 'project',
    tab: 'project',
  },
];


const Mine = props => {
  const [noTitleKey, setnoTitleKey] = useState('app');
  const { myinfor, currentUser } = props;
  const onTabChange = key => {
    console.log(key);
    setnoTitleKey(key);
  };
  return (
    <PageHeaderWrapper>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false}>
            <div className={styles.top}>
              <Avatar src={currentUser.avatar} size="large"></Avatar>
              <div>{currentUser.name}</div>
            </div>
            <div>
              <h1>标签</h1>
              <div>
                <Tag color="magenta">magenta</Tag>
                <Tag color="red">red</Tag>
                <Tag color="volcano">volcano</Tag>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            style={{ width: '100%' }}
            tabList={tabListNoTitle}
            activeTabKey={noTitleKey}
            onTabChange={key => {
              onTabChange(key);
            }}
          >
            <List noTitleKey={noTitleKey}></List>
          </Card>
        </Col>
      </Row>
    </PageHeaderWrapper>
  );
};
const mapStateToProps = ({ my, user }) => {
  console.log(user);
  return {
    myinfor: my.myinfo,
    currentUser: user.currentUser,
  };
};
export default connect(mapStateToProps)(Mine);
