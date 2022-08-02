
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const BoilerTable = () => {

  const [itemsTest, setItemsTest] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8089/api/auth/boiler/')
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
      title: 'РСО',
      dataIndex: 'rso',
      key: 'rso',
    },
    {
      title: 'Вид ресурса',
      dataIndex: 'vidResourсe',
      key: 'vidResourсe',

    },
    {
      title: 'Дата постройки',
      dataIndex: 'dataPostroiki',
      key: 'dataPostroiki',
      sorter: (a, b) => a.dataPostroiki - b.dataPostroiki,
    },
    {
      title: 'Дата реконструкции',
      dataIndex: 'dataReconstruction',
      key: 'dataReconstruction',
      sorter: (a, b) => a.dataReconstruction - b.dataReconstruction,
    },
  ];

  return (
    <div>
      <h3>Информация об источниках теплосети</h3>
      <Table
        columns={columns}
        dataSource={itemsTest}
        rowKey="id"
      />
    </div>
  );
};

export default BoilerTable;


