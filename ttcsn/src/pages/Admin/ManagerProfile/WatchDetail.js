import { Button, Col, Modal, Popconfirm, Row } from "antd";
import { FileSearchOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import InfocustomerDetail from "../InfoCustomerDetail";
import { getCustomerItem } from "../../../Service/usersService";
import { useEffect, useState } from "react";



function WatchDetail(props) {
    const { record, onReload } = props;
    const id = record.id;
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState([]);
    const fetchApi = async () => {
            const result = await getCustomerItem(id);
            setItem(result);
        }
    useEffect(() => {
        
        fetchApi();
    }, []);
    const handleOpen=()=>{
        setOpen(!open);
    }
    
    const handleWatchDetail =  () => {
        setOpen(true);
        fetchApi();
        console.log(item)
    }
    return (
        <>
            <Button icon={<FileSearchOutlined />} type="primary" size="small" onClick={handleWatchDetail} />
            <Modal
                title="Thông tin chi tiết"
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
                footer={null}
            >
                <div className="avatar">

                    <img src={item.image} alt="ảnh" />
                    <div className="avatar__name">
                        <div>KHÁCH HÀNG</div>
                        <div>{item.name}</div>
                    </div>
                    <div className="avatar__link">
                        <InfocustomerDetail item={item} onReload={onReload}  onOpen={handleOpen}/>
                    </div>
                </div>
                <div>Thông tin khách hàng</div>
                <Row>
                    <Col span={12}>Giói tính</Col>
                    <Col span={12}>{item.gender}</Col>
                </Row>
                <Row>
                    <Col span={12}>Nam sinh</Col>
                    <Col span={12}>{item.birth}</Col>
                </Row>
                <Row>
                    <Col span={12}>Số điện thoại</Col>
                    <Col span={12}>{item.phone}</Col>
                </Row>
                <Row>
                    <Col span={12}>Email</Col>
                    <Col span={12}>{item.email}</Col>
                </Row>
                <Row>
                    <Col span={12}>Địa chỉ</Col>
                    <Col span={12}>{item.address}</Col>
                </Row>
                <Row>
                    <Col span={12}>Căn cước công dân</Col>
                    <Col span={12}>{item.cccd}</Col>
                </Row>
                <Row>
                    <Col span={12}>Nghề nghiệp</Col>
                    <Col span={12}>{item.job}</Col>
                </Row>
                <Row>
                    <Col span={12}>Dân tộc</Col>
                    <Col span={12}>{item.religion}</Col>
                </Row>
                <Row>
                    <Col span={12}>Quê quán</Col>
                    <Col span={12}>{item.hometown}</Col>
                </Row>
                <Row>
                    <Col span={12}>Mô tả</Col>
                    <Col span={12}>{item.note}</Col>
                </Row>
            </Modal>
        </>
    )
}
export default WatchDetail;