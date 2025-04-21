import { useEffect, useState } from 'react';
import './dashboard.css';
import {  useLocation, useNavigate } from "react-router-dom";

function Dashboard(){
    const location = useLocation();
    const navigate = useNavigate();
    const successfulMessage = location.state?.loginMessage;
    const [message, setMessage] = useState('');
    useEffect(()=>{
        if(successfulMessage){
            setMessage(successfulMessage);
            navigate(location.pathname,{replace: true})
        }
    },[location, navigate, successfulMessage])
    return <div>
     <div className="dashboard-container">
        <p >This is user dashboard</p>
        <a href="/profile"><p>view profile</p></a>        
    </div>
    {message && <p style={{ color: "green" }}>{message}</p>}

    </div>

}
export default Dashboard;