import axios from "axios";
import { useEffect, useState } from "react";
import "./AdminDashboard.css";

function Admin() {
    const [taskers, setTaskers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3000/admin", { withCredentials: true });
            setTaskers(response.data.taskers || []);
            console.log(response.data.taskers);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirm = window.confirm("Are you sure you want to delete this tasker?");
            if (confirm) {
                await axios.delete(`http://localhost:3000/admin/${id}`, { withCredentials: true });
                setTaskers(taskers.filter(tasker => tasker.id !== id));
            }
        } catch (error) {
            console.error("Error deleting tasker:", error);
        }
    };
    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/logout", { withCredentials: true });
            window.location.href = "/";
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    const filteredTaskers = taskers.filter(tasker =>
        tasker.name?.toLowerCase().includes(search.toLowerCase()) ||
        tasker.email?.toLowerCase().includes(search.toLowerCase()) ||
        tasker.city?.toLowerCase().includes(search.toLowerCase()) ||
        tasker.service?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="admin-dashboard-container">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Manage all tasker accounts below.</p>
            </div>
            <div className="admin-controls">
                <input
                    type="text"
                    className="admin-search"
                    placeholder="Search by name, email, city, or service..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="admin-table-card">
                <h2>All Tasker Accounts</h2>
                <div className="admin-table-wrapper">
                    <button className="admin-button" onClick={handleDelete}>Delete</button>
                    <table className="admin-table"> 
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>City</th>
                                <th>Service</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTaskers.length > 0 ? (
                                filteredTaskers.map(tasker => (
                                    <tr key={tasker.id}>
                                        <td><input type="checkbox" onChange={() => handleDelete(tasker.id)} /></td>
                                        <td>{tasker.name}</td>
                                        <td>{tasker.email}</td>
                                        <td>{tasker.mobile}</td>
                                        <td>{tasker.city}</td>
                                        <td>{tasker.service}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center", color: "#888" }}>
                                        No taskers found.
                                    </td>
                                </tr>
                            )}
                            <button className="admin-button" onClick={handleLogout}>Logout</button>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Admin;