import React, {createContext, useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import CartWidget from '../components/Cart/CartWidget/CartWidget';
import { getFirestore } from '../firebase';
import firebase from 'firebase'
import { BiShowAlt } from 'react-icons/bi';
import Swal from 'sweetalert2';

export const UserContext = createContext([]);

export const UserFunctions = ({children}) => {
    const history = useHistory();
    /*------------FORM HELPERS---------------------*/
    const [nameHelper, setNameHelper] = useState('');
    const [surnameHelper, setSurnameHelper] = useState('');
    const [emailHelper, setEmailHelper] = useState('');
    const [passwordHelper, setPasswordHelper] = useState('')
    const [confirmationPassHelper, setConfirmationPassHelper] = useState('');
    const [password, setPassword] = useState('');
    const [tcHelper, setTcHelper] = useState('');
    const [tcState, setTcState] = useState(false);
    const [generalHelper, setGeneralHelper] = useState('');
    /*-----------------------------------------------------*/
    const [loginHelper, setLoginHelper] = useState('');
    const validationInitialization={
        name: false,
        surname: false,
        email: false,
        password: false,
        terms: false
    }
    const [validation, setValidation] = useState(validationInitialization);

    const [user, setUser] = useState(
        localStorage.getItem('usuario')
          ? JSON.parse(localStorage.getItem('usuario'))
          : {}
    );
    

    useEffect(()=>{
        if(user.name){
            saveUser();
        }
    },[user])
    

    function createUser(e){
        e.preventDefault();
        confirmationPassHelp(e.target.parentElement.querySelector('#login-confirmationPass'));
        const valid = validateForm();
        if(valid){
            let user = {
                name: e.target.parentElement.querySelector('#login-nombre').value,
                surname: e.target.parentElement.querySelector('#login-apellido').value,
                email: e.target.parentElement.querySelector('#login-email').value
            }
            let password = e.target.parentElement.querySelector('#login-password').value;

            //Creo el usuario en firebase
            firebase.auth().createUserWithEmailAndPassword(user.email, password)
            .then(userCredential=>{
                userCredential.user.updateProfile({
                    displayName: `${user.name} ${user.surname}`
                })
                user.uid = userCredential.user.uid;
                history.push('/cart');
            })
            .then(()=>{
                //Creo un usuario con todos sus datos en una collection
                const db = getFirestore();
                db.collection('users').doc(user.uid)
                .set(user)
                .then(()=> setUser(user));
            })
            .catch(error => {
                console.log(error.code)
                if(error.code === 'auth/email-already-in-use'){
                    setGeneralHelper('Este email ya está asociado a una cuenta')
                }
            })
        } 
    }

    function saveUser(){
        localStorage.setItem('usuario', JSON.stringify(user))
    }

    /*---------------------LOG IN VALIDATION------------------------*/

    function login(father){
        let email = father.querySelector('#login-email').value;
        let password = father.querySelector('#login-password').value;
        let user = {}

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential=>{
            
            //Obtengo los datos del usuario recién ingresado 
            const db = getFirestore();
            db.collection('users').doc(userCredential.user.uid).get()
            .then(qs=> user = qs.data())
            .catch(error => console.log('Ha ocurrido un error en la asignación de los datos del usuario: ', error.code))
            .finally(()=>{
                user.name && setUser(user);
            })
        })
        .then(()=> history.push('/categories'))
        .catch(error => {
            switch(error.code){
                case 'auth/wrong-password':
                    setLoginHelper('Contraseña incorrecta');
                    break;
                case 'auth/user-not-found':
                    setLoginHelper('Usuario inexistente');
                    break;
            }
        })
    }

    /*------------------ ACCOUNT MANAGEMENT --------------------*/
    function logOut(){
        firebase.auth().signOut().then(()=>{
            localStorage.removeItem('usuario');
            setUser({});
            history.push('/home');
        })
        .catch(error=>{
            console.log('Ha ocurrido un error al cerrar sesión: ', error.code)
        })
    }

    function deleteAccount(){
        Swal.fire({
            title: 'Estas seguro que querés eliminar tu cuenta?',
            text: "No vas a poder revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then(result=>{
            if(result.isConfirmed){

                let user = firebase.auth().currentUser,
                userUid = user.uid;
                
                //Elimino primero los datos del usuario
                const db= getFirestore();
                db.collection('users').doc(userUid).delete()
                .catch(error => console.log('No se pudo eliminar los datos del usuario ', error.code));

                //Verifico que el usuario siga autenticado, sino le vuelvo a pedir que se autentique
                user.delete().then(()=>{
                    localStorage.removeItem('usuario');
                    setUser({});
                })
                .then(()=>{
                    Swal.fire(
                        'Listo',
                        'Tu usuario ha sido eliminado',
                        'success'
                    ).then(()=>history.push('/'))
                })
                .catch(error=>{
                    //Si el usuario no se encuentra autenticado deberá volver a iniciar sesión
                    Swal.fire({
                        title: 'Ooops',
                        icon: 'warning',
                        text: 'Debe cerrar sesión, volver a abrirla e inmediatamente reseleccionar la opción "Eliminar cuenta" para poder eliminar la cuenta',
                        confirmationButtonText: 'Ok'
                    })
                })
            }
        })
    }

    function updateUserData(){
        
    }


    /*-----------------------REGISTER FORM VALIDATION -----------------------*/

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
        <UserContext.Provider value={{loginHelper,createUser, user, nameHelp, nameHelper, surnameHelper, surnameHelp, emailHelp, emailHelper, passwordHelp, passwordHelper, confirmationPassHelp, confirmationPassHelper, setPassword, tcHelp, tcHelper, generalHelper, login, logOut, deleteAccount, updateUserData}}>
            {children}
        </UserContext.Provider>
    )

}