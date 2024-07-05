import { Button, Col, Modal, Row } from "antd";
import FormCustomer from "../../../components/FormCustomer";
import { EditOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react";
import { getCookie } from "../../../helper/cookie";
import { getCostumerList } from "../../../Service/usersService";

function InfocustomerDetail(props) {
    const {item,onReload,onOpen}=props
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        //fetchApi();
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
                footer
            >
                <FormCustomer item={item} onReload={onReload} onCancel={handleCancel} onOpen={onOpen}/>
            </Modal>


        </>
    )
}
export default InfocustomerDetail;