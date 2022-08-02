
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const PotrebitelTable = () => {

  const [itemsTest, setItemsTest] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8089/api/auth/potrebitel/')
      .then(res => res.json())
      .then((result) => {
        setItemsTest(result);
      },
      ).catch(err => {
        console.log(err)
      })
  }, [setItemsTest]);

  const columns = [
    {
      title: 'Улица',
      dataIndex: 'street',
      key: 'street',
    },
    {
      title: 'Номер дома',
      dataIndex: 'numberDom',
      key: 'numberDom',
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={itemsTest}
        rowKey="id"
      />
    </div>
  );
};

export default PotrebitelTable;


