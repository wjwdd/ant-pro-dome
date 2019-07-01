import React, { Component } from 'react';
import { TagCloud } from 'ant-design-pro/lib/Charts';

const tags = [];
for (let i = 0; i < 100; i += 1) {
  tags.push({
    name: `TagClout-Title-${i}`,
    value: Math.floor(Math.random() * 50) + 20,
  });
}
class IndexPage extends Component {
  state = {};

  render() {
    return (
      <TagCloud data={tags} height={500} />
    );
  }
}

export default IndexPage;
