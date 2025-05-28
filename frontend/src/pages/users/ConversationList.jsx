import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Conversation.css';
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

    return (
        <div className="conversations-container">
            <div className="conversations-header">
                {/* <a href="/dashboard" className="back-arrow">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Dashboard
                </a> */}
                <h2>My Conversations</h2>
            </div>

            <div className="conversations-list">
                {conversations.length === 0 ? (
                    <div className="no-conversations">
                        <span className="material-symbols-outlined">chat</span>
                        <p>No conversations yet</p>
                    </div>
                ) : (
                    conversations.map((conv) => (
                        <div 
                            key={conv.id} 
                            className="conversation-item"
                            onClick={() => handleConversationClick(conv.id)}
                        >
                            <div className="conversation-avatar">
                                {conv.profile_image ? (
                                    <img src={`http://localhost:3000${conv.profile_image}`} alt={conv.name} />
                                ) : (
                                    <span className="avatar-placeholder">
                                        {conv.name.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div className="conversation-info">
                                <div className="conversation-header">
                                    <h3>{conv.name}</h3>
                                    <span className="conversation-time">
                                        {getLastMessageTime(conv.timestamp)}
                                    </span>
                                </div>
                                <p className="conversation-preview">
                                    {conv.message || 'Start a conversation'}
                                </p>
                            </div>
                            {conv.unread_count > 0 && (
                                <div className="unread-badge">
                                    {conv.unread_count}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ConversationList; 