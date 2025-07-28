import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  const { userdata: data, authed } = useSelector(state => state.LoginReducer);
  const navigate = useNavigate();
  const [profileVisible, setProfileVisible] = useState(false);

  const toggleProfile = () => setProfileVisible(prev => !prev);

  return (
    <>
      <header className="navbar">
        <nav className="nav-container">
          <h1 className="logo">Conductor</h1>

          {!authed ? (
            <ul className="nav-buttons">
              <li><button onClick={() => navigate('/login')}>Login</button></li>
              <li><button>Signup</button></li>
            </ul>
          ) : (
            <div className="profile-wrapper">
              <div className="profile" onClick={toggleProfile} title="View Profile">
                <span>{data.username[0]}</span>
              </div>
            </div>
          )}
         {data.role==="Admin"&& <button onClick={()=>navigate('/busconfig')}>cofigure bus</button>}
        </nav>
      </header>

      {/* Move profile card OUTSIDE navbar */}
      {authed && (
        <div className={`profile-card ${profileVisible ? 'show' : ''}`}>
          <h2>Username: {data.username}</h2>
          <h2>Email: {data.email}</h2>
          <h2>Mobile: +91 {data.mobile}</h2>
          <h2>Region: {data.state}</h2>
          <h2><Link to="/bookings">My Bookings</Link></h2>
        </div>
      )}
    </>
  );
}
