import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Bus.module.css"; // 👈 import CSS module
import { useDispatch, useSelector } from "react-redux";
import { Busdata } from "./Actions/Busaction";

export default function Bus() {
    const [busdata, setbusdata] = useState([]);
    const param = useParams();
    const dispatch=useDispatch();
    let Navigate=useNavigate()
    let authed=useSelector(state=>state.LoginReducer.authed);
    console.log(param.busname);
    console.log(typeof(param.journey_date));
    console.log(param.boarding);
    console.log(param.destination);


    useEffect(() => {
        async function fetchbus() {
            try {
                console.log("hello");
                if(param.busname!=="null"){
                    console.log(param.busname);
                const response = await axios.get("http://localhost:8080/Busconfig/getbuses", {
                    params: {
                        busname: param.busname.trim(),
                        journey_date:param.journey_date
                    }
                });
                console.log(response.data.bus);
                setbusdata(response.data);
                console.log(response.data);}
                else{
                    console.log(param.destination);
                     const response = await axios.get("http://localhost:8080/Busconfig/getbusbyloc", {
                    params: {
                        boarding: param.boarding.trim(),
                        destination:param.destination.trim(),
                        journey_date:param.journey_date
                    }
                });
                setbusdata(response.data)
                console.log(response.data);

                }
            } catch (error) {
                console.error("Failed to fetch bus data:", error);
            }
        }

        fetchbus();
    }, [param.busname]);

    function handlebus(bus){
        if(authed){
        dispatch(Busdata(bus));
        Navigate(`/booking/${ele.id}`);
    }
        else{
            alert("you need to login first")
            Navigate('/login')
        }
    }

    return (
        <div className={styles.busContainer}>
            {busdata.map((ele) => (
                <div key={ele.id} className={styles.busCard}>
                    <h1 className={styles.busTitle}>{ele.bus.name}</h1>
                    <p className={styles.routeInfo}>
                        {ele.bus.route?.starting_point} - {ele.bus.route?.ending_point}
                    </p>
                    <p className={styles.routeInfo}>
                        dept: {ele.bus.depature_time} | arrival: {ele.bus.arrival_time}
                    </p>
                    <p className={styles.routeInfo}>via: {ele.bus.route?.via}</p>
                    <p className={styles.routeInfo} >total seats:{ele.bus.total_seats}</p>
                    {ele.bus.route?.stops?.length > 0 && (
                        <div className={styles.stopList}>
                            <h3>Stops</h3>
                            <ol>
                                {ele.bus.route.stops.map((stop, idx) => (
                                    <li key={stop.id ?? idx}>
                                        {stop.stop_no}. {stop.stop_name} ({stop.distance_from_origin} km)
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}
                    <button onClick={()=> handlebus(ele.bus)}>Book ticket</button>
                </div>
            ))}
        </div>
    );
}
