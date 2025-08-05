import { useEffect, useState } from "react"
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import './addroute.css'

export default function AddRoutes(){
    let[routedata,setroutedata]=useState([])
    let param=useParams()
    let busid=param.id;
    let Navigate=useNavigate()

    useEffect(()=>{
        async function getroutes(){
            try{
            let routes=await axios.get("http://localhost:8080/Busconfig/getroutes");
            console.log(routes.data);
            setroutedata(routes.data);
        }
        catch{
            console.log("err..");
        }
        }
        console.log(busid);
        getroutes()
    },[])

    async function handleaddroute(id){
        console.log(id);
        try{
        let addroute=await axios.post("http://localhost:8080/Busconfig/addtobus",null,{
           params: {
               busid:busid,
               routeid: id
            }
        })
        console.log(addroute.data);
        Navigate('/busmodify');
        return;

        
    }
    catch{
        console.log("err...");
        alert("failed to add")
        Navigate('/busmodify')
        return
    }
    }
    return (
  <div className="routes-container">
    {routedata.map((ele, index) => (
      <div className="route-card" key={index}>
        <h1 className="route-title">
          {ele.starting_point} - {ele.ending_point}
        </h1>
        <h2 className="route-detail">Distance: {ele.distance} km</h2>
        <h2 className="route-detail">Time: {(ele.time / 60).toFixed(2)} hrs</h2>
        <h2 className="route-detail">Via: {ele.via}</h2>

        <div className="route-stops">
          <h3>Stops:</h3>
          <ol>
            {ele.stops.map((s, i) => (
              <li key={i}>{s.stop_name}</li>
            ))}
          </ol>
        </div>

        {busid > 0 && (
          <button
            className="add-route-button"
            onClick={() => handleaddroute(ele.id)}>
            Add This Route
          </button>
        )}
        
      </div>
    ))}
    <Link to={'/'}>Home</Link>
  </div>
);

   
}