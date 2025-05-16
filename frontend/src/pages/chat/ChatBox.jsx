import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './ChatBox.css';
import axios from 'axios';

function ChatBox() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
    const [tasker, setTasker] = useState(null);
    const { taskerId } = useParams();
    const messagesEndRef = useRef(null);

    // Fetch user data and chat history
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data
                const userResponse = await fetch('http://localhost:3000/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                const userData = await userResponse.json();
                setUser(userData.user);

                // Fetch tasker data
                const taskerResponse = await fetch(`http://localhost:3000/tasker/${taskerId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                const taskerData = await taskerResponse.json();
                setTasker(taskerData.taskers);

                // Fetch chat history
                const chatResponse = await axios.get(`http://localhost:3000/chat/${taskerId}`, {
                    withCredentials: true
                });
                const chatData = chatResponse.data;
                if (chatData.success) {
                    setMessages(chatData.messages || []);
                }
            } catch (err) {
                console.error('Error fetching chat data:', err);
            }
        };

        fetchData();
    }, [taskerId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || !user || !taskerId) return;

        try {
            const response = await axios.post('http://localhost:3000/chat/send', {
                customer_id: user.id,
                tasker_id: taskerId,
                sender_id: user.id,
                receiver_id: taskerId,
                message: message.trim()
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                setMessages(prev => [...prev, response.data.message]);
                setMessage('');
            }
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };


    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat with {tasker?.name}</h2>
            </div>

            <div className="messages-container">
                {console.log(messages)}
                {messages.map((msg, index) => (
                    <div
                        key={msg.id || index}
                        className={`message ${msg.sender_id === user?.id ? 'sent' : 'received'}`}
                    >
                        <div className="message-content">
                            <p>{msg.message}</p>
                            <span className="message-time">
                                {msg.timestamp
                                    ? new Date(msg.timestamp).toLocaleTimeString()
                                    : ''}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="message-input-container">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );
}

export default ChatBox; 