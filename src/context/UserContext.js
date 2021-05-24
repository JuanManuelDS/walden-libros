import React, {createContext, useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import { getFirestore } from '../firebase';
import firebase from 'firebase/app'

export const UserContext = createContext([]);

export const UserFunctions = ({children}) => {
    const history = useHistory();

    const [user, setUSer] = useState({});
    const [nameHelper, setNameHelper] = useState('');
    const [surnameHelper, setSurnameHelper] = useState('');
    const [emailHelper, setEmailHelper] = useState('');
    const [passwordHelper, setPasswordHelper] = useState('')
    const [confirmationPassHelper, setConfirmationPassHelper] = useState('');
    const [password, setPassword] = useState('');
    const [tcHelper, setTcHelper] = useState('');
    const [tcState, setTcState] = useState(false);
    const [generalHelper, setGeneralHelper] = useState('')
    const validationInitialization={
        name: false,
        surname: false,
        email: false,
        password: false,
        terms: false
    }
    const [validation, setValidation] = useState(validationInitialization);

    
    useEffect(()=>{
        if(user.name){
            const dataBase = getFirestore();
            const users = dataBase.collection('users');
            users.add(user);
            console.log('me ejecuté')
        }
    },[user])
    
    function addUser(e){
        e.preventDefault();
        confirmationPassHelp(e.target.parentElement.querySelector('#login-confirmationPass'));
        const valid = validateForm();
        if(valid){
            let user = {
            name: e.target.parentElement.querySelector('#login-nombre').value,
            surname: e.target.parentElement.querySelector('#login-apellido').value,
            email: e.target.parentElement.querySelector('#login-email').value,
            password: e.target.parentElement.querySelector('#login-password').value
            }
            setUSer(user);
            history.push('/cart');
        } 
    }

    function validateForm (){
        if(Object.values(validation).indexOf(false)=== -1){
            setGeneralHelper('')
            return true
        } else{
            setGeneralHelper('Por favor, complete correctamente el formulario');
            return false;
        } 
    }

    function nameHelp(e){
        const letters = /^[a-zA-Z/\s/g]+$/;
        let input = e.target.value;
        if(!input.match(letters)){
            setNameHelper('Sólo se permiten letras');
            setValidation({...validation, name: false})
        } else if (input.trim()=== '') {
            setNameHelper('Ingrese su nombre');
            setValidation({...validation, name: false});
        } else {
            setNameHelper('');
            setValidation({...validation, name: true})
        }

    }

    function surnameHelp(e){
        const letters = /^[a-zA-Z/\s/g]+$/;
        let input = e.target.value;
        if(!input.match(letters)){
            setSurnameHelper('Sólo se permiten letras');
            setValidation({...validation, surname:false});
        } else if (input.trim()=== '') {
            setSurnameHelper('Ingrese su nombre');
            setValidation({...validation, surname:false});
        } else {
            setSurnameHelper('');
            setValidation({...validation, surname:true});
        }
    }

    function emailHelp(e){
        const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let input = e.target.value;
        if(!input.match(emailFormat)){
            setEmailHelper('Formato de email incorrecto');
            setValidation({...validation, email:false});
        } else if (input.trim()===''){
            setEmailHelper('Ingrese su email');
            setValidation({...validation, email:false});
        } else {
            setEmailHelper('');
            setValidation({...validation, email:true});
        }
            
    }

    function passwordHelp(e){
        if(e.target.value.length < 8){
            setPasswordHelper('La contraseña debe tener mínimo 8 caracteres');
            setValidation({...validation, password:false});
        } else if (password){
            setConfirmationPassHelper(e.target.parentElement.querySelector('#login-confirmationPass'));
            setPasswordHelper('')
        } else {
            setPasswordHelper('');
            setValidation({...validation, password:true});
        }
    }

    function confirmationPassHelp(target){
        
        if(!(target.value === password)){
            console.log('no coinciden')
            setConfirmationPassHelper('Las contraseñas deben coincidir')
            setValidation({...validation, password:false});
        }
        else if(target.value.length < 8){
            setValidation({...validation, password:false});
        } else {
            setConfirmationPassHelper('');
            setValidation({...validation, password:true});

        }  
    }

    function tcHelp(e){
        if(e.target.checked){
            setTcHelper('');
            setTcState(true);
            setValidation({...validation, terms:true});
        } else {
            setTcState(false);
            setTcHelper('Debes aceptar los términos y condiciones para poder registrarte');
            setValidation({...validation, terms:false});
        }
    }

    return (
        <UserContext.Provider value={{addUser, user, nameHelp, nameHelper, surnameHelper, surnameHelp, emailHelp, emailHelper, passwordHelp, passwordHelper, confirmationPassHelp, confirmationPassHelper, setPassword, tcHelp, tcHelper, generalHelper}}>
            {children}
        </UserContext.Provider>
    )

}