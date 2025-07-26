import { useState } from "react"


export default function Login(){

    let initialdata={user:"",password:""}
    let[formdata,setformdata]=useState(initialdata)
    let[formerr,setformerr]=useState("")

    function handlechange(e){

        let{name,value}=e.target;
        setformdata({...formdata,[name]:value.trim()})
        
    }
    function handlesubmit(e){
        e.preventDefault();
        let login=convert(formdata)
        if(!login){
            return;
        }
        setformerr("");
        alert("logined")

    }

    function convert(formdata){
        if(formdata.user.includes('@')){
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            let ok=regex.test(formdata.user)
                 if(ok){
                    return{email:formdata.user,password:formdata.password}
                 }
                 else { setformerr("enter valid email"); return ""}
        }
        const regex = /^\d+$/;
        let ok=regex.test(String(formdata.user));
        if(!ok){setformerr("enter valid mobilenumber")}
        return ok? {mobile:Number(formdata.user),password:formdata.password}:"";
    }




    return(
        <div className="loginout">
            <form className="loginform" onSubmit={handlesubmit}>
                <div className="loginuser">
                    <label htmlFor="user">enter the mobile number or email</label>
                    <input type="text" placeholder="Enter the email or registered mobile" value={formdata.user} name="user" id="user" required onChange={handlechange}/>
                    {formerr&&<p style={{color:"red"}}>{formerr}</p>}
                </div>

                 <div className="loginpassword">
                    <label htmlFor="pass">enter yor password</label>
                    <input type="text" placeholder="Enter your password" value={formdata.password} name="password" id="pass" required onChange={handlechange}/>
                </div>
                <button>Login</button>
            </form>

        </div>
    )
}