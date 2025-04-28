import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const EditProfile = () => {
    const navigate  = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [error, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{await axios.post("http://localhost:3000/submit",formData, {
            withCredentials: true,
        });
        navigate("/profile");

    }catch(error){
        setError("Error ocurred: ", error)
    } 
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="form-control w-full text-center p-2 border border-gray-300 rounded"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="mobile"
              placeholder="Enter new mobile number"
              className="form-control w-full text-center p-2 border border-gray-300 rounded"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="email"
              placeholder="Enter new email"
              className="form-control w-full text-center p-2 border border-gray-300 rounded"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Submit
          </button>
          {error && <p style={{color: "red"}}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
