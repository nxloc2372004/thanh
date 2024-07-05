import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { getAccountList, getProjectList } from '../../../Service/usersService';
import AddProject from './AddProject';
import WatchDetailProject from './WatchDetailProject';
import DeleteProject from './DeleteProject';

function ManagerProject() {
    const [data, setData] = useState([]);

    const fetchApi = async () => {
        const result = await getProjectList();
        setData(result);
    }

    useEffect(() => {

        fetchApi();
    }, []);

    const handleReload = () => {
        fetchApi();
    }
    const columns = [
        {
            title: 'Mã Dự Án',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên dự án',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày khởi tạo',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Nhà đầu tư',
            dataIndex: 'investor',
            key: 'investor',
        },
        {
            title:'Hành động',
            key: 'actions',
            render:(_,record)=>{
                return(
                    <>
                    <WatchDetailProject record={record} onReload={handleReload}/>
                    <> </>
                    <DeleteProject record={record} onReload={handleReload}/>
                    </>
                )
            }
        }
    ]
    return (
        <>
            <AddProject  onReload={handleReload}/>
            <Table dataSource={data} columns={columns} rowKey="id" />

        </>
    )
}
export default ManagerProject;

