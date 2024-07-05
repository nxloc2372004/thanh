import React, { useEffect, useState } from 'react';
import { Badge, Space, Table, Tag } from 'antd';
import { getCostumerList, getTicketList } from '../../../Service/usersService';
import FormExcutive from './FormExcutive';
import EditAccount from '../../Admin/ManagerAccount/EditAccount';
import WatchExcutive from './WatchExcutive';

function ExcutiveTiket(){
    
        
    const [data, setData] = useState([]);
    
    const fetchApi = async () => {
        const result = await getTicketList();
        setData(result.reverse());
    }

    useEffect(() => {
        
        fetchApi();
    }, []);

    const handleReload=()=>{
        fetchApi();
    }
    const columns=[
        {
            title:'Mã phiếu',
            dataIndex:'id',
            key:'id',
        },
        {
            title:'Tiêu đề',
            dataIndex:'title',
            key:'title',
        },
        {
            title:'Ngưởi gửi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title:'Thời gian',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title:'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                return (
                    <>
                        <Badge status={record.status} text={(record.status==="default")? ("Chưa xử lí"):("Đã xử lí")} />
                        <>
                        <br></br>
                        </>
                        <Tag color={(record.isWatch==="false")?("volcano"):("")}>
                            {(record.isWatch==="false")?("Mới"):("Đã xem")}
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
                        {(record.status==="default")?(
                            <FormExcutive record={record} onReload={handleReload}/>
                        ):(<WatchExcutive record={record}/>)}
                        
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
export default ExcutiveTiket;