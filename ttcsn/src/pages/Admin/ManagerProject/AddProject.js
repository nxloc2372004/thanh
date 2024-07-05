import { Alert, Button, DatePicker, Form, Input, Modal, Select, message } from "antd";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";
import { checkExits, createProfile, createProject, getCostumerList, register } from "../../../Service/usersService";
import { imageDb } from '../../Home/config.js';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";

function AddProject(props) {
    const { onReload } = props;
    const [open, setOpen] = useState(false);
    const [staff, setStaff] = useState([]);
    const [form] = Form.useForm();
    const [contract, setContract] = useState('');
    
    const fetchApi = async () => {
        const result = await getCostumerList();
        setStaff(result);
    }
    useEffect(() => {

        fetchApi();
    }, []);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);

    };
    const handleCancel = () => {
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
        if (contract !== undefined) {

            const imgRef = ref(imageDb, `project/${v4()}`);
            uploadBytes(imgRef, contract).then( async (value) => {
               
                getDownloadURL(value.ref).then(async (url) => {
                    values.contract = url
                    const options = {
                        ...values,
                    }
                    const response = await createProject(options);
                    if(response){
                        console.log(response)
                        onReload();
                    }
                })
            });
        }
        form.resetFields();

    }
    return (
        <>
            <Button type='primary' style={{ marginBottom: '10px' }} onClick={showModal}>+ Thêm dự án mới</Button>
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
                        label="Tên dự án"
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
                    <Form.Item label="Ngày khởi tạo" name="date"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
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
                        label="Hợp Đồng"
                        name="contract"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}
                    >
                        <div>
                            <input type="file" accept=".pdf" onChange={(e) => {

                                setContract(e.target.files[0]);

                            }} />
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="Nhà đầu tư"
                        name="investor"
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
                        name="staff"
                        label="Người phụ trách"
                        hasFeedback
                        rules={[{ required: true, message: 'Lựa chọn loại tài khoản!' }]}
                    >
                        <Select mode="multiple" placeholder="">
                            {staff.map(item => (
                                <Option value={item.id} key={item.id}>{item.name}</Option>
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
export default AddProject;