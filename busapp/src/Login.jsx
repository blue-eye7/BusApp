import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { LoginMe } from "./Actions/Loginaction";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; 

export default function Login() {
  const initialdata = { user: "", password: "" };
  const [formdata, setformdata] = useState(initialdata);
  const [formerr, setformerr] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  function handlechange(e) {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value.trim() });
  }

  async function handlesubmit(e) {
    e.preventDefault();
    const login = convert(formdata);
    if (!login) return;
    setformerr("");
    alert("logined");

    try {
      const verify = await axios.post("http://localhost:8080/User/login", login);
      dispatch(LoginMe(true, verify.data));
      Navigate("/");
    } catch (err) {
      console.log(err.response.data);
    }
  }

  function convert(formdata) {
    if (formdata.user.includes("@")) {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (regex.test(formdata.user)) {
        return { email: formdata.user, password: formdata.password };
      } else {
        setformerr("Enter valid email");
        return "";
      }
    }

    const regex = /^\d+$/;
    const ok = regex.test(String(formdata.user));
    if (!ok) setformerr("Enter valid mobile number");
    return ok ? { mobile: Number(formdata.user), password: formdata.password } : "";
  }

  return (
    <div className={styles.loginOut}>
      <form className={styles.loginForm} onSubmit={handlesubmit}>
        <div className={styles.loginUser}>
          <label htmlFor="user">Enter the mobile number or email</label>
          <input
            type="text"
            placeholder="Enter the email or registered mobile"
            value={formdata.user}
            name="user"
            id="user"
            required
            onChange={handlechange}
          />
          {formerr && <p className={styles.error}>{formerr}</p>}
        </div>

        <div className={styles.loginPassword}>
          <label htmlFor="pass">Enter your password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={formdata.password}
            name="password"
            id="pass"
            required
            onChange={handlechange}
          />
        </div>
        <button type="submit">Login</button>
        <Link style={{color:"black"}} to={'/signup'}>Dont have account? signup</Link>
        <Link style={{color:"black"}} to={'/'}>Home</Link>
      </form>
    </div>
  );
}
