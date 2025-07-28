
export const LoginMe=(authed,userdata)=>{
    return{
        type:"Login",
        authed,
        userdata,
    }

}

