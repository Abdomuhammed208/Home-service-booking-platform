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
import EditProfile from './pages/user/EditProfile.jsx';
import TopupTasker from './pages/tasker/TopupTasker.jsx';
import TaskerProfile from './pages/tasker/TaskerProfile.jsx';
import NewPost from './pages/posts/NewPost.jsx';
function App() {

  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Main />}/>
     <Route path='/login' element={<Login />}/>
     <Route path='/signup' element={<Signup />}/>
     <Route path='/top-up' element={<Topup/>}/>
     <Route path='/top-up-tasker' element={<TopupTasker/>}/>
     <Route path='/dashboard' element={<Dashboard/>}/>
     <Route path='/tasker-dashboard' element={<Taskerdashboard/>}/>
     <Route path='/profile' element={<Profile/>}/>
     <Route path='/edit-profile' element={<EditProfile/>}/>
     <Route path='/admin' element={<Admin/>}/>
     <Route path='/notfound' element={<NotFound/>}/>
     <Route path='/tasker-profile' element={<TaskerProfile/>}/>
     <Route path='/new-post' element={<NewPost/>}/>
     </Routes>
     </BrowserRouter>
    
    </div>
  );
}

export default App;
