import { Button, Col, Descriptions, Form, Input, Modal, Popconfirm, Row } from "antd";
import { FileSearchOutlined, EditOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import { createUpdateProject, getCostumerList, getCustomerById, getCustomerItem, getProjectItem, getUpdateProject } from "../../../Service/usersService";
import { useEffect, useState } from "react";
import { getCookie } from "../../../helper/cookie";

function UpdateProject(props) {
    const idAccount = getCookie("id");
    const { record, onReload } = props;
    const [form] = Form.useForm();
    const [infoStaff, setInfo] = useState();
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState([]);
    const fetchApi = async () => {
        const result = await getUpdateProject(record.id);
        const res2 = await getCustomerById(idAccount);
        setItem(result);
        setInfo(res2);
    }
    useEffect(() => {

        fetchApi();
    }, []);
   
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 12,
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
    const handleOpen = () => {
        setOpen(!open);
    }

    const handleUpdate = () => {
        setOpen(true);
        fetchApi();

    }
    var curDate = new Date();
    const handleSubmit = async (values) => {
        
        const option = {
            ...values,
            name: infoStaff[0].name,
            time:curDate,
            idproject:record.id
        }
        const reponse=await createUpdateProject(option);

        console.log(reponse)
        form.resetFields();
        fetchApi();
    }

    return (
        <>
            <Button icon={<EditOutlined />} type="primary" size="small" onClick={handleUpdate} />

            <Modal
                title="Cập nhật tiến độ "
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={600}
                footer={null}
            >
                <div>
                    <p style={{ fontStyle: "normal" }}>Lịch sử cập nhật</p>
                </div>
                {item.map(i => (
                    <>
                        <div style={{fontWeight: 600}}>{i.name}</div>
                        <div style={{color: "#808080"}}>{i.time}</div>
                        <div style={{marginTop: 5,marginBottom:10}}>{i.description}</div>
                        
                    </>

                ))}
                <br></br>
                <Form name="update-user" layout="horizontal" onFinish={handleSubmit} style={{

                }}  {...formItemLayout} form={form} labelAlign="left">

                    <Form.Item
                        name="description"
                        label="Cập nhật"

                    >
                        <Input.TextArea showCount maxLength={1000} rows={5} />
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
export default UpdateProject;