import React, {useContext} from 'react';
import { UserContext } from '../../context/UserContext';
import './User.css';
import {useHistory} from 'react-router-dom';

export default function User(){
    const {user, logOut, deleteAccount} = useContext(UserContext);
    const history = useHistory();

    return(
        <div id='user-container'>
            <div id='user-options'>
                <button onClick={logOut}>Cerrar sesión</button>
                <button onClick={deleteAccount}>Eliminar cuenta</button>
            </div>
        </div>
    )
}