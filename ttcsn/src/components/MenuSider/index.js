import { Menu } from "antd";
import{ExclamationOutlined } from "@ant-design/icons"
import { getCookie } from "../../helper/cookie";
import { Link } from "react-router-dom";
function MenuSider(){
    const role = getCookie("role");
    const itemStaff=[
        {
            label: <Link to="/dashboard/home">Trang chủ</Link>,
            icon: <ExclamationOutlined />,
            key: "/dashboard/home"
        },
        {
            label: <Link to="/dashboard/profile">Thông tin tài khoản</Link>,
            icon:<ExclamationOutlined />,
            key: "menu-2"
        },
        {
            label: <Link to="/dashboard/listproject">Danh sách dự án</Link>,
            icon:<ExclamationOutlined />,
            key: "menu-3"
        },
        
    ];
    const itemAdmin=[
        {
            label: <Link to="/dashboard/home">Trang chủ</Link>,
            icon: <ExclamationOutlined />,
            key: "/dashboard/home"
        },
        {
            label: <Link to="/dashboard/manageraccount">Quản lý tài khoản</Link>,
            icon:<ExclamationOutlined />,
            key: "menu-2"
        },
        {
            label: <Link to="/dashboard/managerprofile">Quản lý thông tin nhân viên</Link>,
            icon:<ExclamationOutlined />,
            key: "menu-3"
        },
        {
            label: <Link to="/dashboard/managerproject">Quản lý dự án</Link>,
            icon:<ExclamationOutlined />,
            key: "menu-4"
        },
    ];
    function item(){
        if (role==="admin") return itemAdmin;
        else if(role==="staff") return itemStaff;
    }
    return (
        <>
        <Menu
            mode="inline"
            items={item()}
            defaultSelectedKeys={["/dashboard/home"]}
        />
        </>
    )
}
export default MenuSider;