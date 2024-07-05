import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { getCostumerList } from '../../../Service/usersService';
import DeleteInfo from './DeleteInfo';
import WatchDetail from './WatchDetail';
import InfocustomerDetail from '../InfoCustomerDetail';
const { Column, ColumnGroup } = Table;
function ManagerProfile() {
    const [data, setData] = useState([]);
    
    const fetchApi = async () => {
        const result = await getCostumerList();
        setData(result);
    }

    useEffect(() => {
        
        fetchApi();
    }, []);

    const handleReload=()=>{
        fetchApi();
    }
    const columns=[
        {
            title:'Mã NV',
            dataIndex:'id',
            key:'id',
        },
        {
            title:'Tên',
            dataIndex:'name',
            key:'name',
        },
        {
            title:'Ngày sinh',
            dataIndex: 'birth',
            key: 'birth',
        },
        {
            title:'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title:'Hành động',
            key: 'actions',
            render:(_,record)=>{
                return(
                    <>
                    <WatchDetail record={record} onReload={handleReload}/>
                  
                    <> </>
                    <DeleteInfo record={record} onReload={handleReload}/>
                    </>
                )
            }
        }
    ]
    return (
        <>
            
           <Table dataSource={data} columns={columns} rowKey="id"/>
           
        </>
    )
}
export default ManagerProfile;