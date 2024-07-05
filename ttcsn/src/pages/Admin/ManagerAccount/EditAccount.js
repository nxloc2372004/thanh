import { Button, Form, Input, Modal } from "antd";
import { FileSearchOutlined } from "@ant-design/icons"
import { useState } from "react";
import { editAccount, editProfile } from "../../../Service/usersService";

function EditAccount(props) {
    const { record,onReload } = props;
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);


    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const formItemLayout = {
        labelCol: {
            flex: '100px'
        },
        wrapperCol: {
            flex: '300px'
        },

    };
    const handleSubmit = async (values) => {
        const response = await editAccount(record.id, values)
        console.log(response);
        if (response) {
            onReload();
        }

    }
    return (
        <>
            <Button icon={<FileSearchOutlined />} type="primary" size="small" onClick={showModal} />
            <Modal
                title="Cập nhật tài khoản"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={500}
                footer
            >
                <Form layout="horizontal" labelWrap colon={false} labelAlign="left" {...formItemLayout} onFinish={handleSubmit}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label=" ">
                    <Button type="primary" htmlType="submit" onClick={handleCancel} >
                        Xác nhận
                    </Button>
                </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default EditAccount;