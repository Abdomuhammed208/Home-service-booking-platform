// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// function Profile() {
//   const location = useLocation();
//   const user = location.state?.user;
//   const [users, setUser] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/profile");
//         if (response.data && response.data.users.length > 0) {
//           setUser(response.data.users[0]);
//           console.log(response.data);
          
//         }
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>This is user's profile</h2>
//       {user && 
//         <div>
//           {/* <h4 style={{color: "black"}} >Name: {user.name}</h4> */}
//           {/* <h4 style={{color: "black"}} >Email: {user.email}</h4> */}
//           <h1>Welcome, {user?.name || "User"}!</h1>
//           <p>Your role: {user?.role}</p>
//         </div>
//       }
//     </div>
//   );
// }

// export default Profile;

import React from "react";
import { useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div>
      <h2>This is user's profile</h2>
      {user ? (
        <div>
          <h4 style={{ color: "black" }}>Name: {user.name}</h4>
          <h4 style={{ color: "black" }}>Email: {user.email}</h4>
          <h4 style={{ color: "black" }}>Mobile: {user.mobile}</h4>
          <h4 style={{ color: "black" }}>Your Balance: {user.money} RM</h4>
        </div>
      ) : (
        <p>No user data passed.</p>
      )}
    </div>
  );
}

export default Profile;
