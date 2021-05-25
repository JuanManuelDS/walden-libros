import React,{useContext} from 'react';
import './OrderView.css'
import { CarritoContext } from '../../context/CarritoContext';
import {AiOutlineCheckCircle} from 'react-icons/ai'
import { useHistory } from 'react-router-dom';


export default function OrderView(){
    const history = useHistory();
    const {idPedido} = useContext(CarritoContext);
    const user = JSON.parse(localStorage.getItem('usuario'))


    return (
        <div id='orderView-container'>
            <div id='orderView'>
                <AiOutlineCheckCircle style={{color: 'green'}} size={'5rem'}/>
                <h3>Muchas gracias por su compra {user.name}!</h3>
                <h5>Tu orden está llegarando dentro de los próximos 2 a 4 días hábiles. El repartidor te va a requerir los 5 últimos caracteres del ID del pedido.</h5>
                <h4>ID de tu pedido: {idPedido}</h4>
                <h6 onClick={()=>history.push('/categories')} id='orderView-link'>Volver al listado de libros</h6>
            </div>
        </div>
    )
}