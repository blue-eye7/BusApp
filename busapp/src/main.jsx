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
import Busconfig from './Busconfig.jsx'


var store=createStore(rootreducer)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter >
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
      
        <Route path='/login' element={<Login/>}/>
        <Route path='/bus/:busname/:boarding/:destination' element={<Bus/>}/>
        <Route path='/busconfig' element={<Busconfig/>}/>

      </Routes>
    
    </BrowserRouter>
    </Provider>
    
   
  </StrictMode>,
)
