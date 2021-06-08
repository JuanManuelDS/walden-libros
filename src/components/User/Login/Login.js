    import React, {useContext} from 'react';
    import {BiUserCircle} from 'react-icons/bi';
    import { useHistory } from 'react-router';
    import { UserContext } from '../../../context/UserContext';
    import './Login.css';


    export default function Login(){

        const {login, loginHelper} = useContext(UserContext)
        const history = useHistory();

        return(
            <div id='login-container'>
                <div id='login'>
                    <BiUserCircle size={'7rem'} color={'gray'} />
                    <input type='text' placeholder='Email' id='login-email' />
                    <input type='password' placeholder='Contraseña' id='login-password' />
                    <p id='login-helper'>{loginHelper}</p>
                    <button id='login-is-btn' onClick={e=>login(e.target.parentElement)}>Iniciar sesión</button>
                    <button id='login-reg-btn' onClick={()=>history.push('/register')}>Crear cuenta</button>
                </div>
            </div>
        )
    }