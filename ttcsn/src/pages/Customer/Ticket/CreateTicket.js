import { Alert, Button, Form, Input, Modal, Select, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { checkEmail, checkExits, createTicket, getAccountList, getCostumerList, register } from "../../../Service/usersService";

import { UploadOutlined } from "@ant-design/icons"

import { imageDb } from '../../Home/config';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";

function CreateTicket(props) {
    const { onReload, item } = props;
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [data, setData] = useState([]);

    const [img, setImg] = useState('');
    const [mp4, setMp4] = useState('');
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCostumerList();
            setData(result);
        }
        fetchApi();
    }, []);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);


    };
    const handleCancel = () => {
        setImg('');
        setMp4('');
        setOpen(false);
    };
    var curDate = new Date();
    const formItemLayout = {
        labelCol: {
            flex: '110px'
        },
        wrapperCol: {
            flex: '400px'
        },

    };
    const handleSubmit = async (values) => {
        let data = {};
        if ((values.image !== undefined) && (values.video !== undefined)) {

            const imgRef = ref(imageDb, `files/${v4()}`);
            const mp4Ref = ref(imageDb, `videos/${v4()}`);
            uploadBytes(imgRef, img).then(async (value) => {
                getDownloadURL(value.ref).then(async (url) => {
                    values.image = url;
                    uploadBytes(mp4Ref, mp4).then(async (value1) => {
                        getDownloadURL(value1.ref).then(async (url1) => {
                            values.video = url1;
                            data = {
                                ...values,
                                "idcustomer": item[0].id,
                                "time": curDate,
                                "name": item[0].name,
                                "email": item[0].email,
                                "response": "",
                                "status": "default",
                                "isWatch": "false"
                            }
                            const response = await createTicket(data);
                            if (response) {
                                console.log(response)
                                form.resetFields();
                                onReload();
                                handleCancel();
                                
                            }
                        })
                    });

                })
            });
        }else if(values.image !== undefined){
            const imgRef = ref(imageDb, `files/${v4()}`);
            uploadBytes(imgRef, img).then(async (value) => {
                getDownloadURL(value.ref).then(async (url) => {
                    values.image = url;
                    data = {
                        ...values,
                        "idcustomer": item[0].id,
                        "time": curDate,
                        "name": item[0].name,
                        "email": item[0].email,
                        "response": "",
                        "status": "default",
                        "isWatch": "false"
                    }
                    const response = await createTicket(data);
                    if (response) {
                        console.log(response)
                        form.resetFields();
                        onReload();
                        handleCancel();
                        
                    }

                })
            });
        }
        else if(values.video !== undefined){
            const mp4Ref = ref(imageDb, `videos/${v4()}`);
            uploadBytes(mp4Ref, mp4).then(async (value1) => {
                getDownloadURL(value1.ref).then(async (url1) => {
                    values.video = url1;
                    data = {
                        ...values,
                        "idcustomer": item[0].id,
                        "time": curDate,
                        "name": item[0].name,
                        "email": item[0].email,
                        "response": "",
                        "status": "default",
                        "isWatch": "false"
                    }
                    const response = await createTicket(data);
                    if (response) {
                        console.log(response)
                        form.resetFields();
                        onReload();
                        handleCancel();
                        
                    }
                })
            });
        }
        else {
            data = {
                ...values,
                "idcustomer": item[0].id,
                "time": curDate,
                "name": item[0].name,
                "email": item[0].email,
                "response": "",
                "status": "default",
                "isWatch": "false"
            }
            const response = await createTicket(data);
            if (response) {
                console.log(response)
                form.resetFields();
                onReload();
                handleCancel();
                
            }
        }
    }
    return (
        <>
            <Button type='primary' style={{ marginBottom: '10px' }} onClick={showModal}>+ Thêm yêu cầu hỗ trợ</Button>
            <Modal
                title="Điền yêu cầu hỗ trợ"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={500}
                footer
            >
                <Form name="create-ticket" layout="horizontal" onFinish={handleSubmit} {...formItemLayout} labelWrap colon={false} labelAlign="left" form={form}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
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
                        name="description"
                        label="Nội dung"
                        rules={[
                            {
                                required: true,
                                message: 'Bắt buộc!',
                            },
                        ]}
                    >
                        <Input.TextArea showCount maxLength={999999} rows={10} />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Ảnh"
                    >

                        <div>
                            <input type="file" accept=".jpg, .png" onChange={(e) => {
                                
                                    setImg(e.target.files[0]);
                                
                            }} />
                        </div>
                    </Form.Item>
                    <Form.Item
                        name="video"
                        label="Video"
                    >
                        <div>
                            <input type="file" accept=".mp4" onChange={(e) => {

                                setMp4(e.target.files[0]);
                                
                            }} />
                        </div>
                    </Form.Item>
                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit" >
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default CreateTicket;