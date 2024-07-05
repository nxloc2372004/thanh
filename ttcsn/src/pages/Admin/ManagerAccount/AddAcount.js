import { Alert, Button, Form, Input, Modal, Select, message } from "antd";
import { useState } from "react";
import { roleAccount } from "../../../helper/roleAccount";
import { Option } from "antd/es/mentions";
import { checkExits, createProfile, register } from "../../../Service/usersService";
import { generateToken } from "../../../helper/generateToken";

function AddAccount(props) {
    const { onReload } = props;
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'Tạo tài khoản thành công',
        });
      };
      const error = () => {
        messageApi.open({
          type: 'error',
          content: 'Email đã tồn tại',
        });
      };
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
        console.log(values.email)
        const checkExitsEmail = await checkExits("email", values.email);
        if (checkExitsEmail.length > 0) {
            console.log("Email da ton tai!")
            error();
        }
        else {
            const options = {
                ...values,
                token: generateToken(),
            }
            const response = await register(options);
            if (response) {
                console.log(response)
                const info = {
                    name: response.name,
                    phone: response.phone,
                    email: response.email,
                    image: "https://robohash.org/hicveldicta.png",
                    gender: "",
                    birth: "",
                    address: "",
                    cccd: "",
                    job: "",
                    religion: "",
                    hometown: "",
                    note: "",
                    accountid: response.id
                }
                const response1 = await createProfile(info);
                console.log(response1)
                onReload();
                success();
            }
            else error();
        }
        form.resetFields();

    }
    return (
        <>
            <Button type='primary' style={{ marginBottom: '10px' }} onClick={showModal}>+ Thêm tài khoản mới</Button>
            <Modal
                title="Tạo tài khoản"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={500}
                footer
            >
                <Form layout="horizontal" labelWrap colon={false} labelAlign="left" {...formItemLayout} onFinish={handleSubmit} form={form}>
                    <Form.Item
                        label="Họ tên"
                        name="name"
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
                        label="Số điện thoại"
                        name="phone"
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
                    <Form.Item
                        name="role"
                        label="Loại tài khoản"
                        hasFeedback
                        rules={[{ required: true, message: 'Lựa chọn loại tài khoản!' }]}
                    >
                        <Select placeholder="">
                            {roleAccount.map(item => (
                                <Option value={item} key={item}>{item}</Option>
                            ))}


                        </Select>
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
export default AddAccount;