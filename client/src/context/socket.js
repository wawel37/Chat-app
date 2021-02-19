import io from 'socket.io-client';
import React from 'react';

export const getSocket = () => {
    const token = JSON.parse(localStorage.getItem('jwt'));
    console.log('getting my socket');
    if(token){
        return io('/', {
            query: {
            token: token
            }
        });
    }else{
        return io('/');
    }
}

export const SocketContext = React.createContext(null);
