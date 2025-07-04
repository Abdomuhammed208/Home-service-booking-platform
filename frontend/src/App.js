import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom"
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
import CustomerAccount from './pages/users/CustomerAccount.jsx';
import Transfer from './pages/users/Transfer.jsx';
import Notification from './pages/customer/Notification.jsx';
import Order from './pages/users/Order.jsx';
import ConversationList from './pages/users/ConversationList.jsx';
import AllOrder from './pages/tasker/AllOrder.jsx';
import ChatList from './pages/tasker/ChatList.jsx';
import Conversation from './pages/tasker/Conversation.jsx';
import TNotification from './pages/tasker/TNotification.jsx';
import VerificationPage from './pages/users/VerificationPage.jsx';
import AuthPage from './pages/authentication/AuthPage.jsx';
function App() {

  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Main />}/>
     <Route path='/auth' element={<AuthPage />}/>
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
     <Route path='/customer/:customerId' element={<CustomerAccount/>}/>
     <Route path='/tasker/:taskerId/transfer' element={<Transfer/>}/>
     <Route path='/notification/:userId' element={<Notification/>}/>
     <Route path='/order/:userId' element={<Order/>}/>
     <Route path='/conversation-list/:userId' element={<ConversationList/>}/>
     <Route path='/allorder/:taskerId' element={<AllOrder/>}/>
     <Route path='/chat-list/:taskerId' element={<ChatList/>}/>
     <Route path='/chatbox/:customerId' element={<Conversation/>}/>
     <Route path='/tasker-notification/:userId' element={<TNotification/>}/>
     <Route path='/verify/:taskerId' element={<VerificationPage/>}/>
     </Routes>
     </BrowserRouter>
    
    </div>
  );
}

export default App;
