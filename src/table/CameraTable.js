import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

const CameraTable = () => {

    const [itemsTest, setItemsTest] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8089/api/auth/termCamera/')
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
            title: 'Камера',
            dataIndex: 'camera',
            key: 'camera',
        },
        {
            title: 'Верхний блок ТК',
            dataIndex: 'verch_block',
            key: 'verch_block',

        },
        {
            title: 'Нижний блок ТК',
            dataIndex: 'niz_block',
            key: 'niz_block',
        },
        {
            title: 'Средний блок ТК',
            dataIndex: 'sredniy_block',
            key: 'sredniy_block',
        },
        {
            title: 'Средняя панель ТК',
            dataIndex: 'sredniy_panel',
            key: 'sredniy_panel',

        },
        {
            title: 'Дата постройки',
            dataIndex: 'dataPostroikiCamera',
            key: 'dataPostroikiCamera',
            sorter: (a, b) => a.dataPostroikiCamera - b.dataPostroikiCamera,
        },
        {
            title: 'Дата реконструкции',
            dataIndex: 'dataReconstructionCamera',
            key: 'dataReconstructionCamera',
            sorter: (a, b) => a.dataReconstructionCamera - b.dataReconstructionCamera,
        },
    ];

    return (
        <div>
            <h3>Информация об узлах теплосети</h3>
            <Table
                columns={columns}
                dataSource={itemsTest}
                rowKey="id"
                bordered
            />
        </div>
    );
};

export default CameraTable;