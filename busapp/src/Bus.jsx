import { useState } from "react";
import { useParams } from "react-router-dom";


export default function Bus(){
    let[busdata,setbusdata]=useState([]);

    let params=useParams();
    console.log(params);
    return(<div className="bus">

    </div>)
}