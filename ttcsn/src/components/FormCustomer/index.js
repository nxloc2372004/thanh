import { Button, DatePicker, Form, Input, Radio, Select, Upload, message } from "antd";
import { Option } from "antd/es/mentions";
import { province } from "../../helper/province";
import { editProfile } from "../../Service/usersService";
import { UploadOutlined } from "@ant-design/icons"
function FormCustomer(props) {
    const [form] = Form.useForm();
    const { item, onReload,onCancel } = props;
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
        const response = await editProfile(item.id, values)
        console.log(response);
        if (response) {
            form.resetFields();
            onReload();
            onCancel();
        }

    }

    return (
        <>
            <Form name="update-user" layout="horizontal" onFinish={handleSubmit} style={{
                maxWidth: 600,
            }} {...formItemLayout} form={form} labelAlign="left" >
                <Form.Item
                    label="Tên"
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
                <Form.Item label="Giới tính" name="gender">
                    <Radio.Group>
                        <Radio value="Nam"> Nam </Radio>
                        <Radio value="Nữ"> Nữ </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Ngày Sinh" name="birth">
                    <DatePicker />
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
                {/* <Form.Item
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
                </Form.Item> */}
                <Form.Item
                    label="Căn cước công dân"
                    name="cccd"
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
                    name="address"
                    label="Địa chỉ"
                    hasFeedback
                    rules={[{ required: true, message: 'Please select your country!' }]}
                >
                    <Select placeholder="">
                        {province.map(item => (
                            <Option value={item} key={item}>{item}</Option>
                        ))}


                    </Select>
                </Form.Item>
                <Form.Item
                    name="hometown"
                    label="Quê quán"
                    hasFeedback
                    rules={[{ required: true, message: 'Please select your country!' }]}
                >
                    <Select placeholder="">
                        {province.map(item => (
                            <Option value={item} key={item}>{item}</Option>
                        ))}


                    </Select>
                </Form.Item>
                <Form.Item
                    label="Vị trí"
                    name="job"
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
                    label="Dân tộc"
                    name="religion"
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
                    name="note"
                    label="Mô tả"

                >
                    <Input.TextArea showCount maxLength={1000} />
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Ảnh"
                >
                    <Upload >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
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
export default FormCustomer;