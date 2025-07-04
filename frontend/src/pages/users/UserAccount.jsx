import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserAccount.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

function UserAccount() {
    const [tasker, setTasker] = useState(null);
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [feedbackText, setFeedbackText] = useState("");
    const { taskerId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchTaskerData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tasker/${taskerId}`, {
                    method: "GET",
                    credentials: "include"
                });
                
                if (!response.ok) {
                    throw new Error("Failed to fetch tasker profile");
                }
                
                const data = await response.json();
                setTasker(data.taskers);

                // Fetch feedback for this tasker
                const feedbackResponse = await fetch(`http://localhost:3000/tasker/${taskerId}/feedback`, {
                    method: "GET",
                    credentials: "include"
                });

                if (feedbackResponse.ok) {
                    const feedbackData = await feedbackResponse.json();
                    setFeedback(feedbackData.feedback || []);
                }
            } catch (err) {
                console.error("Failed to fetch tasker data:", err);
                setError("Failed to load tasker profile");
            } finally {
                setLoading(false);
            }
        };

        fetchTaskerData();
    }, [taskerId]);

    if (loading) {
        return <div className="profile-container">Loading...</div>;
    }

    if (error) {
        return <div className="profile-container">{error}</div>;
    }

    if (!tasker) {
        return <div className="profile-container">No profile data available</div>;
    }

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert("Please select a rating");
            return;
        }
        if (!feedbackText.trim()) {
            alert("Please enter your feedback");
            return;
        }
        try {
            const response = await axios.post(`http://localhost:3000/tasker/${taskerId}/feedback`, {
                feedback: feedbackText,
                rating,
                tasker_id: taskerId
            }, {
                withCredentials: true
            });
            if (response.status === 200) {
                alert("Feedback submitted successfully");
                setFeedbackText("");
                setRating(0);
                // Refresh feedback list
                const feedbackResponse = await fetch(`http://localhost:3000/tasker/${taskerId}/feedback`, {
                    method: "GET",
                    credentials: "include"
                });
                if (feedbackResponse.ok) {
                    const feedbackData = await feedbackResponse.json();
                    setFeedback(feedbackData.feedback || []);
                }
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert(error.response?.data?.message || "Failed to submit feedback");
        }
    }

    // Inline styles for new layout
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
        flexDirection: 'column',
        gap: '32px'
    };
    const mainContentStyle = {
        display: 'flex',
        gap: '40px',
        marginBottom: '24px',
        flexWrap: 'wrap'
    };
    const leftSectionStyle = {
        flex: '0 0 250px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: '200px'
    };
    const rightSectionStyle = {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '250px'
    };
    const imageStyle = {
        width: '200px',
        height: '200px',
        borderRadius: '100px',
        objectFit: 'cover',
        border: '3px solid #ea580c',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '1rem'
    };
    const imagePlaceholderStyle = {
        width: '200px',
        height: '200px',
        borderRadius: '100px',
        backgroundColor: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '4rem',
        fontWeight: 'bold',
        color: '#ea580c',
        border: '3px solid #ea580c',
        marginBottom: '1rem'
    };
    const infoItemStyle = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '0.5rem'
    };
    const infoLabelStyle = {
        fontWeight: 600,
        color: '#2c3e50',
        marginBottom: '0.25rem'
    };
    const infoValueStyle = {
        color: '#34495e'
    };
    const buttonRowStyle = {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
        flexWrap: 'wrap'
    };
    const chatButtonStyle = {
        backgroundColor: '#ea580c',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 24px',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background 0.2s',
        marginBottom: '0.5rem'
    };
    const feedbackSectionStyle = {
        marginTop: '2rem',
        width: '100%'
    };
    const feedbackFormContainerStyle = {
        background: '#f8fafc',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 1px 3px rgba(80, 112, 255, 0.07)'
    };
    const feedbackListStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    };
    const feedbackItemStyle = {
        background: '#f8f9fa',
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0 1px 3px rgba(80, 112, 255, 0.07)'
    };
    const feedbackRatingStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        marginBottom: '0.5rem'
    };
    const feedbackCommentStyle = {
        color: '#374151',
        marginBottom: '0.5rem'
    };
    const feedbackUserStyle = {
        color: '#6b7280',
        fontSize: '0.98rem'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={mainContentStyle}>
                    <div style={leftSectionStyle}>
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
                        <div style={{display: 'flex', flexDirection: 'row', gap: '3rem', width: '100%', marginTop: '1rem'}}>
                            <button style={chatButtonStyle} onClick={() => navigate(`/chat/${taskerId}`)}>Chat</button>
                           
                        </div>
                    </div>
                    <div style={rightSectionStyle}>
                        <div style={infoItemStyle}>
                            <span style={infoLabelStyle}>Name</span>
                            <span style={infoValueStyle}>{tasker.name}</span>
                        </div>
                        <div style={infoItemStyle}>
                            <span style={infoLabelStyle}>Email</span>
                            <span style={infoValueStyle}>{tasker.email}</span>
                        </div>
                        <div style={infoItemStyle}>
                            <span style={infoLabelStyle}>Gender</span>
                            <span style={infoValueStyle}>{tasker.gender}</span>
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
                    </div>
                </div>
                {/* Feedback section at the bottom */}
                <div style={feedbackSectionStyle}>
                    <div style={feedbackFormContainerStyle}>
                        <h3 style={{marginBottom: '1rem', color: '#ea580c'}}>Leave Feedback</h3>
                        <form onSubmit={handleFeedbackSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                {[...Array(5)].map((_, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <label key={index}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={ratingValue}
                                                onClick={() => setRating(ratingValue)}
                                                style={{ display: 'none' }}
                                            />
                                            <FaStar
                                                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                                size={30}
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(0)}
                                                style={{cursor: 'pointer'}}
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                            <textarea
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                placeholder="Share your experience with this tasker..."
                                rows="4"
                                required
                                style={{borderRadius: '8px', border: '1px solid #fed7aa', padding: '0.75rem', fontSize: '1rem'}}
                            />
                            <button type="submit" style={{...chatButtonStyle, width: 'fit-content', alignSelf: 'flex-end'}}>Submit Feedback</button>
                        </form>
                    </div>
                    {feedback && feedback.length > 0 && (
                        <div>
                            <h2 style={{color: '#ea580c', fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem'}}>Previous Feedback</h2>
                            <div style={feedbackListStyle}>
                                {feedback.map((item, index) => (
                                    <div key={index} style={feedbackItemStyle}>
                                        <div style={feedbackRatingStyle}>
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    color={i < item.rating ? "#ffc107" : "#e4e5e9"}
                                                    size={20}
                                                />
                                            ))}
                                        </div>
                                        <p style={feedbackCommentStyle}>{item.comment}</p>
                                        <p style={feedbackUserStyle}>Rated by: {item.user_name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserAccount;