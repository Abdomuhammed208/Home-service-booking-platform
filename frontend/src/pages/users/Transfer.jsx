import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function Transfer() {
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {taskerId} = useParams();
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(amount > 0){
            axios.post(`http://localhost:3000/tasker/${taskerId}/transfer`, {amount},{
                withCredentials: true,
            })
            navigate("/dashboard");
        }else{
            setError("Invalid Amount")
        }
      
    }
    const handleChange = (e)=>{
        setAmount(e.target.value)
    }
    return <div className="container">
        <div className="top-up-container">
            <form onSubmit={handleSubmit}>
            <h1 className="form-title">Transfer</h1>
            <div className="input-wrapper">
                <input
                value = {amount}
                name="amount"
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your amount"
                type="text" required />
            </div>
            {error && <p style={{color: "red"}}>{error}</p>}
            <button className="top-up-button" type="submit">Submit</button>
            <button className="top-up-button" onClick={() => navigate("/tasker/:taskerId")}>Cancel</button>
            </form>
        </div>
    </div>
}
export default Transfer;