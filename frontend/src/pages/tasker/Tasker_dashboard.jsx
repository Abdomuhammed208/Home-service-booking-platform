import React, { useState, useEffect, useRef } from "react";
import {useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {  FaEllipsisV, FaEdit, FaTrash} from "react-icons/fa";
import { MessageCircle, Package, User, Bell } from 'lucide-react';
import "./tasker_dashboard.css";




const conversationsContainerStyle = {
    width: '320px',
    flexShrink: '0'
  };

  const conversationsCardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
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
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  border: '1px solid #fed7aa',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
};

const postsHeaderStyle = {
  padding: '24px',
  borderBottom: '1px solid #fed7aa',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const newPostButtonStyle = {
  backgroundColor: '#ea580c',
  color: '#ffffff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 4px rgba(234, 88, 12, 0.2)'
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

const getPostStyle = (isHovered) => ({
  background: 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%)',
  borderRadius: '8px',
  padding: '24px',
  border: '1px solid #fed7aa',
  boxShadow: isHovered ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
  transition: 'box-shadow 0.2s ease'
});

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

const postMenuButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#6b7280',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '50%',
  fontSize: '18px',
  transition: 'background 0.2s',
  marginLeft: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const postMenuDropdownStyle = {
  position: 'absolute',
  top: '40px',
  right: '0',
  background: '#fff',
  border: '1px solid #fed7aa',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  zIndex: 10,
  minWidth: '120px',
  display: 'flex',
  flexDirection: 'column',
  padding: '4px 0'
};

const postMenuItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 16px',
  background: 'none',
  border: 'none',
  color: '#1f2937',
  fontSize: '15px',
  cursor: 'pointer',
  transition: 'background 0.2s',
  width: '100%',
  textAlign: 'left'
};

const postMenuItemDeleteStyle = {
  ...postMenuItemStyle,
  color: '#f43f5e',
};

