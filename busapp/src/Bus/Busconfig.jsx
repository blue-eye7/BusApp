import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./busconfig.module.css";
import qs from 'qs';

export default function Busconfig() {
  const Navigate = useNavigate();
  const { userdata: data, authed } = useSelector((state) => state.LoginReducer);
  let[journeydate,setjourneydate]=useState("");
  let[dates,setdates]=useState([])

  const initialBus = {
    name: "",
    reg_no: "",
    owner: "",
    total_seats: "",
    depature_time: "",
    arrival_time: "",
  };

  const initialRoute = {
    starting_point: "",
    ending_point: "",
    distance: "",
    via: "",
    time: "",
  };

  const initialStop = {
    stop_name: "",
    distance_from_origin: 0,
    stop_no: 0,
  };

  const [busdata, setbusdata] = useState(initialBus);
  const [routedata, setroutedata] = useState(initialRoute);
  const [stopdata, setstopdata] = useState(initialStop);
  const [totalstops, settotalstops] = useState([]);
  const [show, setshow] = useState(true);
  const [addbus, setaddbus] = useState(false);
  const [addroute, setaddroute] = useState(false);
  const [addstops, setaddstops] = useState(false);
  const [join, setjoin] = useState(false);

  const payload = { bus: null, route: null, stops: null };

  const handleBusChange = (e) => {
    setbusdata({ ...busdata, [e.target.name]: e.target.value });
  };

  const handleRouteChange = (e) => {
    setroutedata({ ...routedata, [e.target.name]: e.target.value });
  };

  const handleStopChange = (e) => {
    setstopdata({ ...stopdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if(dates.length<=0){
      alert("enter the available date")
      return;
    }
    const confirmed = window.confirm("Do you want to add routes?");
    if (confirmed) {
      setaddroute(true);
      setaddbus(false);
      setjoin(true);
    } else {
      try {
        payload.bus = busdata;
        await axios.post("http://localhost:8080/Busconfig/busconfig", payload,{params:{
          available_dates:dates
        }});
        resetAll();
      } catch {
        console.log("err...");
      }
    }
  };

  const handleroutesubmit = async () => {
    payload.route = routedata;
    payload.stops = totalstops;
    if (join) payload.bus = busdata;

    try {
      await axios.post("http://localhost:8080/Busconfig/busconfig", payload,{params:{available_dates:dates},paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })});
      alert("Route added successfully!");
    } catch {
      console.log("err...");
    }
    resetAll();
  };

  const handlestops = () => {
    settotalstops([...totalstops, stopdata]);
    setstopdata(initialStop);
    alert("Stop added");
  };

  const showstop = (e) => {
    e.preventDefault();
    setaddstops(true);
    setaddroute(false);
  };
  const handledate=()=>{
    setdates([...dates,journeydate])
    setjourneydate("")
  }

  const resetAll = () => {
    setshow(true);
    setaddroute(false);
    setaddbus(false);
    setaddstops(false);
    setjoin(false);
    setbusdata(initialBus);
    setroutedata(initialRoute);
    setstopdata(initialStop);
    settotalstops([]);
    setjourneydate("")
    setdates([])
  };

  if (!authed) return <h1>Login first</h1>;
  if (data.role !== "admin") return <h1>You are not allowed to access this page</h1>;

  return (
    <>
      {show && (
        <div className={styles.actions}>
          <button onClick={() => { setshow(false); setaddbus(true); }}>Add Bus</button>
          <button onClick={() => { setshow(false); setaddroute(true); setjoin(false); }}>Add Route</button>
          <button onClick={() => Navigate("/busmodify")}>Show Buses</button>
          <button onClick={() => Navigate("/addroute/null")}>View Routes</button>
          <button onClick={() => Navigate("/")}>Home</button>
        </div>
      )}

      {addbus && (
        <div className={styles.formContainer}>
          <h2>Register Bus</h2>
          <form onSubmit={handlesubmit} className={styles.form}>
            {["name", "reg_no", "owner", "total_seats", "depature_time", "arrival_time"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={`Enter ${field.replace("_", " ")}`}
                value={busdata[field]}
                type={field === "total_seats" ? "number" : "text"}
                onChange={handleBusChange}
                required
              />
            ))}
        
            <button type="submit">Register Bus</button>
          </form>
              <div className="available-date">
              {dates.map((e,index)=>(<ul>
                <li style={{color:'black'}} key={index}>{e}</li>
              </ul>))}
              <label>Enter the available dates</label>
              <input type="date" value={journeydate} onChange={(e)=>setjourneydate(e.target.value)} ></input>
              <button onClick={handledate}>Add date</button>
            </div>
          <button onClick={()=>Navigate('/')}>Home</button>
        </div>
      )}

      {addroute && (
        <div className={styles.formContainer}>
          <h2>Add Route</h2>
          <form onSubmit={showstop} className={styles.form}>
            {["starting_point", "ending_point", "distance", "time", "via"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={`Enter ${field.replace("_", " ")}`}
                value={routedata[field]}
                type={field === "distance" || field === "time" ? "number" : "text"}
                onChange={handleRouteChange}
                required
              />
            ))}
            <button type="submit">Add Stops</button>
          </form>
          <button onClick={()=>Navigate('/')}>Home</button>
        </div>
      )}

      {addstops && (
        <div className={styles.formContainer}>
          <h2>Add Stops</h2>
          <div className={styles.stopsList}>
            {totalstops.map((stop, index) => (
              <span key={index} className={styles.stopItem}>{stop.stop_name}</span>
            ))}
          </div>
          <form className={styles.form}>
            <input name="stop_name" placeholder="Stop Name" value={stopdata.stop_name} onChange={handleStopChange} required />
            <input name="distance_from_origin" placeholder="Distance from Origin" type="number" value={stopdata.distance_from_origin} onChange={handleStopChange} required />
            <input name="stop_no" placeholder="Stop No." type="number" value={stopdata.stop_no} onChange={handleStopChange} required />
            <div className={styles.buttonGroup}>
              <button type="button" onClick={handlestops}>Add Stop</button>
              <button type="button" onClick={handleroutesubmit}>Add Route</button>
            </div>
          </form>
          <button onClick={()=>Navigate('/')}>Home</button>
        </div>
      )}
    </>
  );
}
