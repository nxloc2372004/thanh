import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { getAccountList, getCustomerById, getProjectList } from '../../../Service/usersService';
import WatchDetailProject from './WatchDetailProject';
import { getCookie } from '../../../helper/cookie';
import UpdateProject from './UpdateProject';


function ListProject() {
    const idAccount = getCookie("id");
    //const [data, setData] = useState([]);
    const [staff, setStaff] = useState();
    const [listProject, setListProject] = useState([]);
    const data = [];
    const fetchApi = async () => {
        const result = await getProjectList();
        const staff = await getCustomerById(idAccount);
        setListProject(result);
        setStaff(staff);
    }
    useEffect(() => {
        fetchApi();
    }, []);
    if (staff!=undefined){
        console.log(staff[0].id);
    }
    const listStaff = () => {
        
        for (let i = 0; i < listProject.length; i++) {
            const id =[].concat(listProject[i].staff);
            for (let j = 0; j < id.length; j++) {
               if(staff[0].id===id[j])
               data.push(listProject[i]);
            }
            
        }
        
    }
    listStaff();


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
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => {
                return (
                    <>
                        <WatchDetailProject record={record} onReload={handleReload} />
                        <> </>
                        <UpdateProject record={record} onReload={handleReload} />
                    </>
                )
            }
        }
    ]
    return (
        <>

            <Table dataSource={data} columns={columns} rowKey="id" />

        </>
    )
}
export default ListProject;

