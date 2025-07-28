import { useState } from "react"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


export function Signup(){

let[formerr,setformerr]=useState({
    password:"",
    mobile:""
})
let initialdata=   {username:"",
    mobile:"",
    password:"",
    email:"",
    gender:"",
    age:"",
    state:"",
    pincode:"",
}
let[userdata,setuserdata]=useState(initialdata)
let Navigate=useNavigate()


let states=["tamilnadu","karnataka","Kerala","Maharastra","Puducherry","Delhi"];

function handlechange(e){
    let name=e.target.name;
    let value=e.target.value.trim()
    setuserdata({...userdata,[name]:value});
    

}

async function handlesubmit(e){
    e.preventDefault();
    if(String(userdata.mobile).length!=10){
        alert("enter correct mobile number")
        setuserdata({...userdata,mobile:""})
        return;
    }
    if(userdata.password.length<6){
        alert("password must be greater than 6 digits")
        setuserdata({...userdata,password:""})
        return;

    }
    
    try{
    let verify=await axios.post("http://localhost:8080/User/signup",userdata)
    setuserdata(initialdata)
    console.log(verify.data);
    alert("signup done")
    Navigate('/login')
}
catch(err){
    console.log(err.response.data);
    console.log("something err..");
}
}
    return(
        <div className="signupform">
            <form onSubmit={handlesubmit}>
                <div className="username">
                <label htmlFor="username">Enter the username</label>
                <input name="username" id="username" placeholder="enter the username" type="text" value={userdata.username} onChange={handlechange} required/>
                </div>

                <div className="mobile">
                <label htmlFor="mobile">Enter you mobile number</label>
                <input name="mobile" id="username"  placeholder="enter your mobile number" type="number" value={userdata.mobile} onChange={handlechange} required maxLength={10}/>
                </div>

                <div className="email">
                <label htmlFor="email">Enter your email</label>
                <input name="email" id="username"  placeholder="enter the email" type="email" value={userdata.email} onChange={handlechange} required />
                </div>

                <div className="Password">
                <label htmlFor="password">Enter the password</label>
                <input name="password" id="password"  placeholder="enter your password" type="password" value={userdata.password} onChange={handlechange} required/>
                {userdata.password.length > 0 && userdata.password.length <= 6 && (
  <span style={{ color: 'red' }}>Password must be more than 6 characters</span>
)}
                </div>

                <div className="age">
                <label htmlFor="age">Enter your age</label>
                <input name="age" id="age" placeholder="enter your age" type="number" value={userdata.age} onChange={handlechange} required/>
                </div>

                <div className="gender">
                <label htmlFor="gender">select you gender</label>
                <select name="gender" value={userdata.gender} onChange={handlechange} required>
                    <option value={""}>Select the gender</option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                    <option value={"Other"}>Other</option>
                </select>
                </div>

                <div className="stae">
                <label htmlFor="state">select you state</label>
                <select name="state" value={userdata.state} onChange={handlechange} required>
                    <option key={""} value={""}>Select your state</option>
                    {
                        states.map((i,j)=>(<option value={i} key={j}>{i}</option>))
                    }
                </select>

                </div>

                <div className="pincode">
                <label htmlFor="pincode">Enter your pincode</label>
                <input name="pincode" id="pincode" placeholder="enter your pincode" type="number" value={userdata.pincode} onChange={handlechange} required/>
                </div>
                <div className="submit">
                    <button >Signup</button>
                </div>

            </form>

        </div>
    )
}

export default Signup;