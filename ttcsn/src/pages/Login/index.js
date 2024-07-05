import {  useNavigate } from "react-router-dom";
import { login } from "../../Service/usersService";
import { setCookie } from "../../helper/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/Login";
import "./login.scss"
import { Button } from "antd";
function Login(){
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const email=e.target[0].value;
        const password=e.target[1].value;
        const response =await login(email,password);
        if(response.length>0){
            console.log(response);
            setCookie("id",response[0].id,1);
            setCookie("email",response[0].email,1);
            setCookie("token",response[0].token,1);
            setCookie("role",response[0].role,1);
            dispatch(checkLogin(true));
            navigate("/dashboard");

        }
        else{
            alert("Sai thông tin tài khoản")
        }
    }
    const handleRegister=()=>{
        
    }
    return (
        <>
        <div className="form"> 


        
            <form onSubmit={handleSubmit} className="form__login">
                <h2 className="form__header">Đăng nhập</h2>
                <div>
                    <p className="form__title">Email</p>
                    <input type="text" placeholder="Nhập email" className="form__input form__input--email"></input>
                    
                </div>
                <div>
                    <p className="form__title">Mật khẩu</p>
                    <input type="password" placeholder="Nhập mật khẩu" className="form__input form__input--password"></input>
                </div>
                <div className="form__footer">
                    <button type="submit" className="form__button form__button--submit">
                        Login
                    </button>
                    <Button className="form__button form__button--register" type="link" onClick={handleRegister}>QUẢN LÍ DỰ ÁN NHÓM...</Button>
                </div>
                

            </form>

        </div>
        </>
    )
}
export default Login;