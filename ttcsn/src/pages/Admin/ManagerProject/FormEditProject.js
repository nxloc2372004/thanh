import { Button, DatePicker, Form, Input, Radio, Select, Upload, message } from "antd";
import { Option } from "antd/es/mentions";
import { createProject, editProfile, editProject, getCostumerList } from "../../../Service/usersService";
import { useEffect, useState } from "react";
import { imageDb } from '../../Home/config.js';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";
function FormEditProject(props) {
    const [form] = Form.useForm();
    const { item, onReload, onCancel } = props;
    const [staff, setStaff] = useState([]);
    const [contract, setContract] = useState('');
    const fetchApi = async () => {
        const result = await getCostumerList();
        setStaff(result);
    }
    useEffect(() => {

        fetchApi();
    }, []);
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    // console.log(item);
    const handleSubmit = async (values) => {
        if (contract !== undefined) {

            const imgRef = ref(imageDb, `project/${v4()}`);
            uploadBytes(imgRef, contract).then( async (value) => {
               
                getDownloadURL(value.ref).then(async (url) => {
                    values.contract = url
                    const options = {
                        ...values,
                    }
                    const response = await editProject(item.id,options);
                    if(response){
                        console.log(response)
                        onReload();
                        onCancel();
                    }
                })
            });
        }
        form.resetFields();

    }

    return (
        <>
            <Form name="update-user" layout="horizontal" onFinish={handleSubmit} style={{
                maxWidth: 600,
            }} {...formItemLayout} form={form} labelAlign="left" >
                <Form.Item
                    label="Tên dự án"
                    name="name"

                >
                    <Input />
                </Form.Item>
                <Form.Item label="Ngày khởi tạo" name="date"
                    
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Hợp Đồng"
                    name="contract"
                    
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
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="staff"
                    label="Người phụ trách"
                    hasFeedback
                    
                >
                    <Select mode="multiple" placeholder="">
                        {staff.map(item => (
                            <Option value={item.id} key={item.id}>{item.name}</Option>
                        ))}


                    </Select>
                </Form.Item>
                <Form.Item label=" ">
                    <Button type="primary" htmlType="submit" >
                        Xác nhận
                    </Button>
                </Form.Item>

            </Form>
        </>
    )
}
export default FormEditProject;