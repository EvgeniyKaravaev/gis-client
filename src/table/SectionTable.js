import React, { useEffect, useState } from 'react';
import { Table } from 'antd';


const SectionTable = () => {

    const [itemsTest, setItemsTest] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8089/api/auth/section/')
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
            title: 'Начало участка',
            dataIndex: 'startSection',
            key: 'startSection',
            fixed: 'left',
        },
        {
            title: 'Конец участка',
            dataIndex: 'finishSection',
            key: 'finishSection',

        },
        {
            title: 'Длина участка (км)',
            dataIndex: 'lengthSection',
            key: 'lengthSection',
            sorter: (a, b) => a.lengthSection - b.lengthSection,
        },
        {
            title: 'Износ %',
            dataIndex: 'iznosSection',
            key: 'iznosSection',
            sorter: (a, b) => a.iznosSection - b.iznosSection,
        },
        {
            title: 'Диаметр трубы',
            dataIndex: 'diameterTrub',
            key: 'diameterTrub',
            sorter: (a, b) => a.diameterTrub - b.diameterTrub,

        },
        {
            title: 'Вид теплоносителя',
            dataIndex: 'vidTeplonositel',
            key: 'vidTeplonositel',
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
        {
            title: 'Тип трубопровода',
            dataIndex: 'tipTruboprovoda',
            key: 'tipTruboprovoda',
        },
    ];

    return (
        <div>
            <h3>Информация об участках теплосети</h3>
            <Table
                columns={columns}
                dataSource={itemsTest}
                rowKey="id"
                bordered
                size="middle"
                scroll={{
                    x: 'calc(700px + 50%)',
                    y: 240,
                }}
            />
        </div>
    );
};

export default SectionTable;