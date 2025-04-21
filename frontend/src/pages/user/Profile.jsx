import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotFound from "../../components/Notfound";


function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      method: "GET",
      credentials: "include"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err);
      });
  }, []);

  const handleLogout = async () =>{
    try{
       axios.post("http://localhost:3000/logout",{},{
        withCredentials: true,
      })
      navigate("/login");
    }catch(err){
      console.log("Logout failed:", err);
    }
    
  
  }
  const handleDelete = async ()=>{
    const confirmDelete = window.confirm("Are you sure to delete this account?")
    if(!confirmDelete) return;
      try{
        const response = await  axios.post("http://localhost:3000/delete-account",{},{
          withCredentials: true,
        })
        if(response.data.success){
          alert("The account has been deleted successfully")
          navigate("/login")
        }else{
          alert(response.data.message || "Failed to delete account.");
        }
      }catch (error) {
        console.error("Error deleting account:", error);
        alert("An error occurred while deleting your account.");
      }
  }


  return (
    <div>
      {user ? (
        <div>
           <h2>This is user's profile</h2>
          <h4 style={{ color: "black" }}>Name: {user.name}</h4>
          <h4 style={{ color: "black" }}>Email: {user.email}</h4>
          <h4 style={{ color: "black" }}>Mobile: {user.mobile}</h4>
          <h4 style={{ color: "black" }}>Your Balance: {user.money} RM</h4>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        // <p style={{ color: "black" }}>Loading profile...</p>
        <NotFound />
      )}
    </div>
  );
}

export default Profile;
