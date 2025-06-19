import axios from "axios";
import { useEffect, useState } from "react";

function Admin() {
    const [taskers, setTaskers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedSection, setSelectedSection] = useState("taskers");

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3000/admin", { withCredentials: true });
            setTaskers(response.data.taskers || []);
            const paymentRes = await axios.get("http://localhost:3000/admin/payments", { withCredentials: true });
            setPayments(paymentRes.data.payments || []);
            const bookingRes = await axios.get("http://localhost:3000/admin/bookings", { withCredentials: true });
            setBookings(bookingRes.data.bookings || []);
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

    // --- Styles ---
    const pageStyle = {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fef7ed 0%, #fdf2f8 100%)",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: "32px 8px"
    };
    const cardStyle = {
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(80, 112, 255, 0.07)",
        padding: "32px 24px",
        maxWidth: "1100px",
        margin: "32px auto 24px auto",
        width: "100%"
    };
    const sectionTitleStyle = {
        color: "#ea580c",
        fontWeight: 700,
        fontSize: "1.4rem",
        marginBottom: "1rem"
    };
    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "1rem"
    };
    const thStyle = {
        background: "#fff7ed",
        color: "#ea580c",
        fontWeight: 600,
        padding: "12px",
        borderBottom: "2px solid #fed7aa"
    };
    const tdStyle = {
        padding: "10px",
        borderBottom: "1px solid #f3f4f6",
        textAlign: "center"
    };
    const searchStyle = {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #fed7aa",
        marginBottom: "1.5rem",
        fontSize: "1rem"
    };
    const buttonStyle = {
        backgroundColor: "#ea580c",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        padding: "8px 18px",
        fontWeight: 600,
        cursor: "pointer",
        margin: "0 4px"
    };
    const logoutButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#f43f5e",
        marginLeft: "auto"
    };
    const tabBarStyle = {
        display: "flex",
        justifyContent: "center",
        gap: "24px",
        marginBottom: "2rem"
    };
    const tabButtonStyle = (active) => ({
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: active ? "#fff7ed" : "transparent",
        color: active ? "#ea580c" : "#1f2937",
        border: "none",
        borderBottom: active ? "3px solid #ea580c" : "3px solid transparent",
        fontWeight: 600,
        fontSize: "1.1rem",
        padding: "10px 24px",
        borderRadius: "8px 8px 0 0",
        cursor: "pointer",
        transition: "all 0.2s"
    });

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                    <h1 style={{ color: "#1f2937", fontWeight: 700, fontSize: "2rem", margin: 0 }}>Admin Dashboard</h1>
                    <button style={logoutButtonStyle} onClick={handleLogout}>Logout</button>
                </div>
                <div style={tabBarStyle}>
                    <button style={tabButtonStyle(selectedSection === "taskers")}
                        onClick={() => setSelectedSection("taskers")}
                    >
                        <span role="img" aria-label="Taskers">👤</span> Taskers
                    </button>
                    <button style={tabButtonStyle(selectedSection === "payments")}
                        onClick={() => setSelectedSection("payments")}
                    >
                        <span role="img" aria-label="Payments">💳</span> Payments
                    </button>
                    <button style={tabButtonStyle(selectedSection === "bookings")}
                        onClick={() => setSelectedSection("bookings")}
                    >
                        <span role="img" aria-label="Bookings">📅</span> Bookings
                    </button>
                </div>
                {selectedSection === "taskers" && (
                    <>
                        <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>Manage all tasker accounts below.</p>
                        <input
                            type="text"
                            style={searchStyle}
                            placeholder="Search by name, email, city, or service..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <h2 style={sectionTitleStyle}>All Tasker Accounts</h2>
                        <div style={{ overflowX: "auto" }}>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th style={thStyle}>Name</th>
                                        <th style={thStyle}>Email</th>
                                        <th style={thStyle}>Mobile</th>
                                        <th style={thStyle}>City</th>
                                        <th style={thStyle}>Service</th>
                                        <th style={thStyle}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTaskers.length > 0 ? (
                                        filteredTaskers.map(tasker => (
                                            <tr key={tasker.id}>
                                                <td style={tdStyle}>{tasker.name}</td>
                                                <td style={tdStyle}>{tasker.email}</td>
                                                <td style={tdStyle}>{tasker.mobile}</td>
                                                <td style={tdStyle}>{tasker.city}</td>
                                                <td style={tdStyle}>{tasker.service}</td>
                                                <td style={tdStyle}>
                                                    <button style={buttonStyle} onClick={() => handleDelete(tasker.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: "center", color: "#888" }}>
                                                No taskers found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
                {selectedSection === "payments" && (
                    <>
                        <h2 style={sectionTitleStyle}>Payments</h2>
                        <div style={{ overflowX: "auto" }}>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th style={thStyle}>Payment ID</th>
                                        <th style={thStyle}>Tasker</th>
                                        <th style={thStyle}>Amount</th>
                                        <th style={thStyle}>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.length > 0 ? (
                                        payments.map(payment => (
                                            <tr key={payment.id}>
                                                <td style={tdStyle}>{payment.id}</td>
                                                <td style={tdStyle}>{payment.tasker_name}</td>
                                                <td style={tdStyle}>{payment.amount} RM</td>
                                                <td style={tdStyle}>{new Date(payment.created_at).toLocaleString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: "center", color: "#888" }}>
                                                No payments found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
                {selectedSection === "bookings" && (
                    <>
                        <h2 style={sectionTitleStyle}>Bookings</h2>
                        <div style={{ overflowX: "auto" }}>
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th style={thStyle}>Booking ID</th>
                                        <th style={thStyle}>User</th>
                                        <th style={thStyle}>Tasker</th>
                                        <th style={thStyle}>Status</th>
                                        <th style={thStyle}>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.length > 0 ? (
                                        bookings.map(booking => (
                                            <tr key={booking.id}>
                                                <td style={tdStyle}>{booking.id}</td>
                                                <td style={tdStyle}>{booking.user_name}</td>
                                                <td style={tdStyle}>{booking.tasker_name}</td>
                                                <td style={tdStyle}>{booking.booking_status}</td>
                                                <td style={tdStyle}>{new Date(booking.date).toLocaleString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: "center", color: "#888" }}>
                                                No bookings found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Admin;