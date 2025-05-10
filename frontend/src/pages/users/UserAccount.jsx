import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function UserAccount() {
    const [tasker, setTasker] = useState(null);
    const { postId } = useParams();

    useEffect(() => {
        const fetchTasker = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tasker/${postId}`, {
                    method: "GET",
                    credentials: "include"
                });
                
                if (!response.ok) {
                    throw new Error("Failed to fetch tasker profile");
                }
                
                const data = await response.json();
                setTasker(data.taskers);
            } catch (err) {
                console.error("Failed to fetch tasker profile:", err);
            }
        };

        fetchTasker();
    }, [postId]);

    if (!tasker) {
        return null;
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
        </div>
    );
}

export default UserAccount;
 