import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import '../../pages/chat/ChatBox.css';
import axios from 'axios';

function Conversation() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);
    const [customer, setCustomer] = useState(null);
    const {customerId } = useParams();
    const messagesEndRef = useRef(null);

    // Fetch all messages between this tasker and this customer, regardless of sender/receiver
    const fetchMessages = useCallback(async () => {
        try {
            // Get both tasker and customer IDs
            const userResponse = await axios.get('http://localhost:3000/tasker-profile', { withCredentials: true });
            const taskerId = userResponse.data.tasker.id;
            // Fetch all messages between this tasker and this customer
            const chatResponse = await axios.get(`http://localhost:3000/messages/thread?customer_id=${customerId}&tasker_id=${taskerId}`, {
                withCredentials: true
            });
            const chatData = chatResponse.data;
            if (chatData.success) {
                // Sort messages by timestamp if needed
                const sorted = (chatData.messages || []).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                setMessages(sorted);
            }
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    }, [customerId]);

    // Initial data fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data
                const userResponse = await axios.get('http://localhost:3000/tasker-profile', {
                    withCredentials: true
                });
                const userData = userResponse.data;
                setUser(userData.tasker);

                // Fetch customer data
                const customerResponse = await axios.get(`http://localhost:3000/customer/${customerId}`, {
                    withCredentials: true
                });
                const customerData = customerResponse.data;
                setCustomer(customerData.customers);

                // Fetch initial messages
                await fetchMessages();
            } catch (err) {
                console.error('Error fetching chat data:', err);
            }
        };

        fetchData();
    }, [customerId, fetchMessages]);

    // Set up polling for new messages
    useEffect(() => {
        const pollInterval = setInterval(fetchMessages, 500); // Check every 2 seconds
        return () => clearInterval(pollInterval); // Cleanup on unmount
    }, [fetchMessages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || !user || !customerId) return;

        try {
            const response = await axios.post('http://localhost:3000/chat/send', {
                customer_id: customerId,
                tasker_id: user.id,  
                sender_id: user.id, // tasker is sending
                receiver_id: customerId, // customer is receiving
                message: message.trim()
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                setMessage('');
                // Fetch all messages after sending
                await fetchMessages();
            }
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat with <a href={`/customer/${customerId}`}>{customer?.name}</a></h2>
            </div>

            <div className="messages-container">
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

export default Conversation; 

