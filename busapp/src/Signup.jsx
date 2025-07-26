import { useState } from "react"


export function Signup(){

let[formerr,setformerr]=useState({
    password:"",
    mobile:""
})
let initialdata=   {username:"",
    mobile:"",
    email:"",
    gender:"",
    age:"",
    state:"",
    pincode:"",
}
let[userdata,setuserdata]=useState(initialdata)


let states=["tamilnadu","karnataka","Kerala","Maharastra","Puducherry","Delhi"];

function handlechange(e){
    let name=e.target.name;
    
    if(name==="password"||name==="mobile"){
        let err=validate(e.target.value,name);
        if(err!=""){
            setformerr({...formerr,[name]:err});
        
            setuserdata({...userdata,[name]:e.target.value})}
            else{
                setuserdata({...userdata,[name]:e.target.value})
                setformerr({mobile:"",email:""})
            }
        
    }
    else{
        let value=e.target.value.trim()
        setuserdata({...userdata,[name]:value});
    }

}
function validate(value,name){
    if(name==="password"){
        return value.length >6?"":"password must be greater than 6 digits"
    }
    return value.length < 10 ?"":"enter the correct mobile number"
}
function handlesubmit(e){
    e.preventDefault();
    let signup=Object.values(formerr).some(val=>val)
    if(signup){
        alert(formerr.mobile ,formerr.password)
        return;
    }
    alert("signup done")
    setuserdata(initialdata)
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
                <input name="mobile" id="username" placeholder="enter your mobile number" type="text" value={userdata.mobile} onChange={handlechange} required maxLength={10}/>
                </div>

                <div className="email">
                <label htmlFor="mobile">Enter your email</label>
                <input name="email" id="username" placeholder="enter the email" type="email" value={userdata.email} onChange={handlechange} required />
                </div>

                <div className="Password">
                <label htmlFor="password">Enter the password</label>
                <input name="password" id="password" placeholder="enter your password" type="password" value={userdata.password} onChange={handlechange} required/>
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