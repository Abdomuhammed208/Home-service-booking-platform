import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const VerificationPage = () => {
    const { taskerId } = useParams();
    const [tasker, setTasker] = useState(null);

    useEffect(() => {
        const fetchTasker = async () => {
            const response = await fetch(`http://localhost:3000/verify/${taskerId}`);
            const data = await response.json();
            setTasker(data.tasker);
        };
        fetchTasker();
    }, [taskerId]);

    if (!tasker) {
        return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;
    }

    const cardStyle = {
        maxWidth: 360,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(80, 112, 255, 0.07)",
        padding: "32px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    };

    const imageStyle = {
        width: 120,
        height: 120,
        borderRadius: "50%",
        objectFit: "cover",
        border: "3px solid #ea580c",
        marginBottom: 20,
        background: "#f3f4f6"
    };

    const nameStyle = {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "#1f2937",
        marginBottom: 8,
        textAlign: "center"
    };

    const infoStyle = {
        fontSize: "1rem",
        color: "#374151",
        marginBottom: 6,
        textAlign: "center",
        wordBreak: "break-word"
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "16px" }}>
            <div style={cardStyle}>
                {tasker.profile_image ? (
                    <img src={tasker.profile_image} alt="Tasker Profile" style={imageStyle} />
                ) : (
                    <div style={{
                        ...imageStyle,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "2.5rem",
                        color: "#ea580c",
                        background: "#e2e8f0"
                    }}>
                        {tasker.name ? tasker.name.charAt(0).toUpperCase() : "?"}
                    </div>
                )}
                <div style={nameStyle}>{tasker.name}</div>
                <div style={infoStyle}>{tasker.email}</div>
                <div style={infoStyle}>{tasker.phone}</div>
                <div style={infoStyle}>{tasker.address}</div>
                <div style={infoStyle}>{tasker.city}</div>
                <div style={infoStyle}>{tasker.state}</div>
            </div>
        </div>
    );
};

export default VerificationPage;