import react from 'react';
import  ChatWindow  from './chat-window/ChatWindow';
import { RoomsPanel } from './RoomsPanel/RoomsPanel';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import './ChatContent.css';


export function ChatContent(){


    return(
        <div className="ChatContent">
            <Router>
                <RoomsPanel/>
                <Switch>
                    <Route path='/room/:roomID' exact={true} component={() => <ChatWindow key ={window.location.pathname}/>}/>
                </Switch>
            </Router>
        </div>
    )
}