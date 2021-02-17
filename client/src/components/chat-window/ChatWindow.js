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
    

    
    useEffect(async () => {
        let isMounted = true;
        const token = JSON.parse(localStorage.getItem('jwt'));


        axios.get('/posts')
        .then((res) =>{
            if(isMounted) setPosts(res.data);
        })
        .catch((err) => {
            setPosts([]);
            console.log(err.message);
        })

        const socket = socketIOClient('/', {
            query: `token=${token}`
        });

        socket.on('update posts', (data) => {
            if(isMounted) setPosts(data);
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

        socketIOClient('/').emit('send post', toSend);
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