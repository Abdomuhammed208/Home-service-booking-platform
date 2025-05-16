import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/authentication/Login.jsx';
import Signup from './pages/authentication/Signup.jsx';
import Topup from './pages/customer/Topup.jsx';
import Main from './pages/Main.jsx';
import Profile from './pages/customer/Profile.jsx';
import Dashboard from './pages/customer/Dashboard.jsx';
import Taskerdashboard from './pages/tasker/Tasker_dashboard.jsx';
import Admin from './pages/admin/Admin.jsx';
import NotFound from './components/Notfound.jsx';
import EditProfile from './pages/customer/EditProfile.jsx';
import TopupTasker from './pages/tasker/TopupTasker.jsx';
import TaskerProfile from './pages/tasker/TaskerProfile.jsx';
import NewPost from './pages/posts/NewPost.jsx';
import EditPost from './pages/posts/EditPost.jsx';
import EditProfileTasker from './pages/tasker/EditProfileTasker.jsx';
import UserAccount from './pages/users/UserAccount.jsx';
import Checkout from './pages/customer/Checkout.jsx';
import ChatBox from './pages/chat/ChatBox.jsx';
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
     <Route path='/post/:id/edit' element={<EditPost/>}/>
     <Route path='/edit-profile-tasker' element={<EditProfileTasker/>}/>
     <Route path='/tasker/:taskerId' element={<UserAccount/>}/>
     <Route path='/checkout' element={<Checkout/>}/>
     <Route path='/chat/:taskerId' element={<ChatBox/>}/>
     </Routes>
     </BrowserRouter>
    
    </div>
  );
}

export default App;
