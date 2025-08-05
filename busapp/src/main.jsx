import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signup from './Signup.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import { rootreducer } from './Reducers/Loginreducers.js'
import {createStore} from 'redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Provider} from 'react-redux'
import Bus from './Bus.jsx'
import Busconfig from './Bus/Busconfig.jsx'
import BusModify from './Bus/BusModify.jsx'
import AddRoutes from './Bus/Addroute.jsx'
import Booking from './Booking.jsx'
import Nav from './Nav.jsx'


var store=createStore(rootreducer)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter >
      <Nav/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
      
        <Route path='/login' element={<Login/>}/>
        <Route path='/bus/:journey_date/:busname/:boarding/:destination' element={<Bus/>}/>
        <Route path='/busconfig' element={<Busconfig />}/>
        <Route path='/busmodify' element={<BusModify/>}/>
        <Route path='/addroute/:id' element={<AddRoutes/>}/>
        <Route path='/booking/:id' element={<Booking/>} />

      </Routes>
    
    </BrowserRouter>
    </Provider>
    
   
  </StrictMode>,
)
