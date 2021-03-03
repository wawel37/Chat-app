import react, {useState, useEffect} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './RoomsPanel.css';



export function RoomsPanel(){

    const [rooms, setRooms] = useState([]);
    const [link, setLink] = useState('/');

    useEffect(() =>{
        let isMounted = true;

        const user = JSON.parse(localStorage.getItem('user'));

        if(user !== null){
            const queryURL = '/rooms/user/' + user.data._id;
            setLink('/room/'+user.data._id);

            axios.get(queryURL)
            .then((response) =>{
                if(isMounted) setRooms(response.data);
            }).catch((err) =>{
                if(isMounted) setRooms([]);
                console.log(err);
            });
            
        }else{
            setLink('/');
        }


        return () => {isMounted = false};
    }, []);


    return(
        <div className="RoomsPanel">
            {rooms.map((room, i) =>{
                return (
                    <Link to={'/room/'+room._id} key={i}>
                        <Button className="redirection-button" room={room} id={i}>{room.name}</Button>
                    </Link>
                );
            })}
        </div>
    )
}