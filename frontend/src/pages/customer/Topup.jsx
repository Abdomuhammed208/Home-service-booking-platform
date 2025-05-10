import React, { useState } from "react";
import './top-up.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Topup() {
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(amount > 0){
            axios.post("http://localhost:3000/top-up", {amount},{
                withCredentials: true,
            })
            
            navigate("/profile");
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
            <h1 className="form-title">Top up</h1>
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
            </form>
        </div>
    </div>
}
export default Topup;