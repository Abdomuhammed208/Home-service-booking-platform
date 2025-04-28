import { useEffect, useState } from 'react';
import './dashboard.css';
import {  useLocation, useNavigate } from "react-router-dom";

function Dashboard(){
    const location = useLocation();
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const successfulMessage = location.state?.loginMessage;
    const [message, setMessage] = useState('');
    useEffect(()=>{
        if(successfulMessage){
            setMessage(successfulMessage);
            navigate(location.pathname,{replace: true})
        }
    },[location, navigate, successfulMessage])
useEffect(()=>{
fetch('http://localhost:3000/user')
.then(response=>response.json())
.then(data=>setPosts(data.posts))
.catch(error=>console.error('Error fetching posts:', error))
}, [])
    return <div>
     <div className="dashboard-container">
        <p >This is user dashboard</p>
        <a href="/profile"><p>view profile</p></a>        
    </div>
    {message && <p style={{ color: "green" }}>{message}</p>}
    <div>
        {posts && posts.length > 0 ? (
            posts.map((post) => (
                <div key={post.id}>
                    <h1>{post.tasker_name}</h1>
                    <p>{post.content}</p>
                </div>
            ))
        ) : (
            <p style={{color: "red"}}>No posts found</p>
        )}
    </div>
    </div>

}
export default Dashboard;