import React from "react";
import './top-up.css'
function Topup() {
    return <div className="container">
        <div className="top-up-container">
            <h1 className="form-title">Top up</h1>
            <div className="input-wrapper">
                <input className="input-field" placeholder="Enter your amount" type="text" required />
            </div>
            <button className="top-up-button" type="submit">Submit</button>
        </div>
    </div>

}
export default Topup;