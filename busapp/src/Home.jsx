import { useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Footer from "./Footer";

export default function Home() {
  const [busname, setbusname] = useState("");
//   const[suggestion,setsuggestion]=useState([])
  const [boardingpoint, setboardingpoint] = useState("");
  const [destination, setdestination] = useState("");
  const Navigate = useNavigate();
  let [journey_date,setjourney_date]=useState("")

  function getbyname() {
    if (busname === "") {
      alert("You must enter the bus name");
      return;
    }
    if(journey_date=== ""){
      alert("set the journey date")
      return;
    }
    Navigate(`/bus/${journey_date}/${busname}/${null}/:${null}`);
  }
  function getbyroutes(){
    if(boardingpoint==""||destination==""){
      alert("enter the location details");
      return;
    }
    if(journey_date==""){
      alert("enter the journey date");
      return;
    }
    Navigate(`/bus/${journey_date}/${null}/${boardingpoint}/${destination}`);
  }

  return (
    <div className={styles.homeOuter}>
      {/* <Nav /> */}
      <div className={styles.searchSection}>
        <label htmlFor="name">Enter the bus name</label>
        <input
          placeholder="Enter the Bus Name"
          value={busname}
          id="name"
          onChange={(e) => setbusname(e.target.value)}
        />
        <button onClick={getbyname}>Search</button>
      </div>

      <div className={styles.routeSection}>
        <div className={styles.inputGroup}>
          <label htmlFor="boarding">Enter the boarding place</label>
          <input
            id="boarding"
            placeholder="Enter the boarding point"
            value={boardingpoint}
            onChange={(e) => setboardingpoint(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="dept">Enter the destination</label>
          <input
            id="dept"
            placeholder="Enter the destination"
            value={destination}
            onChange={(e) => setdestination(e.target.value)}
          />
        </div>

        <button onClick={getbyroutes}>
          Get Bus
        </button>
      </div>
      <label>Enter the journey date</label>
      <input type="date" value={journey_date} onChange={(e)=>setjourney_date(e.target.value)}></input>
      <Footer/>
    </div>
  );
}
