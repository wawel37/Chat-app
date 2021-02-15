import React, {useEffect, useState} from 'react';
import './ChatWindow.css';
import './chat-message/ChatMessage';
import { ChatMessage } from './chat-message/ChatMessage';
import axios from 'axios';
import socketIOClient, { io } from 'socket.io-client';
import { useWindowScroll } from 'react-use';

export function ChatWindow(props){

    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState('');
    const myRef = React.useRef(null);

    const getPosts = () =>{
        fetch('/posts')
        .then(res => res.json())
        .then((data) => {
            setPosts(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    useEffect(() => {
        console.log('fetching');
        getPosts();
        const socket = socketIOClient('/');
        socket.on('update posts', (data) => {
            setPosts(data);
            //fsdfsd
        });
    }, []);

    function sendPost(e){
        e.preventDefault();
        setMessage('');
        const toSend = {
            title: "user",
            body: message
        };
        socketIOClient('/').emit('send post', toSend);
    }

    return (
        <div className="chatWindow">
    
            <div ref={myRef} className="postsWindow">
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