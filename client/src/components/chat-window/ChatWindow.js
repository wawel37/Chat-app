import React, {useEffect, useState, useContext} from 'react';
import './ChatWindow.css';
import './chat-message/ChatMessage';
import { ChatMessage } from './chat-message/ChatMessage';
import axios from 'axios';
import socketIOClient, { io, Socket }  from 'socket.io-client';
import { useWindowScroll } from 'react-use';
import {SocketContext} from '../../context/socket';

export function ChatWindow(props){

    const contextSocket = useContext(SocketContext);
    

    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    
    //Setting up the socket connection with the update post 
    
    function setUpSocket(isMounted){

        contextSocket.on('update posts', (data) => {
            if(isMounted) setPosts(data);
        });

    }
    
    useEffect(async () => {
        let isMounted = true;
        setUpSocket(isMounted);


        axios.get('/posts')
        .then((res) =>{
            if(isMounted) setPosts(res.data);
        })
        .catch((err) => {
            if(isMounted) setPosts([]);
            console.log(err.message);
        });

        return () => {isMounted = false};
    }, []);

    function sendPost(e){
        e.preventDefault();

        setMessage('');

        const user = JSON.parse(localStorage.getItem('user'));
        let userName = 'none';
        if(user){
            userName = user.data.name;
        }

        const toSend = {
            title: userName,
            body: message
        };

        contextSocket.emit('send post', toSend);
    }

    return (
        <div className="chatWindow">

            <div className="postsWindow">
                {posts.map((post, i) => {
                    return <ChatMessage post={post} key={i}/>
                }
                )}
            </div>
        

            <div className="inputWindow">
                <form>
                    <input className="textInput" type="text" value={message} name="postMessage" placeholder="Your message" onChange={(e) => setMessage(e.target.value)}/>
                    <input className="submit" type="submit" onClick={sendPost}/>
                </form>

            </div>

        </div>
    )
}