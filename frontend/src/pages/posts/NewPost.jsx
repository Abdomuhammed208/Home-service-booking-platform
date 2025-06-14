import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!post.trim()) {
            setError('Please enter some content for your post');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/post', 
                { post: post.trim(), title: title.trim(), price: price.trim() },
                { withCredentials: true }
            );

            if (!response.data) {
                setError('Failed to create post. Please try again.');
            }else{
                setPost('');
                navigate('/tasker-dashboard', { 
                    state: { postMessage: "Post created successfully!" }
                });
            }
        } catch (error) {
            console.error('Error submitting post:', error);
            setError('Failed to create post. Please try again.');
        }
    };

    // const goToTaskerDashboard = () => {
    //     navigate('/tasker-dashboard');
    // }

    const containerStyle = {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fef7ed 0%, #fdf2f8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    const cardStyle = {
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(80, 112, 255, 0.07)',
        padding: '40px 32px 32px 32px',
        maxWidth: '420px',
        width: '100%',
        margin: '32px 0'
    };

    const titleStyle = {
        fontSize: '2rem',
        fontWeight: 700,
        color: '#1f2937',
        marginBottom: '24px',
        textAlign: 'center'
    };

    const formGroupStyle = {
        marginBottom: '20px'
    };

    const inputStyle = {
        width: '390px',
        padding: '12px 15px',
        borderRadius: '8px',
        border: '1px solid #fed7aa',
        fontSize: '1rem',
        marginBottom: '4px',
        outline: 'none',
        transition: 'border 0.2s'
    };

    const textareaStyle = {
        ...inputStyle,
        minHeight: '90px',
        resize: 'vertical'
    };

    const buttonRowStyle = {
        display: 'flex',
        gap: '16px',
        marginTop: '16px'
    };

    const submitButtonStyle = {
        flex: 1,
        backgroundColor: '#ea580c',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 0',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background 0.2s'
    };

    const cancelButtonStyle = {
        flex: 1,
        backgroundColor: '#f3f4f6',
        color: '#ea580c',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 0',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background 0.2s'
    };

    const errorStyle = {
        color: '#f43f5e',
        background: '#fef2f2',
        border: '1px solid #fca5a5',
        borderRadius: '8px',
        padding: '10px 16px',
        marginBottom: '18px',
        textAlign: 'center'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={titleStyle}>Create New Post</h1>
                {error && <div style={errorStyle}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={formGroupStyle}>
                        <input
                            name="title"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <textarea
                            name="post"
                            placeholder="Content..."
                            value={post}
                            onChange={(e) => setPost(e.target.value)}
                            style={textareaStyle}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <input
                            name="price"
                            placeholder="Price (RM)"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div style={buttonRowStyle}>
                        <button type="submit" style={submitButtonStyle}>
                            Share Post
                        </button>
                        <button 
                            type="button" 
                            style={cancelButtonStyle}
                            onClick={() => navigate('/tasker-dashboard')}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPost;
