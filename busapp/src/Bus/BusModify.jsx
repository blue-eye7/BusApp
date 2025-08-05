import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './BusModify.css'


export default function BusModify(){
    let[bus,setbus]=useState([]);
    let Navigate=useNavigate();

    useEffect(()=>{
        async function fetchbus(){
            try{
            let busdata=await axios.get("http://localhost:8080/Busconfig/getbus")
            setbus(busdata.data)
            console.log(busdata);}
            catch{
                console.log("err..");
            }
        }
        fetchbus();
    },[])


return(
    <>
            <table>
                <thead>
                    <tr>
                        <th>Busname</th>
                        <th>Busnumber</th>
                        <th>owner name</th>
                        <th>boarding-depature-time</th>
                        <th>destination-arrival-time</th>
                        <th>Seats</th>
                        <th>Route</th>
                    </tr>
                </thead>
                <tbody>
                    {bus.map((ele,index)=>(<tr key={index}>
                            <th>{ele.name}</th>
                            <th>{ele.reg_no}</th>
                            <th>{ele.owner}</th>
                            <th>{ele.route ? `${ele.route.starting_point} - ${ele.depature_time}`: "no routes"}</th>
                            <th> {ele.route ? `${ele.route.ending_point} - ${ele.arrival_time}`: "no routes"}</th>
                            <th>{ele.total_seats}</th>
                            <th>{ele.route?.via|| <button onClick={()=>Navigate(`/addroute/${ele.id}`)}>Add route</button>}</th>
                    </tr>))}
                </tbody>
            </table>
            <Link to={'/busconfig'}>select buses</Link>
    </>
)


}