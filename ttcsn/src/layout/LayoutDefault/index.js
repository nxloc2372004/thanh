import { Link, NavLink, Outlet } from "react-router-dom";

import { getCookie } from "../../helper/cookie";
import { useSelector } from "react-redux";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import "./Layout.scss"
import logo1 from "../../image/qlda.png";
import logo from "../../image/qlda.png";
import { MenuFoldOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import MenuSider from "../../components/MenuSider";
import { getCostumerList } from "../../Service/usersService";
function LayoutDefault() {
    const token = getCookie("token");
    
    const isLogin = useSelector(state => state.loginReducer);

    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <Layout className="layout-default">
                <header className="header">
                    <div className={"header__logo " + (collapsed && "header__logo--collapsed")}>
                        <img src={collapsed ? logo : logo1} alt="logo" />
                    </div>
                    <div className="header__nav">
                        <div className="header__nav-left">
                            <div className="header__collapse" onClick={() => setCollapsed(!collapsed)}>
                                <MenuFoldOutlined />
                            </div>
                        </div>
                        <div className="header__nav-right">
                            {token ? (<>
                                <NavLink to="/logout"> Đăng xuất </NavLink>
                            </>) : (
                                <>
                                    <NavLink to="/"> Đăng nhập </NavLink>
                                    <NavLink to="/register" className="NavLink-Custom"> Đăng kí </NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </header>
                <Layout className="layout-main">
                    <Sider className="sider" collapsed={collapsed} theme="light">
                        <MenuSider />
                    </Sider>
                    <Content className="content">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
export default LayoutDefault;