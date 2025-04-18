import React  from "react";
import { useLocation } from "react-router-dom";


function Taskerdashboard(){
    const location = useLocation();
    const user = location.state?.user;

    return <div>
        <p style={{color: "black"}}>This is Tasker's dashboard</p>
        <h4 style={{ color: "black" }}>Name: {user.name}</h4>
          <h4 style={{ color: "black" }}>Email: {user.email}</h4>
          <h4 style={{ color: "black" }}>Mobile: {user.mobile}</h4>
          <h4 style={{ color: "black" }}>City: {user.city}</h4>
          <h4 style={{ color: "black" }}>Your Balance: {user.money} RM</h4>
    </div>

}
export default Taskerdashboard;