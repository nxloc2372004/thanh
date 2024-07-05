import { Button, Col, Row, Modal } from "antd";
import React, { useEffect, useState } from 'react';
import { getCostumerList } from "../../../Service/usersService";
import { getCookie } from "../../../helper/cookie";
import { EditOutlined } from "@ant-design/icons"
import "./profile.scss"
import FormCustomer from "../../../components/FormCustomer";

function Profile() {
    const idAccount = getCookie("id");
    const [info, setInfo] = useState([]);
    let item;
    const fetchApi = async () => {
            const result = await getCostumerList();
            setInfo(result);
        }
    useEffect(() => {
        
        fetchApi();
    }, [])

    function infoItem() {
        for (let i = 0; i < info.length; i++) {

            if (info[i].accountid == idAccount) {
                console.log(info[i]);
                item = info[i];

            }

        }
    }
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        fetchApi();
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    return (
        <>
            {infoItem()}
            {
                item && (<>
                    <div className="avatar">

                        <img src={item.image} alt="ảnh" />
                        <div className="avatar__name">
                            <div>KHÁCH HÀNG</div>
                            <div>{item.name}</div>
                        </div>
                        <div className="avatar__link">
                            <Button type="link" onClick={showModal}>
                                <EditOutlined />
                                Sửa thông tin hồ sơ
                            </Button>
                            <Modal
                                title="Sửa thông tin hồ sơ"
                                open={open}
                                onOk={handleOk}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                            >
                                <FormCustomer item={item}/>
                            </Modal>
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

                </>)
            }

        </>
    )
}
export default Profile;