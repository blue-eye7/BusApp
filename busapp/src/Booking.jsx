import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Booking.module.css";
import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";

export default function Booking() {
  const param = useParams();
  const [bookedSeats, setBookedSeats] = useState([]);
  const Navigate=useNavigate();
  const dispatch=useDispatch();
  
 
  const[selectedSeats,setSelectedSeats]=useState([])
  let initialpassenger={passengername:"",
    age:"",
    mobile:""  }
    let[passengers,setpassengers]=useState(initialpassenger);
    let[totalpass,settotalpass]=useState([]);
    let[index,setindex]=useState(0);
    let busvalues=useSelector(state=>state.Busreducers.busdata);
    console.log(busvalues);
    console.log(busvalues?.total_seats);
    console.log(busvalues.arrival_time);
    const totalseats = busvalues?.total_seats;
    console.log(busvalues.route.stops);
     const layout = Array.from({ length: totalseats }, (_, index) => index + 1);
     const [boarding_point,setboardingpoint]=useState("");
     const[destination,setdestination]=useState("");
     let[amount,setamount]=useState(0);
     let[show,setshow]=useState(false)
  
  

  useEffect(() => {
    async function fetchSeats() {
      try {
        const res = await axios.get(`http://localhost:8080/Busconfig/getseats/${param.id}`);
        setBookedSeats(res.data);
        console.log(res.data);
      } catch (err) {
        console.log("error fetching seats");
        // setBookedSeats([2,5,8,10])
      }
    }
    fetchSeats();
  }, [param.id]);

  function handlechange(e){
    setpassengers({...passengers,[e.target.name]:e.target.value})
    
  }
  function handlepass(){
    settotalpass([...totalpass,passengers])
    setpassengers(initialpassenger)
    setindex(prev=>prev+1);
    console.log(totalpass);
  }
  function selectseat(seat){
      if (selectedSeats.includes(seat)) {
    // unselect
    setSelectedSeats((prev) => prev.filter((s) => s !== seat));
    setindex(prev=>prev-1)
  } else {
    // select
    setSelectedSeats((prev) => [...prev, seat]);
    console.log(selectedSeats);
  }
  }
  async function handlebook(){
    if(destination===""||boarding_point==""){alert("enter the travel locations"); return;}
    let bookings={destination:destination,boarding:boarding_point,no_of_seats:selectedSeats.length,seats:selectedSeats,amount:amount}
    let booking={bookings:bookings,passengers:totalpass}
    console.log(booking);
    try{
        let response=axios.post('http://localhost:8080/Busconfig/book',booking,{params:{id:1,avid:param.id}})
        console.log(response.data);
    }
    catch{
        console.log(err);
    }
    finally{
      setshow(false)
       dispatch(Busdata({}));
      Navigate('/');
    }
  }
  function details(){
    
    let boardingstop=busvalues.route.stops.filter(stops=>stops.stop_name===boarding_point)[0]
    let destinationstop=busvalues.route.stops.filter(stops=>stops.stop_name===destination)[0]
    console.log((destinationstop.distance_from_origin-boardingstop.distance_from_origin)*0.9);
    let totalamount=Number((destinationstop.distance_from_origin-boardingstop.distance_from_origin)*0.9)
    setamount(totalamount);
    setshow(true)
  }

  return (<>
     <Nav/>
    <div className={styles.bus}>
       
      {layout.map((seat, index) => (
        <div
          key={seat}
          className={`${styles.seat} ${index % 5 === 2 ? styles.gap : ""}`}
        >
          <button onClick={()=>selectseat(seat)}
            disabled={bookedSeats.includes(seat)}
            className={`${styles.seatBtn} ${
              bookedSeats.includes(seat)? styles.booked : ""
            } ${selectedSeats.includes(seat)?styles.selected:""}`}
          >
            {seat}
          </button>
        </div>
      ))}
     </div>
  <div className={`${styles.summary} ${selectedSeats.length > 0 ? styles.show : ""}`}>
    <h3>Selected Seats ({selectedSeats.length})</h3>
    {selectedSeats.map((e) => (
      <p key={e}>{e}</p>
    ))}
   

    <div className={styles.passenger}>
       { index<selectedSeats.length&&
        <div>
            <input value={passengers.passengername} name="passengername" type="text" placeholder={`enter the passenger name`} onChange={handlechange}></input>
            <input value={passengers.mobile} name="mobile" type="number" placeholder={`enter the passenger mobileno`} onChange={handlechange}></input>
            <input value={passengers.age} name="age" type="number" placeholder={`enter the passenger age`} onChange={handlechange}></input>
            <button onClick={handlepass}>Add passenger</button>
        </div>
       } 
        <div className={styles.journey}>
      <select onChange={(i)=>setboardingpoint(i.target.value)}>
        <option value="">Select the Boardingpoint</option>
        { busvalues.route.stops.map((e)=>(
            <option value={e.stop_name} key={e.stop_name}>{e.stop_name}</option>
        ))
        }
      </select>

        <select onChange={(i)=>setdestination(i.target.value)} >
        <option value="">Select the destination</option>
        { busvalues.route.stops.map((e)=>(
            <option value={e.stop_name} key={e.stop_name}>{e.stop_name}</option>
        ))
        }
      </select>
      <button onClick={details}>conform ticket</button>
     
    </div>
        {show&&<>
        <div>
          <h1>boarding point:{boarding_point} - destination:{destination}</h1>
          <p>no of tickets:{selectedSeats.length}</p>
          <p>seats:{selectedSeats.join(", ")}</p>
          <p>price per ticket:{Number(amount/selectedSeats.length)}</p>
          <p>Total:{amount}</p>
        </div>
       <button className={styles.bookbtn} onClick={handlebook}>Book ticket</button>
       </>
       }
    </div>
 
  </div>
    </>
  );
}
