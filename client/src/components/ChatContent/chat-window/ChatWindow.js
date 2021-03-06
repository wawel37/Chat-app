import React, {useEffect, useState, useContext, useRef} from 'react';
import './ChatWindow.css';
import './chat-message/ChatMessage';
import { ChatMessage } from './chat-message/ChatMessage';
import axios from 'axios';
import socketIOClient, { io, Socket }  from 'socket.io-client';
import { useWindowScroll } from 'react-use';
import {SocketContext} from '../../../context/socket';
import { useParams, withRouter } from 'react-router-dom';

function ChatWindow(props){

    const contextSocket = useContext(SocketContext);
    const { roomID } = useParams();
    const refAnchor = useRef(null);

    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    
    //Setting up the socket connection with the update post 
    

    
    useEffect(() => {
        let isMounted = true;

        contextSocket.on('update posts', (data) => {
            //We only update value when we are on the chat's page
            if(isMounted && roomID == data.roomID){
                setPosts(data.posts);
                refAnchor.current.scrollIntoView();
            } 
        });

        const queryURL = '/posts/room/' + roomID;

        axios.get(queryURL)
        .then((res) =>{
            if(isMounted){
                 setPosts(res.data);
                 refAnchor.current.scrollIntoView();
            }
            console.log(posts);
        })
        .catch((err) => {
            if(isMounted) setPosts([]);
            console.log(err.message);
        });

        return () => {isMounted = false};
    }, []);

    function sendPost(e){
        e.preventDefault();

        

        const user = JSON.parse(localStorage.getItem('user'));
        let userName = 'none';
        if(user){
            userName = user.data.name;
        }

        const toSend = {
            user: user.data,
            body: message,
            room: roomID
        };

        contextSocket.emit('send post', toSend);

        setMessage('');
    }

    return (
        <div className="chatWindow">
            <p>{roomID}</p>

            <div className="postsWindow">
                {posts.map((post, i) => {
                    return <ChatMessage post={post} key={i}/>
                }
                )}
                <div ref={refAnchor} className="anchor"></div>
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

export default ChatWindow;