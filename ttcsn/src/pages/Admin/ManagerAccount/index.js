import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { getAccountList } from '../../../Service/usersService';
import DeleteAccount from './DeleteAccount';
import EditAccount from './EditAccount';
import AddAccount from './AddAcount';
function ManagerAccount() {
    const [data, setData] = useState([]);

    const fetchApi = async () => {
        const result = await getAccountList();
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
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'Vai trò',
            key: 'role',
            dataIndex: 'role',
            render: (_, record) => {
                return (
                    <>
                        <Tag color={(record.role==="admin")?("volcano"):(record.role==="staff"?("blue"):(""))}>
                            {record.role}
                        </Tag>
                    </>
                )
            }
        },
        {
            title:'Hành động',
            key: 'actions',
            render:(_,record)=>{
                return(
                    <>
                    <EditAccount record={record} onReload={handleReload}/>
                    <> </>
                    <DeleteAccount record={record} onReload={handleReload}/>
                    </>
                )
            }
        }
    ]
    return (
        <>
            <AddAccount  onReload={handleReload}/>
            <Table dataSource={data} columns={columns} rowKey="id" />

        </>
    )
}
export default ManagerAccount;