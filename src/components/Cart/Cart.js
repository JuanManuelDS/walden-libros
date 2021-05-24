import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import {TiDelete} from 'react-icons/ti'
import {CarritoContext} from '../../context/CarritoContext';
import './Cart.css'

export default function Cart(){
    const {cart, deleteItem, createOrder, costoEnvio, idPedido, total} = useContext(CarritoContext);

    return(
         
        <div id='cartWrapper'>
            {cart.length > 0 ?
            <>
                <div id='cartHeader'>
                    <div></div>
                    <div>Libro</div>
                    <div>Precio</div>
                    <div>Cantidad</div>
                    <div>Total</div>
                </div>
                {cart.map((lib, i) => {
                    return(
                        <div key={i} className='cartBody'>
                            <div><img src={lib.item.imagen} className='cartImages'/></div>
                            <div className='cart-div-detalles'>
                                <span className='cartTitulo'>{lib.item.titulo}</span>
                                <br />
                                <span className='cartAutor'>{lib.item.autor}</span>
                                <span className='cartDeleteItem' onClick={e=>deleteItem(e, lib)}>Eliminar</span>
                            </div>
                            <div>${lib.pricePU}</div>
                            <div>{lib.quantity}</div>
                            <div>${lib.price}</div>
                        </div>
                    )
                })}
                <div id='cartFooter'>
                    <h5>Envío: {costoEnvio ? '$'+costoEnvio : <span id='envioGratis'>Gratis</span>}</h5>
                    <h4>Total: ${total+costoEnvio}</h4>
                </div>
                <button id='order-btn' onClick={createOrder}>Realizar pedido</button>
                {idPedido ? 
                    <h4 id='finalizacion-pedido'>Id del pedido: {idPedido}</h4>
                :
                <></>}
            </>
            :
            <>
                <h2>Todavía no has añadido ningún libro a tu carrito</h2>
                <Link to={'/categories'}><h4>Ir al catálogo</h4></Link>
            </>
            }
        </div>
        
    )
}