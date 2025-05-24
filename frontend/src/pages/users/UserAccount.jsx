import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserAccount.css";
import { useNavigate } from "react-router-dom";

function UserAccount() {
    const [tasker, setTasker] = useState(null);
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    return (
        <div className="profile-container">
            <div className="profile-image-section">
                <div className="profile-image-container">
                    {tasker.profile_image ? (
                        <img
                            src={`http://localhost:3000${tasker.profile_image}`}
                            alt="Profile"
                            className="profile-image"
                        />
                    ) : (
                        <div className="profile-image-placeholder">
                            {tasker.name ? tasker.name.charAt(0).toUpperCase() : '?'}
                        </div>
                    )}
                </div>
            </div>

            <div className="profile-info">
            <div className="info-item">
                <button className="chat-button" onClick={() => navigate(`/chat/${taskerId}`)}> CHAT</button>

                </div>
                <div className="info-item">
                <button className="chat-button" onClick={() => navigate(`/tasker/${taskerId}/transfer`)}> Transfer</button>

                </div>
                <div className="info-item">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{tasker.name}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{tasker.email}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Gender:</span>
                    <span className="info-value">{tasker.gender}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Mobile:</span>
                    <span className="info-value">{tasker.mobile}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">City:</span>
                    <span className="info-value">{tasker.city}</span>
                </div>
                <div className="info-item">
                    <span className="info-label">Service:</span>
                    <span className="info-value">{tasker.service}</span>
                </div>
            </div>

            {feedback && feedback.length > 0 && (
                <div className="feedback-section">
                    <h2 className="feedback-title">Feedback</h2>
                    <div className="feedback-list">
                        {feedback.map((item, index) => (
                            <div key={index} className="feedback-item">
                                <p className="feedback-comment">{item.comment}</p>
                                <p className="feedback-rating">{item.rating} ★</p>
                                <p className="feedback-user">Rated by: {item.user_name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserAccount;