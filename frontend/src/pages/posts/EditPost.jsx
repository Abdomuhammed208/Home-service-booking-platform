import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const EditPost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { postId, initialContent, initialTitle, initialPrice } = location.state || {}; 

    const [postContent, setPostContent] = useState(initialContent || '');
    const [title, setTitle] = useState(initialTitle || '');
    const [price, setPrice] = useState(initialPrice || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!initialContent || !initialTitle || !initialPrice) {
            axios.get(`http://localhost:3000/post/${id}/edit`, {
                withCredentials: true
            })
            .then(response => {
                setTitle(response.data.post.title);
                setPostContent(response.data.post.content);
                setPrice(response.data.post.price);
            })
            .catch(err => {
                console.error('Error fetching post:', err);
                setError('Failed to load post content');
            });
        }
    }, [id, initialContent, initialTitle, initialPrice]);

    const handleEditPost = () => {
        if (!postContent.trim()) {
            setError('Post content cannot be empty.');
            return;
        }
        if (!title.trim()) {
            setError('Title cannot be empty.');
            return;
        }
        if (!price.trim()) {
            setError('Price cannot be empty.');
            return;
        }

        const postIdToUse = postId || id;

        axios.post(`http://localhost:3000/post/${postIdToUse}/edit`, 
            { post: postContent, title: title, price: price }, 
            { withCredentials: true }
        )
        .then(response => {
            navigate('/tasker-dashboard', { 
                state: { postMessage: "Post edited successfully!" } 
            });
        })
        .catch(err => {
            console.error('Error editing post:', err);
            setError('Something went wrong. Please try again.');
        });
    };

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
        padding: '12px 16px',
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
                <h1 style={titleStyle}>Edit Post</h1>
                {error && <div style={errorStyle}>{error}</div>}
                <form onSubmit={e => { e.preventDefault(); handleEditPost(); }}>
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
                            placeholder="Edit your post..."
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
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
                        <button 
                            type="submit"
                            style={submitButtonStyle}
                            onClick={() => navigate('/tasker-dashboard')}
                        >
                            Save Changes
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

export default EditPost;
