import React, { useState, useEffect } from 'react';
import { Bell, Package, User, MessageCircle} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [conversations, setConversations] = useState([]);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredPost, setHoveredPost] = useState(null); 
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/user', {
          credentials: 'include'
        });
        const data = await response.json();
        if (data.success) {
          const sortedPosts = data.posts.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          setPosts(sortedPosts);
        } else {
          //setError(data.message || 'Failed to fetch posts');
          console.log(data.message || 'Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        //setError('Failed to fetch posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/profile', {
          withCredentials: true
        });
        setUserId(response.data.user.id);

      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
      
    };

    fetchUser();
    fetchPosts();
  }, []);

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#d1fae5',
    backgroundImage: 'radial-gradient(#6b7280 1.3px, #d1fae5 1.3px)',
    backgroundSize: '26px 26px',
    opacity: 0.8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const navbarStyle = {
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid #fed7aa'
  };

  const navbarContentStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '64px'
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  const logoStyle = {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #fb923c, #f43f5e)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '18px'
  };

  const logoTextStyle = {
    marginLeft: '12px',
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937'
  };

  const navIconsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  };

  const getNavIconButtonStyle = (isHovered) => ({
    position: 'relative',
    padding: '8px',
    color: isHovered ? '#ea580c' : '#4b5563',
    backgroundColor: isHovered ? '#fed7aa' : 'transparent',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });

  const mainContentStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '24px 16px',
    display: 'flex',
    gap: '24px',
    height: 'calc(100vh - 120px)'
  };

  const postsContainerStyle = {
    flex: '3',
    minWidth: '0'
  };

  const postsCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 12px 40px rgba(6, 8, 16, 0.22), 0 2px 12px rgba(234, 88, 12, 0.12)',
    border: '1px solid #fed7aa',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  const postsHeaderStyle = {
    padding: '24px',
    borderBottom: '1px solid #fed7aa'
  };

  const postsContentStyle = {
    flex: '1',
    overflowY: 'auto',
    paddingBottom: '80px'
  };

  const postsListStyle = {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  };

  const getPostStyle = (postId, isHovered) => ({
    background: 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%)',
    borderRadius: '8px',
    padding: '24px',
    border: '1px solid #fed7aa',
    boxShadow: isHovered ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'box-shadow 0.2s ease'
  });

  const bookButtonStyle = {
    backgroundColor: '#ea580c',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 4px rgba(234, 88, 12, 0.2)',
    '&:hover': {
      backgroundColor: '#c2410c',
      transform: 'translateY(-1px)'
    }
  };

  const postHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px'
  };

  const avatarStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #fed7aa'
  };

  const postUserInfoStyle = {
    marginLeft: '12px',
    flex: '1'
  };

  const postActionsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '16px',
    borderTop: '1px solid #fed7aa'
  };

  const conversationsContainerStyle = {
    width: '320px',
    flexShrink: '0'
  };

  const conversationsCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 12px 40px rgba(8, 12, 27, 0.22), 0 2px 12px rgba(234, 88, 12, 0.12)',
    border: '1px solid #fed7aa',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  };

  const conversationsHeaderStyle = {
    padding: '24px',
    borderBottom: '1px solid #fed7aa',
    flexShrink: '0'
  };

  const conversationsListStyle = {
    flex: '1',
    overflowY: 'auto',
    padding: '16px'
  };

  const conversationItemStyle = {
    padding: '16px',
    borderBottom: '1px solid #fed7aa',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#fef3c7'
    }
  };

  const conversationHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px'
  };

  const conversationNameStyle = {
    fontWeight: '600',
    color: '#1f2937',
    margin: '0'
  };

  const conversationMessageStyle = {
    color: '#6b7280',
    fontSize: '14px',
    margin: '0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const noPostsStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#6b7280'
  };

  const loadingStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px',
    color: '#6b7280'
  };

  const loadingSpinnerStyle = {
    width: '40px',
    height: '40px',
    border: '4px solid #fed7aa',
    borderTop: '4px solid #ea580c',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px'
  };

  return (
    <div style={containerStyle}>
      {/* Navbar */}
      <nav style={navbarStyle}>
        <div style={navbarContentStyle}>
            {/* Logo Area */}
          <div style={logoContainerStyle}>
            <div style={logoStyle}>
              <span>S</span>
                </div>
            <div style={logoTextStyle}>ServEase</div>
            </div>

            {/* Navigation Icons */}
          <div style={navIconsStyle}>
            <button
              style={getNavIconButtonStyle(hoveredButton === 'notifications')}
              onMouseEnter={() => setHoveredButton('notifications')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => navigate(`/notification/${userId}`)}
            >
                <Bell size={20} />
              </button>
            
            <button
              style={getNavIconButtonStyle(hoveredButton === 'messages')}
              onMouseEnter={() => setHoveredButton('messages')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => navigate(`/conversation-list/${userId}`)}
            >
              <MessageCircle size={20} />
              </button>
              
            <button
              style={getNavIconButtonStyle(hoveredButton === 'orders')}
              onMouseEnter={() => setHoveredButton('orders')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => navigate(`/order/${userId}`)}
            >
                <Package size={20} />
              </button>
              
            <button
              style={getNavIconButtonStyle(hoveredButton === 'profile')}
              onMouseEnter={() => setHoveredButton('profile')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => navigate(`/profile`)}
            >
                <User size={20} />
              </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={mainContentStyle}>
          {/* Posts Section (3/4 width) */}
        <div style={postsContainerStyle}>
          <div style={postsCardStyle}>
            <div style={postsHeaderStyle}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
                Recent Posts
              </h2>
              <p style={{ color: '#6b7280', margin: '0' }}>
                Stay updated with the latest from your network
              </p>
              </div>
              
            <div style={postsContentStyle}>
              <div style={postsListStyle}>
                {loading ? (
                  <div style={loadingStyle}>
                    <div style={loadingSpinnerStyle}></div>
                    <p>Loading posts...</p>
                  </div>
                ) : posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      style={getPostStyle(post.id, hoveredPost === post.id)}
                      onMouseEnter={() => setHoveredPost(post.id)}
                      onMouseLeave={() => setHoveredPost(null)}
                    >
                      <div style={postHeaderStyle}>
                        {post.tasker_image ? (
                          <img src={`http://localhost:3000${post.tasker_image}`} alt={post.tasker_name} style={avatarStyle} />
                        ) : (
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: post.tasker_color || '#fb923c',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '600',
                            fontSize: '16px',
                            border: '2px solid #fed7aa'
                          }}>
                            {getInitials(post.tasker_name)}
                          </div>
                        )}
                        <div onClick={() => navigate(`/tasker/${post.tasker_id}`)} style={postUserInfoStyle}>
                          <h3 style={{ fontWeight: '600', color: '#1f2937', margin: '0' }}>{post.tasker_name}</h3>
                          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
                            Posted: {new Date(post.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '16px 0' }}>
                        {post.title}
                      </h3>
                      <p style={{ color: '#374151', marginBottom: '16px', lineHeight: '1.6' }}>
                        {post.content}
                      </p>
                      
                      <div style={postActionsStyle}>
                        <p style={{ fontSize: '18px', fontWeight: '600', color: '#ea580c' }}>
                          Price: {post.price} RM
                        </p>
                        <button 
                          style={bookButtonStyle}
                          onClick={() => navigate('/checkout', { 
                            state: { 
                              postDetails: {
                                taskerName: post.tasker_name,
                                taskerId: post.tasker_id,
                                taskerMobile: post.tasker_mobile,
                                taskerService: post.tasker_service,
                                content: post.content,
                                title: post.title,
                                price: post.price
                              }
                            }
                          })}
                        >
                          Book now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={noPostsStyle}>
                    <p style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' }}>
                      No posts found
                    </p>
                    <p style={{ margin: '0' }}>
                      Check back later for new posts from taskers!
                    </p>
                </div>
                )}
              </div>
            </div>
          </div>
              </div>
          <div style={conversationsContainerStyle}>
            <div style={conversationsCardStyle}>
              <div style={conversationsHeaderStyle}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
                  Conversations
                </h2>
                <p style={{ color: '#6b7280', margin: '0' }}>
                  Your recent messages
                </p>
              </div>
              <div style={conversationsListStyle}>
                {conversations.length > 0 ? (
                  conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      style={conversationItemStyle}
                      onClick={() => navigate(`/chat/${conversation.id}`)}
                    >
                      <div style={conversationHeaderStyle}>
                        {conversation.profile_image ? (
                          <img 
                            src={`http://localhost:3000${conversation.profile_image}`} 
                            alt={conversation.name} 
                            style={avatarStyle} 
                          />
                        ) : (
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: '#fb923c',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '600',
                            fontSize: '16px',
                            border: '2px solid #fed7aa'
                          }}>
                            {getInitials(conversation.name)}
                          </div>
                        )}
                        <div>
                          <h3 style={conversationNameStyle}>{conversation.name}</h3>
                          <p style={conversationMessageStyle}>{conversation.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={noPostsStyle}>
                    <p style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' }}>
                      No conversations yet
                    </p>
                    <p style={{ margin: '0' }}>
                      Start a conversation with a tasker!
                    </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;