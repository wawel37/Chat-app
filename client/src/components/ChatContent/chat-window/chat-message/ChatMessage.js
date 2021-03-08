import React, {useEffect, useState} from 'react';
import './ChatMessage.css'



export function ChatMessage(props){

    const [userClass, setUserClass] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user.data.name === props.post.title){
            
            setUserClass('mine-post')
        }else{
            console.log('mine post');
            setUserClass('')
        }
    }, []);

    return(
        <div className={`chatMessage ${userClass}`}>
            <p className="date">{props.post.date}</p>
            <h1>{props.post.user.name}</h1>
            <p className="post-body">{props.post.body}</p>
        </div>
    )
}