import { Badge, Button, Form, Input, Table, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react";
import { createTicket, getCostumerList, getCustomerById, getTicketById, getTicketList } from "../../../Service/usersService";
import { getCookie } from "../../../helper/cookie";

import CreateTicket from "./CreateTicket";
import WatchDetailTicket from "./WatchDetailTicket";
function Ticket() {
    const idAccount = getCookie("id");
    const [data, setData] = useState([]);
    const [idcustomer,setId]=useState([]);
    const fetchApi = async () => {
                const result = await getCustomerById(idAccount);
                const result1 = await getTicketById(result[0].id);
                setId(result);
                setData(result1.reverse());
                console.log(result1)
            }
    useEffect(() => {
            
            fetchApi();

    }, []);

    const handleReload = () => {
        fetchApi();
    }
    const columns = [
        {
            title: 'Mã phiéu',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Người gửi',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (_, record) => {
                return (
                    <>
                        <Badge status={record.status} text={(record.status==="default")? ("Chưa xử lí"):("Đã xử lí")} />
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
                     <WatchDetailTicket record={record}/>
                    </>
                )
            }
        }
    ]
    return (
        <>
            <CreateTicket onReload={handleReload} item={idcustomer} />
            <Table dataSource={data} columns={columns} rowKey="id" />
        </>
    )
}
export default Ticket;