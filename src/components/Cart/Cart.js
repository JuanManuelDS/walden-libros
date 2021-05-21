import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import {TiDelete} from 'react-icons/ti'
import {CarritoContext} from '../../context/CarritoContext';
import './Cart.css'

export default function Cart(){
    const {cart, deleteItem, cleanCart, total} = useContext(CarritoContext);

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
                            <div>{lib.price}</div>
                        </div>
                    )
                })}
                <div id='cartFooter'>
                    <h4>Total: ${total}</h4>
                </div>
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