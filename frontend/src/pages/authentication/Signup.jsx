import React, { useState } from "react";
import './signup.css';
import { useNavigate } from "react-router-dom";
function Signup() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('customer');
    

    return (    <div>
        <header>
        <nav className="navbar">
		<div className="navdivv">
			<div className="logo"><a href="/">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40"><path fill="#0088A9" d="M20 0c11.046 0 20 8.954 20 20v14a6 6 0 0 1-6 6H21v-8.774c0-2.002.122-4.076 1.172-5.78a10 10 0 0 1 6.904-4.627l.383-.062a.8.8 0 0 0 0-1.514l-.383-.062a10 10 0 0 1-8.257-8.257l-.062-.383a.8.8 0 0 0-1.514 0l-.062.383a9.999 9.999 0 0 1-4.627 6.904C12.85 18.878 10.776 19 8.774 19H.024C.547 8.419 9.29 0 20 0Z"></path><path fill="#F06225" d="M0 21h8.774c2.002 0 4.076.122 5.78 1.172a10.02 10.02 0 0 1 3.274 3.274C18.878 27.15 19 29.224 19 31.226V40H6a6 6 0 0 1-6-6V21ZM40 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path></svg>

            </a> </div>
            
		</div>
	</nav>
    </header>
    <div>
    {userType === 'customer' ? <CustomerForm /> : <TaskerForm />}

    </div>
    </div>
    )
function SwitchUser(){
return(<div>
    <button
    className="customer-registration-btn"
        
        onClick={() => setUserType('customer')}
     >Customer
     </button>
     <button
     className="tasker-registration-btn"
        onClick={() => setUserType('tasker')}
     >Tasker</button>

    </div>)
}

    function CustomerForm() {
        const [message, setMessage] = useState();
        const [formData, setFormData] = useState({
            name: "",
            email: "",
            mobile: "",
            password: "",
        });

        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setMessage("");

            const response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            try {
                if (!response.ok) {
                    setMessage(data.message || "Something went wrong.");
                } else {
                    navigate("/login", {state: {message:data.message}})
                }
            } catch (err) {
                console.error("Frontend error:", err);
                setMessage("Could not connect to the server.");
            }

        };

        return (
            <div className="container">
                <div className="signup-container">
                    <h1 className="form-title">Sign up</h1>
                    <SwitchUser/>
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <input
                                className="input-field"
                                placeholder="Name"
                                type="text"
                                onChange={handleChange}
                                name="name"
                                required
                            />
                        </div>
                        <div className="input-wrapper">
                            <input
                                className="input-field"
                                placeholder="Mobile no."
                                type="text"
                                onChange={handleChange}
                                name="mobile"
                                required
                            />
                        </div>
                        <div className="input-wrapper">
                            <input
                                className="input-field"
                                placeholder="Email"
                                type="email"
                                onChange={handleChange}
                                name="email"
                                required
                            />
                        </div>
                        <div className="input-wrapper">
                            <input
                                className="input-field"
                                placeholder="Password"
                                type="password"
                                onChange={handleChange}
                                name="password"
                                required
                            />
                        </div>
                        {message && <p style={{ color: 'red' }}>{message}</p>}
                        <button className="signup-button" type="submit">Sign up</button>
                    </form>
                    <p className="sign-up-text">
                        I have an account?
                        <a href="/login"> Login</a>
                    </p>
                </div>
            </div>
        );
    }

    function TaskerForm() {
        const [message, setMessage] = useState();
        const [formData, setFormData] = useState({
            name: "",
            email: "",
            mobile: "",
            password: "",
            city: "",
            gender: "",
            service: "",
        });

        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setMessage("");

            const response = await fetch("http://localhost:3000/tasker-signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            try {
                if (!response.ok) {
                    setMessage(data.message || "Something went wrong.");
                } else {
                    navigate("/login", {state: {message: data.message}})
                }
            } catch (err) {
                console.error("Frontend error:", err);
                setMessage("Could not connect to the server.");
            }

        };

        return (
            <div className="container">
                <div className="signup-container">
                    <h1 className="form-title">Sign up</h1>
                    <SwitchUser/>

                    <form className="signup-form" onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <input
                                className="input-field"
                                placeholder="Name"
                                type="text"
                                onChange={handleChange}
                                name="name"
                                required
                            />
                        </div>
                        <div className="input-wrapper">
                            <input
                                className="input-field"
                                placeholder="Mobile no."
                                type="text"
                                onChange={handleChange}
                                name="mobile"
                                required
                            />
                        </div>
                        <div className="input-wrapper">
                            <input
                                className="input-field"
                                placeholder="Email"
                                type="email"
                                onChange={handleChange}
                                name="email"
                                required
                            />
                        </div>
                        <input onChange={handleChange} type="radio" name="gender" value="male" /> <label for="group">Male</label>
                        <input onChange={handleChange} type="radio" name="gender" value="female" /> <label for="individual">Female</label>

                                <select
                                    name="city"
                                    onChange={handleChange}
                                >
                                    <option value="">Select your city</option>
                                    <option value="cyberjaya">Cyberjaya</option>
                                    <option value="petlingjaya">Petling jaya</option>
                                </select>
                                <div className="input-wrapper">
                                    <input
                                        name="service"
                                        className="input-field"
                                        type="text"
                                        placeholder="Service (e.g. Plumbing)"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <input
                                        className="input-field"
                                        placeholder="Password"
                                        type="password"
                                        onChange={handleChange}
                                        name="password"
                                        required
                                    />
                                </div>
                                {message && <p style={{ color: 'red' }}>{message}</p>}
                                <button className="signup-button" type="submit">Sign up</button>
                    </form>
                            <p className="sign-up-text">
                                I have an account?
                                <a href="/login"> Login</a>
                            </p>
                        </div>
                </div>
                );
    }

}
 export default Signup;