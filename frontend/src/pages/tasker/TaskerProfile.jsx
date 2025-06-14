import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { useState, useEffect, use } from "react";
import axios from "axios";
import NotFound from "../../components/Notfound";

function TaskerProfile() {
    const navigate = useNavigate();
    const [tasker, setTasker] = useState(null);
    const [taskerId, setTaskerId] = useState(null);
    const [feedback, setFeedback] = useState(null);
    console.log(taskerId);
    
    const verificationUrl = `http://localhost:3001/verify/${taskerId}`;

    const goToTopupPage = () => {
        navigate("/top-up-tasker");
    };

    useEffect(() => {
        fetch("http://localhost:3000/tasker-profile", {
            method: "GET",
            credentials: "include"
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data) => {
                setTasker(data.tasker);
                setFeedback(data.feedback);
                setTaskerId(data.tasker.id);
            })
            .catch((err) => {
                console.error("Failed to fetch tasker profile:", err);
            });

            const fetchFeedback = async () => {
                const feedbackResponse = await fetch(`http://localhost:3000/tasker/${taskerId}/feedback`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    credentials: "include"
                });
        
                if (feedbackResponse.ok) {
                    const feedbackData = await feedbackResponse.json();
                    setFeedback(feedbackData.feedback || []);
                }
            };

            fetchFeedback();
    }, [taskerId]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('profile_image', file);

                const response = await axios.post('http://localhost:3000/upload-tasker-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                });

                if (response.data.success) {
                    setTasker(prev => ({
                        ...prev,
                        profile_image: response.data.image_url
                    }));
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };


    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/logout", {}, {
                withCredentials: true,
            });
            navigate("/login");
        } catch (err) {
            console.log("Logout failed:", err);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure to delete this account?");
        if (!confirmDelete) return;
        try {
            const response = await axios.post("http://localhost:3000/delete-account", {}, {
                withCredentials: true,
            });
            if (response.data.success) {
                alert("The account has been deleted successfully");
                navigate("/login");
            } else {
                alert(response.data.message || "Failed to delete account.");
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("An error occurred while deleting your account.");
        }
    };

    if (!tasker) return <NotFound />;

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef7ed 0%, #fdf2f8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '32px 16px'
    };

    const cardStyle = {
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(80, 112, 255, 0.07)',
        padding: '40px 32px 32px 32px',
        maxWidth: '1000px',
        width: '100%',
        margin: '32px 0',
        display: 'flex',
        flexDirection: 'column'
    };

    const headerBarStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        width: '100%'
    };
    const headerTitleStyle = {
        flex: 1,
        textAlign: 'center',
        fontSize: '2rem',
        fontWeight: 700,
        color: '#1f2937'
    };
    const headerLinkStyle = {
        color: '#ea580c',
        textDecoration: 'none',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center'
    };

    const mainContentStyle = {
        display: 'flex',
        gap: '40px',
        marginBottom: '40px'
    };

    const leftSectionStyle = {
        flex: '0 0 300px'
    };

    const rightSectionStyle = {
        flex: '1'
    };

    const imageSectionStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem'
    };

    const imageContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        width: '100%'
    };

    const imageStyle = {
        width: '250px',
        height: '250px',
        borderRadius: '125px',
        objectFit: 'cover',
        border: '3px solid #ea580c',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const imagePlaceholderStyle = {
        width: '250px',
        height: '250px',
        borderRadius: '125px',
        backgroundColor: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '4rem',
        fontWeight: 'bold',
        color: '#ea580c',
        border: '3px solid #ea580c'
    };

    const changePhotoButtonStyle = {
        backgroundColor: '#ea580c',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        border: 'none',
        transition: 'background-color 0.3s'
    };

    const infoSectionStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem'
    };

    const infoItemStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
    };

    const infoLabelStyle = {
        fontWeight: 600,
        color: '#2c3e50',
        marginBottom: '0.5rem'
    };

    const infoValueStyle = {
        color: '#34495e'
    };

    const buttonGroupStyle = {
        display: 'flex',
        gap: '1rem',
        marginTop: '2rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
    };

    const btnStyle = {
        padding: '0.75rem 1.5rem',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        fontSize: '1rem'
    };

    const btnTopupStyle = {
        ...btnStyle,
        backgroundColor: '#ea580c',
        color: 'white'
    };

    const btnLogoutStyle = {
        ...btnStyle,
        backgroundColor: '#f3f4f6',
        color: '#ea580c'
    };

    const btnDeleteStyle = {
        ...btnStyle,
        backgroundColor: '#f43f5e',
        color: 'white'
    };

    const feedbackSectionStyle = {
        marginTop: '2.5rem'
    };

    const feedbackTitleStyle = {
        color: '#ea580c',
        fontWeight: 700,
        fontSize: '1.2rem',
        marginBottom: '1rem'
    };

    const feedbackListStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    };

    const feedbackItemStyle = {
        background: '#f8fafc',
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0 1px 3px rgba(80, 112, 255, 0.07)'
    };

    const feedbackCommentStyle = {
        color: '#374151',
        marginBottom: '0.5rem'
    };

    const feedbackRatingCenterStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.5rem'
    };

    const feedbackRatingStyle = {
        color: '#ea580c',
        fontWeight: 600
    };

    const feedbackUserStyle = {
        color: '#6b7280',
        fontSize: '0.98rem',
        cursor: 'pointer',
        textDecoration: 'underline'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={headerBarStyle}>
                    <a href="/tasker-dashboard" style={headerLinkStyle}>
                        <span className="material-symbols-outlined" style={{ marginRight: '6px' }}>arrow_back</span>
                        Back to Dashboard
                    </a>
                    <div style={headerTitleStyle}>Profile Details</div>
                    <a href="/edit-profile-tasker" style={headerLinkStyle}>Edit Profile</a>
                </div>

                <div style={mainContentStyle}>
                    <div style={leftSectionStyle}>
                        <div style={imageSectionStyle}>
                            <div style={imageContainerStyle}>
                                {tasker.profile_image ? (
                                    <img
                                        src={`http://localhost:3000${tasker.profile_image}`}
                                        alt="Profile"
                                        style={imageStyle}
                                    />
                                ) : (
                                    <div style={imagePlaceholderStyle}>
                                        {tasker.name ? tasker.name.charAt(0).toUpperCase() : '?'}
                                    </div>
                                )}
                                <label style={changePhotoButtonStyle}>
                                    Change Photo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                </label>
                                <div style={{ marginTop: '16px', border: '1px solid #ccc', borderRadius: '8px', padding: '8px', background: '#fff' }}>
                                    <QRCode value={verificationUrl} size={220} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={rightSectionStyle}>
                        <div style={infoSectionStyle}>
                            <div style={infoItemStyle}>
                                <span style={infoLabelStyle}>Name</span>
                                <span style={infoValueStyle}>{tasker.name}</span>
                            </div>
                            <div style={infoItemStyle}>
                                <span style={infoLabelStyle}>Email</span>
                                <span style={infoValueStyle}>{tasker.email}</span>
                            </div>
                            <div style={infoItemStyle}>
                                <span style={infoLabelStyle}>Mobile</span>
                                <span style={infoValueStyle}>{tasker.mobile}</span>
                            </div>
                            <div style={infoItemStyle}>
                                <span style={infoLabelStyle}>City</span>
                                <span style={infoValueStyle}>{tasker.city}</span>
                            </div>
                            <div style={infoItemStyle}>
                                <span style={infoLabelStyle}>Service</span>
                                <span style={infoValueStyle}>{tasker.service}</span>
                            </div>
                            <div style={infoItemStyle}>
                                <span style={infoLabelStyle}>Balance</span>
                                <span style={infoValueStyle}>{tasker.money} RM</span>
                            </div>
                        </div>

                        <div style={buttonGroupStyle}>
                            <button onClick={goToTopupPage} style={btnTopupStyle}>Top Up</button>
                            <button onClick={handleLogout} style={btnLogoutStyle}>Logout</button>
                            <button onClick={handleDelete} style={btnDeleteStyle}>Delete Account</button>
                        </div>
                    </div>
                </div>

                {feedback && feedback.length > 0 && (
                    <div style={feedbackSectionStyle}>
                        <h2 style={feedbackTitleStyle}>Feedback</h2>
                        <div style={feedbackListStyle}>
                            {feedback.map((item, index) => (
                                <div key={index} style={feedbackItemStyle}>
                                    <p style={feedbackCommentStyle}>{item.comment}</p>
                                    <div style={feedbackRatingCenterStyle}>
                                        <span style={feedbackRatingStyle}>{item.rating} ★</span>
                                    </div>
                                    <p style={feedbackUserStyle} onClick={() => navigate(`/customer/${item.user_id}`)}>Rated by: {item.user_name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskerProfile;
 