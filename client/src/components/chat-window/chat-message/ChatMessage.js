import React from 'react';
import './ChatMessage.css'



export function ChatMessage(props){

    return(
        <div className="chatMessage">
            <p className="date">{props.post.date}</p>
            <h1>{props.post.title}</h1>
            <p className="post-body">{props.post.body}</p>
        </div>
    )
}