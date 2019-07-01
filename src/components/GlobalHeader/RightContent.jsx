import { Icon, Tooltip } from 'antd';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import React from 'react';
import SelectLang from '../SelectLang';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './index.less';
import { FormattedMessage } from "umi/locale";

const GlobalHeaderRight = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }
  const  onLogout=()=>{
    const { dispatch } = props;
    dispatch({
      type: 'login/logout',
    });
  }
  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder={formatMessage({
          id: 'component.globalHeader.search',
        })}
        dataSource={[
          formatMessage({
            id: 'component.globalHeader.search.example1',
          }),
          formatMessage({
            id: 'component.globalHeader.search.example2',
          }),
          formatMessage({
            id: 'component.globalHeader.search.example3',
          }),
        ]}
        onSearch={value => {
          console.log('input', value);
        }}
        onPressEnter={value => {
          console.log('enter', value);
        }}
      />
      <Tooltip
        title={formatMessage({
          id: 'component.globalHeader.help',
        })}
      >
        <a
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <Icon type="question-circle-o" />
        </a>
      </Tooltip>
      <Avatar />
      <SelectLang className={styles.action} />
      <span
        className={`${styles.action} ${styles.account}`}
        onClick={() => onLogout()}
      >
        <Icon
          type="poweroff"
          style={{ right: 5, position: "relative" }}
        />
        <FormattedMessage
          id="menu.account.logout"
          defaultMessage="logout"
        />
      </span>
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