function Taskerdashboard() {
    //const location = useLocation();
    // const message = location.state?.loginMessage;
    // const postMessage = location.state?.postMessage;
    // const deleteMessage = location.state?.deleteMessage;
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [currentTaskerId, setCurrentTaskerId] = useState(null);
    const [taskerProfile, setTaskerProfile] = useState(null);
    const [hoveredPost, setHoveredPost] = useState(null);
    const dropdownRefs = useRef([]);
    const {taskerId} = useParams();
    const [hoveredButton, setHoveredButton] = useState(null);
    const [openMenuPostId, setOpenMenuPostId] = useState(null);
    const [conversations, setConversations] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`http://localhost:3000/chat-list/${taskerId}`, {
                  withCredentials: true
              });
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
  }, [taskerId]);

    useEffect(() => {
        axios.get("http://localhost:3000/tasker-profile", {
            withCredentials: true
        })
            .then(response => {
                setTaskerProfile(response.data.tasker);
                setCurrentTaskerId(response.data.tasker.id);
            })
            .catch(error => console.error('Error fetching tasker profile:', error));

        fetch("http://localhost:3000/tasker", {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                const sortedPosts = data.posts.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                });
                setPosts(sortedPosts);
            })
            .catch(error => console.error('Error fetching posts:', error));

        const handleClickOutside = (event) => {
            if (hoveredPost !== null && 
                dropdownRefs.current[hoveredPost] && 
                !dropdownRefs.current[hoveredPost].contains(event.target)) {
                setHoveredPost(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [hoveredPost, taskerProfile]);

    const handleDeletePost = (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            axios.post(`http://localhost:3000/post/${postId}/delete`, {}, {
                withCredentials: true
            })
                .then(response => {
                    if (response.data.success) {
                        setPosts(posts.filter(post => post.id !== postId));
                        navigate("/tasker-dashboard", { state: { deleteMessage: "Post deleted successfully" } });
                    }
                })
                .catch(error => console.error('Error deleting post:', error));
        }
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div style={containerStyle}>
            {/* Navbar */}
            <nav style={navbarStyle}>
                <div style={navbarContentStyle}>
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
                          onClick={() => navigate(`/tasker-notification/${currentTaskerId}`)}
                        >
                          <Bell size={20} />
                        </button>
                        <button
                            style={getNavIconButtonStyle(hoveredButton === 'messages')}
                            onMouseEnter={() => setHoveredButton('messages')}
                            onMouseLeave={() => setHoveredButton(null)}
                            onClick={() => navigate(`/chat-list/${currentTaskerId}`)}
                        >
                            <MessageCircle size={20} />
                        </button>
                        <button
                            style={getNavIconButtonStyle(hoveredButton === 'orders')}
                            onMouseEnter={() => setHoveredButton('orders')}
                            onMouseLeave={() => setHoveredButton(null)}
                            onClick={() => navigate(`/allorder/${currentTaskerId}`)}
                        >
                            <Package size={20} />
                        </button>
                        <button
                            style={getNavIconButtonStyle(hoveredButton === 'profile')}
                            onMouseEnter={() => setHoveredButton('profile')}
                            onMouseLeave={() => setHoveredButton(null)}
                            onClick={() => navigate(`/tasker-profile`)}
                        >
                            <User size={20} />
                        </button>

                    </div>
                </div>
            </nav>
            {/* Main Content */}
            <div style={mainContentStyle}>
                {/* Posts Section */}
                <div style={postsContainerStyle}>
                    <div style={postsCardStyle}>
                        <div style={postsHeaderStyle}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
                                Your Task Posts
                            </h2>
                            <button style={newPostButtonStyle} onClick={() => navigate("/new-post")}>New post</button>
                        </div>
                        <div style={postsContentStyle}>
                            <div style={postsListStyle}>
                                {posts && posts.length > 0 ? (
                                    posts.map((post, idx) => (
                                        <div
                                            key={post.id}
                                            style={getPostStyle(hoveredPost === post.id)}
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
                                                <div style={postUserInfoStyle}>
                                                    <h3 style={{ fontWeight: '600', color: '#1f2937', margin: '0' }}>{post.tasker_name}</h3>
                                                    <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
                                                        Posted: {new Date(post.created_at).toLocaleString()}
                                                    </p>
                                                </div>
                                                {/* Three dots menu for edit/delete, only for owner */}
                                                {post.tasker_id === currentTaskerId && (
                                                    <div style={{ position: 'relative' }}>
                                                        <button
                                                            style={postMenuButtonStyle}
                                                            onClick={() => setOpenMenuPostId(openMenuPostId === post.id ? null : post.id)}
                                                            aria-label="Post menu"
                                                        >
                                                            <FaEllipsisV />
                                                        </button>
                                                        {openMenuPostId === post.id && (
                                                            <div style={postMenuDropdownStyle}>
                                                                <button
                                                                    style={postMenuItemStyle}
                                                                    onClick={() => {
                                                                        navigate(`/post/${post.id}/edit`, {
                                                                            state: {
                                                                                postId: post.id,
                                                                                initialContent: post.content
                                                                            }
                                                                        });
                                                                        setOpenMenuPostId(null);
                                                                    }}
                                                                >
                                                                    <FaEdit /> Edit
                                                                </button>
                                                                <button
                                                                    style={postMenuItemDeleteStyle}
                                                                    onClick={() => {
                                                                        handleDeletePost(post.id);
                                                                        setOpenMenuPostId(null);
                                                                    }}
                                                                >
                                                                    <FaTrash /> Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
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
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
                                        <p style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' }}>
                                            No posts found
                                        </p>
                                        <p style={{ margin: '0' }}>
                                            Create your first post to get started!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <ChatList /> */}
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
                            onClick={() => navigate(`/chatbox/${conversation.id}`)}
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
                        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
                          <p style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' }}>
                            No conversations yet
                          </p>
                          <p style={{ margin: '0' }}>
                            Start a conversation with a customer!
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
            </div>
        </div>
    );
}

export default Taskerdashboard;