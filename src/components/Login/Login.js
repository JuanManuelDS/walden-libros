import React, {useContext } from 'react';
import './Login.css';
import { UserContext } from '../../context/UserContext';

export default function Login(){

    const {addUser, user, nameHelp, nameHelper, surnameHelp, surnameHelper, emailHelp, emailHelper, passwordHelp, passwordHelper, confirmationPassHelp, confirmationPassHelper, setPassword, tcHelp, tcHelper, generalHelper} = useContext(UserContext)

    return <div id='login-container'>
        <div id='login-content'>
            <form id='login-form'>
                <label>Nombre:<br /> <input onChange={e=>nameHelp(e)} type='text' name='nombre' id='login-nombre' />  </label><span className='helper'> {nameHelper}</span>
                <label>Apellido: <br /><input onChange={e=>surnameHelp(e)}  type='text' name='apellido' id='login-apellido'/>  </label><span className='helper'>{surnameHelper}</span>
                <label>Email: <br /><input onBlur={e=>emailHelp(e)}  type='text' name='email' id='login-email'/> </label><span className='helper'>{emailHelper}</span>
                <label>Elija una contraseña: <br /><input onBlur={e=>setPassword(e.target.value)} onChange={e=>passwordHelp(e)} type='password' id='login-password'/ ></label><span className='helper'>{passwordHelper}</span>
                <label>Confirme su contraseña: <br /><input onBlur={e=>confirmationPassHelp(e.target)}  type='password' id='login-confirmationPass' /> </label><span className='helper'>{confirmationPassHelper}</span>
                <label>Acepto los términos y condiciones <input onChange={e=>tcHelp(e)} type='checkbox' /> </label><span className='helper'>{tcHelper}</span>
                <input type='submit' value='Registrarme' onClick={e=>addUser(e)} /><span className='helper'>{generalHelper}</span>
            </form>
        </div>
    </div>
}

