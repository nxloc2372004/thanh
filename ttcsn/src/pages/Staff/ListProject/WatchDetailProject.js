import { Button, Col, Descriptions, Modal, Popconfirm, Row } from "antd";
import { FileSearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import { getCostumerList, getCustomerItem, getProjectItem } from "../../../Service/usersService";
import { useEffect, useState } from "react";

function WatchDetailProject(props) {
    const { record, onReload } = props;
    const id = record.id;
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState([]);
    const [infoStaff, setInfo] = useState([]);
    const fetchApi = async () => {
        const result = await getProjectItem(id);
        const res2 = await getCostumerList();
        setItem(result);
        setInfo(res2);
    }
    useEffect(() => {

        fetchApi();
    }, []);
    const handleOpen = () => {
        setOpen(!open);
    }

    const handleWatchDetail = () => {
        setOpen(true);
        fetchApi();
        console.log(item)
    }

    const listStaff = () => {
        const id = [].concat(item.staff)
        const elements = [];
        for (let i = 0; i < id.length; i++) {
            for (let j = 0; j < infoStaff.length; j++) {
                if (id[i] === infoStaff[j].id)
                    elements.push(<div key={infoStaff[j].id}>{infoStaff[j].name}</div>);
            }


        }
        return <>{elements}</>;
    }
    const items = [
        {
            key: '1',
            label: 'Mã dự án',
            children: item.id,
        },
        {
            key: '2',
            label: 'Tên dự án',
            children: item.name,
        },
        {
            key: '3',
            label: 'Ngầy khởi tạo',
            children: item.date,
        },
        {
            key: '4',
            label: 'Mô tả',
            children: item.description,
            span: 3
        },
        {
            key: '5',
            label: 'Hợp đồng',
            children: (<>
                <div>
                    <a href={item.contract} style={{ color: 'blue' }}>Hợp đồng dự án {item.name}.pdf</a>
                </div>
            </>),
            span: 2
        },
        {
            key: '6',
            label: 'Nhà đầu tư',
            children: item.investor,
            span: 2
        },
        {
            key: '7',
            label: 'Người phụ trách',
            children: (
                listStaff()
            ),

        },
    ]
    return (
        <>
            <Button icon={<FileSearchOutlined />} type="primary" size="small" onClick={handleWatchDetail} />
            <Modal
                title="Chi tiết dự án"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={null}
            >
                <div>
                    <Descriptions layout="vertical" bordered items={items} />
                </div>

            </Modal>
        </>
    )
}
export default WatchDetailProject;