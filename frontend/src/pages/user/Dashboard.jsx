import React  from "react";
import './dashboard.css';
import { useNavigate, useLocation } from "react-router-dom";

function Dashboard(){
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;
    const goToProfile = ()=>{
        navigate("/profile", { state: { user: user } });

    }
    return <div className="dashboard-container">
        <p >This is user dashboard</p>
        <button onClick={goToProfile}>View profile</button>
        
    </div>

}
export default Dashboard;