import { Button, Form, Input, Modal, Upload } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons"
import { createTicket, responseTicket } from "../../../Service/usersService";
import { getCookie } from "../../../helper/cookie";
import { imageDb } from '../../Home/config';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";
function FormExcutive(props) {
    const email = getCookie("email");
    const [form] = Form.useForm();
    const { record, onReload } = props;
    const [open, setOpen] = useState(false);
    const [img, setImg] = useState('');
    const [mp4, setMp4] = useState('');
    const showModal = async () => {
        setOpen(true);
        const data = {
            ...record,
            isWatch: "true"
        }
        const response = await responseTicket(record.id, data);
        onReload();
    };
    const handleOk = () => {
        setOpen(false);


    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
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
                                ...record,
                                response: {
                                    ...values,
                                    time: curDate,
                                    email: email
                                },
                                status: "success",
                                isWatch: "true"
                    
                            }
                            const response = await responseTicket(record.id, data);
                            if (response) {
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
                        ...record,
                        response: {
                            ...values,
                            time: curDate,
                            email: email
                        },
                        status: "success",
                        isWatch: "true"
            
                    }
                    const response = await responseTicket(record.id, data);
                    if (response) {
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
                        ...record,
                        response: {
                            ...values,
                            time: curDate,
                            email: email
                        },
                        status: "success",
                        isWatch: "true"
            
                    }
                    const response = await responseTicket(record.id, data);
                    if (response) {
                        form.resetFields();
                        onReload();
                        handleCancel();
                    }
                })
            });
        }
        else {
            data = {
                ...record,
                response: {
                    ...values,
                    time: curDate,
                    email: email
                },
                status: "success",
                isWatch: "true"
    
            }
            const response = await responseTicket(record.id, data);
            if (response) {
                form.resetFields();
                onReload();
                handleCancel();
            }
        }

    }
    return (
        <>
            <Button type="link" onClick={showModal} >Xử lí phiếu ghi</Button>
            <Modal
                title="Xử lí phiếu ghi"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
                footer
            >
                <div className="header-form">
                    <h2 className="header-form__title">{record.title}</h2>
                    <span>{record.name}</span><span>{record.time}</span>
                    <div>{record.email}</div>
                </div>
                <div className=" main-from">
                    <p>{record.description}</p>
                    {(record.image !== undefined) ? (<img src={record.image} style={{ width: "150px" }}></img>) : (<p></p>)

                    }
                    {(record.video !== undefined) ? (<video src={record.video} controls style={{ width: "300px" }}></video>) : (<p></p>)

                    }
                </div>
                <div className="reponse">
                    <p>Phản hồi</p>
                </div>
                <div className="input">
                    <Form name="create-ticket" layout="horizontal" onFinish={handleSubmit} {...formItemLayout} labelWrap colon={false} labelAlign="left"
                        autoComplete="off" form={form}
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
                </div>
            </Modal>
        </>
    )

}
export default FormExcutive;