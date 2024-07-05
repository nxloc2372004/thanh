import { useNavigate } from "react-router-dom";
import { checkExits, createProfile, editProfile, register } from "../../Service/usersService";
import { generateToken } from "../../helper/generateToken";
import { Button } from "antd";
import "./register.scss"
function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e)
        const name = e.target[0].value;
        const phone = e.target[1].value;
        const email = e.target[2].value;
        const password = e.target[3].value;
        const checkExitsEmail = await checkExits("email", email);
        if (checkExitsEmail.length > 0) {
            alert("Email da ton tai!")
        }
        else {
            const options = {
                name: name,
                phone: phone,
                email: email,
                password: password,
                token: generateToken(),
                role: "customer"
            }

           
            const response = await register(options);
            if (response) {
                console.log(response)
                const info = {
                    name: name,
                    phone: phone,
                    email: email,
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
                navigate("/");

            }
            else {
                alert("Dang ki khong thanh cong")
            }
        }

    }
    const handleRegister = () => {
        navigate("/");
    }
    return (
        <>
            <div className="s-form">
                <form onSubmit={handleSubmit} className="form__login">
                    <h2 className="form__header">Đăng kí</h2>
                    <div>
                        <p className="form__title">Tên</p>
                        <input type="text" placeholder="Nhập tên" className="form__input form__input--name"></input>

                    </div>
                    <div>
                        <p className="form__title">Số điện thoại</p>
                        <input type="text" placeholder="Nhập số điện thoại" className="form__input form__input--phone"></input>

                    </div>
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
                            Đăng kí
                        </button>
                        <Button className="form__button form__button--register" type="link" onClick={handleRegister}>Quay lại</Button>
                    </div>


                </form>

            </div>
        </>
    )
}
export default Register;