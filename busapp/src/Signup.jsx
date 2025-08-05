import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

export function Signup() {
  const [formerr, setformerr] = useState({ password: "", mobile: "" });

  const initialdata = {
    username: "",
    mobile: "",
    password: "",
    email: "",
    gender: "",
    age: "",
    state: "",
    pincode: "",
  };

  const [userdata, setuserdata] = useState(initialdata);
  const Navigate = useNavigate();
  const states = ["tamilnadu", "karnataka", "Kerala", "Maharastra", "Puducherry", "Delhi"];

  function handlechange(e) {
    const { name, value } = e.target;
    setuserdata({ ...userdata, [name]: value.trim() });
  }

  async function handlesubmit(e) {
    e.preventDefault();
    if (String(userdata.mobile).length !== 10) {
      alert("Enter correct mobile number");
      setuserdata({ ...userdata, mobile: "" });
      return;
    }
    if (userdata.password.length < 6) {
      alert("Password must be greater than 6 digits");
      setuserdata({ ...userdata, password: "" });
      return;
    }

    try {
      const verify = await axios.post("http://localhost:8080/User/signup", userdata);
      setuserdata(initialdata);
      alert("Signup done");
      Navigate("/login");
    } catch (err) {
      console.log(err.response.data);
      console.log("Something went wrong.");
    }
  }

  return (
    <div className={styles.signupForm}>
      <form onSubmit={handlesubmit}>
        <div>
          <label htmlFor="username">Enter the username</label>
          <input
            name="username"
            id="username"
            placeholder="Enter the username"
            type="text"
            value={userdata.username}
            onChange={handlechange}
            required
          />
        </div>

        <div>
          <label htmlFor="mobile">Enter your mobile number</label>
          <input
            name="mobile"
            id="mobile"
            placeholder="Enter your mobile number"
            type="number"
            value={userdata.mobile}
            onChange={handlechange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Enter your email</label>
          <input
            name="email"
            id="email"
            placeholder="Enter the email"
            type="email"
            value={userdata.email}
            onChange={handlechange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Enter the password</label>
          <input
            name="password"
            id="password"
            placeholder="Enter your password"
            type="password"
            value={userdata.password}
            onChange={handlechange}
            required
          />
          {userdata.password.length > 0 && userdata.password.length <= 6 && (
            <span>Password must be more than 6 characters</span>
          )}
        </div>

        <div>
          <label htmlFor="age">Enter your age</label>
          <input
            name="age"
            id="age"
            placeholder="Enter your age"
            type="number"
            value={userdata.age}
            onChange={handlechange}
            required
          />
        </div>

        <div>
          <label htmlFor="gender">Select your gender</label>
          <select name="gender" value={userdata.gender} onChange={handlechange} required>
            <option value="">Select the gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="state">Select your state</label>
          <select name="state" value={userdata.state} onChange={handlechange} required>
            <option value="">Select your state</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pincode">Enter your pincode</label>
          <input
            name="pincode"
            id="pincode"
            placeholder="Enter your pincode"
            type="number"
            value={userdata.pincode}
            onChange={handlechange}
            required
          />
        </div>

        <div className="submit">
          <button type="submit">Signup</button>
          <Link style={{margin:10,color:"black"}} to={'/login'}>Already have account</Link>
           <Link style={{margin:10,color:"black"}} to={'/'}>Home</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
