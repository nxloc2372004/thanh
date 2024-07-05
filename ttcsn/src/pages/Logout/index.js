import {  useNavigate } from "react-router-dom";
import { deleteAllCookie } from "../../helper/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/Login";

function Logout(){
    const navigate=useNavigate();
    const dispatch=useDispatch();

    deleteAllCookie();

    //window.location.reload();

    useEffect(()=>{
        
        dispatch(checkLogin(false));
        navigate("/");
    },[]);
    
    return (
        <>
        </>
    )
}
export default Logout;