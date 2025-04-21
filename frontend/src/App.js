import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/authentication/Login.jsx';
import Signup from './pages/authentication/Signup.jsx';
import Topup from './pages/user/Topup.jsx';
import Main from './pages/Main.jsx';
import Profile from './pages/user/Profile.jsx';
import Dashboard from './pages/user/Dashboard.jsx';
import Taskerdashboard from './pages/tasker/Tasker_dashboard.jsx';
import Admin from './pages/admin/Admin.jsx';
import NotFound from './components/Notfound.jsx';
function App() {

  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Main />}/>
     <Route path='/login' element={<Login />}/>
     <Route path='/signup' element={<Signup />}/>
     <Route path='/top-up' element={<Topup/>}/>
     <Route path='/dashboard' element={<Dashboard/>}/>
     <Route path='/tasker-dashboard' element={<Taskerdashboard/>}/>
     <Route path='/profile' element={<Profile/>}/>
     <Route path='/admin' element={<Admin/>}/>
     <Route path='/notfounr' element={<NotFound/>}/>

     </Routes>
     </BrowserRouter>
    
    </div>
  );
}

export default App;
