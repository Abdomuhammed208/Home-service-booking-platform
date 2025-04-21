import React  from "react";
import './dashboard.css';
import {  useLocation } from "react-router-dom";

function Dashboard(){
    const location = useLocation();
    const message = location.state?.loginMessage;
    return <div>
     <div className="dashboard-container">
        <p >This is user dashboard</p>
        <a href="/profile"><p>view profile</p></a>        
    </div>
    {message && <p style={{ color: "green" }}>{message}</p>}

    </div>

}
export default Dashboard;