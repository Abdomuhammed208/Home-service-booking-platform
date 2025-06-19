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
        fontSize: "1.7rem",
        fontWeight: 700,
        color: "#1f2937",
        marginBottom: 8,
        textAlign: "center"
    };

    const infoStyle = {
        fontSize: "1.15rem",
        color: "#374151",
        marginBottom: '10px',
        textAlign: "center",
        wordBreak: "break-word",
        lineHeight: 1.7
    };

    const badgeStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: '#22c55e',
        color: '#fff',
        borderRadius: '999px',
        padding: '6px 18px',
        fontWeight: 700,
        fontSize: '1rem',
        margin: '12px 0',
        boxShadow: '0 2px 8px rgba(34,197,94,0.10)'
    };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: '#d1fae5', backgroundImage: 'radial-gradient(#6b7280 1.3px, #d1fae5 1.3px)', backgroundSize: '26px 26px', opacity: 0.8, padding: "16px" }}>
            <div style={cardStyle}>
                {tasker.profile_image ? (
                    <img
                        src={
                            tasker.profile_image.startsWith('http')
                                ? tasker.profile_image
                                : `http://localhost:3000${tasker.profile_image}`
                        }
                        alt="Tasker Profile"
                        style={imageStyle}
                    />
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
                <div style={nameStyle}>Name: {tasker.name}</div>
                <div style={badgeStyle}>
                    <span style={{fontSize: '1.2em', marginRight: '4px'}}>✔️</span> Verified
                </div>
                <div style={infoStyle}>Email: {tasker.email}</div>
                <div style={infoStyle}>Mobile: {tasker.mobile}</div>
                <div style={infoStyle}>Service: {tasker.service}</div>
                <div style={infoStyle}>City: {tasker.city}</div>
                <div style={infoStyle}>Company Name: {tasker.company_name || 'N/A'}</div>
            </div>
        </div>
    );
};

export default VerificationPage;