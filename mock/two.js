const data = [
  {
    key: '1',
    name: `John a`,
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
    wstatus: '1',
    bz: '',
  },
  {
    key: '2',
    name: `John b`,
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
    wstatus: '2',
    bz: '',
  },
  {
    key: '3',
    name: `John b`,
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
    wstatus: '0',
    bz: '',
  },
  {
    key: '4',
    name: `John a`,
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
    wstatus: '1',
    bz: '',
  },
  {
    key: '5',
    name: `John a`,
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
    wstatus: '2',
    bz: '',
  },
  {
    key: '6',
    name: `John b`,
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
    wstatus: '2',
    bz: '',
  },
  {
    key: '7',
    name: `John b`,
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
    wstatus: '0',
    bz: '',
  },
  {
    key: '8',
    name: `John a`,
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
    wstatus: '1',
    bz: '',
  },
  {
    key: '9',
    name: `John a`,
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
    wstatus: '2',
    bz: '',
  },
];
const newdata = ({ page, age, name, wstatus }) => {
  let pagedata = data.map(item => {
    item.page = page;
    return item;
  });
  pagedata = age
    ? pagedata.filter(item => {
        return item.age === age;
      })
    : pagedata;
  pagedata = name
    ? pagedata.filter(item => {
        return item.name === name;
      })
    : pagedata;
  pagedata = wstatus
    ? pagedata.filter(item => {
        return item.wstatus === wstatus;
      })
    : pagedata;
  return pagedata;
};

export default {
  'POST /api/table1': (req, res) => {
    const { page, age, name, wstatus } = req.body;
    const ndata = newdata(req.body);
    setTimeout(() => {
      res.send({
        stauts: 1,
        msg: 'ok',
        data: {
          page: page,
          size: 10,
          total: 1000,
          stauts: wstatus,
          data: newdata(req.body),
        },
      });
    }, 500);
  },
  'POST /api/addremark': (req, res) => {
    const { remark, key, params } = req.body;
    const ndata = newdata(params);
    let newdata1 = ndata.map(item => {
      if (item.key === key) {
        item.bz = remark;
      }
      return item;
    });
    setTimeout(() => {
      res.send({
        stauts: 1,
        msg: 'ok',
        data: newdata1,
      });
    }, 2000);
  },
  'POST /api/deltable1': (req, res) => {
    const { key, params } = req.body;
    const ndata = newdata(params);
    let newdata1 = ndata.filter(item => {
      return item.key !== key;
    });
    setTimeout(() => {
      res.send({
        stauts: 1,
        msg: 'ok',
        data: {
          page: params.page,
          size: 10,
          total: 1000,
          stauts: params.wstatus,
          data: newdata1,
        },
      });
    }, 500);
  },
  'POST /api/getdetail': (req, res) => {
    const { key } = req.body;
    let newdata1 = data.filter(item => {
      return item.key === key;
    });
    setTimeout(() => {
      res.send({
        stauts: 1,
        msg: 'ok',
        data: newdata1[0],
      });
    }, 2000);
  },
};
