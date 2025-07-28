import { useState } from "react"
import axios from "axios"

export default function Busconfig(){

    let initialdata={
        name:"",
        reg_no:"",
        owner:"",
        total_seats:""
    }
    let[show,setshow]=useState(true)
    let[addroute,setaddroute]=useState(false)
    let[addbus,setaddbus]=useState(false)
    let[busdata,setbusdata]=useState(initialdata)
    let[join,setjoin]=useState(false)
    let[addstops,setaddstops]=useState(false)
   
    
  

    let initialroute={
        starting_point:"",
        ending_point:"",
        distance:"",
        via:"",
        time:""
    }
    let[routedata,setroutedata]=useState(initialroute);

    let initialstop={
        stop_name:"",
        distance_from_origin:0,
        stop_no:0,
    }
    let[stopdata,setstopdata]=useState(initialstop)
    let[totalstops,settotalstops]=useState([])
       const payload = {
        bus: null,
        route: null,
         stops: null
                        };

    function handlechange(e){

        setbusdata({...busdata,[e.target.name]:e.target.value})
    }
    function handleroute(e){
        setroutedata({...routedata,[e.target.name]:e.target.value})
       // setstops(true)
    }
    async function handlesubmit(e){
        e.preventDefault();
        // try{
        // let verify=await axios.post("http://localhost:8080/Busconfig",busdata);
        // console.log(verify.data);
        const confirmed = window.confirm("Do you want to add routes");
        if(confirmed){
                    
                    setaddroute(true)
                    setaddbus(false)
                    setjoin(true);
        }
        else{
            console.log(payload);
            setjoin(false)
            try{
                payload.bus=busdata
            let busadd=await axios.post("http://localhost:8080/Busconfig/busconfig",payload)
            console.log(busadd.data);
            setshow(true)
            setaddbus(false)
            setbusdata(initialdata)
        }
            catch{
                console.log("err...");
            }
        }
        console.log(busdata);
    
    
   

    }
    async function handleroutesubmit(){
        console.log(routedata);
        console.log(totalstops);
       
        if(join){
            payload.bus=busdata
            payload.route=routedata
            payload.stops=totalstops
            console.log(payload,"payload for 3");
            try{
                let s_all=await axios.post("http://localhost:8080/Busconfig/busconfig",payload)
                console.log(s_all.data);
                setjoin(false)
            }
            catch{
                console.log("err...");
            }
             alert("added..")
        setshow(true)
        setaddroute(false)
        setbusdata(initialdata)
        setroutedata(initialroute)
        setstopdata(initialstop)
        setaddstops(false)
        }
        else{
        payload.route=routedata
        payload.stops=totalstops
        console.log(payload);
        try{
            let s_two=await axios.post("http://localhost:8080/Busconfig/busconfig",payload)
            console.log(s_two.data);
        }
        catch{
            console.log("err");
        }}
        setroutedata(initialroute)
        setstopdata(initialstop)
        settotalstops([])
        payload.bus=null;
        payload.route=null;
        payload.stops=null;
    }

    function handlestops(){
        settotalstops([...totalstops,stopdata])
        console.log(totalstops);
        alert("stop added:",stopdata.stop_name)
        setstopdata(initialstop);
    }

    function showstop(e){
        e.preventDefault();
        setaddstops(true);
        setaddroute(false);
    }
 
    


   // return(<>This function is yet to be implemented...</>)
   return(
    <>{show&&
    <div className="add">
        <button onClick={()=>{setshow(false);setaddbus(true)}} >Addbus</button>
        <button onClick={()=>{setshow(false);setaddroute(true);setjoin(false)}}>AddRoutes</button>
    </div>}
    {addbus&&
    <div className="addbus">
        <form onSubmit={handlesubmit}>
            <label>Enter the bus name</label>
            <input name="name" placeholder="enter the bus name" value={busdata.name} type="text" required onChange={handlechange}/>
            <label>Enter the reg no</label>
            <input name="reg_no" placeholder="Enter the register no" value={busdata.reg_no} type="text" required onChange={handlechange}/>
            <label>Enter the owner name</label>
             <input name="owner" placeholder="Enter the owner name" value={busdata.owner} type="text" required onChange={handlechange}/>
             <label>Enter the seat capacity</label>
            <input name="total_seats" placeholder="Enter the total seats" value={busdata.total_seats} type="number" required onChange={handlechange}/>
            <button>Register bus</button>
          

        </form>
    </div>}
    {addroute&&<div className="addroute">
        <form onSubmit={showstop} >
             <label>Enter the Starting point</label>
            <input name="starting_point"  value={routedata.starting_point} type="text" required onChange={handleroute}/>

            <label>Enter the ending point</label>
            <input name="ending_point"  value={routedata.ending_point} type="text" required onChange={handleroute}/>

            <label>Enter the distance</label>
             <input name="distance"  value={routedata.distance} type="number" required onChange={handleroute}/>

             <label>Enter the time taken(in minutes)</label>
            <input name="time"  value={routedata.time} type="number" required onChange={handleroute}/>

              <label>Enter the route name</label>
            <input name="via"  value={routedata.via} type="text" required onChange={handleroute}/>

           

            <button >Add stops</button>
        </form>
        
        </div>}
        {
            addstops &&
            <div className="addstops">
                <div className="addedstops">
                    {totalstops.map((ele,index)=>(<h5 style={{color:"white"}} key={index}>{ele?.stop_name}</h5>))}
                </div>
                <form>
                    <input  onChange={(e)=>setstopdata({...stopdata,[e.target.name]:e.target.value})} type="text" placeholder="enter the stop name" name="stop_name" value={stopdata.stop_name} required></input>
                    <input onChange={(e)=>setstopdata({...stopdata,[e.target.name]:e.target.value})} type="number" placeholder='enter the distance from origin' name="distance_from_origin" value={stopdata.distance_from_origin} required></input>
                    <input onChange={(e)=>setstopdata({...stopdata,[e.target.name]:e.target.value})} type="number" placeholder="enter the stop number" name="stop_no" value={stopdata.stop_no} required></input>
                    <button onClick={handlestops}>Add Stop</button> <button onClick={handleroutesubmit}>add Routes</button>
                </form>
            </div>
        }
    
    </>

   )
}