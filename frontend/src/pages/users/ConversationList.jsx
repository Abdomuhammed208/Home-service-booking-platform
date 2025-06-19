import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//import './Conversation.css';
import axios from 'axios';

function ConversationList() {
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();
    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/conversation-list/${userId}`, {
                    withCredentials: true
                });
                // Filter out duplicate conversations by user ID
                const uniqueConversations = response.data.reduce((acc, current) => {
                    const existingConversation = acc.find(item => item.id === current.id);
                    if (!existingConversation) {
                        acc.push(current);
                    }
                    return acc;
                }, []);
                setConversations(uniqueConversations);
            } catch (err) {
                console.error('Error fetching conversations:', err);
            }
        };

        fetchData();
    }, [userId]);

    const getLastMessageTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        // If less than 24 hours, show time
        if (diff < 24 * 60 * 60 * 1000) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        // If less than 7 days, show day name
        if (diff < 7 * 24 * 60 * 60 * 1000) {
            return date.toLocaleDateString([], { weekday: 'short' });
        }
        // Otherwise show date
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    const handleConversationClick = (taskerId) => {
        navigate(`/chat/${taskerId}`);
    };

    // --- Modern, card-based, orange-accented styles ---
    const containerStyle = {
        minHeight: '100vh',
        backgroundColor: '#d1fae5',
        backgroundImage: 'radial-gradient(#6b7280 1.3px, #d1fae5 1.3px)',
        backgroundSize: '26px 26px',
        opacity: 0.8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '32px 8px'
    };
    const cardStyle = {
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 12px 40px rgba(8, 10, 22, 0.12), 0 2px 12px rgba(234, 88, 12, 0.12)',
        maxWidth: '480px',
        width: '100%',
        margin: '32px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0',
        border: '1px solid #fed7aa',
        position: 'relative',
        minHeight: '600px'
    };
    const backArrowStyle = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        cursor: 'pointer',
        zIndex: 1000,
        fontSize: '1.8rem',
        color: '#ea580c',
        background: '#fff',
        borderRadius: '50%',
        boxShadow: '0 2px 8px rgba(234, 88, 12, 0.10)',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #fed7aa',
        transition: 'background 0.2s, box-shadow 0.2s'
    };
    const headerStyle = {
        width: '100%',
        padding: '48px 32px 24px 32px',
        borderBottom: '1px solid #fed7aa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'transparent'
    };
    const titleStyle = {
        fontSize: '2rem',
        fontWeight: 700,
        color: '#1f2937',
        textAlign: 'center',
        flex: 1
    };
    const listStyle = {
        width: '100%',
        flex: 1,
        overflowY: 'auto',
        padding: '24px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: 'transparent'
    };
    const itemStyle = (isUnread) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '18px 32px',
        background: isUnread ? 'linear-gradient(90deg, #fef3c7 0%, #fce7f3 100%)' : '#fff',
        borderRadius: '10px',
        border: '1px solid #fed7aa',
        boxShadow: isUnread ? '0 4px 12px rgba(234, 88, 12, 0.08)' : 'none',
        cursor: 'pointer',
        transition: 'background 0.2s, box-shadow 0.2s',
        position: 'relative'
    });
    const avatarStyle = {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid #fed7aa',
        background: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: '1.3rem',
        color: '#ea580c'
    };
    const infoStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        minWidth: 0
    };
    const nameRowStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        marginBottom: '2px'
    };
    const nameStyle = {
        fontWeight: 600,
        color: '#1f2937',
        fontSize: '1.1rem',
        margin: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    };
    const timeStyle = {
        color: '#6b7280',
        fontSize: '0.95rem',
        marginLeft: '8px',
        whiteSpace: 'nowrap'
    };
    const previewStyle = {
        color: '#6b7280',
        fontSize: '0.98rem',
        margin: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    };
    const unreadBadgeStyle = {
        background: '#ea580c',
        color: '#fff',
        borderRadius: '50%',
        minWidth: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '0.98rem',
        position: 'absolute',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        boxShadow: '0 2px 8px rgba(234, 88, 12, 0.10)'
    };
    const noConversationsStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6b7280',
        fontSize: '1.1rem',
        padding: '60px 0',
        gap: '8px'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <span
                    style={backArrowStyle}
                    onClick={() => navigate('/dashboard')}
                    aria-label="Back to Dashboard"
                    tabIndex={0}
                    role="button"
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate('/dashboard'); }}
                >
                    &#8592;
                </span>
                <div style={headerStyle}>
                    <h2 style={titleStyle}>My Conversations</h2>
                </div>
                <div style={listStyle}>
                    {conversations.length === 0 ? (
                        <div style={noConversationsStyle}>
                            <span style={{fontSize: '2.2rem', color: '#ea580c'}}>💬</span>
                            <p>No conversations yet</p>
                        </div>
                    ) : (
                        conversations.map((conv) => (
                            <div 
                                key={conv.id} 
                                style={itemStyle(conv.unread_count > 0)}
                                onClick={() => handleConversationClick(conv.id)}
                            >
                                <div style={avatarStyle}>
                                    {conv.profile_image ? (
                                        <img src={`http://localhost:3000${conv.profile_image}`} alt={conv.name} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
                                    ) : (
                                        <span>{conv.name.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>
                                <div style={infoStyle}>
                                    <div style={nameRowStyle}>
                                        <h3 style={nameStyle}>{conv.name}</h3>
                                        <span style={timeStyle}>{getLastMessageTime(conv.timestamp)}</span>
                                    </div>
                                    <p style={previewStyle}>{conv.message || 'Start a conversation'}</p>
                                </div>
                                {conv.unread_count > 0 && (
                                    <div style={unreadBadgeStyle}>
                                        {conv.unread_count}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ConversationList; 