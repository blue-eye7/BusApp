import { useNavigate } from "react-router-dom";
import { LoginMe } from "./Actions/Loginaction"
import { useDispatch } from "react-redux";


export default function Logout(){


    const Navigate=useNavigate()
    const dispatch=useDispatch();
    function handlelogout(){
        dispatch(LoginMe(false,{}));
        Navigate('/')
    }

    return(<button onClick={handlelogout}>Logut</button>)

}