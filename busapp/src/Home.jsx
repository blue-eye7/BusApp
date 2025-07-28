import { useState } from "react"
import Nav from "./Nav"
import { useNavigate } from "react-router-dom"


export default function Home(){


let[busname,setbusname]=useState("")
let[boardingpoint,setboardingpoint]=useState("")
let[destination,setdestination]=useState("")
let Navigate=useNavigate()

function getbyname(){
    if(busname===""){
        alert("you must enter the bus name")
        return;
    }
    Navigate(`/bus/:${busname}/:/:`)


}

    return(
        
        <div className="homeouter">
            <Nav/>
            <div className="homebusname">
                <label htmlFor="name">Enter the bus name</label>
                 <input placeholder="enter the Busname" value={busname} id="name" onChange={(e)=>setbusname(e.target.value)}/>
                 <button onClick={getbyname}>Search</button>
            </div>

            <div className="homebusroute">
                <div className="boarding">
                    <label htmlFor="boarding">Enter the boarding place</label>
                    <input id="boarding" placeholder="enter the boarding point" value={boardingpoint} onChange={(e)=>setboardingpoint(e.target.value)}/>
                </div>

                <div className="destination">
                    <label htmlFor="dept">Enter the destination</label>
                    <input placeholder="enter the boarding point" value={destination} id="dept" onChange={(e)=>setdestination(e.target.value)}/>

                </div>
                <button onClick={()=>alert("this function yet to be implemented")}>Get bus</button>
            </div>
        </div>
    )
}